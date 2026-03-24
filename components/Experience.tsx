'use client';
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience, education, certifications, achievements } from '@/lib/data';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';
import { FiExternalLink } from 'react-icons/fi';

function WeeklyTrendGraph({ data, color }: { data: number[], color: string }) {
  const maxVal = Math.max(...data, 10);
  const width = 100;
  const height = 40;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (val / maxVal) * height;
    return { x, y };
  });

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cx = (p0.x + p1.x) / 2;
    path += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  const areaPath = `${path} L ${width} ${height} L 0 ${height} Z`;
  const colorId = color.replace('#', '');

  return (
    <div className="w-full pt-6" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Weekly Solved Trend</h4>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Last 12 weeks</span>
      </div>
      <div className="w-full">
        <svg viewBox="-6 -5 110 55" className="w-full h-auto overflow-visible" style={{ minHeight: '120px', maxHeight: '180px' }}>
          <defs>
            <linearGradient id={`grad-${colorId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 0.5, 1].map((ratio, i) => (
            <line key={`grid-${i}`} x1="0" y1={height * ratio} x2="100" y2={height * ratio} stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="2 2" />
          ))}
          <text x="-2" y="0" fontSize="4" fill="var(--text-muted)" textAnchor="end" dominantBaseline="middle">{maxVal}</text>
          <text x="-2" y={height/2} fontSize="4" fill="var(--text-muted)" textAnchor="end" dominantBaseline="middle">{Math.round(maxVal/2)}</text>
          <text x="-2" y={height} fontSize="4" fill="var(--text-muted)" textAnchor="end" dominantBaseline="middle">0</text>
          {data.map((_, i) => (
            <text key={`x-${i}`} x={(i / (data.length - 1)) * width} y={height + 6} fontSize="3" fill="var(--text-muted)" textAnchor="middle">W{i + 1}</text>
          ))}
          <path d={areaPath} fill={`url(#grad-${colorId})`} />
          <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((p, i) => (
            <circle key={`p-${i}`} cx={p.x} cy={p.y} r="1.2" fill="var(--bg-card)" stroke={color} strokeWidth="0.6" />
          ))}
          <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="1.8" fill={color} />
        </svg>
      </div>
    </div>
  );
}


interface TimelineItemProps {
  item: {
    id: number;
    icon: string;
    color: string;
    period: string;
    [key: string]: unknown;
  };
  index: number;
  isLeft: boolean;
  children: React.ReactNode;
}

