'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects } from '@/lib/data';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 relative">
      <div className="orb w-80 h-80 top-0 right-0" style={{ background: 'rgba(244,114,182,0.1)' }} />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-subheading mb-3">What I&apos;ve built</p>
          <h2 className="section-heading">Featured <span className="gradient-text">Projects</span></h2>
        </motion.div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              className="animated-border relative overflow-hidden group"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                transform: hovered === project.id ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hovered === project.id ? `0 20px 60px ${project.color}25` : 'none',
              }}
            >
              {/* Project Image */}
              <div className="w-full h-[140px] relative overflow-hidden bg-gray-100/5 dark:bg-gray-800/30">
                <img
                  src={(project as any).image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 h-1 w-full z-10"
                  style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}80)` }}
                />
              </div>

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl"
                      style={{ background: `${project.color}15`, border: `1px solid ${project.color}25` }}
                    >
                      {project.icon}
                    </div>
                    <div>
                      <span
                        className="text-xs font-mono block"
                        style={{ color: project.color, letterSpacing: '1px', textTransform: 'uppercase' }}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {project.period}
                  </span>
                </div>

                <h3
                  className="text-lg font-bold mb-3 group-hover:text-purple-400 transition-colors duration-300"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}
                >
                  {project.title}
                </h3>

                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-tag text-xs">{t}</span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:text-purple-400"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <FiGithub size={16} />
                    Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium transition-all duration-200"
                      style={{ color: project.color }}
                    >
                      <FiExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${project.color}08, transparent 70%)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Malloju"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <FiGithub size={16} />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
