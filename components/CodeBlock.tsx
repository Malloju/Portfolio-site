'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function CodeBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative w-full max-w-lg mx-auto lg:mx-0 shadow-2xl rounded-2xl overflow-hidden"
      style={{ 
        background: '#1a1c29', 
        border: '1px solid rgba(255,255,255,0.1)',
        fontFamily: "'JetBrains Mono', monospace"
      }}
    >
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#232736] border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-[xs] text-gray-400 opacity-60">developer.js</div>
      </div>

      {/* Code Content */}
      <div className="p-6 text-sm sm:text-base leading-relaxed text-left">
        <div className="mb-2">
          <span className="text-gray-500 italic">// Building useful products</span>
        </div>
        <div>
          <span className="text-pink-400">const</span>{' '}
          <span className="text-blue-400">developer</span>{' '}
          <span className="text-white">=</span>{' '}
          <span className="text-white">{'{'}</span>
        </div>
        
        <div className="pl-6 mt-1">
          <span className="text-white">role:</span>{' '}
          <span className="text-green-400">"AI/ML Engineer"</span>
          <span className="text-white">,</span>
        </div>

        <div className="pl-6">
          <span className="text-white">builds:</span>{' '}
          <span className="text-white">[</span>
          <span className="text-green-400">"AI Apps"</span>
          <span className="text-white">,</span>{' '}
          <span className="text-green-400">"Web Apps"</span>
          <span className="text-white">],</span>
        </div>

        <div className="pl-6">
          <span className="text-white">focus:</span>{' '}
          <span className="text-white">[</span>
          <span className="text-green-400">"Scalable Systems"</span>
          <span className="text-white">,</span>{' '}
          <span className="text-green-400">"Real-world Impact"</span>
          <span className="text-white">],</span>
        </div>

        <div className="pl-6">
          <span className="text-white">mindset:</span>{' '}
          <span className="text-green-400">"Always learning 🚀"</span>
        </div>

        <div>
          <span className="text-white">{'}'};</span>
          <span className="inline-block w-2 h-5 ml-1 align-middle bg-blue-500 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
