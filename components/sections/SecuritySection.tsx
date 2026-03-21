"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShieldCheck, Lock } from 'lucide-react';

const text = "ALL YOUR PERSONAL DATA AND TRANSACTIONS ARE ENCRYPTED AND SECURED. THERE’S NO ROOM FOR MISTAKES BECAUSE WE DIDN’T LEAVE ANY";
const words = text.split(" ");

function GlowingWord({ word, index, scrollYProgress }: { word: string; index: number; scrollYProgress: any }) {
    const start = index / words.length;
    const end = (index + 1) / words.length;

    // Advanced Typographic Transitions
    const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
    const scale = useTransform(scrollYProgress, [start, end], [0.95, 1]);
    const blur = useTransform(scrollYProgress, [start, end], ["blur(10px)", "blur(0px)"]);
    const letterSpacing = useTransform(scrollYProgress, [start, end], ["-0.05em", "0.05em"]);
    
    // Dynamic Glow Burst
    const glow = useTransform(scrollYProgress, [start, start + (end - start) / 2, end], [0, 1, 0.5]);

    return (
        <motion.span
            style={{ opacity, scale, filter: blur, letterSpacing }}
            className="relative inline-block mx-[0.2em] my-[0.1em]"
        >
            <span className="text-[6vh] md:text-[10vh] font-black uppercase tracking-tighter text-white leading-[0.9]">
                {word}
            </span>
            
            {/* High-Velocity Light Flash */}
            <motion.div
                style={{ opacity: glow }}
                className="absolute inset-0 bg-white/40 blur-[40px] rounded-full pointer-events-none"
            />
            <motion.div
                style={{ opacity: glow }}
                className="absolute inset-0 text-white blur-[15px] pointer-events-none select-none"
            >
                <span className="text-[6vh] md:text-[10vh] font-black uppercase tracking-tighter leading-[0.9]">
                    {word}
                </span>
            </motion.div>
        </motion.span>
    );
}

export default function SecuritySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section
            ref={containerRef}
            id="security"
            className="relative bg-[#0E1117] min-h-[300vh] flex flex-col items-center py-20 overflow-hidden"
        >
            {/* Global Ambience Architecture */}
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#fb923c]/5 rounded-full blur-[200px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[180px]" />
                
                {/* Visual Watermarking */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.03 }}
                    className="absolute inset-0 flex items-center justify-center text-[40vw] font-black text-white select-none whitespace-nowrap"
                >
                    ENCRYPTED
                </motion.div>
            </div>

            {/* Static Branding Intro */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mb-60 mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-12"
                >
                    <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white/5 border border-white/10">
                        <ShieldCheck size={16} className="text-[#fb923c]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Infrastructure Excellence</span>
                    </div>

                    <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.8] tracking-tighter uppercase max-w-5xl">
                        <span className="pricing-script-text text-[#fb923c] lowercase text-4xl md:text-8xl normal-case italic inline-block -rotate-3 mr-4">
                            Veloce
                        </span>
                        <br />
                        Guard —
                    </h2>
                </motion.div>
            </div>

            {/* Immersive Scroll Block */}
            <div className="relative z-20 w-full max-w-[90vw] mx-auto flex flex-wrap justify-center items-center text-center">
                {words.map((word, index) => (
                    <GlowingWord 
                        key={index} 
                        word={word} 
                        index={index} 
                        scrollYProgress={scrollYProgress} 
                    />
                ))}
            </div>

            {/* Bottom Final CTA / Detail */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="relative z-10 mt-[100vh] mb-40 text-center"
            >
                <div className="flex flex-col items-center gap-6">
                    <p className="text-white/40 text-lg md:text-2xl font-light tracking-tight max-w-2xl px-6">
                        Engineering digital fortresses where security is embedded into the DNA of every line of code.
                    </p>
                    <div className="w-px h-24 bg-gradient-to-b from-[#fb923c] to-transparent mt-8" />
                </div>
            </motion.div>
        </section>
    );
}
