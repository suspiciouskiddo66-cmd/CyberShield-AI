import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SecurityProvider } from './context/SecurityContext';
import { LanguageProvider } from './context/LanguageContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { UrlDetailModal } from './components/UrlDetailModal';
import { CyberBackground } from './components/CyberBackground';
import { VoiceAssistant } from './components/VoiceAssistant';
import { InteractiveTour } from './components/InteractiveTour';

// Core Pages
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { ScanLink } from './pages/ScanLink';
import { History } from './pages/History';
import { Reports } from './pages/Reports';
import { Bookmarks } from './pages/Bookmarks';
import { Settings } from './pages/Settings';
import { MaliciousExamples } from './pages/MaliciousExamples';

// Enhanced Security Tools & Community Pages
import { FileScanner } from './pages/FileScanner';
import { SafeBrowsing } from './pages/SafeBrowsing';
import { PasswordChecker } from './pages/PasswordChecker';
import { DarkWebAlerts } from './pages/DarkWebAlerts';
import { LiveMonitor } from './pages/LiveMonitor';
import { Community } from './pages/Community';
import { Leaderboard } from './pages/Leaderboard';
import { SafetyChallenges } from './pages/SafetyChallenges';

function AppLayout({ children, onOpenTour }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex relative overflow-hidden">
      {/* Animated Multi-Theme Cyber Background */}
      <CyberBackground />

      {/* Left Sidebar Navigation */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 relative z-10">
        <Navbar setIsMobileOpen={setIsMobileOpen} onOpenTour={onOpenTour} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Threat Inspection Modal */}
      <UrlDetailModal />

      {/* Tactical Voice Assistant */}
      <VoiceAssistant />
    </div>
  );
}

export default function App() {
  const [isTourOpen, setIsTourOpen] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <SecurityProvider>
            {/* Interactive Security Academy Walkthrough */}
            <InteractiveTour isOpen={isTourOpen} onClose={() => setIsTourOpen(false)} />

            <Routes>
              {/* Public Auth Routes */}
              <Route 
                path="/login" 
                element={
                  <div className="relative min-h-screen">
                    <CyberBackground />
                    <div className="relative z-10">
                      <Login />
                    </div>
                  </div>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <div className="relative min-h-screen">
                    <CyberBackground />
                    <div className="relative z-10">
                      <Register />
                    </div>
                  </div>
                } 
              />

              {/* Core Operations */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AppLayout onOpenTour={() => setIsTourOpen(true)}>
                      <Dashboard />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/scan"
                element={
                  <ProtectedRoute>
                    <AppLayout onOpenTour={() => setIsTourOpen(true)}>
                      <ScanLink />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />

              {/* Security Tools */}
              <Route
                path="/file-scanner"
                element={
                  <ProtectedRoute>
                    <AppLayout onOpenTour={() => setIsTourOpen(true)}>
                      <FileScanner />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/safe-browsing"
                element={
                  <ProtectedRoute>
                    <AppLayout onOpenTour={() => setIsTourOpen(true)}>
                      <SafeBrowsing />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/password-checker"
                element={
                  <ProtectedRoute>
                    <AppLayout onOpenTour={() => setIsTourOpen(true)}>
                      <PasswordChecker />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dark-web"
                element={
                  <ProtectedRoute>
                    <AppLayout onOpenTour={() => setIsTourOpen(true)}>
                      <DarkWebAlerts />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/live-monitor"
                element={
                  <ProtectedRoute>
                    <AppLayout onOpenTour={() => setIsTourOpen(true)}>
                      <LiveMonitor />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />

              {/* Threat Intelligence & Catalog */}
              <Route
                path="/threat-examples"
                element={
                  <ProtectedRoute>
                    <AppLayout onOpenTour={() => setIsTourOpen(true)}>
                      <MaliciousExamples />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/examples"
                element={
                  <ProtectedRoute>
                    <AppLayout onOpenTour={() => setIsTourOpen(true)}>
                      <MaliciousExamples />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <AppLayout onOpenTour={() => setIsTourOpen(true)}>
                      <History />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <AppLayout onOpenTour={() => setIsTourOpen(true)}>
                      <Reports />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookmarks"
                element={
                  <ProtectedRoute>
                    <AppLayout onOpenTour={() => setIsTourOpen(true)}>
                      <Bookmarks />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />

              {/* Community & Challenges */}
              <Route
                path="/community"
                element={
                  <ProtectedRoute>
                    <AppLayout onOpenTour={() => setIsTourOpen(true)}>
                      <Community />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/leaderboard"
                element={
                  <ProtectedRoute>
                    <AppLayout onOpenTour={() => setIsTourOpen(true)}>
                      <Leaderboard />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/challenges"
                element={
                  <ProtectedRoute>
                    <AppLayout onOpenTour={() => setIsTourOpen(true)}>
                      <SafetyChallenges />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />

              {/* Settings */}
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <AppLayout onOpenTour={() => setIsTourOpen(true)}>
                      <Settings />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </SecurityProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}
