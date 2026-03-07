"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Lock } from "lucide-react";

const securityText = [
    "all your personal data",
    "and transactions are",
    "encrypted and secured.",
    "there's no room for",
    "mistakes because we",
    "didn't leave any."
];

export default function SecuritySection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const wordsPerLine = 6;
    
    const getWordStyle = (index: number) => {
        const progress = scrollYProgress.get();
        const totalWords = securityText.length;
        const wordProgress = index / totalWords;
        
        const opacity = useTransform(
            scrollYProgress,
            [Math.max(0, wordProgress - 0.15), wordProgress, Math.min(1, wordProgress + 0.15)],
            [0.15, 1, 1]
        );
        
        const glow = useTransform(
            scrollYProgress,
            [Math.max(0, wordProgress - 0.1), wordProgress],
            [0, 40]
        );

        return { opacity, glow };
    };

    return (
        <section 
            ref={sectionRef}
            className="min-h-[200vh] bg-black relative overflow-hidden flex flex-col items-center justify-center py-40"
        >
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F59E0B]/3 rounded-full blur-[150px]" />
                <div className="absolute inset-0 opacity-[0.02]" 
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Icon */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-8"
                >
                    <div className="relative">
                        <Shield size={48} className="text-[#F59E0B]" strokeWidth={1.5} />
                        <motion.div
                            className="absolute inset-0"
                            animate={{
                                boxShadow: ['0 0 20px rgba(245,158,11,0.3)', '0 0 40px rgba(245,158,11,0.5)', '0 0 20px rgba(245,158,11,0.3)']
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ borderRadius: '50%' }}
                        />
                    </div>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <span className="inline-block px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B]">
                        Your Data Isn't Our Business. Keeping It Safe Is.
                    </span>
                </motion.div>

                {/* Main Text with Flashlight Glow */}
                <div className="mt-16">
                    {securityText.map((phrase, phraseIndex) => {
                        const words = phrase.split(" ");
                        return (
                            <motion.div
                                key={phraseIndex}
                                className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ 
                                    duration: 0.6, 
                                    delay: phraseIndex * 0.1 
                                }}
                            >
                                {words.map((word, wordIndex) => {
                                    const globalIndex = phraseIndex * wordsPerLine + wordIndex;
                                    const wordProgress = globalIndex / securityText.join(" ").split(" ").length;
                                    
                                    const opacity = useTransform(
                                        scrollYProgress,
                                        [
                                            Math.max(0, wordProgress - 0.12),
                                            Math.min(1, wordProgress + 0.08)
                                        ],
                                        [0.2, 1]
                                    );
                                    
                                    const blur = useTransform(
                                        scrollYProgress,
                                        [Math.max(0, wordProgress - 0.1), wordProgress],
                                        [8, 0]
                                    );

                                    return (
                                        <motion.span
                                            key={wordIndex}
                                            className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight inline-block"
                                            style={{
                                                opacity,
                                                filter: blur,
                                                color: 'rgba(255,255,255,0.6)',
                                            }}
                                            whileInView={{
                                                color: ['rgba(255,255,255,0.6)', '#ffffff', '#ffffff'],
                                            }}
                                        >
                                            <motion.span
                                                style={{
                                                    textShadow: useTransform(
                                                        scrollYProgress,
                                                        [Math.max(0, wordProgress - 0.05), wordProgress],
                                                        ['0 0 0px rgba(255,255,255,0)', '0 0 30px rgba(255,255,255,0.5)']
                                                    )
                                                }}
                                            >
                                                {word}
                                            </motion.span>
                                        </motion.span>
                                    );
                                })}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Lock Icon */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 flex justify-center"
                >
                    <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
                        <Lock size={16} className="text-[#F59E0B]" />
                        <span className="text-xs font-medium text-white/50 uppercase tracking-wider">
                            End-to-End Encryption
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Progress Bar */}
            <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#F59E0B] to-transparent"
                style={{ opacity: scrollYProgress }}
            />
        </section>
    );
}
