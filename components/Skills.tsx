'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { skills } from '@/lib/data';
import { 
  FaPython, FaJava, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, 
  FaDatabase, FaDocker, FaAws, FaLinux, FaProjectDiagram, FaBrain
} from 'react-icons/fa';
import { 
  SiJavascript, SiCplusplus, SiTensorflow, SiKeras, SiPandas, 
  SiNumpy, SiScikitlearn, SiFlask, SiMysql, SiGooglecolab
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { BiGitBranch, BiBarChartAlt2 } from 'react-icons/bi';

const categories = [
  { key: 'programming', label: 'Languages', icon: '💻' },
  { key: 'frameworks', label: 'Frameworks', icon: '⚙️' },
  { key: 'tools', label: 'Tools', icon: '🛠️' },
] as const;

// Map skill names to icons and specific colors
const skillIcons: Record<string, { icon: React.ElementType, color: string }> = {
  // Languages
  "Python": { icon: FaPython, color: "#3776AB" },
  "Java": { icon: FaJava, color: "#007396" },
  "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
  "C++": { icon: SiCplusplus, color: "#00599C" },
  "SQL": { icon: FaDatabase, color: "#336791" },
  "C": { icon: TbBrandCSharp, color: "#A8B9CC" },
  "HTML & CSS": { icon: FaHtml5, color: "#E34F26" },
  
  // Frameworks/Libs
  "React.js": { icon: FaReact, color: "#61DAFB" },
  "Node.js / Express.js": { icon: FaNodeJs, color: "#339933" },
  "TensorFlow / Keras": { icon: SiTensorflow, color: "#FF6F00" },
  "Pandas & NumPy": { icon: SiPandas, color: "#150458" },
  "Scikit-Learn": { icon: SiScikitlearn, color: "#F7931E" },
  "Matplotlib / Seaborn": { icon: FaPython, color: "#11557c" },
  "Flask": { icon: SiFlask, color: "#ffffff" },
  
  // Tools
  "Git & GitHub": { icon: BiGitBranch, color: "#F05032" },
  "Docker": { icon: FaDocker, color: "#2496ED" },
  "AWS": { icon: FaAws, color: "#FF9900" },
  "Power BI": { icon: BiBarChartAlt2, color: "#F2C811" },
  "MySQL": { icon: SiMysql, color: "#4479A1" },
  "Linux": { icon: FaLinux, color: "#FCC624" },
  "Google Colab": { icon: SiGooglecolab, color: "#F9AB00" },
};

function SkillGridItem({ name, index }: { name: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const IconData = skillIcons[name] || { icon: FaDatabase, color: "#8b83ff" };
  const IconComponent = IconData.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative flex flex-col items-center justify-center p-6 rounded-[2rem] transition-all duration-300 hover:-translate-y-2 cursor-pointer"
      style={{
        background: '#0d1117',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.02)',
        aspectRatio: '1/1',
      }}
    >
      {/* Background glow on hover */}
      <div 
        className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
        style={{ background: IconData.color }}
      />
      
      <div className="relative z-10 flex flex-col items-center justify-between h-full w-full py-2">
        <div className="flex-1 flex items-center justify-center">
          <IconComponent 
            size={48} 
            color={IconData.color} 
            className="drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
            style={{ filter: `drop-shadow(0 0 8px ${IconData.color}66)` }}
          />
        </div>
        
        <span 
          className="text-xs font-bold tracking-widest uppercase mt-4 opacity-70 group-hover:opacity-100 transition-opacity"
          style={{ color: 'white', fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {name.split(' ')[0]} {/* Simplified name for clean grid look */}
        </span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState<'programming' | 'frameworks' | 'tools'>('programming');

  const currentSkills = skills[activeCategory];

  return (
    <section id="skills" className="py-24 relative" style={{ background: '#030712' }}>
      <div className="orb w-80 h-80 bottom-0 left-0" style={{ background: 'rgba(108,99,255,0.12)' }} />

      <div ref={ref} className="max-w-6xl mx-auto px-6 relative left-[2cm]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-subheading mb-3">What I work with</p>
          <h2 className="section-heading">Technical <span className="gradient-text">Skills</span></h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="inline-flex gap-2 p-1.5 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  background: activeCategory === cat.key ? 'linear-gradient(135deg, #6c63ff, #8b83ff)' : 'transparent',
                  color: activeCategory === cat.key ? 'white' : 'var(--text-secondary)',
                }}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skill tiles grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-16"
        >
          {currentSkills.map((skill, i) => (
            <SkillGridItem key={skill.name} name={skill.name} index={i} />
          ))}
        </motion.div>


      </div>
    </section>
  );
}
