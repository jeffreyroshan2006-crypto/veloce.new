"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, Cpu, Layers, Database, Cloud } from 'lucide-react';

const categories = [
    {
        title: "Frontend Ecosystem",
        icon: <Layers className="w-5 h-5" />,
        tools: [
            { name: "React", color: "#61DAFB" },
            { name: "React Native", color: "#61DAFB" },
            { name: "Next.js", color: "#ffffff" },
            { name: "Flutter", color: "#02569B" },
            { name: "TypeScript", color: "#3178C6" },
        ],
        accent: "#3B82F6",
    },
    {
        title: "Backend & Data",
        icon: <Database className="w-5 h-5" />,
        tools: [
            { name: "Postgres", color: "#336791" },
            { name: "Python", color: "#3776AB" },
            { name: ".NET Core", color: "#512BD4" },
            { name: "Elasticsearch", color: "#005571" },
            { name: "Node.js", color: "#339933" },
        ],
        accent: "#10B981",
    },
    {
        title: "Platform & Infra",
        icon: <Cpu className="w-5 h-5" />,
        tools: [
            { name: "Docker", color: "#2496ED" },
            { name: "Kubernetes", color: "#326CE5" },
            { name: "Terraform", color: "#7B42BC" },
            { name: "Grafana", color: "#F46800" },
            { name: "Prometheus", color: "#E6522C" },
        ],
        accent: "#F59E0B",
    },
    {
        title: "Cloud Giants",
        icon: <Cloud className="w-5 h-5" />,
        tools: [
            { name: "Azure", color: "#0078D4" },
            { name: "AWS", color: "#FF9900" },
            { name: "Google Cloud", color: "#4285F4" },
        ],
        accent: "#EC4899",
    },
];

function ToolPill({ tool }: { tool: any }) {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.05 }}
            className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center gap-3 transition-colors hover:border-white/20 hover:bg-white/10"
        >
            <div 
                className="w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]" 
                style={{ backgroundColor: tool.color, color: tool.color }} 
            />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/80">
                {tool.name}
            </span>
        </motion.div>
    );
}

function PremiumBentoCard({ category, index }: { category: typeof categories[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    
    // Smooth 3D Motion using useMotionValue & useSpring (Lag-Free)
    const xRange = useMotionValue(0);
    const yRange = useMotionValue(0);

    const mouseXSpring = useSpring(xRange, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(yRange, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        xRange.set(x);
        yRange.set(y);
    };

    const resetTilt = () => {
        xRange.set(0);
        yRange.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            style={{
                perspective: 1000,
                rotateX,
                rotateY,
            }}
            className={`relative rounded-[2.5rem] p-8 md:p-12 overflow-hidden group transition-all duration-300 ${
                index % 3 === 0 ? 'md:col-span-12 lg:col-span-8' : 'md:col-span-12 lg:col-span-4'
            }`}
        >
            {/* Ambient Background */}
            <div 
                className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 backdrop-blur-xl group-hover:border-white/20 transition-colors duration-500 rounded-[2.5rem]"
            />
            
            {/* Corner Accent Color */}
            <div 
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[80px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-700"
                style={{ backgroundColor: category.accent }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                    <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl"
                        style={{ backgroundColor: `${category.accent}20`, color: category.accent }}
                    >
                        {category.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">
                        {category.title}
                    </h3>
                </div>

                <div className="flex flex-wrap gap-3 mt-auto">
                    {category.tools.map((tool, i) => (
                        <ToolPill key={i} tool={tool} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function TechStackGrid() {
    return (
        <section id="tech-stack" className="py-20 md:py-40 px-6 md:px-12 lg:px-24 bg-[#0E1117] relative overflow-hidden">
            
            {/* Premium Header Architecture (Centered) */}
            <div className="max-w-7xl mx-auto mb-24 md:mb-40 text-center flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-12"
                >
                    <Sparkles size={14} className="text-[#fb923c]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Platform Engineering</span>
                </motion.div>

                <div className="relative inline-block mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.8] tracking-tighter uppercase"
                    >
                        <span className="pricing-script-text text-[#fb923c] lowercase text-4xl md:text-8xl normal-case italic inline-block -rotate-3 mr-4">
                            modern
                        </span>
                        <br />
                        Stack.
                    </motion.h2>
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-white/40 max-w-2xl text-lg md:text-2xl font-light leading-relaxed border-t border-white/10 pt-10"
                >
                    We leverage a world-class ecosystem of tools to build resilient, 
                    <br className="hidden md:block" />
                    high-performance digital infrastructure that redefines speed.
                </motion.p>
            </div>

            {/* Premium Bento Grid Architecture */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
                {categories.map((category, index) => (
                    <PremiumBentoCard key={index} category={category} index={index} />
                ))}
            </div>

            {/* Bottom Watermark */}
            <div className="absolute -bottom-20 left-0 right-0 opacity-[0.02] pointer-events-none select-none text-center">
                <h3 className="text-[30vw] font-black text-white tracking-[2vw] uppercase">
                    INFRA
                </h3>
            </div>
        </section>
    );
}
