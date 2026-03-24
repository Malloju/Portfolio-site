'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { about, personalInfo } from '@/lib/data';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 relative">
      {/* Orb */}
      <div className="orb w-72 h-72 top-1/2 right-0 -translate-y-1/2" style={{ background: 'rgba(34,211,238,0.15)' }} />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-subheading mb-3">Get to know me</p>
          <h2 className="section-heading">About <span className="gradient-text">Me</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Avatar card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative group">
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, #6c63ff, #22d3ee)',
                  filter: 'blur(20px)',
                  transform: 'scale(1.05)',
                }}
              />
              {/* Profile photo */}
              <div
                className="relative w-72 h-72 rounded-3xl overflow-hidden transition-transform duration-500 group-hover:scale-105"
                style={{
                  border: '2px solid rgba(108,99,255,0.4)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/myprofile.png"
                  alt="Malloju Vishwam"
                  className="w-full h-full object-cover object-top"
                />
                {/* Decorative dots */}
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full" style={{ background: '#22d3ee', opacity: 0.7 }} />
                <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full" style={{ background: '#6c63ff', opacity: 0.9 }} />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-3"
              >
                <div className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>CGPA</div>
                <div className="text-xl font-bold gradient-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>7.9 / 10</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}
            >
              {personalInfo.name}
            </h3>
            <p className="text-base mb-4" style={{ color: 'var(--accent-primary)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem' }}>
              B.Tech • Computer Science & Engineering (AI & ML) • LPU
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              {about.summary}
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-3 mb-8">
              {[
                { icon: FiMapPin, label: 'Punjab, India', color: '#6c63ff' },
                { icon: FiMail, label: personalInfo.email, color: '#22d3ee' },
                { icon: FiPhone, label: personalInfo.phone, color: '#34d399' },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    <Icon size={16} color={color} />
                  </div>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Traits */}
            <div className="flex flex-wrap gap-3">
              {['Problem Solver', 'Adaptable', 'Time Manager', 'Team Player', 'AI Enthusiast'].map((trait) => (
                <span key={trait} className="tech-tag">{trait}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
