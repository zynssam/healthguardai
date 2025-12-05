import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChatInterface from './components/ChatInterface';
import Dashboard from './components/Dashboard';
import AboutSection from './components/AboutSection';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return (
          <>
            <Hero onNavigate={setCurrentView} />
            <AboutSection />
          </>
        );
      case ViewState.CHAT:
        return <ChatInterface />;
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.ABOUT:
        return <AboutSection />;
      default:
        return <Hero onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar currentView={currentView} setView={setCurrentView} />
      <main className="flex-grow">
        {renderView()}
      </main>
      <footer className="bg-slate-900 text-slate-400 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm">
            © {new Date().getFullYear()} HealthGuard AI Prototype.
          </div>
          <div className="text-xs mt-2 md:mt-0 text-center md:text-right">
             Presented by Samrudh Shetty & Suraj Mahesh<br/>
             Faculty Incharge: Prof. Anand Shankar
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
