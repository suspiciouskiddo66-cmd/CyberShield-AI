import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  ShieldAlert, 
  HelpCircle, 
  RotateCcw, 
  Sparkles,
  Trophy,
  Flame
} from 'lucide-react';

const CHALLENGE_QUESTIONS = [
  {
    id: 1,
    url: 'https://paypal.com/signin',
    type: 'Safe',
    scenario: 'You received an email requesting to review your recent monthly statement.',
    explanation: 'Legitimate root domain (paypal.com) with official EV SSL and no typosquatting.'
  },
  {
    id: 2,
    url: 'https://paypal-security-verification.top/login.php',
    type: 'Malicious',
    scenario: 'SMS notification claiming your account is restricted due to unusual login from Russia.',
    explanation: 'Uses abusive .top TLD and hyphenated brand spoofing to harvest login credentials.'
  },
  {
    id: 3,
    url: 'https://docs.google.com/document/d/1x8FqL9832/edit',
    type: 'Safe',
    scenario: 'A colleague shares a project document with you on Google Drive.',
    explanation: 'Genuine Google Docs sub-domain on authoritative google.com infrastructure.'
  },
  {
    id: 4,
    url: 'http://185.220.101.5:8080/setup_patch.exe',
    type: 'Malicious',
    scenario: 'A popup claims missing video codecs are required to play media in your browser.',
    explanation: 'Raw IP address hosting direct executable download over high port :8080.'
  },
  {
    id: 5,
    url: 'https://appleid.apple.com/account/manage',
    type: 'Safe',
    scenario: 'You want to check your two-factor authentication devices on Apple ID.',
    explanation: 'Legitimate Apple ID sub-domain (appleid.apple.com).'
  },
  {
    id: 6,
    url: 'https://xn--appl-43d.com/iphone-reward',
    type: 'Malicious',
    scenario: 'A popup congratulates you on winning a free iPhone 16 Pro.',
    explanation: 'Punycode IDN homograph attack (xn--appl-43d.com) substituting Cyrillic characters.'
  },
  {
    id: 7,
    url: 'https://bit.ly/3xY9kL2?redirect=http://crypto-reward.xyz',
    type: 'Malicious',
    scenario: 'A Twitter message links to an exclusive crypto airdrop.',
    explanation: 'Shortener concealing an open redirect to a suspicious .xyz crypto claim domain.'
  },
  {
    id: 8,
    url: 'https://github.com/torvalds/linux',
    type: 'Safe',
    scenario: 'Viewing the Linux kernel source code repository.',
    explanation: 'Clean GitHub repository on authoritative github.com domain.'
  }
];

export const SafetyChallenges = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = CHALLENGE_QUESTIONS[currentIdx];

  const handleChoice = (choice) => {
    if (answered) return;
    setSelectedAnswer(choice);
    setAnswered(true);

    const isCorrect = choice === currentQ.type;
    if (isCorrect) {
      setScore(s => s + 100);
      setStreak(st => st + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setAnswered(false);
    setSelectedAnswer(null);
    if (currentIdx < CHALLENGE_QUESTIONS.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setStreak(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setIsFinished(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2.5">
            <Award className="w-7 h-7 text-cyan-400" />
            <span>Tactical Threat Detection Challenge</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Test your real-time URL inspection reflexes against tricky simulated real-world cyber lures.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
            Score: <strong className="text-white text-sm">{score} PTS</strong>
          </div>
          <div className="p-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-orange-400 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            <span>{streak} Streak</span>
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="cyber-card p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Challenge {currentIdx + 1} of {CHALLENGE_QUESTIONS.length}</span>
            <div className="w-48 bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / CHALLENGE_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Scenario & Link */}
          <div className="space-y-3 text-center">
            <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <HelpCircle className="w-8 h-8" />
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto italic">
              "{currentQ.scenario}"
            </p>

            {/* Target URL */}
            <div className="p-4 rounded-xl bg-black/80 font-mono text-sm sm:text-base text-cyan-300 border border-cyan-500/40 select-all break-all shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              {currentQ.url}
            </div>
          </div>

          {/* Decision Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => handleChoice('Safe')}
              disabled={answered}
              className={`p-4 rounded-xl border font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                answered && currentQ.type === 'Safe'
                  ? 'bg-emerald-500/30 border-emerald-500 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : 'bg-emerald-950/20 hover:bg-emerald-950/40 border-emerald-500/40 text-emerald-300 active:scale-95'
              }`}
            >
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>LEGITIMATE / SAFE</span>
            </button>

            <button
              onClick={() => handleChoice('Malicious')}
              disabled={answered}
              className={`p-4 rounded-xl border font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                answered && currentQ.type === 'Malicious'
                  ? 'bg-red-500/30 border-red-500 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                  : 'bg-red-950/20 hover:bg-red-950/40 border-red-500/40 text-red-300 active:scale-95'
              }`}
            >
              <ShieldAlert className="w-5 h-5 text-red-400" />
              <span>PHISHING / MALICIOUS</span>
            </button>
          </div>

          {/* Feedback Section */}
          {answered && (
            <div className={`p-4 rounded-xl border text-xs space-y-2 animate-in fade-in ${
              selectedAnswer === currentQ.type
                ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                : 'bg-red-950/30 border-red-500/50 text-red-300'
            }`}>
              <div className="font-bold flex items-center gap-2 text-sm">
                {selectedAnswer === currentQ.type ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Correct Analysis (+100 PTS)!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-400" />
                    <span>Incorrect Verdict!</span>
                  </>
                )}
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong>Anatomy Note: </strong>{currentQ.explanation}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="cyber-btn-primary !text-xs !py-1.5 !px-4"
                >
                  {currentIdx === CHALLENGE_QUESTIONS.length - 1 ? 'Finish Challenge' : 'Next Vector →'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results Screen */
        <div className="cyber-card p-8 text-center space-y-4 max-w-lg mx-auto">
          <div className="inline-flex p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
            <Trophy className="w-12 h-12" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-100">
            Challenge Completed!
          </h2>
          <p className="text-xs text-slate-300">
            Final Score: <strong className="text-cyan-400 font-mono text-sm">{score} Points</strong>
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="cyber-btn-primary flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Challenge</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
