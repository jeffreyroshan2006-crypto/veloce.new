"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

const nodes = [
    { label: "Veloce Infrastructure Guard", x: -180, y: -100, color: "#F59E0B" },
    { label: "Veloce Identity Protection", x: -120, y: 180, color: "#10B981" },
    { label: "Veloce API Perimeter Scan", x: 150, y: -160, color: "#3B82F6" },
    { label: "Veloce Policy-as-Code", x: -220, y: 40, color: "#8B5CF6" },
    { label: "Veloce Compliance Core", x: 220, y: -30, color: "#EC4899" },
    { label: "Veloce Zero-Trust Gateway", x: 180, y: 120, color: "#06B6D4" },
];

function FlashlightText({ text, className, color = "#F59E0B" }: { text: string; className?: string; color?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
    };

    return (
        <div
            ref={containerRef}
            className={`relative ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
        >
            {/* Flashlight Glow Effect */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: isHovered
                        ? `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, ${color}30, transparent 60%)`
                        : 'transparent',
                }}
                transition={{ duration: 0.15 }}
            />
            
            <span className="relative z-10">{text}</span>
        </div>
    );
}

function FlashlightLogo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
    };

    return (
        <div
            ref={containerRef}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
        >
            {/* Flashlight Glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: isHovered
                        ? `radial-gradient(300px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(245,158,11,0.4), transparent 70%)`
                        : 'transparent',
                }}
                transition={{ duration: 0.1 }}
            />
            
            <svg
                viewBox="0 0 120 40"
                className="w-32 h-12 relative z-10"
                fill="none"
            >
                <path
                    d="M20 5L8 35h6l2-5h8l2 5h6L20 5z"
                    fill="white"
                    className="transition-all duration-300"
                    style={{
                        filter: isHovered ? 'drop-shadow(0 0 8px rgba(245,158,11,0.8))' : 'none',
                    }}
                />
                <path
                    d="M45 8h5l3 12 3-12h5l5 22h-6l-1-5h-10l-1 5h-5L45 8z"
                    fill="white"
                    className="transition-all duration-300"
                    style={{
                        filter: isHovered ? 'drop-shadow(0 0 8px rgba(245,158,11,0.8))' : 'none',
                    }}
                />
                <path
                    d="M78 8h6v4h4v3h-4v7h-3v-7h-7v-4h4V8z"
                    fill="white"
                    className="transition-all duration-300"
                    style={{
                        filter: isHovered ? 'drop-shadow(0 0 8px rgba(245,158,11,0.8))' : 'none',
                    }}
                />
                <circle cx="100" cy="20" r="12" stroke="white" strokeWidth="2" fill="none" className="transition-all duration-300" />
                <circle cx="100" cy="20" r="6" fill="white" className="transition-all duration-300" />
            </svg>
        </div>
    );
}

function GlowingNode({ node, index }: { node: typeof nodes[0]; index: number }) {
    const [isGlowing, setIsGlowing] = useState(false);
    const nodeRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
        target: nodeRef,
        offset: ["start end", "center center"]
    });

    const glowOpacity = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
    const lineGlow = useSpring(scrollYProgress, { stiffness: 50, damping: 15 });

    useEffect(() => {
        const unsubscribe = glowOpacity.on("change", (v) => {
            if (v > 0.3) setIsGlowing(true);
            else setIsGlowing(false);
        });
        return unsubscribe;
    }, [glowOpacity]);

    return (
        <motion.div
            ref={nodeRef}
            className="absolute"
            initial={{ x: 0, y: 0, opacity: 0 }}
            whileInView={{ x: node.x, y: node.y, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.15, duration: 1.2, type: "spring" }}
        >
            {/* Glowing Connection Line */}
            <motion.div
                className="absolute origin-bottom"
                style={{
                    height: Math.sqrt(node.x ** 2 + node.y ** 2),
                    transform: `rotate(${Math.atan2(node.y, node.x) * 180 / Math.PI + 90}deg)`,
                    left: '50%',
                    top: '50%',
                    background: `linear-gradient(to top, transparent, ${node.color}${Math.floor((lineGlow.get() || 0) * 60)}%, ${node.color}${Math.floor((lineGlow.get() || 0) * 80)}%)`,
                }}
            />

            {/* Node Card */}
            <motion.div
                className="relative cursor-default"
                animate={{
                    boxShadow: isGlowing
                        ? `0 0 30px -5px ${node.color}60, 0 0 60px -10px ${node.color}30`
                        : 'none',
                }}
                transition={{ duration: 0.5 }}
            >
                <div
                    className="flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-md transition-all duration-500"
                    style={{
                        background: isGlowing
                            ? `${node.color}15`
                            : 'rgba(0,0,0,0.6)',
                        border: `1px solid ${isGlowing ? node.color : 'rgba(255,255,255,0.1)'}`,
                    }}
                >
                    <motion.div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                            backgroundColor: node.color,
                            boxShadow: isGlowing
                                ? `0 0 15px ${node.color}`
                                : 'none',
                        }}
                        animate={{
                            scale: isGlowing ? [1, 1.5, 1] : 1,
                        }}
                        transition={{
                            duration: isGlowing ? 1 : 0,
                            repeat: isGlowing ? Infinity : 0,
                        }}
                    />
                    <span
                        className="text-xs font-semibold uppercase tracking-wider transition-colors duration-300"
                        style={{
                            color: isGlowing ? node.color : 'rgba(255,255,255,0.6)',
                        }}
                    >
                        {node.label}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function WhyVeloce() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
    };

    return (
        <section
            id="why-veloce"
            className="py-32 px-6 md:px-12 lg:px-24 bg-black overflow-hidden relative"
            onMouseMove={handleMouseMove}
            ref={containerRef}
        >
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(245,158,11,0.03) 0%, transparent 60%)`,
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                    animate={{
                        background: [
                            'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.08) 0%, transparent 50%)',
                            'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.03) 0%, transparent 50%)',
                            'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.08) 0%, transparent 50%)',
                        ],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 text-center">
                <div className="mb-28">
                    {/* Flashlight Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-6"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B]">
                            Veloce Security & Architecture
                        </span>
                    </motion.div>

                    {/* Flashlight Title */}
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.95] mb-8">
                        <FlashlightText
                            text="VELOCE"
                            className="block"
                            color="#F59E0B"
                        />
                        <span className="block text-white/10">
                            <FlashlightText
                                text="GUARD"
                                className="block"
                                color="#F59E0B"
                            />
                        </span>
                        <span className="block text-white/5 text-4xl md:text-5xl lg:text-6xl">
                            Infrastructure Excellence.
                        </span>
                    </h2>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed"
                    >
                        We embed security into every layer of your stack. From Veloce scanning and identity to
                        policy-as-code, our defaults are secure so your delivery stays fast and compliant.
                    </motion.p>
                </div>

                {/* Central Sphere with Flashlight Logo */}
                <div className="relative h-[650px] flex items-center justify-center">
                    {/* Wireframe Sphere */}
                    <div className="relative w-[450px] h-[450px]">
                        <motion.div
                            className="absolute inset-0"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        >
                            <svg viewBox="0 0 200 200" className="w-full h-full text-white/[0.06]">
                                <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" />
                                <ellipse cx="100" cy="100" rx="95" ry="35" fill="none" stroke="currentColor" strokeWidth="0.3" />
                                <ellipse cx="100" cy="100" rx="35" ry="95" fill="none" stroke="currentColor" strokeWidth="0.3" />
                                <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.3" />
                                <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="0.3" />
                            </svg>
                        </motion.div>

                        <motion.div
                            className="absolute inset-0 scale-75 rotate-12"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                        >
                            <svg viewBox="0 0 200 200" className="w-full h-full text-white/[0.04]">
                                <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                                <ellipse cx="100" cy="100" rx="95" ry="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            </svg>
                        </motion.div>

                        <motion.div
                            className="absolute inset-0 scale-50 -rotate-12"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                        >
                            <svg viewBox="0 0 200 200" className="w-full h-full text-white/[0.03]">
                                <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="4 4" />
                                <ellipse cx="100" cy="100" rx="30" ry="90" fill="none" stroke="currentColor" strokeWidth="0.4" />
                            </svg>
                        </motion.div>

                        {/* Central Flashlight Logo */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <motion.div
                                className="w-36 h-36 rounded-2xl flex items-center justify-center relative"
                                style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(20px)',
                                }}
                                animate={{
                                    boxShadow: [
                                        '0 0 30px rgba(245,158,11,0.1), inset 0 0 30px rgba(245,158,11,0.05)',
                                        '0 0 50px rgba(245,158,11,0.2), inset 0 0 50px rgba(245,158,11,0.1)',
                                        '0 0 30px rgba(245,158,11,0.1), inset 0 0 30px rgba(245,158,11,0.05)',
                                    ],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <FlashlightLogo />
                            </motion.div>
                        </div>
                    </div>

                    {/* Glowing Nodes */}
                    {nodes.map((node, index) => (
                        <GlowingNode key={index} node={node} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
