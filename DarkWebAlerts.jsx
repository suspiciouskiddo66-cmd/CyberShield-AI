import React, { useState } from 'react';
import { 
  Radar, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Key, 
  Mail, 
  Calendar, 
  Sparkles, 
  Loader2, 
  ExternalLink 
} from 'lucide-react';

export const DarkWebAlerts = () => {
  const [query, setQuery] = useState('operator@cybershield.ai');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);

    setTimeout(() => {
      const isDemo = query.includes('operator') || query.includes('safe');
      if (isDemo) {
        setSearchResult({
          target: query,
          isCompromised: false,
          breachesCount: 0,
          riskLevel: 'LOW',
          breaches: [],
          message: 'No exposed records detected across 800+ dark web forums, paste sites, and credential leaks.'
        });
      } else {
        setSearchResult({
          target: query,
          isCompromised: true,
          breachesCount: 3,
          riskLevel: 'HIGH',
          breaches: [
            {
              title: 'Collection #1 Mega-Breach',
              date: '2024-03-12',
              compromisedData: ['Plaintext Passwords', 'Email Addresses', 'IP Logs'],
              source: 'Underground Darknet Marketplace',
              severity: 'CRITICAL'
            },
            {
              title: 'Exploit.in Database Dump',
              date: '2023-11-20',
              compromisedData: ['Hashed Passwords (MD5)', 'Username'],
              source: 'Breached Forum Credential Dumps',
              severity: 'HIGH'
            },
            {
              title: 'Retail Storefront Customer Leak',
              date: '2023-06-08',
              compromisedData: ['Billing Address', 'Phone Numbers', 'Order History'],
              source: 'Misconfigured S3 Bucket Exfiltration',
              severity: 'MEDIUM'
            }
          ],
          message: 'Exposed records found in 3 known credential dump databases. Immediate password rotation recommended.'
        });
      }
      setIsSearching(false);
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2.5">
          <Radar className="w-7 h-7 text-cyan-400" />
          <span>Dark Web Threat & Exposure Monitor</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Search compromised underground breach databases, paste sites, and black-market stealer logs for your corporate assets.
        </p>
      </div>

      {/* Query Bar */}
      <div className="cyber-card p-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter email address or company domain (e.g. analyst@enterprise.com)..."
              className="w-full bg-[#070b14] border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="cyber-btn-primary !py-3 !px-6 text-xs sm:text-sm"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Querying Leak Vaults...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Check Dark Web</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results */}
      {searchResult && (
        <div className="cyber-card p-6 space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${searchResult.isCompromised ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'}`}>
                {searchResult.isCompromised ? <ShieldAlert className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100 font-mono">{searchResult.target}</h3>
                <p className="text-xs text-slate-400">{searchResult.message}</p>
              </div>
            </div>

            <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
              searchResult.isCompromised ? 'bg-red-500/20 text-red-300 border-red-500/40' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}>
              {searchResult.riskLevel} RISK ({searchResult.breachesCount} Breaches)
            </div>
          </div>

          {/* Breach List */}
          {searchResult.isCompromised && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Compromised Records & Dumps Identified:
              </h4>

              <div className="space-y-3">
                {searchResult.breaches.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-200 text-sm">{b.title}</div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                        {b.severity}
                      </span>
                    </div>

                    <div className="text-slate-400 font-mono text-[11px]">
                      Date Logged: <span className="text-slate-200">{b.date}</span> • Source: <span className="text-cyan-300">{b.source}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {b.compromisedData.map((data, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">
                          {data}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
