import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { personal } from '../data/resume';
import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from '../lib/emailjsConfig';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import MagneticButton from './MagneticButton';

const initialForm = { name: '', email: '', subject: '', message: '' };

const contactLinks = [
  { icon: '📧', label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
  { icon: '📱', label: 'Phone', value: personal.phone, href: `tel:${personal.phone.replace(/\s+/g, '')}` },
  { icon: '⌥', label: 'GitHub', value: personal.github.replace('https://', ''), href: personal.github },
  { icon: '💼', label: 'LinkedIn', value: personal.linkedin.replace('https://www.', ''), href: personal.linkedin },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = form;

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError('Please fill all fields');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
      return;
    }

    setStatus('sending');

    const formattedMessage = `New Person from Portfolio Contact you\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          visitor_email: email,
          reply_to: email,
          subject: `Portfolio Contact: ${subject}`,
          message: formattedMessage,
          original_message: message,
          to_email: personal.email,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus('success');
      setTimeout(() => {
        setForm(initialForm);
        setStatus('idle');
      }, 3000);
    } catch (err) {
      console.error('EmailJS send failed:', err);
      setError('Failed! Try again');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="relative px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <SectionHeading
            tag="Contact"
            title="Let's"
            gradientWord="connect"
            subtitle="Open to full-time opportunities, freelance projects, and collaborations. Let's build something great."
          />
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <h3 className="font-display text-xl font-bold text-ink">Get in touch</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
              Whether you have a job opportunity, project idea, or just want to chat about tech —
              my inbox is always open.
            </p>
            <div className="mt-7 flex flex-col gap-3">
              {contactLinks.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                  data-cursor-hover
                  className="group flex items-center gap-3.5 rounded-xl border border-border bg-white/[0.03] px-4 py-3.5 transition-all hover:translate-x-1 hover:border-cyan-300/30 hover:bg-cyan-300/[0.05]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-base">
                    {c.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-ink">{c.label}</span>
                    <span className="block truncate text-xs text-muted">{c.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-white/[0.03] p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" value={form.name} onChange={update('name')} placeholder="Your name" />
                <Field label="Email" type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" />
              </div>
              <div className="mt-4">
                <Field label="Subject" value={form.subject} onChange={update('subject')} placeholder="What's this about?" />
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted">
                  Message
                </label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full resize-none rounded-lg border border-border bg-white/[0.03] px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/10"
                />
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-5 rounded-lg bg-emerald-400/10 py-3.5 text-center text-sm font-medium text-emerald-300"
                  >
                    ✓ Message sent! I'll get back to you soon.
                  </motion.div>
                ) : (
                  <motion.div key="button" className="mt-5">
                    <MagneticButton
                      as="button"
                      type="submit"
                      disabled={status === 'sending'}
                      className={`w-full rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                        status === 'error'
                          ? 'bg-red-500 text-white'
                          : 'bg-gradient-to-r from-cyan-400 to-violet-500 text-bg hover:shadow-[0_8px_30px_-4px_rgba(34,211,238,0.5)]'
                      } disabled:opacity-70`}
                    >
                      {status === 'sending' ? 'Sending...' : status === 'error' ? error : 'Send Message →'}
                    </MagneticButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-white/[0.03] px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/10"
      />
    </div>
  );
}
