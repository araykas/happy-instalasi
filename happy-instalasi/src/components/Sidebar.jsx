import React from 'react';

const NAV_ITEMS = [
  {
    id: 'setup',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Setup',
    sublabel: 'Device & Library',
  },
  {
    id: 'commands',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    label: 'Commands',
    sublabel: 'Installation',
  },
];

const Sidebar = ({ activeTab, onTabChange, deviceSpecs, selectedLibrary }) => {
  const isReady = deviceSpecs && selectedLibrary;

  return (
    <aside
      className="flex-shrink-0 flex flex-col"
      style={{
        width: '200px',
        background: '#161b22',
        borderRight: '1px solid #21262d',
        minHeight: 'calc(100vh - 49px)',
      }}
    >
      {/* Section label */}
      <div className="px-4 pt-4 pb-2">
        <span className="section-label text-xs" style={{ color: '#484f58' }}>NAVIGATION</span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 px-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`nav-item w-full text-left ${activeTab === item.id ? 'active' : ''}`}
          >
            {item.icon}
            <div>
              <div className="text-xs font-semibold leading-none">{item.label}</div>
              <div className="text-xs mt-0.5 opacity-60">{item.sublabel}</div>
            </div>
          </button>
        ))}
      </nav>

      {/* Divider */}
      <div className="mx-4 my-3" style={{ borderTop: '1px solid #21262d' }} />

      {/* Status section */}
      <div className="px-4 pb-2">
        <span className="section-label text-xs" style={{ color: '#484f58' }}>STATUS</span>
      </div>
      <div className="px-3 flex flex-col gap-2">
        <div
          className="rounded p-2 font-mono text-xs"
          style={{ background: '#0d1117', border: '1px solid #21262d' }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span className={`status-dot ${deviceSpecs ? 'green' : 'yellow'}`} />
            <span style={{ color: '#8b949e' }}>Device</span>
          </div>
          <div style={{ color: deviceSpecs ? '#4af626' : '#e3b341' }} className="truncate text-xs">
            {deviceSpecs ? deviceSpecs.os?.toUpperCase() : 'Not set'}
          </div>
        </div>

        <div
          className="rounded p-2 font-mono text-xs"
          style={{ background: '#0d1117', border: '1px solid #21262d' }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span className={`status-dot ${selectedLibrary ? 'blue' : 'yellow'}`} />
            <span style={{ color: '#8b949e' }}>Library</span>
          </div>
          <div style={{ color: selectedLibrary ? '#58a6ff' : '#e3b341' }} className="truncate text-xs">
            {selectedLibrary ? selectedLibrary.name : 'Not set'}
          </div>
        </div>

        {isReady && (
          <div
            className="rounded p-2 font-mono text-xs"
            style={{ background: '#1f3a2b', border: '1px solid #238636' }}
          >
            <div className="flex items-center gap-1.5">
              <span className="status-dot green" />
              <span style={{ color: '#4af626' }}>Ready to generate</span>
            </div>
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer hint */}
      <div className="px-4 py-4 font-mono text-xs" style={{ color: '#484f58', borderTop: '1px solid #21262d' }}>
        <div>AI Montir available</div>
        <div style={{ color: '#4af626' }}>↘ bottom-right</div>
      </div>
    </aside>
  );
};

export default Sidebar;
