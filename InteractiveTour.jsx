import React, { useState } from 'react';
import { 
  GraduationCap, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles,
  HelpCircle,
  Award
} from 'lucide-react';

const TUTORIAL_MODULES = [
  {
    title: '1. Anatomy of Phishing & Typosquatting',
    badge: 'Module 1 of 4',
    content: `Phishing attackers exploit visual similarity by substituting lookalike characters (e.g. "paypa1.com" using digit '1' instead of letter 'l') or using Punycode Cyrillic letters ("xn--appl-43d.com"). Always verify the root domain and avoid entering credentials when redirected across multiple subdomains.`,
    takeaway: 'Rule: Always inspect the root domain before entering login credentials.',
    quiz: {
      question: 'Which of the following domains is an obvious typosquatting trap?',
      options: ['google.com', 'g00gle-security-update.xyz', 'docs.github.com'],
      correctIndex: 1
    }
  },
  {
    title: '2. Detecting Hostile IP & Drive-By Malware',
    badge: 'Module 2 of 4',
    content: `Legitimate enterprise web applications almost never serve downloads directly from naked IP addresses (e.g. "http://185.220.101.5:8080/setup.exe"). Attackers use raw IPs on high ports (e.g. :4444, :8080, :9999) to host Cobalt Strike C2 loaders and evasive info-stealers.`,
    takeaway: 'Rule: Never execute binaries downloaded directly from raw IP addresses.',
    quiz: {
      question: 'Why do attackers frequently host malicious downloads on raw IP addresses?',
      options: [
        'To speed up download rates',
        'To evade domain registration identity checks and blacklists',
        'Because IP addresses have automatic SSL encryption'
      ],
      correctIndex: 1
    }
  },
  {
    title: '3. Shannon Entropy & Domain Obfuscation',
    badge: 'Module 3 of 4',
    content: `Domain Generation Algorithms (DGAs) generate random-looking domain names (e.g. "x89f2a019bca40291e7.top") to constantly change C2 communication channels. CyberShield AI calculates the Shannon Entropy of every URL; scores above 4.3 indicate high algorithmic randomness.`,
    takeaway: 'Rule: High character randomness usually signifies automated malware botnet domains.',
    quiz: {
      question: 'What does a high Shannon Entropy score in a domain indicate?',
      options: [
        'High randomness characteristic of algorithmic DGA botnets',
        'The website has high SEO ranking',
        'The server is running on high-speed fiber optics'
      ],
      correctIndex: 0
    }
  },
  {
    title: '4. Spotting Fake Luxury & E-Commerce Traps',
    badge: 'Module 4 of 4',
    content: `Scam e-commerce sites advertise 90% clearance discounts on luxury items (Ray-Ban, Rolex, Dyson, Nike Jordans). These sites use untrusted TLDs (.xyz, .buzz, .cam) and non-compliant payment gateways designed to harvest credit card CVVs and personal billing addresses.`,
    takeaway: 'Rule: 90% luxury discounts on cheap TLDs are almost exclusively credit card harvest traps.',
    quiz: {
      question: 'What is the primary indicator of a counterfeit luxury e-commerce scam?',
      options: [
        'High-quality product images',
        'Unrealistic 90% discounts hosted on disposable .xyz/.cam TLDs',
        'Fast page loading speed'
      ],
      correctIndex: 1
    }
  }
];

export const InteractiveTour = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [completedTour, setCompletedTour] = useState(false);

  if (!isOpen) return null;

  const module = TUTORIAL_MODULES[currentStep];

  const handleAnswer = (idx) => {
    setSelectedQuizAnswer(idx);
    setIsAnswerCorrect(idx === module.quiz.correctIndex);
  };

  const nextStep = () => {
    setSelectedQuizAnswer(null);
    setIsAnswerCorrect(null);
    if (currentStep < TUTORIAL_MODULES.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompletedTour(true);
    }
  };

  const prevStep = () => {
    setSelectedQuizAnswer(null);
    setIsAnswerCorrect(null);
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#0a0f1d] border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden my-8 animate-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-[#0e1d38] to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Cyber Defense Interactive Academy</h2>
              <p className="text-[11px] font-mono text-cyan-400">SecOps Operator Training Module</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!completedTour ? (
          <div className="p-6 space-y-5">
            {/* Step indicator */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                {module.badge}
              </span>
              <div className="flex gap-1.5">
                {TUTORIAL_MODULES.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === currentStep ? 'bg-cyan-400 w-6 shadow-[0_0_8px_#22d3ee]' : i < currentStep ? 'bg-emerald-500' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Title & Core Lesson */}
            <div>
              <h3 className="text-base font-extrabold text-slate-100 mb-2">
                {module.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                {module.content}
              </p>
            </div>

            {/* Golden Rule */}
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 flex-shrink-0 text-cyan-400 mt-0.5" />
              <span className="font-semibold">{module.takeaway}</span>
            </div>

            {/* Checkpoint Quiz */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Knowledge Check: {module.quiz.question}</span>
              </div>

              <div className="space-y-2">
                {module.quiz.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs font-mono transition-all border ${
                      selectedQuizAnswer === idx
                        ? isAnswerCorrect
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                          : 'bg-red-500/20 text-red-300 border-red-500/50'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {isAnswerCorrect !== null && (
                <div className={`p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                  isAnswerCorrect ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'
                }`}>
                  {isAnswerCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Correct! Excellent threat detection skill.</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4" />
                      <span>Incorrect. Review the lesson above and try again!</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="cyber-btn-secondary !text-xs !py-1.5 disabled:opacity-30"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                onClick={nextStep}
                disabled={isAnswerCorrect !== true}
                className="cyber-btn-primary !text-xs !py-1.5 disabled:opacity-40"
              >
                <span>{currentStep === TUTORIAL_MODULES.length - 1 ? 'Complete Academy' : 'Next Lesson'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Completion Badge Screen */
          <div className="p-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <Award className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-100">
              Cyber Defense Certified Operator
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Congratulations! You have completed all 4 threat intelligence modules and mastered foundational URL vector analysis.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setCompletedTour(false);
                  setCurrentStep(0);
                  onClose();
                }}
                className="cyber-btn-primary !px-6"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
