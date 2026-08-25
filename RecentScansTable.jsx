import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Eye, 
  Ban, 
  Shield, 
  Trash2, 
  Search, 
  ExternalLink,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';
import { addToWhitelist, addToBlacklist, deleteScan } from '../services/scanStorage';

export const RecentScansTable = ({ limit = 8, showSearch = true, title = "Recent Threat Scans" }) => {
  const { scans, setSelectedScan, refreshData } = useSecurity();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredScans = scans.filter(item => {
    const matchesSearch = item.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || item.status.toUpperCase() === filterStatus;
    return matchesSearch && matchesStatus;
  }).slice(0, limit);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Safe':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Safe
          </span>
        );
      case 'Phishing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/30">
            <ShieldAlert className="w-3 h-3" /> Phishing
          </span>
        );
      case 'Malware':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30">
            <ShieldAlert className="w-3 h-3" /> Malware
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3 h-3" /> Suspicious
          </span>
        );
    }
  };

  const formatTime = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch (e) {
      return 'Just now';
    }
  };

  const handleBlock = (e, domain) => {
    e.stopPropagation();
    addToBlacklist(domain);
    refreshData();
  };

  const handleWhitelist = (e, domain) => {
    e.stopPropagation();
    addToWhitelist(domain);
    refreshData();
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteScan(id);
    refreshData();
  };

  return (
    <div className="cyber-card overflow-hidden">
      {/* Header & Filter Controls */}
      <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span>{title}</span>
            <span className="text-xs font-mono font-normal text-slate-400 px-2 py-0.5 rounded bg-slate-800">
              {filteredScans.length} of {scans.length}
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Live monitoring and verified safety status</p>
        </div>

        {showSearch && (
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search URL or domain..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 sm:w-60 bg-[#0a0f1d] border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#0a0f1d] border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="SAFE">Safe</option>
              <option value="MALWARE">Malware</option>
              <option value="PHISHING">Phishing</option>
              <option value="SUSPICIOUS">Suspicious</option>
            </select>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#090e1c] text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-800">
            <tr>
              <th className="px-5 py-3.5">Scanned Target URL</th>
              <th className="px-4 py-3.5">Threat Verdict</th>
              <th className="px-4 py-3.5">Risk Score</th>
              <th className="px-4 py-3.5">Scan Time</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {filteredScans.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-5 py-8 text-center text-slate-400 font-sans">
                  No scan records match the current criteria.
                </td>
              </tr>
            ) : (
              filteredScans.map((scan) => (
                <tr
                  key={scan.id}
                  onClick={() => setSelectedScan(scan)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors duration-150 group"
                >
                  <td className="px-5 py-3.5 max-w-xs sm:max-w-md truncate font-sans">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-200 truncate group-hover:text-cyan-300">
                        {scan.url}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono truncate">
                      {scan.domain}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-sans whitespace-nowrap">
                    {getStatusBadge(scan.status)}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            scan.risk_score > 70 ? 'bg-red-500' : scan.risk_score > 30 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${scan.risk_score}%` }}
                        />
                      </div>
                      <span className={`font-bold ${
                        scan.risk_score > 70 ? 'text-red-400' : scan.risk_score > 30 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {scan.risk_score}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap font-sans text-[11px]">
                    {formatTime(scan.scan_time)}
                  </td>
                  <td className="px-5 py-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedScan(scan)}
                        title="Inspect Threat Details"
                        className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-md transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleWhitelist(e, scan.domain)}
                        title="Whitelist Domain"
                        className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-md transition-colors"
                      >
                        <Shield className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleBlock(e, scan.domain)}
                        title="Block / Blacklist Domain"
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, scan.id)}
                        title="Delete from Log"
                        className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
