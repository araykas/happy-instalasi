import React, { useState } from 'react';

const DeviceInfoHelper = () => {
  const [isOpen, setIsOpen] = useState(false);

  const osCommands = {
    windows: [
      { label: 'OS Version', command: 'systeminfo | findstr /B /C:"OS Name" /C:"OS Version"' },
      { label: 'CPU Info', command: 'wmic cpu get name' },
      { label: 'GPU Info', command: 'wmic path win32_VideoController get name' },
      { label: 'RAM Info', command: 'wmic memorychip get capacity' },
      { label: 'Compiler (GCC)', command: 'gcc --version' },
      { label: 'Compiler (MSVC)', command: 'cl' },
    ],
    linux: [
      { label: 'OS Version', command: 'cat /etc/os-release' },
      { label: 'CPU Info', command: 'lscpu | grep "Model name"' },
      { label: 'GPU Info', command: 'lspci | grep -i vga' },
      { label: 'RAM Info', command: 'free -h' },
      { label: 'Compiler (GCC)', command: 'gcc --version' },
      { label: 'Compiler (Clang)', command: 'clang --version' },
    ],
    macos: [
      { label: 'OS Version', command: 'sw_vers' },
      { label: 'CPU Info', command: 'sysctl -n machdep.cpu.brand_string' },
      { label: 'GPU Info', command: 'system_profiler SPDisplaysDataType | grep Chipset' },
      { label: 'RAM Info', command: 'sysctl hw.memsize' },
      { label: 'Compiler (Clang)', command: 'clang --version' },
      { label: 'Xcode Version', command: 'xcodebuild -version' },
    ]
  };

  const [selectedOS, setSelectedOS] = useState('windows');
  const [copiedCommand, setCopiedCommand] = useState(null);

  const copyCommand = (command, index) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(index);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-4 hover:border-purple-300 transition-all"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-left">
              <h3 className="font-semibold text-purple-900">💡 Cara Cek Spesifikasi Device</h3>
              <p className="text-sm text-purple-700">Klik untuk lihat command yang bisa digunakan</p>
            </div>
          </div>
          <svg 
            className={`w-5 h-5 text-purple-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
          <h4 className="font-bold text-gray-800 mb-4">Command untuk Cek Spesifikasi</h4>
          
          {/* OS Selector */}
          <div className="flex space-x-2 mb-4">
            {Object.keys(osCommands).map((os) => (
              <button
                key={os}
                onClick={() => setSelectedOS(os)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  selectedOS === os
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {os.charAt(0).toUpperCase() + os.slice(1)}
              </button>
            ))}
          </div>

          {/* Commands List */}
          <div className="space-y-3">
            {osCommands[selectedOS].map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                  <button
                    onClick={() => copyCommand(item.command, index)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors"
                  >
                    {copiedCommand === index ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs overflow-x-auto">
                  {item.command}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> Buka Terminal/Command Prompt, jalankan command di atas, lalu copy hasilnya ke form.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceInfoHelper;
