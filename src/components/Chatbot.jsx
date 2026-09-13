import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { buildPersonalContext } from '../data/personalContext';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY;
const MODEL = 'openai/gpt-oss-20b';

const SYSTEM_PROMPT = `You are Rishabh Raj Gupta's AI portfolio assistant. You speak in FIRST person as if you ARE Rishabh.

RULES:
- Answer questions about Rishabh's skills, experience, projects, education, and achievements using the context below.
- Be friendly, professional, and concise. Keep answers under 3-4 sentences unless asked for detail.
- If someone asks something not covered in the context, politely say you'd be happy to connect them with Rishabh directly via email (rishabhraj021official@gmail.com).
- Use a warm, confident tone. You can use emojis sparingly.
- If asked to do anything unrelated to Rishabh's portfolio (coding tasks, general knowledge, etc.), redirect them to the portfolio content.
- For greetings, introduce yourself briefly and suggest what visitors can ask about.

RISHABH'S COMPLETE PROFILE:
${buildPersonalContext()}`;

/* ─── Suggestion chips shown initially ─── */
const SUGGESTIONS = [
  '💼 What do you do?',
  '🛠️ What are your skills?',
  '📱 Tell me about your projects',
  '🎓 What\'s your education?',
  '📩 How can I contact you?',
];

/* ─── Chat bubble icon (SVG) ─── */
function ChatIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

/* ─── Typing indicator ─── */
function TypingDots() {
  return (
    <div className="chatbot-message chatbot-message-ai">
      <div className="chatbot-typing-dots">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

/* ─── Single message bubble ─── */
function MessageBubble({ role, content }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`chatbot-message ${role === 'user' ? 'chatbot-message-user' : 'chatbot-message-ai'}`}
    >
      {content}
    </motion.div>
  );
}

/* ─── Main Chatbot Component ─── */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! 👋 I'm Rishabh's AI assistant. Ask me anything about my skills, experience, projects, or how to get in touch!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  /* auto-scroll to bottom */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  /* focus input when opening */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  /* lock body scroll when chatbot is open (fixes mobile) */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /* ── Send message to Groq ── */
  const sendMessage = useCallback(
    async (text) => {
      const trimmed = (text || input).trim();
      if (!trimmed || isLoading) return;

      const userMsg = { role: 'user', content: trimmed };
      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setInput('');
      setIsLoading(true);

      try {
        const res = await fetch(GROQ_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GROQ_KEY}`,
          },
          body: JSON.stringify({
            model: MODEL,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...updatedMessages.map((m) => ({ role: m.role, content: m.content })),
            ],
            temperature: 0.7,
            max_tokens: 512,
          }),
        });

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that. Please try again!";

        setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: "Oops! Something went wrong. Feel free to reach out directly at rishabhraj021official@gmail.com 📧",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages],
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestion = (text) => {
    sendMessage(text);
  };

  return (
    <>
      {/* ── Floating Chat Button ── */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        className="chatbot-fab"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        data-cursor-hover
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CloseIcon />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChatIcon />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Glow ring */}
        {!isOpen && (
          <span className="chatbot-fab-glow" />
        )}
      </motion.button>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="flex items-center gap-3">
                <div className="chatbot-avatar">
                  <span className="text-sm">🤖</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-ink">Ask Rishabh AI</h3>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-muted transition-colors hover:bg-white/10 hover:text-ink"
                aria-label="Close chat"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages" onWheel={(e) => e.stopPropagation()}>
              {messages.map((msg, i) => (
                <MessageBubble key={i} role={msg.role} content={msg.content} />
              ))}

              {isLoading && <TypingDots />}

              {/* Suggestion chips — show only at start */}
              {messages.length === 1 && !isLoading && (
                <motion.div
                  className="chatbot-suggestions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestion(s)}
                      className="chatbot-chip"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chatbot-input-area">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="chatbot-input"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="chatbot-send"
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
