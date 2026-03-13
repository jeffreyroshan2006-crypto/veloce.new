'use client';
import { useEffect, useRef } from 'react';

function normalizeColor(hexCode: number): number[] {
  return [
    ((hexCode >> 16) & 255) / 255,
    ((hexCode >> 8) & 255) / 255,
    (255 & hexCode) / 255,
  ];
}

class MiniGlText {
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;
  meshes: any[] = [];
  commonUniforms: any;
  width?: number;
  height?: number;
  Material: any;
  Uniform: any;
  PlaneGeometry: any;
  Mesh: any;
  Attribute: any;
  text: string;
  fontSize: number;

  constructor(canvas: HTMLCanvasElement, text: string = 'VELOCE', fontSize: number = 96) {
    this.canvas = canvas;
    this.text = text;
    this.fontSize = fontSize;
    const gl = this.canvas.getContext('webgl', { antialias: true, alpha: true });
    if (!gl) throw new Error('WebGL not supported');
    this.gl = gl;

    const context = this.gl;
    const _miniGl = this;

    this.Uniform = class {
      type: string = 'float';
      value: any;
      typeFn: string;
      excludeFrom?: string;
      transpose?: boolean;

      constructor(e: any) {
        Object.assign(this, e);
        const typeMap: Record<string, string> = {
          float: '1f',
          int: '1i',
          vec2: '2fv',
          vec3: '3fv',
          vec4: '4fv',
          mat4: 'Matrix4fv',
        };
        this.typeFn = typeMap[this.type] || '1f';
      }

      update(location: any): void {
        if (this.value === undefined || location === null) return;

        const isMatrix = this.typeFn.indexOf('Matrix') === 0;
        const fn = `uniform${this.typeFn}`;

        if (isMatrix) {
          (context as any)[fn](location, this.transpose || false, this.value);
        } else {
          (context as any)[fn](location, this.value);
        }
      }

      getDeclaration(name: string, type: string, length?: number): string {
        if (this.excludeFrom === type) return '';

        if (this.type === 'array') {
          return (
            this.value[0].getDeclaration(name, type, this.value.length) +
            `
const int ${name}_length = ${this.value.length};`
          );
        }

        if (this.type === 'struct') {
          let nameNoPrefix = name.replace('u_', '');
          nameNoPrefix =
            nameNoPrefix.charAt(0).toUpperCase() + nameNoPrefix.slice(1);
          const fields = Object.entries(this.value)
            .map(([n, u]: [string, any]) =>
              u.getDeclaration(n, type).replace(/^uniform/, '')
            )
            .join('');
          return `uniform struct ${nameNoPrefix} 
{
${fields}
} ${name}${length ? `[${length}]` : ''};`;
        }

        return `uniform ${this.type} ${name}${length ? `[${length}]` : ''};`;
      }
    };

    this.Attribute = class {
      type: number = context.FLOAT;
      normalized: boolean = false;
      buffer: WebGLBuffer;
      target!: number;
      size!: number;
      values?: Float32Array | Uint16Array;

      constructor(e: any) {
        this.buffer = context.createBuffer()!;
        Object.assign(this, e);
      }

      update(): void {
        if (this.values) {
          context.bindBuffer(this.target, this.buffer);
          context.bufferData(this.target, this.values, context.STATIC_DRAW);
        }
      }

      attach(e: string, t: WebGLProgram): number {
        const n = context.getAttribLocation(t, e);
        if (this.target === context.ARRAY_BUFFER) {
          context.bindBuffer(this.target, this.buffer);
          context.enableVertexAttribArray(n);
          context.vertexAttribPointer(
            n,
            this.size,
            this.type,
            this.normalized,
            0,
            0
          );
        }
        return n;
      }

      use(e: number): void {
        context.bindBuffer(this.target, this.buffer);
        if (this.target === context.ARRAY_BUFFER) {
          context.enableVertexAttribArray(e);
          context.vertexAttribPointer(
            e,
            this.size,
            this.type,
            this.normalized,
            0,
            0
          );
        }
      }
    };

    this.Material = class {
      uniforms: any;
      uniformInstances: any[] = [];
      program!: WebGLProgram;

      constructor(
        vertexShaders: string,
        fragments: string,
        uniforms: any = {}
      ) {
        const material = this;

        function getShader(type: number, source: string): WebGLShader {
          const shader = context.createShader(type)!;
          context.shaderSource(shader, source);
          context.compileShader(shader);
          if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
            console.error(context.getShaderInfoLog(shader));
            throw new Error('Shader compilation error');
          }
          return shader;
        }

        function getUniformDeclarations(uniforms: any, type: string): string {
          return Object.entries(uniforms)
            .map(([uniform, value]: [string, any]) =>
              value.getDeclaration(uniform, type)
            )
            .join('\n');
        }

        material.uniforms = uniforms;
        const prefix = 'precision highp float;';

        const vertexSource = `
          ${prefix}
          attribute vec4 position;
          attribute vec2 uv;
          attribute vec2 uvNorm;
          ${getUniformDeclarations(_miniGl.commonUniforms, 'vertex')}
          ${getUniformDeclarations(uniforms, 'vertex')}
          ${vertexShaders}
        `;

        const fragmentSource = `
          ${prefix}
          ${getUniformDeclarations(_miniGl.commonUniforms, 'fragment')}
          ${getUniformDeclarations(uniforms, 'fragment')}
          ${fragments}
        `;

        material.program = context.createProgram()!;
        context.attachShader(
          material.program,
          getShader(context.VERTEX_SHADER, vertexSource)
        );
        context.attachShader(
          material.program,
          getShader(context.FRAGMENT_SHADER, fragmentSource)
        );
        context.linkProgram(material.program);

        if (
          !context.getProgramParameter(material.program, context.LINK_STATUS)
        ) {
          console.error(context.getProgramInfoLog(material.program));
          throw new Error('Program linking error');
        }

        context.useProgram(material.program);
        material.attachUniforms(undefined, _miniGl.commonUniforms);
        material.attachUniforms(undefined, material.uniforms);
      }

      attachUniforms(name: string | undefined, uniforms: any): void {
        if (name === undefined) {
          Object.entries(uniforms).forEach(([n, u]) =>
            this.attachUniforms(n, u)
          );
        } else if (uniforms.type === 'array') {
          uniforms.value.forEach((u: any, i: number) =>
            this.attachUniforms(`${name}[${i}]`, u)
          );
        } else if (uniforms.type === 'struct') {
          Object.entries(uniforms.value).forEach(([u, i]) =>
            this.attachUniforms(`${name}.${u}`, i)
          );
        } else {
          this.uniformInstances.push({
            uniform: uniforms,
            location: context.getUniformLocation(this.program, name),
          });
        }
      }
    };

