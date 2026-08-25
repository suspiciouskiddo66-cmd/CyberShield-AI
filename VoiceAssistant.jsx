import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Volume2, Sparkles, X, Bot, Shield, Radio } from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';
import { scanUrlAPI } from '../services/api';

export const VoiceAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [reply, setReply] = useState('Greetings, Operator. I am Aegis AI. Say "Scan google.com", "Plain black theme", "White theme", or "System status" to begin.');
  const recognitionRef = useRef(null);

  const { stats, isSystemActive, setSelectedScan, refreshData } = useSecurity();
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = async (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        handleVoiceCommand(text);
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        setReply(`Voice alert: ${event.error}. Please try again.`);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [stats, isSystemActive]);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceCommand = async (command) => {
    const cmd = command.toLowerCase().trim();

    if (cmd.includes('system status') || cmd.includes('status')) {
      const resp = `Defense status is ${isSystemActive ? 'Active' : 'Paused'}. We have analyzed ${stats.totalScans} total URLs and blocked ${stats.blockedCount} threat vectors with a ${stats.threatRatio}% block rate.`;
      setReply(resp);
      speak(resp);
    } else if (cmd.includes('scan')) {
      const words = cmd.split(' ');
      const scanIdx = words.findIndex(w => w === 'scan');
      let targetUrl = words.slice(scanIdx + 1).join('').replace(/dot/g, '.').replace(/\s+/g, '');

      if (!targetUrl || targetUrl.length < 3) {
        targetUrl = 'https://paypal-security-verification.top';
      }

      setReply(`Initiating deep neural scan on ${targetUrl}...`);
      speak(`Scanning target: ${targetUrl}`);

      try {
        const result = await scanUrlAPI(targetUrl);
        refreshData();
        setSelectedScan(result);
        const resultSpeech = `Scan complete. Verdict is ${result.status} with a risk score of ${result.risk_score} percent. ${result.summary}`;
        setReply(resultSpeech);
        speak(resultSpeech);
      } catch (e) {
        setReply("Error executing neural scan.");
      }
    } else if (cmd.includes('dashboard')) {
      navigate('/');
      setReply("Navigating to Security Dashboard.");
      speak("Opening Security Dashboard.");
    } else if (cmd.includes('threat') || cmd.includes('examples')) {
      navigate('/threat-examples');
      setReply("Navigating to Threat Examples database.");
      speak("Opening Threat Examples Catalog.");
    } else if (cmd.includes('file') || cmd.includes('scanner')) {
      navigate('/file-scanner');
      setReply("Opening File Malware Scanner.");
      speak("Opening File Malware Scanner.");
    } else if (cmd.includes('password') || cmd.includes('audit')) {
      navigate('/password-checker');
      setReply("Opening Password Audit tool.");
      speak("Opening Password Audit tool.");
    } else if (cmd.includes('dark web')) {
      navigate('/dark-web');
      setReply("Opening Dark Web Breach Monitor.");
      speak("Opening Dark Web Breach Monitor.");
    } 
    // Theme voice commands
    else if (cmd.includes('plain black') || cmd.includes('black theme') || cmd.includes('dark mode')) {
      localStorage.setItem('cybershield_bg_theme', 'plain-black');
      window.dispatchEvent(new Event('cybershield_theme_updated'));
      setReply("Theme switched to Plain Stealth Black.");
      speak("Engaging Plain Stealth Black mode.");
    } else if (cmd.includes('plain white') || cmd.includes('white theme') || cmd.includes('light mode')) {
      localStorage.setItem('cybershield_bg_theme', 'plain-white');
      window.dispatchEvent(new Event('cybershield_theme_updated'));
      setReply("Theme switched to Plain Clean White.");
      speak("Engaging Plain Clean White light mode.");
    } else if (cmd.includes('matrix')) {
      localStorage.setItem('cybershield_bg_theme', 'matrix-rain');
      window.dispatchEvent(new Event('cybershield_theme_updated'));
      setReply("Theme switched to Matrix Code Rain.");
      speak("Engaging Matrix digital rain.");
    } else if (cmd.includes('radar')) {
      localStorage.setItem('cybershield_bg_theme', 'pulse-radar');
      window.dispatchEvent(new Event('cybershield_theme_updated'));
      setReply("Theme switched to Pulse Radar.");
      speak("Engaging Pulse Radar grid.");
    } else if (cmd.includes('red alert') || cmd.includes('war room')) {
      localStorage.setItem('cybershield_bg_theme', 'red-alert');
      window.dispatchEvent(new Event('cybershield_theme_updated'));
      setReply("Theme switched to Red Alert War Room.");
      speak("Warning: Red Alert War Room theme activated.");
    } else if (cmd.includes('hex') || cmd.includes('quantum')) {
      localStorage.setItem('cybershield_bg_theme', 'hex-matrix');
      window.dispatchEvent(new Event('cybershield_theme_updated'));
      setReply("Theme switched to Quantum Hex Grid.");
      speak("Engaging Quantum Hex Grid.");
    } else if (cmd.includes('crt') || cmd.includes('terminal') || cmd.includes('amber')) {
      localStorage.setItem('cybershield_bg_theme', 'crt-terminal');
      window.dispatchEvent(new Event('cybershield_theme_updated'));
      setReply("Theme switched to Hacker CRT Amber.");
      speak("Engaging Hacker CRT Terminal.");
    } else if (cmd.includes('acid') || cmd.includes('biohazard') || cmd.includes('lime')) {
      localStorage.setItem('cybershield_bg_theme', 'acid-hazard');
      window.dispatchEvent(new Event('cybershield_theme_updated'));
      setReply("Theme switched to Acid Biohazard Lime.");
      speak("Engaging Acid Biohazard mode.");
    } else if (cmd.includes('network') || cmd.includes('grid')) {
      localStorage.setItem('cybershield_bg_theme', 'network-grid');
      window.dispatchEvent(new Event('cybershield_theme_updated'));
      setReply("Theme switched to Network Grid.");
      speak("Engaging Network Grid.");
    } else if (cmd.includes('wave') || cmd.includes('neon')) {
      localStorage.setItem('cybershield_bg_theme', 'neon-wave');
      window.dispatchEvent(new Event('cybershield_theme_updated'));
      setReply("Theme switched to Neon Waves.");
      speak("Engaging Neon Waves.");
    } else {
      const fallback = `Command registered: "${command}". Try saying "Plain black theme", "White theme", "Scan google.com", or "Red alert".`;
      setReply(fallback);
      speak(fallback);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      try {
        recognitionRef.current?.start();
      } catch (e) {
        const promptText = prompt("Voice Assistant Input (Speak or Type command):", "Plain black theme");
        if (promptText) {
          setTranscript(promptText);
          handleVoiceCommand(promptText);
        }
      }
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:shadow-[0_0_35px_rgba(6,182,212,0.8)] transition-all duration-300 active:scale-95 group flex items-center gap-2"
        title="Open Aegis Cyber Voice Assistant"
      >
        <Bot className="w-6 h-6 animate-pulse" />
        <span className="text-xs font-extrabold uppercase hidden md:inline tracking-wider font-mono">
          Aegis AI
        </span>
      </button>

      {/* Voice Assistant Dialogue Box */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 cyber-card p-5 border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.25)] space-y-4 animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                  <span>AEGIS CYBER VOICE</span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                </h3>
                <p className="text-[10px] font-mono text-cyan-400">Tactical AI Copilot</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Voice Wave Animation */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
            <div className="flex items-center justify-center gap-1 h-6">
              {[40, 70, 100, 60, 90, 45, 80, 50].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isListening || isSpeaking ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'
                  }`}
                  style={{ height: isListening || isSpeaking ? `${h}%` : '20%' }}
                />
              ))}
            </div>

            <p className="text-[11px] font-mono text-slate-300 leading-relaxed min-h-[40px] px-2">
              {transcript ? `"${transcript}"` : reply}
            </p>
          </div>

          {/* Control Bar */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              onClick={toggleListening}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all ${
                isListening 
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse' 
                  : 'cyber-btn-primary'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4" />
                  <span>Listening...</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  <span>Push to Speak</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Voice Chips */}
          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5 text-[10px]">
            <button
              onClick={() => handleVoiceCommand("Plain black theme")}
              className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 hover:text-cyan-300 border border-slate-800"
            >
              "Plain Black"
            </button>
            <button
              onClick={() => handleVoiceCommand("Plain white theme")}
              className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 hover:text-cyan-300 border border-slate-800"
            >
              "Plain White"
            </button>
            <button
              onClick={() => handleVoiceCommand("Red alert theme")}
              className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 hover:text-cyan-300 border border-slate-800"
            >
              "Red Alert"
            </button>
            <button
              onClick={() => handleVoiceCommand("System status")}
              className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 hover:text-cyan-300 border border-slate-800"
            >
              "Status"
            </button>
          </div>
        </div>
      )}
    </>
  );
};
