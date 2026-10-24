import { Link } from 'react-router-dom';

export function LandingPage() {
  const steps = [
    { icon: '🎯', title: 'Select Service', desc: 'Choose what you need' },
    { icon: '📝', title: 'Describe Project', desc: 'Tell us your vision' },
    { icon: '💰', title: 'Budget & Timeline', desc: 'Share your constraints' },
    { icon: '📬', title: 'Your Details', desc: 'How to reach you' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-gray-950/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a
            href="https://www.cynbit.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
            aria-label="Visit Cynbit Technologies website"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-sm">
              C
            </div>
            <span className="font-bold text-white text-sm hidden sm:block">Cynbit Technologies</span>
          </a>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-medium hidden sm:block">
              Independent Assessment Prototype
            </span>
            <a
              href="https://www.cynbit.in/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm py-1.5"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-6 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Smart Project Brief Builder
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight animate-slide-up">
            Let's turn your idea into
            <br />
            <span className="gradient-text">a clear project brief.</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl font-medium mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up">
            Tell us what you're planning, what you need to achieve, and when you'd like to begin.
            Takes about <span className="text-white font-semibold">5 minutes</span>.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up">
            <Link
              to="/inquiry"
              className="btn-primary text-base px-8 py-4 rounded-xl shadow-glow"
              id="start-inquiry-btn"
            >
              Start Your Project Brief
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="https://www.cynbit.in/services"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base px-8 py-4 rounded-xl"
            >
              View Cynbit Services
            </a>
          </div>

          {/* Steps preview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className="glass-card p-4 text-center hover:-translate-y-1 transition-all duration-200"
              >
                <div className="text-2xl mb-2" aria-hidden="true">{step.icon}</div>
                <div className="text-sm font-semibold text-white mb-0.5">{step.title}</div>
                <div className="text-xs text-gray-500 font-medium">{step.desc}</div>
              </div>
            ))}
          </div>

          {/* Why this tool */}
          <div className="glass-card-dark p-6 max-w-2xl mx-auto text-left">
            <h2 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
              Why use this tool?
            </h2>
            <ul className="space-y-2.5">
              {[
                "Structured briefs help Cynbit's team prepare faster and more accurately",
                'You receive a unique reference number to track your inquiry',
                'No unstructured email — your requirements are captured consistently',
                'Takes ~5 minutes, not a lengthy contact form',
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400 font-medium">
                  <svg className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-700 font-medium mt-8 max-w-lg mx-auto leading-relaxed">
            This is an independent assessment prototype built by Shiva Kumar Madugu for the Cynbit Technologies
            Full Stack Developer Intern assessment. It is not an official Cynbit product.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-4 px-4 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-gray-700">
          <span>© 2026 Cynbit Technologies</span>
          <span className="hidden sm:block">·</span>
          <a
            href="https://www.cynbit.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-500 transition-colors"
          >
            cynbit.in
          </a>
          <span className="hidden sm:block">·</span>
          <a href="mailto:opportunities@cynbit.in" className="hover:text-gray-500 transition-colors">
            opportunities@cynbit.in
          </a>
        </div>
      </footer>
    </div>
  );
}