function TimelineItem({ item, index, isLeft, children }: TimelineItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative flex ${isLeft ? 'md:justify-end md:self-start' : 'md:justify-start md:self-end'} w-full md:w-1/2 pl-12 md:pl-0 mb-10`}
      style={{ 
        marginBottom: '1.5cm',
        paddingRight: isLeft ? '1cm' : '0',
        paddingLeft: isLeft ? '0' : '1cm'
      }}
    >
      {/* Dot */}
      <div
        className={`absolute top-6 w-10 h-10 rounded-full flex items-center justify-center text-lg z-10 hidden md:flex`}
        style={{ background: `${item.color}20`, border: `2px solid ${item.color}`, color: item.color, left: isLeft ? 'auto' : '-20px', right: isLeft ? '-20px' : 'auto' }}
      >
        {item.icon}
      </div>
      {/* Mobile dot */}
      <div
        className="absolute left-0 top-6 w-8 h-8 rounded-full flex items-center justify-center text-sm z-10 md:hidden"
        style={{ background: `${item.color}20`, border: `2px solid ${item.color}` }}
      >
        {item.icon}
      </div>
      {/* Content card */}
      <div
        className="w-full max-w-md p-5 rounded-2xl transition-all duration-300 hover:shadow-lg"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
        }}
      >
        <span
          className="text-xs mb-2 block"
          style={{ color: item.color, fontFamily: "'JetBrains Mono', monospace" }}
        >
          {item.period}
        </span>
        {children}
      </div>
    </motion.div>
  );
}

interface CertCardProps {
  cert: {
    id: number;
    title: string;
    issuer: string;
    date: string;
    icon: string;
    color: string;
    certificatePath?: string | null;
    certificateImage?: string | null;
  };
  index: number;
  isInView: boolean;
}

function CertCard({ cert, index, isInView }: CertCardProps) {
  const isImage = cert.certificateImage;

  return (
    <motion.div
      key={cert.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
      className="flex flex-col bg-[#1A1C29] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-800"
    >
      {/* Certificate Image Top Block */}
      {isImage ? (
        <div className="relative w-full h-[220px] bg-white flex items-center justify-center px-6 py-4 border-b border-gray-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cert.certificateImage!}
            alt={`${cert.title} certificate`}
            className="w-full h-full object-contain"
          />
          {/* Badge Icon on top right */}
          <div 
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: '#232736', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <span className="text-xl">{cert.icon}</span>
          </div>
        </div>
      ) : (
        <div className="w-full h-[220px] bg-[#232736] flex items-center justify-center border-b border-gray-800 relative">
          <span className="text-4xl opacity-50">{cert.icon}</span>
        </div>
      )}

      {/* Content Block */}
      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-[17px] font-bold text-white mb-6 leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {cert.title}
        </h4>

        {/* Issuer Row */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded bg-[#232736] flex items-center justify-center text-gray-400">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
          </div>
          <span className="text-sm font-medium text-gray-300">{cert.issuer}</span>
        </div>

        {/* Date Row */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded bg-[#232736] flex items-center justify-center text-gray-400">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <span className="text-sm font-medium text-gray-300">{cert.date}</span>
        </div>

        {/* Spacer to push button down */}
        <div className="flex-1"></div>

        {/* Full-width Button */}
        {cert.certificatePath ? (
          <a
            href={cert.certificatePath}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all hover:bg-[#2b3040]"
            style={{ background: '#232736', color: 'white' }}
          >
            View Certificate
            <FiExternalLink />
          </a>
        ) : (
          <div className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-gray-500 bg-[#232736]">
             Not Available
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24 relative" style={{ background: 'var(--bg-secondary)' }}>
      <div className="orb w-72 h-72 top-1/3 right-0" style={{ background: 'rgba(108,99,255,0.1)' }} />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-subheading mb-3">My journey</p>
          <h2 className="section-heading">Experience & <span className="gradient-text">Education</span></h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="hidden md:block timeline-line" />

          <div className="md:flex md:flex-col">
            {experience.map((exp, i) => (
              <TimelineItem key={`exp-${exp.id}`} item={exp} index={i} isLeft={i % 2 === 0}>
                <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
                  {exp.title}
                </h3>
                <p className="text-sm font-medium mb-2" style={{ color: exp.color }}>{exp.organization}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{exp.description}</p>
                <div className="mt-3">
                  <span className="tech-tag">Training</span>
                </div>
              </TimelineItem>
            ))}

            {education.map((edu, i) => (
              <TimelineItem key={`edu-${edu.id}`} item={edu} index={i + experience.length} isLeft={(i + experience.length) % 2 === 0}>
                <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
                  {edu.degree}
                </h3>
                <p className="text-sm font-medium mb-1" style={{ color: edu.color }}>{edu.institution}</p>
                <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{edu.location}</p>
                <span
                  className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: `${edu.color}15`, color: edu.color, border: `1px solid ${edu.color}30` }}
                >
                  🏆 {edu.grade}
                </span>
              </TimelineItem>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 relative left-[2cm]"
        >
          <div className="text-center mb-10">
            <p className="section-subheading mb-3">Credentials</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Certifications & <span className="gradient-text">Achievements</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-[1.5cm]">
            {certifications.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} isInView={isInView} />
            ))}
          </div>

          {/* Achievements block removed */}
        </motion.div>

        {/* Coding Profiles & Consistency */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 relative left-[2cm]"
        >
          <div className="text-center mb-[2cm]">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-[2cm]" style={{ background: '#6c63ff15', color: '#6c63ff', textTransform: 'uppercase' }}>
              Problem Solving
            </span>
            <h2 className="text-3xl font-bold mb-[2cm]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Coding Profiles
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LeetCode Card */}
            <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderTop: '3px solid #FFA116' }}>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FFA11615', color: '#FFA116' }}>
                    <SiLeetcode size={20} />
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>LeetCode</h3>
                </div>
                <a href="https://leetcode.com/u/Vishwam_Malloju/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 hover:opacity-80" style={{ color: '#0066FF', background: '#0066FF10' }}>
                  View Profile <FiExternalLink size={12} />
                </a>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div className="p-3 rounded-xl flex flex-col items-center justify-center text-center" style={{ border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
                  <span className="text-[10px] mb-1 whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>Total Solved</span>
                  <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>103</span>
                </div>
                <div className="p-3 rounded-xl flex flex-col items-center justify-center text-center" style={{ border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
                  <span className="text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>Easy</span>
                  <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>62</span>
                </div>
                <div className="p-3 rounded-xl flex flex-col items-center justify-center text-center" style={{ border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
                  <span className="text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>Medium</span>
                  <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>32</span>
                </div>
                <div className="p-3 rounded-xl flex flex-col items-center justify-center text-center" style={{ border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
                  <span className="text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>Hard</span>
                  <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>9</span>
                </div>
              </div>

              <WeeklyTrendGraph data={[2, 3, 4, 3, 5, 6, 4, 7, 8, 6, 9, 10]} color="#0066FF" />
            </div>

            {/* GeeksforGeeks Card */}
            <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderTop: '3px solid #2F8D46' }}>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#2F8D4615', color: '#2F8D46' }}>
                    <SiGeeksforgeeks size={20} />
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>GeeksforGeeks</h3>
                </div>
                <a href="https://practice.geeksforgeeks.org/leaderboard" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 hover:opacity-80" style={{ color: '#0066FF', background: '#0066FF10' }}>
                  View Profile <FiExternalLink size={12} />
                </a>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div className="p-3 rounded-xl flex flex-col items-center justify-center text-center" style={{ border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
                  <span className="text-[10px] mb-1 whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>Total Solved</span>
                  <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>48</span>
                </div>
                 <div className="p-3 rounded-xl flex flex-col items-center justify-center text-center" style={{ border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
                  <span className="text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>Basic</span>
                  <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>4</span>
                </div>
                <div className="p-3 rounded-xl flex flex-col items-center justify-center text-center" style={{ border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
                  <span className="text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>Easy</span>
                  <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>28</span>
                </div>
                <div className="p-3 rounded-xl flex flex-col items-center justify-center text-center" style={{ border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
                  <span className="text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>Medium</span>
                  <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>16</span>
                </div>
              </div>

              <WeeklyTrendGraph data={[4, 5, 6, 5, 7, 6, 8, 7, 6, 7, 6, 7]} color="#0066FF" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
