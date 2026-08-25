// Scan history, bookmarks, whitelist, and blacklist management service
// Data updates STRICTLY when the user executes a scan or modifies a rule.

const SCANS_STORAGE_KEY = 'cybershield_scans_history_v2';
const BOOKMARKS_STORAGE_KEY = 'cybershield_bookmarks_collection_v2';
const WHITELIST_KEY = 'cybershield_whitelist_domains_v2';
const BLACKLIST_KEY = 'cybershield_blacklist_domains_v2';

export const getScanHistory = () => {
  try {
    const data = localStorage.getItem(SCANS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const saveScan = (scanResult) => {
  const history = getScanHistory();
  // If URL already exists in history, replace it with latest scan or put on top
  const filtered = history.filter(s => s.id !== scanResult.id && s.url.toLowerCase() !== scanResult.url.toLowerCase());
  filtered.unshift(scanResult);
  localStorage.setItem(SCANS_STORAGE_KEY, JSON.stringify(filtered));
  return scanResult;
};

export const deleteScan = (scanId) => {
  const history = getScanHistory();
  const updated = history.filter(s => s.id !== scanId);
  localStorage.setItem(SCANS_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const clearScanHistory = () => {
  localStorage.removeItem(SCANS_STORAGE_KEY);
  return [];
};

// Bookmarks / Whitelist / Blacklist management
export const getWhitelist = () => {
  try {
    const data = localStorage.getItem(WHITELIST_KEY);
    return data ? JSON.parse(data) : ['google.com', 'github.com', 'microsoft.com', 'apple.com'];
  } catch (e) {
    return ['google.com', 'github.com'];
  }
};

export const addToWhitelist = (domain) => {
  const clean = domain.toLowerCase().trim().replace(/https?:\/\//, '').split('/')[0];
  const list = getWhitelist();
  if (!list.includes(clean)) {
    list.push(clean);
    localStorage.setItem(WHITELIST_KEY, JSON.stringify(list));
  }
  removeFromBlacklist(clean);
  return list;
};

export const removeFromWhitelist = (domain) => {
  const list = getWhitelist().filter(d => d !== domain.toLowerCase().trim());
  localStorage.setItem(WHITELIST_KEY, JSON.stringify(list));
  return list;
};

export const getBlacklist = () => {
  try {
    const data = localStorage.getItem(BLACKLIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const addToBlacklist = (domain) => {
  const clean = domain.toLowerCase().trim().replace(/https?:\/\//, '').split('/')[0];
  const list = getBlacklist();
  if (!list.includes(clean)) {
    list.push(clean);
    localStorage.setItem(BLACKLIST_KEY, JSON.stringify(list));
  }
  removeFromWhitelist(clean);
  return list;
};

export const removeFromBlacklist = (domain) => {
  const list = getBlacklist().filter(d => d !== domain.toLowerCase().trim());
  localStorage.setItem(BLACKLIST_KEY, JSON.stringify(list));
  return list;
};

export const getBookmarks = () => {
  try {
    const data = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const toggleBookmark = (scanResult) => {
  const bookmarks = getBookmarks();
  const exists = bookmarks.some(b => b.id === scanResult.id || b.url === scanResult.url);
  let updated;
  if (exists) {
    updated = bookmarks.filter(b => b.id !== scanResult.id && b.url !== scanResult.url);
  } else {
    updated = [scanResult, ...bookmarks];
  }
  localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};
