import React, { useState } from 'react';
import { 
  Users, 
  ThumbsUp, 
  MessageSquare, 
  Plus, 
  ShieldAlert, 
  CheckCircle2, 
  Send, 
  Sparkles,
  Share2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([
    {
      id: 'post-1',
      author: 'ZeroDayHunter',
      role: 'Tier 3 Analyst',
      avatar: 'Z',
      time: '15m ago',
      title: 'New Telegram QR Code Phishing Campaign active in the wild',
      url: 'https://telegram-session-restore.cc/auth/qr',
      description: 'Attackers are distributing fake desktop Telegram web QR codes that hijack multi-device sessions without requiring SMS OTP.',
      upvotes: 42,
      commentsCount: 9,
      category: 'Phishing',
      verified: true
    },
    {
      id: 'post-2',
      author: 'ByteDefender',
      role: 'Threat Researcher',
      avatar: 'B',
      time: '1h ago',
      title: 'Rogue Python package typo-squatting colorama serving AsyncRAT',
      url: 'http://185.220.101.5:8080/colorama_patch.tar.gz',
      description: 'Found on PyPI lookalike repository with 1,200 downloads before takedown. Directs to raw IP binary payload.',
      upvotes: 68,
      commentsCount: 14,
      category: 'Malware',
      verified: true
    },
    {
      id: 'post-3',
      author: 'CryptoSentinel',
      role: 'SecOps Member',
      avatar: 'C',
      time: '3h ago',
      title: 'Fake Uniswap v4 Airdrop claiming $5,000 UNI tokens',
      url: 'https://uniswap-v4-early-airdrop-claim.space/connect',
      description: 'Phishing contract asks for approval on all ERC-20 tokens, draining connected MetaMask and Trust Wallets.',
      upvotes: 31,
      commentsCount: 6,
      category: 'Crypto Scam',
      verified: true
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const handleUpvote = (id) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
  };

  const handleSubmitThreat = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    const newPost = {
      id: 'post-' + Date.now(),
      author: user?.displayName || 'Security Analyst',
      role: 'Community Hunter',
      avatar: user?.displayName ? user.displayName.charAt(0) : 'A',
      time: 'Just now',
      title: newTitle,
      url: newUrl,
      description: newDesc,
      upvotes: 1,
      commentsCount: 0,
      category: 'User Submitted',
      verified: false
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewUrl('');
    setNewDesc('');
    setShowSubmitModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2.5">
            <Users className="w-7 h-7 text-cyan-400" />
            <span>Community Threat Intelligence Hub</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Crowd-sourced threat sharing, peer analysis, and community-verified zero-day URL warnings.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="cyber-btn-primary self-start sm:self-auto text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Submit New Threat Intelligence</span>
        </button>
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="cyber-card p-6 space-y-4 hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-700 font-bold text-xs flex items-center justify-center text-white uppercase">
                  {post.avatar}
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-200 flex items-center gap-2">
                    <span>{post.author}</span>
                    <span className="text-[10px] font-mono text-cyan-400 px-1.5 py-0.2 rounded bg-cyan-500/10 border border-cyan-500/30">
                      {post.role}
                    </span>
                    {post.verified && (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">{post.time}</div>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                {post.category}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-100">{post.title}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{post.description}</p>
            </div>

            {/* Target URL Box */}
            <div className="p-2.5 rounded-lg bg-black/60 font-mono text-xs text-amber-300 select-all border border-slate-800 break-all">
              {post.url}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleUpvote(post.id)}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="font-mono">{post.upvotes} Upvotes</span>
                </button>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <MessageSquare className="w-4 h-4" />
                  <span className="font-mono">{post.commentsCount} Comments</span>
                </div>
              </div>

              <button
                onClick={() => alert(`Intelligence link copied for sharing!`)}
                className="text-slate-400 hover:text-slate-200 flex items-center gap-1"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0a0f1d] border border-cyan-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-100">Submit New Threat Intelligence</h3>
            <form onSubmit={handleSubmitThreat} className="space-y-3 font-sans text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Threat Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. New Banking Smishing Campaign using .top TLD"
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg p-2.5 text-slate-100"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Target Malicious URL</label>
                <input
                  type="text"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://paypal-verify-fake.xyz"
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Threat Observations & Description</label>
                <textarea
                  rows={3}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Describe the phishing vector, credential theft mechanism, or malware dropper..."
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg p-2.5 text-slate-100"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="cyber-btn-secondary !text-xs !py-1.5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cyber-btn-primary !text-xs !py-1.5"
                >
                  Broadcast to Community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
