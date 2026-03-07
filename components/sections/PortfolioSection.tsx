'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowUpRight, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "SIP & SOCIAL",
    category: "Social Platform",
    year: "2025",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop",
    color: "#F59E0B",
    description: "A social networking platform connecting beverage enthusiasts worldwide.",
    link: "https://sipnsocial08.github.io/Sip-Social/"
  },
  {
    title: "GENZ CRICKET",
    category: "Sports Club",
    year: "2025",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop",
    color: "#10B981",
    description: "Modern cricket club website with dynamic content and live scores.",
    link: "https://genzcricketclub-max.github.io/genzzz/"
  },
  {
    title: "PHIZOOE REHAB",
    category: "Healthcare",
    year: "2025",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    color: "#3B82F6",
    description: "Professional rehabilitation therapy center with appointment booking.",
    link: "https://contactphizeeosrehabtherapy-source.github.io/Phizooe/"
  },
  {
    title: "NEURALIS",
    category: "AI Platform",
    year: "2026",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    color: "#8B5CF6",
    description: "AI-driven interface for neural data visualization.",
    link: ""
  },
  {
    title: "AETHER",
    category: "E-commerce",
    year: "2025",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1200&auto=format&fit=crop",
    color: "#EC4899",
    description: "Luxury retail through immersive 3D shopping experiences.",
    link: ""
  },
  {
    title: "ZENITH",
    category: "Real Estate",
    year: "2025",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    color: "#06B6D4",
    description: "Premium architectural visualization with virtual tours.",
    link: ""
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ 
        x: 300, 
        opacity: 0,
        scale: 0.9
      }}
      whileInView={{ 
        x: 0, 
        opacity: 1,
        scale: 1
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        type: "spring",
        stiffness: 60,
        damping: 18,
        delay: index * 0.15,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-[320px] md:w-[360px] aspect-[16/10] rounded-xl overflow-hidden cursor-pointer"
        animate={isHovered ? { 
          scale: 1.05,
          y: -15,
        } : {}}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        style={{
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: isHovered 
            ? `0 30px 60px -20px ${project.color}50, 0 0 40px ${project.color}20`
            : `0 10px 30px -10px rgba(0,0,0,0.5)`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <motion.div
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(180deg, transparent 40%, ${project.color}30 100%)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: isHovered ? 1 : 0.7, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span 
                className="px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md"
                style={{ 
                  backgroundColor: `${project.color}25`,
                  color: project.color,
                  border: `1px solid ${project.color}30`,
                }}
              >
                {project.category}
              </span>
            </motion.div>

            <span className="px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm text-white/50 text-[10px] font-mono">
              {project.year}
            </span>
          </div>

          <motion.h3
            className="text-2xl font-bold text-white mb-1"
            animate={{ color: isHovered ? project.color : '#ffffff' }}
          >
            {project.title}
          </motion.h3>

          <motion.p
            className="text-white/50 text-sm mb-3"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.3 }}
          >
            {project.description}
          </motion.p>

          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all"
                style={{ 
                  backgroundColor: project.color,
                }}
              >
                <Eye size={12} />
                View
              </a>
            )}
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all">
              <ArrowUpRight size={12} />
              Case
            </button>
          </motion.div>
        </div>

        <div 
          className="absolute -bottom-4 -right-2 text-[80px] font-black leading-none pointer-events-none select-none"
          style={{ 
            color: project.color, 
            opacity: 0.08,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </motion.div>
    </motion.div>
  );
}

function FloatingTag({ label, x, y, color }: { label: string; x: string; y: string; color: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.div
        className="px-3 py-1.5 rounded-full text-[10px] font-medium uppercase tracking-wider"
        style={{ 
          backgroundColor: `${color}15`,
          color: color,
          border: `1px solid ${color}25`,
        }}
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="relative min-h-screen bg-black py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#007FFF]/5 rounded-full blur-[200px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[180px]"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <FloatingTag label="@sipnsocial" x="5%" y="30%" color="#F59E0B" />
      <FloatingTag label="@genzcricket" x="22%" y="75%" color="#10B981" />
      <FloatingTag label="@neuralis" x="40%" y="25%" color="#8B5CF6" />
      <FloatingTag label="@aether" x="58%" y="78%" color="#EC4899" />
      <FloatingTag label="@phizooe" x="75%" y="30%" color="#3B82F6" />
      <FloatingTag label="@zenith" x="90%" y="70%" color="#06B6D4" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#007FFF]/10 border border-[#007FFF]/30 text-[#007FFF] text-[9px] font-bold uppercase tracking-[0.25em] mb-6"
          >
            Selected Works
          </motion.span>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.9]">
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="block"
            >
              A place to
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-[#007FFF] via-purple-400 to-[#007FFF]"
              style={{ backgroundSize: '200% auto' }}
            >
              display your
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="block text-white/10"
            >
              masterpiece.
            </motion.span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-20">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-wider hover:bg-[#007FFF] hover:text-white transition-all"
          >
            View All Projects
            <ExternalLink size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
