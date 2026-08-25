import React, { useState } from 'react';
import { 
  Bookmark, 
  ShieldCheck, 
  Ban, 
  Plus, 
  Trash2, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Eye
} from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';
import { 
  addToWhitelist, 
  removeFromWhitelist, 
  addToBlacklist, 
  removeFromBlacklist, 
  toggleBookmark 
} from '../services/scanStorage';

export const Bookmarks = () => {
  const { whitelist, blacklist, bookmarks, refreshData, setSelectedScan } = useSecurity();
  const [activeTab, setActiveTab] = useState('whitelist'); // 'whitelist' | 'blacklist' | 'saved'
  const [newDomain, setNewDomain] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newDomain.trim()) return;

    setError('');
    setSuccess('');

    try {
      const clean = newDomain.trim();
      if (activeTab === 'whitelist') {
        addToWhitelist(clean);
        setSuccess(`Domain "${clean}" added to trusted Whitelist.`);
      } else if (activeTab === 'blacklist') {
        addToBlacklist(clean);
        setSuccess(`Domain "${clean}" added to perimeter Blacklist.`);
      }
      setNewDomain('');
      refreshData();
    } catch (err) {
      setError(err.message || 'Failed to add domain.');
    }
  };

  const handleRemove = (domain, type) => {
    if (type === 'whitelist') {
      removeFromWhitelist(domain);
    } else {
      removeFromBlacklist(domain);
    }
    refreshData();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2.5">
            <Bookmark className="w-7 h-7 text-cyan-400" />
            <span>Domain Rules & Bookmarks</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage custom domain whitelists, perimeter blacklists, and bookmarked investigations.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800 self-start">
          <button
            onClick={() => {
              setActiveTab('whitelist');
              setError('');
              setSuccess('');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'whitelist'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Whitelist ({whitelist.length})</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('blacklist');
              setError('');
              setSuccess('');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'blacklist'
                ? 'bg-red-500/20 text-red-300 border border-red-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Ban className="w-3.5 h-3.5" />
            <span>Blacklist ({blacklist.length})</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('saved');
              setError('');
              setSuccess('');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'saved'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Scans ({bookmarks.length})</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{success}</span>
        </div>
      )}

      {/* Whitelist / Blacklist Tab Content */}
      {activeTab !== 'saved' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Rule Form */}
          <div className="cyber-card p-6 h-fit space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              {activeTab === 'whitelist' ? 'Add Trusted Domain' : 'Add Blocked Domain'}
            </h3>
            <p className="text-xs text-slate-400">
              {activeTab === 'whitelist' 
                ? 'Traffic to whitelisted domains will always be marked as Safe with risk score 0.'
                : 'Traffic matching blacklisted domains will immediately be flagged and blocked.'}
            </p>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Target Domain or Host
                </label>
                <input
                  type="text"
                  required
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  placeholder="example.com"
                  className="w-full bg-[#070b14] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <button
                type="submit"
                className={activeTab === 'whitelist' ? 'cyber-btn-success w-full text-xs' : 'cyber-btn-danger w-full text-xs'}
              >
                <Plus className="w-4 h-4" />
                <span>{activeTab === 'whitelist' ? 'Add to Whitelist' : 'Add to Blacklist'}</span>
              </button>
            </form>
          </div>

          {/* List Table */}
          <div className="lg:col-span-2 cyber-card overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                {activeTab === 'whitelist' ? 'Configured Whitelist Domains' : 'Configured Blacklist Domains'}
              </h3>
              <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                {activeTab === 'whitelist' ? whitelist.length : blacklist.length} Entries
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="px-5 py-3">Domain Name</th>
                    <th className="px-4 py-3">Rule Type</th>
                    <th className="px-5 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {(activeTab === 'whitelist' ? whitelist : blacklist).map((domain) => (
                    <tr key={domain} className="hover:bg-slate-800/30">
                      <td className="px-5 py-3 font-semibold text-slate-200">
                        {domain}
                      </td>
                      <td className="px-4 py-3 font-sans">
                        {activeTab === 'whitelist' ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            TRUSTED
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                            BLOCKED
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => handleRemove(domain, activeTab)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                          title="Remove Rule"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Saved Scans Tab */
        <div className="cyber-card overflow-hidden">
          <div className="p-4 border-b border-slate-800">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Bookmarked Threat Cases ({bookmarks.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="px-5 py-3">URL Target</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Risk Score</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {bookmarks.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-slate-400 font-sans">
                      No scans currently bookmarked. You can bookmark any scan from the Recent Scans list or Deep Inspector!
                    </td>
                  </tr>
                ) : (
                  bookmarks.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-800/30">
                      <td className="px-5 py-3 text-slate-200 max-w-sm truncate">{b.url}</td>
                      <td className="px-4 py-3 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          b.status === 'Safe' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-300 font-bold">{b.risk_score}%</td>
                      <td className="px-4 py-3 text-slate-400 text-[11px]">{new Date(b.scan_time).toLocaleDateString()}</td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => setSelectedScan(b)}
                          className="p-1.5 text-cyan-400 hover:bg-cyan-500/10 rounded-md mr-1"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            toggleBookmark(b);
                            refreshData();
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-md"
                          title="Remove Bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
