'use client';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowDown } from 'react-icons/fi';
import { personalInfo } from '@/lib/data';

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center grid-bg"
    >
      {/* Orbs */}
      <div className="orb w-96 h-96 top-1/4 -left-32" style={{ background: 'rgba(108,99,255,0.35)' }} />
      <div className="orb w-80 h-80 bottom-1/4 -right-24" style={{ background: 'rgba(34,211,238,0.25)' }} />
      <div className="orb w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: 'rgba(244,114,182,0.08)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm"
          style={{
            background: 'rgba(108,99,255,0.12)',
            border: '1px solid rgba(108,99,255,0.3)',
            color: 'var(--accent-secondary)',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-5xl sm:text-7xl font-bold mb-4 tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}
        >
          {personalInfo.name.split(' ').map((word, i) => (
            <span key={i} className={i === 1 ? 'gradient-text' : ''}>
              {word}{i < personalInfo.name.split(' ').length - 1 ? ' ' : ''}
            </span>
          ))}
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl sm:text-2xl mb-6 font-medium"
          style={{ color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <TypeAnimation
            sequence={[
              'AI & ML Engineer 🤖',
              2000,
              'Full Stack Developer 🚀',
              2000,
              'Data Science Enthusiast 📊',
              2000,
              'Problem Solver ⚡',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="/Malloju_Vishwam_CV.pdf"
            download
            className="btn-primary flex items-center gap-2"
          >
            <FiDownload size={16} />
            Download CV
          </a>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary flex items-center gap-2"
          >
            <FiMail size={16} />
            Contact Me
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex items-center justify-center gap-3 mb-16"
        >
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-icon">
            <FiGithub size={20} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
            <FiLinkedin size={20} />
          </a>
          <a href={`mailto:${personalInfo.email}`} className="social-icon">
            <FiMail size={20} />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex items-center justify-center gap-8 sm:gap-16 mb-16"
        >
          {[
            { value: '3+', label: 'Projects' },
            { value: '4+', label: 'Certifications' },
            { value: '7.9', label: 'CGPA' },
            { value: '100%', label: 'X Grade' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex flex-col items-center gap-2 mx-auto"
          style={{ color: 'var(--text-muted)' }}
        >
          <span className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FiArrowDown size={18} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
