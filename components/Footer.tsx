'use client';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { personalInfo } from '@/lib/data';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative py-12 px-6"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #6c63ff, #22d3ee)' }}
            >
              MV
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
                {personalInfo.name}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>
                CSE (AI & ML) • LPU
              </p>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm transition-colors duration-200 hover:text-purple-400"
                style={{ color: 'var(--text-muted)' }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-icon">
              <FiGithub size={18} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
              <FiLinkedin size={18} />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="social-icon">
              <FiMail size={18} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px" style={{ background: 'var(--border-color)' }} />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <FiHeart size={12} className="text-red-400" /> using Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
