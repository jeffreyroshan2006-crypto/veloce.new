'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Lock } from 'lucide-react';

const text = "all your personal data and transactions are encrypted and secured. there's no room for mistakes because we didn't leave any.";

const Word = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
    const opacity = useTransform(progress, range, [0, 1]);

    return (
        <span className="relative inline-block mr-3 mb-2 md:mr-4 md:mb-4 lg:mr-5 lg:mb-5">
            <span className="text-white/20 select-none transition-colors duration-300 relative z-0">
                {children}
            </span>

            <motion.span
                style={{ opacity }}
                className="absolute left-0 top-0 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] z-10"
            >
                {children}
            </motion.span>
        </span>
    );
};

export default function SecuritySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const words = text.split(" ");

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 50%", "end 100%"]
    });

    return (
        <section
            ref={containerRef}
            id="security"
            className="relative bg-black h-[200vh] pt-[15vh] px-6"
        >
            <div className="sticky top-[20vh] max-w-5xl mx-auto flex flex-col items-center text-center">

                <motion.div
                    className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Lock className="w-12 h-12 text-white" />
                </motion.div>

                <motion.h3
                    className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-white/60 mb-16"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    YOUR DATA ISN'T OUR BUSINESS. KEEPING IT SAFE IS.
                </motion.h3>

                <p className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight flex flex-wrap justify-center max-w-4xl mx-auto italic">
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + (1 / words.length);
                        return (
                            <Word key={i} progress={scrollYProgress} range={[start, end]}>
                                {word}
                            </Word>
                        )
                    })}
                </p>

                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-24" />
            </div>
        </section>
    );
}