    this.PlaneGeometry = class {
      width: number = 1;
      height: number = 1;
      attributes: any;
      vertexCount: number = 0;
      xSegCount: number = 0;
      ySegCount: number = 0;

      constructor() {
        this.attributes = {
          position: new _miniGl.Attribute({
            target: context.ARRAY_BUFFER,
            size: 3,
          }),
          uv: new _miniGl.Attribute({ target: context.ARRAY_BUFFER, size: 2 }),
          uvNorm: new _miniGl.Attribute({
            target: context.ARRAY_BUFFER,
            size: 2,
          }),
          index: new _miniGl.Attribute({
            target: context.ELEMENT_ARRAY_BUFFER,
            size: 3,
            type: context.UNSIGNED_SHORT,
          }),
        };
      }

      setTopology(xSegs = 1, ySegs = 1): void {
        this.xSegCount = xSegs;
        this.ySegCount = ySegs;
        this.vertexCount = (this.xSegCount + 1) * (this.ySegCount + 1);
        const quadCount = this.xSegCount * this.ySegCount * 2;

        this.attributes.uv.values = new Float32Array(2 * this.vertexCount);
        this.attributes.uvNorm.values = new Float32Array(2 * this.vertexCount);
        this.attributes.index.values = new Uint16Array(3 * quadCount);

        for (let y = 0; y <= this.ySegCount; y++) {
          for (let x = 0; x <= this.xSegCount; x++) {
            const i = y * (this.xSegCount + 1) + x;
            this.attributes.uv.values[2 * i] = x / this.xSegCount;
            this.attributes.uv.values[2 * i + 1] = 1 - y / this.ySegCount;
            this.attributes.uvNorm.values[2 * i] = (x / this.xSegCount) * 2 - 1;
            this.attributes.uvNorm.values[2 * i + 1] =
              1 - (y / this.ySegCount) * 2;

            if (x < this.xSegCount && y < this.ySegCount) {
              const s = y * this.xSegCount + x;
              this.attributes.index.values[6 * s] = i;
              this.attributes.index.values[6 * s + 1] = i + 1 + this.xSegCount;
              this.attributes.index.values[6 * s + 2] = i + 1;
              this.attributes.index.values[6 * s + 3] = i + 1;
              this.attributes.index.values[6 * s + 4] = i + 1 + this.xSegCount;
              this.attributes.index.values[6 * s + 5] = i + 2 + this.xSegCount;
            }
          }
        }

        this.attributes.uv.update();
        this.attributes.uvNorm.update();
        this.attributes.index.update();
      }

      setSize(width = 1, height = 1): void {
        this.width = width;
        this.height = height;
        this.attributes.position.values = new Float32Array(
          3 * this.vertexCount
        );

        const offsetX = width / -2;
        const offsetY = height / -2;
        const segWidth = width / this.xSegCount;
        const segHeight = height / this.ySegCount;

        for (let y = 0; y <= this.ySegCount; y++) {
          const posY = offsetY + y * segHeight;
          for (let x = 0; x <= this.xSegCount; x++) {
            const posX = offsetX + x * segWidth;
            const idx = y * (this.xSegCount + 1) + x;
            this.attributes.position.values[3 * idx] = posX;
            this.attributes.position.values[3 * idx + 1] = -posY;
            this.attributes.position.values[3 * idx + 2] = 0;
          }
        }

        this.attributes.position.update();
      }
    };

