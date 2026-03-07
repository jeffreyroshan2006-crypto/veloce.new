"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Shield, Lock } from "lucide-react";

const securityText = [
    "all your personal data",
    "and transactions are",
    "encrypted and secured.",
    "there's no room for",
    "mistakes because we",
    "didn't leave any."
];

function GlowingLine({ text, index }: { text: string; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <div ref={ref} className="relative">
            <motion.div
                className="flex flex-wrap justify-center gap-x-3 md:gap-x-4 gap-y-2 mb-3 md:mb-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                    duration: 0.6, 
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1]
                }}
            >
                {text.split(" ").map((word, wordIndex) => (
                    <motion.span
                        key={wordIndex}
                        className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight"
                        initial={{ color: "rgba(255,255,255,0.35)", filter: "blur(6px)" }}
                        whileInView={{ 
                            color: "#ffffff",
                            filter: "blur(0px)"
                        }}
                        viewport={{ once: true }}
                        transition={{ 
                            duration: 0.4, 
                            delay: (index * 0.12) + (wordIndex * 0.05),
                            ease: "easeOut"
                        }}
                        style={{
                            textShadow: "0 0 20px rgba(255,255,255,0.2)",
                        }}
                    >
                        {word}
                    </motion.span>
                ))}
            </motion.div>
            
            <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent origin-center"
                style={{ 
                    scaleX,
                    opacity: scrollYProgress,
                    width: "200px"
                }}
            />
        </div>
    );
}

export default function SecuritySection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    return (
        <section 
            ref={sectionRef}
            className="min-h-[180vh] bg-black relative overflow-hidden flex flex-col items-center justify-start pt-40"
        >
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#F59E0B]/4 rounded-full blur-[150px]" />
                <div className="absolute inset-0 opacity-[0.015]" 
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-10"
                >
                    <div className="relative">
                        <Shield size={48} className="text-[#F59E0B]" strokeWidth={1.5} />
                        <motion.div
                            className="absolute inset-0 -z-10 rounded-full"
                            animate={{
                                boxShadow: ['0 0 25px rgba(245,158,11,0.3)', '0 0 50px rgba(245,158,11,0.5)', '0 0 25px rgba(245,158,11,0.3)']
                            }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-16"
                >
                    <span className="inline-block px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B]">
                        Your Data Isn't Our Business. Keeping It Safe Is.
                    </span>
                </motion.div>

                <div className="space-y-0">
                    {securityText.map((phrase, index) => (
                        <GlowingLine key={index} text={phrase} index={index} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    className="mt-20 flex justify-center"
                >
                    <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
                        <Lock size={16} className="text-[#F59E0B]" />
                        <span className="text-xs font-medium text-white/50 uppercase tracking-wider">
                            End-to-End Encryption
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
