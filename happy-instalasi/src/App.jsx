import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DeviceSpecForm from './components/DeviceSpecForm';
import LibrarySelector from './components/LibrarySelector';
import CommandGenerator from './components/CommandGenerator';
import AIAssistant from './components/AIAssistant';
import DeviceInfoHelper from './components/DeviceInfoHelper';

/* ── localStorage helpers ── */
const load = (key, fallback = null) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
};
const save = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };

function App() {
  const [deviceSpecs, setDeviceSpecs] = useState(() => load('hi_deviceSpecs'));
  const [selectedLibrary, setSelectedLibrary] = useState(() => load('hi_selectedLibrary'));
  const [activeTab, setActiveTab] = useState('setup');
  const [generatedCommands, setGeneratedCommands] = useState(() => load('hi_generatedCommands', []));
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile sidebar toggle

  useEffect(() => { save('hi_deviceSpecs', deviceSpecs); }, [deviceSpecs]);
  useEffect(() => { save('hi_selectedLibrary', selectedLibrary); }, [selectedLibrary]);
  useEffect(() => { save('hi_generatedCommands', generatedCommands); }, [generatedCommands]);

  const handleSpecsSubmit = (specs) => {
    setDeviceSpecs(specs);
    // Auto-navigate to commands tab if library already selected
    if (selectedLibrary) setActiveTab('commands');
  };

  const handleLibrarySelect = (library) => {
    setSelectedLibrary(library);
    // Auto-navigate to commands if device also configured
    if (deviceSpecs) setActiveTab('commands');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false); // close mobile sidebar on nav
  };

  return (
    <div className="min-h-screen grid-bg" style={{ background: '#0d1117' }}>

      {/* ── Header ── */}
      <Header deviceSpecs={deviceSpecs} selectedLibrary={selectedLibrary} />

      {/* ── Mobile: top tab bar (visible only < lg) ── */}
      <div className="lg:hidden flex border-b" style={{ background: '#161b22', borderColor: '#21262d' }}>
        {[
          { id: 'setup',    label: '⚙ Setup' },
          { id: 'commands', label: '> Commands' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className="flex-1 py-3 font-mono text-xs transition-colors"
            style={{
              color: activeTab === tab.id ? '#4af626' : '#8b949e',
              borderBottom: activeTab === tab.id ? '2px solid #4af626' : '2px solid transparent',
              background: activeTab === tab.id ? '#1f3a2b' : 'transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Main layout ── */}
      <div className="flex" style={{ minHeight: 'calc(100vh - 49px)' }}>

        {/* ── Sidebar — hidden on mobile, always visible on lg+ ── */}
        <div className="hidden lg:block flex-shrink-0">
          <Sidebar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            deviceSpecs={deviceSpecs}
            selectedLibrary={selectedLibrary}
          />
        </div>

        {/* ── Main content ── */}
        <main className="flex-1 overflow-auto p-4 md:p-6">

          {/* ── SETUP TAB ── */}
          <div className={activeTab === 'setup' ? 'space-y-4 animate-fadeInUp' : 'hidden'}>

            {/* How-to banner */}
            <div
              className="rounded p-4 font-mono text-xs"
              style={{ background: '#161b22', border: '1px solid #21262d' }}
            >
              <div className="flex items-start gap-3">
                <span style={{ color: '#484f58' }}>{'/*'}</span>
                <div className="space-y-1 flex-1">
                  <div style={{ color: '#8b949e' }}>
                    <span style={{ color: '#58a6ff' }}>Step 1:</span> Fill device specs below
                  </div>
                  <div style={{ color: '#8b949e' }}>
                    <span style={{ color: '#58a6ff' }}>Step 2:</span> Select target graphics library
                  </div>
                  <div style={{ color: '#8b949e' }}>
                    <span style={{ color: '#58a6ff' }}>Step 3:</span> Navigate to{' '}
                    <button
                      onClick={() => handleTabChange('commands')}
                      className="underline"
                      style={{ color: '#4af626' }}
                    >
                      Commands
                    </button>{' '}tab to get installation scripts
                  </div>
                  <div style={{ color: '#8b949e' }}>
                    <span style={{ color: '#58a6ff' }}>Step 4:</span> Use{' '}
                    <span style={{ color: '#4af626' }}>🔧 AI Montir</span> (bottom-right) for troubleshooting
                  </div>
                </div>
                <span style={{ color: '#484f58' }}>{'*/'}</span>
              </div>
            </div>

            <DeviceInfoHelper />
            <DeviceSpecForm onSubmit={handleSpecsSubmit} />
            <LibrarySelector onSelect={handleLibrarySelect} savedLibrary={selectedLibrary} />

            {/* CTA jika sudah lengkap */}
            {deviceSpecs && selectedLibrary && (
              <div
                className="rounded p-4 flex items-center justify-between flex-wrap gap-3"
                style={{ background: '#1f3a2b', border: '1px solid #238636' }}
              >
                <div className="font-mono text-sm" style={{ color: '#4af626' }}>
                  ✓ Config complete — ready to generate
                </div>
                <button
                  onClick={() => handleTabChange('commands')}
                  className="btn-primary"
                >
                  $ generate commands →
                </button>
              </div>
            )}
          </div>

          {/* ── COMMANDS TAB ── */}
          <div className={activeTab === 'commands' ? 'h-full' : 'hidden'}>
            <CommandGenerator
              library={selectedLibrary}
              deviceSpecs={deviceSpecs}
              onCommandsGenerated={setGeneratedCommands}
            />

            {/* Warning banner */}
            {selectedLibrary && deviceSpecs && (
              <div
                className="mt-4 rounded p-3 font-mono text-xs"
                style={{ background: '#2d2007', border: '1px solid #9e6a03', color: '#e3b341' }}
              >
                ⚠ Run commands in order · Requires admin/sudo · Backup project first ·{' '}
                Use <span style={{ color: '#4af626' }}>🔧 AI Montir</span> if errors occur
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── AI Floating Overlay ── */}
      <AIAssistant
        deviceSpecs={deviceSpecs}
        library={selectedLibrary}
        generatedCommands={generatedCommands}
      />

      {/* ── Footer ── */}
      <footer
        className="py-3 px-6 font-mono text-xs text-center"
        style={{ background: '#161b22', borderTop: '1px solid #21262d', color: '#484f58' }}
      >
        Happy Instalasi — AI-Powered Installation Assistant · Made with ❤ for easier library installations
      </footer>
    </div>
  );
}

export default App;