    this.Mesh = class {
      geometry: any;
      material: any;
      attributeInstances: any[] = [];

      constructor(geometry: any, material: any) {
        this.geometry = geometry;
        this.material = material;

        Object.entries(this.geometry.attributes).forEach(
          ([e, attribute]: [string, any]) => {
            this.attributeInstances.push({
              attribute: attribute,
              location: attribute.attach(e, this.material.program),
            });
          }
        );

        _miniGl.meshes.push(this);
      }

      draw(): void {
        context.useProgram(this.material.program);
        this.material.uniformInstances.forEach(({ uniform, location }: any) =>
          uniform.update(location)
        );
        this.attributeInstances.forEach(({ attribute, location }: any) =>
          attribute.use(location)
        );
        context.drawElements(
          context.TRIANGLES,
          this.geometry.attributes.index.values.length,
          context.UNSIGNED_SHORT,
          0
        );
      }
    };

    const identityMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    this.commonUniforms = {
      projectionMatrix: new this.Uniform({
        type: 'mat4',
        value: identityMatrix,
      }),
      modelViewMatrix: new this.Uniform({
        type: 'mat4',
        value: identityMatrix,
      }),
      resolution: new this.Uniform({ type: 'vec2', value: [1, 1] }),
      aspectRatio: new this.Uniform({ type: 'float', value: 1 }),
    };
  }

  setSize(w = 640, h = 480): void {
    this.width = w;
    this.height = h;
    this.canvas.width = w;
    this.canvas.height = h;
    this.gl.viewport(0, 0, w, h);
    this.commonUniforms.resolution.value = [w, h];
    this.commonUniforms.aspectRatio.value = w / h;
  }

  setOrthographicCamera(): void {
    this.commonUniforms.projectionMatrix.value = [
      2 / this.width!,
      0,
      0,
      0,
      0,
      2 / this.height!,
      0,
      0,
      0,
      0,
      -0.001,
      0,
      0,
      0,
      0,
      1,
    ];
  }

  render(): void {
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clearDepth(1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.meshes.forEach((m) => m.draw());
  }
}

class GLTextEffect {
  canvas: HTMLCanvasElement;
  text: string;
  fontSize: number;
  minigl: MiniGlText;
  mesh: any;
  time = 0;
  last = 0;
  animationId?: number;
  isPlaying = false;

  constructor(canvas: HTMLCanvasElement, text: string = 'VELOCE', fontSize: number = 96) {
    this.canvas = canvas;
    this.text = text;
    this.fontSize = fontSize;
    this.minigl = new MiniGlText(canvas, text, fontSize);
    this.init();
  }

