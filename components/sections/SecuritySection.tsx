'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Lock } from 'lucide-react';

const text = "all your personal data and transactions are encrypted and secured. there's no room for mistakes because we didn't leave any.";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
    const opacity = useTransform(progress, range, [0.15, 1]);
    const glow = useTransform(progress, range, [0, 1]);

    return (
        <span className="relative inline-block mr-2 mb-1 md:mr-3 md:mb-2 lg:mr-4 lg:mb-3">
            <span className="text-white/15 select-none">
                {children}
            </span>
            <motion.span
                style={{ 
                    opacity,
                }}
                className="absolute left-0 top-0 text-white z-10"
            >
                <motion.span
                    style={{
                        filter: useTransform(glow, [0, 1], ["blur(0px)", "blur(0px)"]),
                        textShadow: useTransform(
                            glow,
                            [0, 1],
                            ["0 0 0px rgba(255,255,255,0)", "0 0 30px rgba(255,255,255,1), 0 0 60px rgba(255,255,255,0.5)"]
                        ),
                    }}
                >
                    {children}
                </motion.span>
            </motion.span>
        </span>
    );
}

export default function SecuritySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const words = text.split(" ");

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.6", "end 0.4"]
    });

    return (
        <section
            ref={containerRef}
            id="security"
            className="relative bg-black min-h-[300vh] py-[20vh] px-6"
        >
            <div className="sticky top-[15vh] max-w-5xl mx-auto flex flex-col items-center text-center">
                <motion.div
                    className="mb-10 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Lock className="w-14 h-14 text-[#F59E0B]" />
                </motion.div>

                <motion.h3
                    className="text-xs md:text-sm font-bold tracking-[0.35em] uppercase text-[#F59E0B] mb-20"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    YOUR DATA ISN'T OUR BUSINESS. KEEPING IT SAFE IS.
                </motion.h3>

                <p className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] flex flex-wrap justify-center max-w-4xl mx-auto">
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + (1 / words.length);
                        return (
                            <Word key={i} progress={scrollYProgress} range={[start, end]}>
                                {word}
                            </Word>
                        );
                    })}
                </p>

                <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mt-24" />
            </div>
        </section>
    );
}
