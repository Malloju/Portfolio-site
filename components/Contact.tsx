'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { personalInfo } from '@/lib/data';
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiSend } from 'react-icons/fi';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const socials = [
    { icon: FiGithub, href: personalInfo.github, label: 'GitHub', color: '#6c63ff' },
    { icon: FiLinkedin, href: personalInfo.linkedin, label: 'LinkedIn', color: '#22d3ee' },
    { icon: FiMail, href: `mailto:${personalInfo.email}`, label: 'Email', color: '#34d399' },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="orb w-80 h-80 bottom-0 left-1/4" style={{ background: 'rgba(108,99,255,0.15)' }} />
      <div className="orb w-64 h-64 top-1/4 right-1/4" style={{ background: 'rgba(34,211,238,0.1)' }} />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-subheading mb-3">Let&apos;s talk</p>
          <h2 className="section-heading">Get In <span className="gradient-text">Touch</span></h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Have a project in mind or want to collaborate? I&apos;d love to hear from you. Drop a message and I&apos;ll get back to you soon!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Contact info */}
            {[
              { icon: FiMail, label: 'Email', value: personalInfo.email, color: '#6c63ff', href: `mailto:${personalInfo.email}` },
              { icon: FiPhone, label: 'Phone', value: personalInfo.phone, color: '#22d3ee', href: `tel:${personalInfo.phone}` },
            ].map(({ icon: Icon, label, value, color, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 hover:shadow-lg card"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                >
                  <Icon size={20} color={color} />
                </div>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>{label}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{value}</p>
                </div>
              </a>
            ))}

            {/* Social links */}
            <div className="p-5 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <p className="text-xs mb-4 font-semibold" style={{ color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '2px', textTransform: 'uppercase' }}>
                Social
              </p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 text-center"
                    style={{
                      background: `${color}0a`,
                      border: `1px solid ${color}20`,
                    }}
                  >
                    <Icon size={20} color={color} />
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="p-6 sm:p-8 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold mb-2 gradient-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Message Sent!
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs mb-2" style={{ color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>Name *</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="form-input"
                      />
                      {errors.name && <p className="mt-1 text-xs" style={{ color: '#f87171' }}>{errors.name}</p>}
                    </div>
                    {/* Email */}
                    <div>
                      <label className="block text-xs mb-2" style={{ color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>Email *</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="form-input"
                      />
                      {errors.email && <p className="mt-1 text-xs" style={{ color: '#f87171' }}>{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="mb-4">
                    <label className="block text-xs mb-2" style={{ color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>Subject *</label>
                    <input
                      type="text"
                      placeholder="What's this about?"
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="form-input"
                    />
                    {errors.subject && <p className="mt-1 text-xs" style={{ color: '#f87171' }}>{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label className="block text-xs mb-2" style={{ color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>Message *</label>
                    <textarea
                      rows={5}
                      placeholder="Tell me about your project or opportunity..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="form-input resize-none"
                    />
                    {errors.message && <p className="mt-1 text-xs" style={{ color: '#f87171' }}>{errors.message}</p>}
                  </div>

                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" disabled={submitting}>
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