  init(): void {
    // Simple color cycling effect
    const uniforms = {
      u_time: new this.minigl.Uniform({ value: 0 }),
      u_color_cycle: new this.minigl.Uniform({ value: 0 }),
      u_pulse: new this.minigl.Uniform({ value: 1 }),
    };

    const vertexShader = `
attribute vec4 position;
attribute vec2 uv;
attribute vec2 uvNorm;

varying vec2 v_uv;
varying vec2 v_uvNorm;

void main() {
  v_uv = uv;
  v_uvNorm = uvNorm;
  
  // Add some wave distortion based on time
  float wave = sin(uv.y * 10.0 + u_time) * 0.02;
  vec4 pos = position;
  pos.x += wave;
  
  gl_Position = u_projectionMatrix * u_modelViewMatrix * pos;
}`;

    const fragmentShader = `
precision highp float;

varying vec2 v_uv;
varying vec2 v_uvNorm;

uniform float u_time;
uniform float u_color_cycle;
uniform float u_pulse;

void main() {
  // Create a pulsing, color-shifting effect
  float pulse = sin(u_time * 2.0) * 0.5 + 0.5;
  float hue = u_color_cycle + u_time * 0.1;
  
  // Convert HSV to RGB for color cycling
  vec3 color = hsvToRgb(vec3(hue, 0.8, 0.9));
  
  // Add some texture based on UV coordinates
  float texture = sin(v_uv.x * 50.0 + u_time) * cos(v_uv.y * 50.0 + u_time) * 0.5 + 0.5;
  
  // Final color with pulse
  vec3 finalColor = color * texture * (0.5 + pulse * 0.5) * u_pulse;
  
  gl_FragColor = vec4(finalColor, 1.0);
}`

    // Helper function for HSV to RGB conversion
    const hsvToRgbHelper = `
vec3 hsvToRgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}`;

    const vertexWithHeader = `
precision highp float;
${vertexShader}`;

    const fragmentWithHeader = `
precision highp float;
${hsvToRgbHelper}
${fragmentShader}`;

    const material = new this.minigl.Material(
      vertexWithHeader,
      fragmentWithHeader,
      uniforms
    );
    const geometry = new this.minigl.PlaneGeometry();
    this.mesh = new this.minigl.Mesh(geometry, material);

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.minigl.setSize(width, height);
    this.minigl.setOrthographicCamera();

    // Set geometry to cover the text area
    const xSegCount = Math.max(2, Math.ceil(width * 0.01));
    const ySegCount = Math.max(2, Math.ceil(height * 0.01));
    this.mesh.geometry.setTopology(xSegCount, ySegCount);
    this.mesh.geometry.setSize(width, height);
  }

  animate = (timestamp: number): void => {
    if (!this.isPlaying) return;

    this.time += Math.min(timestamp - this.last, 1000 / 15);
    this.last = timestamp;
    this.mesh.material.uniforms.u_time.value = this.time * 0.001; // Slow down time
    this.mesh.material.uniforms.u_color_cycle.value = (this.time * 0.0005) % 1.0; // Color cycling
    this.mesh.material.uniforms.u_pulse.value = Math.sin(this.time * 0.003) * 0.5 + 0.5; // Pulse
    this.minigl.render();

    this.animationId = requestAnimationFrame(this.animate);
  };

  start(): void {
    this.isPlaying = true;
    this.animationId = requestAnimationFrame(this.animate);
  }

  stop(): void {
    this.isPlaying = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

interface WebGLTextProps {
  text?: string;
  fontSize?: number;
  className?: string;
  isPlaying?: boolean;
}

export function WebGLText({
  text = 'VELOCE',
  fontSize = 96,
  className = '',
  isPlaying = true,
}: WebGLTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<GLTextEffect | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create canvas for WebGL rendering
    const canvas = document.createElement('canvas');
    Object.assign(canvas.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none', // Allow clicks to pass through
    });
    containerRef.current.appendChild(canvas);

    try {
      const glText = new GLTextEffect(canvas, text, fontSize);
      textRef.current = glText;

      if (isPlaying) glText.start();
    } catch (error) {
      console.error('Failed to initialize WebGL text:', error);
      // Fallback to regular text if WebGL fails
      containerRef.current.innerHTML = `
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
                   display: flex; align-items: center; justify-content: center;">
          ${text}
        </div>
      `;
    }

    return () => {
      textRef.current?.stop();
      if (containerRef.current?.contains(canvas)) {
        containerRef.current.removeChild(canvas);
      }
    };
  }, [
    text,
    fontSize,
    isPlaying,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{ fontSize: `${fontSize}px`, lineHeight: '1' }}
    />
  );
}