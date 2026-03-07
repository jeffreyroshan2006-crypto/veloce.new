'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowUpRight, ExternalLink } from 'lucide-react';

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

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ 
        x: 400, 
        opacity: 0,
        scale: 0.95
      }}
      whileInView={{ 
        x: 0, 
        opacity: 1,
        scale: 1
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        type: "spring",
        stiffness: 50,
        damping: 20,
        delay: index * 0.12,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-[280px] md:w-[320px] aspect-[4/5] rounded-lg overflow-hidden cursor-pointer"
        animate={isHovered ? { 
          scale: 1.03,
          y: -8,
        } : {}}
        transition={{ 
          type: "spring",
          stiffness: 250,
          damping: 25,
        }}
        style={{
          background: '#0a0a0a',
          boxShadow: isHovered 
            ? `0 25px 50px -20px ${project.color}40`
            : `0 8px 20px -8px rgba(0,0,0,0.4)`,
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            <span 
              className="inline-block px-2.5 py-1 rounded-full text-[8px] font-medium uppercase tracking-wider mb-2"
              style={{ 
                backgroundColor: project.color,
                color: '#000',
              }}
            >
              {project.category}
            </span>
            <p className="text-white/70 text-xs mb-2 line-clamp-2">
              {project.description}
            </p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[9px] font-medium uppercase tracking-wider bg-white text-black hover:bg-white/90 transition-colors"
              >
                <Eye size={10} />
                View
              </a>
            )}
          </motion.div>
        </div>

        <div className="absolute top-3 right-3">
          <span 
            className="px-2 py-1 rounded text-[9px] font-mono"
            style={{ 
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            {project.year}
          </span>
        </div>
      </motion.div>

      {project.tag && (
        <motion.div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 pointer-events-none"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.12 + 0.3 }}
        >
          <span 
            className="px-2.5 py-1 rounded-full text-[9px] font-medium"
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.15)',
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
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#007FFF]/5 rounded-full blur-[150px]"
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]"
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95]">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="block"
            >
              A place to
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-[#007FFF] via-purple-400 to-[#007FFF]"
              style={{ backgroundSize: '200% auto' }}
            >
              display your
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="block text-white/10"
            >
              masterpiece.
            </motion.span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16">
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
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-sm uppercase tracking-wider hover:bg-[#007FFF] hover:text-white transition-colors"
          >
            View All Projects
            <ExternalLink size={14} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
