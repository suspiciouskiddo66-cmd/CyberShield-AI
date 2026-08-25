// Audit log & security monitor service

const AUDIT_STORAGE_KEY = 'cybershield_security_audit_logs';
const FAILED_ATTEMPTS_KEY = 'cybershield_failed_attempts';
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export const recordLoginAttempt = (email, success, reason = '') => {
  const logs = getAuditLogs();
  const attempt = {
    id: 'log_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    email: email || 'anonymous',
    timestamp: new Date().toISOString(),
    success,
    reason: success ? 'Authentication successful' : (reason || 'Invalid credentials'),
    userAgent: navigator.userAgent,
    platform: navigator.platform || 'Windows',
    ip: '192.168.1.' + Math.floor(Math.random() * 200 + 10) // Simulated secure client IP
  };

  logs.unshift(attempt);
  // Keep last 100 audit entries
  const trimmed = logs.slice(0, 100);
  localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(trimmed));

  // Track failed attempts for brute-force protection
  if (!success) {
    trackFailedAttempt(email);
  } else {
    resetFailedAttempts(email);
  }

  return attempt;
};

export const getAuditLogs = () => {
  try {
    const data = localStorage.getItem(AUDIT_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const trackFailedAttempt = (email) => {
  try {
    const data = JSON.parse(localStorage.getItem(FAILED_ATTEMPTS_KEY) || '{}');
    const userAttempts = data[email] || { count: 0, lockedUntil: null };
    
    userAttempts.count += 1;
    if (userAttempts.count >= MAX_FAILED_ATTEMPTS) {
      userAttempts.lockedUntil = Date.now() + LOCKOUT_MINUTES * 60 * 1000;
    }
    
    data[email] = userAttempts;
    localStorage.setItem(FAILED_ATTEMPTS_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to track failed login attempt:", e);
  }
};

export const checkLockoutStatus = (email) => {
  try {
    const data = JSON.parse(localStorage.getItem(FAILED_ATTEMPTS_KEY) || '{}');
    const userAttempts = data[email];
    if (!userAttempts || !userAttempts.lockedUntil) {
      return { isLocked: false, remainingSeconds: 0 };
    }
    
    const now = Date.now();
    if (now < userAttempts.lockedUntil) {
      const remainingSeconds = Math.ceil((userAttempts.lockedUntil - now) / 1000);
      return { isLocked: true, remainingSeconds };
    } else {
      // Lockout period expired
      delete data[email];
      localStorage.setItem(FAILED_ATTEMPTS_KEY, JSON.stringify(data));
      return { isLocked: false, remainingSeconds: 0 };
    }
  } catch (e) {
    return { isLocked: false, remainingSeconds: 0 };
  }
};

export const resetFailedAttempts = (email) => {
  try {
    const data = JSON.parse(localStorage.getItem(FAILED_ATTEMPTS_KEY) || '{}');
    if (data[email]) {
      delete data[email];
      localStorage.setItem(FAILED_ATTEMPTS_KEY, JSON.stringify(data));
    }
  } catch (e) {
    console.error("Failed to reset failed attempts:", e);
  }
};
