'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowUpRight, ExternalLink, Sparkles, Zap, Palette, Rocket } from 'lucide-react';

const projects = [
  {
    title: "SIP & SOCIAL",
    category: "Social Platform",
    year: "2025",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop",
    color: "#F59E0B",
    description: "A social networking platform connecting beverage enthusiasts worldwide.",
    link: "https://sipnsocial08.github.io/Sip-Social/",
    tag: "@sipnsocial"
  },
  {
    title: "GENZ CRICKET",
    category: "Sports Club",
    year: "2025",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800&auto=format&fit=crop",
    color: "#10B981",
    description: "Modern cricket club website with dynamic content and live scores.",
    link: "https://genzcricketclub-max.github.io/genzzz/",
    tag: "@genzcricket"
  },
  {
    title: "PHIZOOE REHAB",
    category: "Healthcare",
    year: "2025",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    color: "#3B82F6",
    description: "Professional rehabilitation therapy center with appointment booking.",
    link: "https://contactphizeeosrehabtherapy-source.github.io/Phizooe/",
    tag: "@phizooe"
  },
  {
    title: "NEURALIS",
    category: "AI Platform",
    year: "2026",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    color: "#8B5CF6",
    description: "AI-driven interface for neural data visualization.",
    link: "",
    tag: "@neuralis"
  },
  {
    title: "AETHER",
    category: "E-commerce",
    year: "2025",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop",
    color: "#EC4899",
    description: "Luxury retail through immersive 3D shopping experiences.",
    link: "",
    tag: "@aether"
  },
  {
    title: "ZENITH",
    category: "Real Estate",
    year: "2025",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    color: "#06B6D4",
    description: "Premium architectural visualization with virtual tours.",
    link: "",
    tag: "@zenith"
  }
];

const features = [
  { icon: Sparkles, text: "Premium Design", color: "#F59E0B" },
  { icon: Zap, text: "Fast Performance", color: "#10B981" },
  { icon: Palette, text: "Creative Excellence", color: "#8B5CF6" },
  { icon: Rocket, text: "Innovation First", color: "#EC4899" },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const yOffset = index % 2 === 0 ? -20 : 20;
  const rotate = index % 2 === 0 ? -2 : 2;

  return (
    <motion.div
      className="absolute"
      initial={{ 
        x: 500, 
        opacity: 0,
        scale: 0.85,
        rotate: 0
      }}
      whileInView={{ 
        x: 0, 
        opacity: 1,
        scale: 1,
        rotate: rotate
      }}
      viewport={{ once: true, margin: "-150px" }}
      transition={{ 
        type: "spring",
        stiffness: 45,
        damping: 14,
        delay: index * 0.1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        y: yOffset,
        zIndex: isHovered ? 100 : index + 1
      }}
    >
      <motion.div
        className="relative w-[320px] md:w-[380px] aspect-[16/9] rounded-xl overflow-hidden cursor-pointer"
        animate={isHovered ? { 
          scale: 1.05,
          y: -25,
          rotate: 0,
          zIndex: 100
        } : {}}
        transition={{ 
          type: "spring",
          stiffness: 250,
          damping: 20,
        }}
        style={{
          background: '#0a0a0a',
          boxShadow: isHovered 
            ? `0 35px 70px -25px ${project.color}50, 0 0 60px ${project.color}20`
            : `0 12px 35px -12px rgba(0,0,0,0.5)`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 12 }}
            transition={{ duration: 0.25 }}
          >
            <span 
              className="inline-block px-2.5 py-1 rounded text-[8px] font-bold uppercase tracking-wider mb-1.5"
              style={{ 
                backgroundColor: project.color,
                color: '#000',
              }}
            >
              {project.category}
            </span>
            <h3 className="text-lg font-bold text-white mb-1">
              {project.title}
            </h3>
            <p className="text-white/65 text-[10px] mb-2 leading-snug">
              {project.description}
            </p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[8px] font-semibold uppercase tracking-wider bg-white text-black hover:bg-white/90 transition-colors"
              >
                <Eye size={10} />
                View
              </a>
            )}
          </motion.div>
        </div>

        <div className="absolute top-3 right-3">
          <span 
            className="px-2 py-1 rounded text-[8px] font-mono"
            style={{ 
              backgroundColor: 'rgba(0,0,0,0.55)',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            {project.year}
          </span>
        </div>
      </motion.div>

      {project.tag && (
        <motion.div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          <span 
            className="px-2.5 py-1 rounded-full text-[8px] font-medium whitespace-nowrap"
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {project.tag}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="relative min-h-screen bg-black py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-[#007FFF]/4 rounded-full blur-[120px]"
          animate={{ x: [0, 30, 0], y: [0, 15, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-[10%] w-[450px] h-[450px] bg-purple-500/4 rounded-full blur-[120px]"
          animate={{ x: [0, -30, 0], y: [0, -15, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95]">
            <motion.span
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="block"
            >
              A place to
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-[#007FFF] via-purple-400 to-[#007FFF]"
              style={{ backgroundSize: '200% auto' }}
            >
              display your
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="block text-white/10"
            >
              masterpiece.
            </motion.span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                backgroundColor: `${feature.color}10`,
                border: `1px solid ${feature.color}25`,
              }}
            >
              <feature.icon size={14} style={{ color: feature.color }} />
              <span className="text-[11px] font-medium" style={{ color: feature.color }}>
                {feature.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <div className="relative h-[320px] md:h-[350px] flex items-center justify-center mb-16">
          <div className="relative w-full max-w-6xl flex justify-center items-center">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="absolute"
                style={{
                  left: `calc(50% + ${(index - 2.5) * 160}px)`,
                }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#007FFF] hover:text-white transition-all"
            style={{
              boxShadow: '0 8px 30px rgba(255,255,255,0.1)',
            }}
          >
            View All Projects
            <ExternalLink size={14} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
