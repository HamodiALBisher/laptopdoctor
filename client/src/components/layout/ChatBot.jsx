import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiCpu } from 'react-icons/fi';

const faqData = [
  { keywords: ['diagnosis', 'diagnos', 'how long', 'time', 'take'], answer: 'Diagnosis usually takes 30 minutes to 2 hours depending on the issue. For complex problems like data recovery, it may take up to 24 hours.' },
  { keywords: ['data', 'recover', 'dead', 'hdd', 'ssd', 'lost', 'files'], answer: 'Yes, we can recover data from dead or damaged HDDs and SSDs in most cases. Success depends on the type and extent of damage. We offer a free assessment first.' },
  { keywords: ['gaming', 'game', 'pc'], answer: 'Yes! We repair gaming PCs including custom builds. We handle GPU issues, overheating, performance optimization, and hardware upgrades.' },
  { keywords: ['windows', 'install', 'reinstall', 'os'], answer: 'Yes, we can install or reinstall Windows (10/11), set up drivers, and transfer your data. The process usually takes 1-2 hours.' },
  { keywords: ['remote', 'online', 'distance'], answer: 'We offer remote support via screen sharing for software issues, virus removal, and system optimization. Book a remote session and we\'ll connect within the hour.' },
  { keywords: ['privacy', 'data', 'private', 'safe', 'secure'], answer: 'Your data privacy is our top priority. We never access personal files unless required for the repair, and all data is handled with strict confidentiality.' },
  { keywords: ['warranty', 'guarantee'], answer: 'All our repairs come with a warranty. Hardware replacements: 6 months. Software fixes: 30 days. If the same issue returns, we fix it free.' },
  { keywords: ['bring', 'what to bring', 'what should i bring', 'need to bring'], answer: 'Bring your device with its charger. If you have the original box or any accessories related to the issue, bring those too. Make sure to backup important data if possible.' },
  { keywords: ['price', 'cost', 'how much', 'expensive', 'cheap', 'fee'], answer: 'Diagnosis is free! Repair costs vary: software fixes from $30, hardware repairs from $50. We always give you a quote before proceeding — no hidden costs.' },
  { keywords: ['book', 'appointment', 'schedule', 'reserve'], answer: 'You can book a repair right from our website! Go to the "Book Repair" page, fill out the form, and we\'ll get back to you within a few hours.' },
  { keywords: ['virus', 'malware', 'hack', 'infected', 'ransomware'], answer: 'We perform deep scans and complete virus/malware removal. We also set up protection to prevent future infections. Usually takes 1-3 hours.' },
  { keywords: ['screen', 'display', 'crack', 'broken screen'], answer: 'We replace cracked or broken screens for most laptop brands. We use high-quality replacement parts and the repair takes 1-3 hours.' },
  { keywords: ['battery', 'charge', 'power', 'drain'], answer: 'Battery replacement takes about 15-30 minutes. We use compatible batteries that match your device\'s specifications for optimal performance.' },
  { keywords: ['slow', 'performance', 'speed', 'fast'], answer: 'Slow performance can be caused by many things: full storage, malware, old hardware, or software issues. We diagnose the cause and recommend the best fix — often an SSD upgrade or RAM boost.' },
  { keywords: ['backup', 'cloud', 'save'], answer: 'We set up both local and cloud backup solutions. We recommend automatic backups to keep your data safe. Setup usually takes 30-60 minutes.' },
  { keywords: ['keyboard', 'key', 'typing'], answer: 'We can repair or replace laptop keyboards. Whether individual keys are stuck or the entire keyboard needs replacement, we handle it in 1-2 hours.' },
  { keywords: ['overheat', 'hot', 'fan', 'noise', 'loud', 'thermal'], answer: 'Overheating is often caused by dust buildup or old thermal paste. We clean the internals and replace thermal paste for better cooling. Takes about 30-60 minutes.' },
  { keywords: ['hello', 'hi', 'hey', 'start', 'help'], answer: 'Hello! I\'m the LaptopDoctor assistant. I can help with questions about our services, pricing, repair times, and more. What would you like to know?' },
  { keywords: ['thanks', 'thank', 'bye', 'goodbye'], answer: 'You\'re welcome! If you need anything else, feel free to ask. Have a great day!' },
  { keywords: ['hours', 'open', 'when', 'working'], answer: 'We\'re open Sunday to Thursday, 9 AM - 7 PM, and Friday 9 AM - 2 PM. For emergencies, you can reach us via WhatsApp anytime.' },
  { keywords: ['location', 'where', 'address', 'find'], answer: 'We\'re located at Main Street, City Center. You can find us on Google Maps or visit our Contact page for detailed directions.' },
  { keywords: ['urgent', 'emergency', 'asap'], answer: 'For emergencies, use the "Emergency" urgency option when booking or WhatsApp us directly. We prioritize emergency cases and try to handle them same-day.' },
  { keywords: ['track', 'status', 'check', 'repair status', 'progress'], answer: 'You can track your repair status on our "Track Repair" page using your request ID or phone number. If you have an account, log in to see all your repairs in "My Repairs".' },
  { keywords: ['register', 'account', 'sign up', 'create account'], answer: 'You can create an account to track all your repairs, auto-fill booking forms, and see repair history. Click "Register" in the top menu to get started!' }
];

const quickReplies = [
  'What are your prices?',
  'How long does repair take?',
  'Do you offer warranty?',
  'How to book a repair?',
  'Can you recover my data?'
];

function findAnswer(input) {
  const lower = input.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  for (const faq of faqData) {
    let score = 0;
    for (const kw of faq.keywords) {
      if (lower.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }

  if (bestScore > 0) return bestMatch.answer;
  return "I'm not sure about that, but our team can help! You can contact us via WhatsApp, call us, or visit our Contact page for more information.";
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm the LaptopDoctor assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { from: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const answer = findAnswer(text);
      setMessages(prev => [...prev, { from: 'bot', text: answer }]);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gold text-navy-900 rounded-full shadow-lg shadow-gold/30 flex items-center justify-center hover:bg-gold-light transition-colors"
            aria-label="Open chat"
          >
            <FiMessageCircle className="text-2xl" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-navy-800 border border-navy-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-navy-900 border-b border-navy-700">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                  <FiCpu className="text-gold text-lg" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">LaptopDoctor Bot</h3>
                  <p className="text-green-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Close chat"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-gold text-navy-900 rounded-br-md'
                      : 'bg-navy-700 text-gray-200 rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickReplies.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="px-3 py-1.5 bg-navy-700 border border-navy-600 text-gray-300 text-xs rounded-full hover:bg-navy-600 hover:text-white transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-navy-700 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2.5 bg-navy-700 border border-navy-600 rounded-xl text-white text-sm placeholder-gray-500 focus:border-gold outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="px-3.5 py-2.5 bg-gold text-navy-900 rounded-xl hover:bg-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FiSend className="text-sm" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
