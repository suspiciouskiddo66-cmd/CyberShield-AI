import React, { createContext, useContext, useState, useEffect } from 'react';
import { getScanHistory, getWhitelist, getBlacklist, getBookmarks } from '../services/scanStorage';

const SecurityContext = createContext(null);

export const SecurityProvider = ({ children }) => {
  const [isSystemActive, setIsSystemActive] = useState(() => {
    const saved = localStorage.getItem('cybershield_system_active');
    return saved !== null ? saved === 'true' : true;
  });

  const [scans, setScans] = useState(() => getScanHistory());
  const [bookmarks, setBookmarks] = useState(() => getBookmarks());
  const [whitelist, setWhitelist] = useState(() => getWhitelist());
  const [blacklist, setBlacklist] = useState(() => getBlacklist());
  const [selectedScan, setSelectedScan] = useState(null);

  const toggleSystemActive = () => {
    setIsSystemActive(prev => {
      const next = !prev;
      localStorage.setItem('cybershield_system_active', next.toString());
      return next;
    });
  };

  const refreshData = () => {
    setScans(getScanHistory());
    setBookmarks(getBookmarks());
    setWhitelist(getWhitelist());
    setBlacklist(getBlacklist());
  };

  // Derive aggregate statistics
  const totalScans = scans.length;
  const safeCount = scans.filter(s => s.status === 'Safe').length;
  const phishingCount = scans.filter(s => s.status === 'Phishing').length;
  const malwareCount = scans.filter(s => s.status === 'Malware').length;
  const suspiciousCount = scans.filter(s => s.status === 'Suspicious').length;
  const blockedCount = phishingCount + malwareCount + suspiciousCount;

  const stats = {
    totalScans,
    safeCount,
    phishingCount,
    malwareCount,
    suspiciousCount,
    blockedCount,
    threatRatio: totalScans > 0 ? Math.round((blockedCount / totalScans) * 100) : 0,
    systemStatus: isSystemActive ? 'ACTIVE' : 'STANDBY'
  };

  const value = {
    isSystemActive,
    toggleSystemActive,
    scans,
    bookmarks,
    whitelist,
    blacklist,
    selectedScan,
    setSelectedScan,
    refreshData,
    stats
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
