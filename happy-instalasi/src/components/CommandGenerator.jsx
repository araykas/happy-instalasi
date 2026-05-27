import React, { useState, useEffect } from 'react';

const CommandGenerator = ({ library, deviceSpecs }) => {
  const [commands, setCommands] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [projectStructure, setProjectStructure] = useState('');
  const [pathSetup, setPathSetup] = useState([]);
  const [exampleCode, setExampleCode] = useState('');

  useEffect(() => {
    if (library && deviceSpecs) {
      generateCommands();
      generateProjectStructure();
      generatePathSetup();
      generateExampleCode();
    }
  }, [library, deviceSpecs]);

  const generateProjectStructure = () => {
    if (library.id === 'opengl') {
      setProjectStructure(`my-opengl-project/
├── src/
│   └── main.cpp          # File utama program
├── include/              # Header files (jika ada)
├── lib/                  # Library files (.lib, .a)
│   ├── glew32.lib
│   ├── glfw3.lib
│   └── opengl32.lib
├── dll/                  # DLL files (Windows)
│   ├── glew32.dll
│   └── glfw3.dll
├── CMakeLists.txt        # CMake configuration (opsional)
└── Makefile              # Makefile (opsional)`);
    }
  };

  const generatePathSetup = () => {
    const os = deviceSpecs.os;
    let paths = [];

    if (library.id === 'opengl') {
      if (os === 'windows') {
        paths = [
          {
            title: 'Setup Environment Variables (Windows)',
            steps: [
              'Buka "System Properties" → "Environment Variables"',
              'Tambahkan ke PATH:',
              '  - C:\\vcpkg\\installed\\x64-windows\\bin',
              '  - C:\\vcpkg\\installed\\x64-windows\\lib',
              'Atau lokasi dimana GLEW & GLFW terinstall'
            ]
          },
          {
            title: 'Setup Include & Library Paths',
            steps: [
              'Include Path (-I): Lokasi header files (.h)',
              '  Contoh: C:\\vcpkg\\installed\\x64-windows\\include',
              '',
              'Library Path (-L): Lokasi library files (.lib)',
              '  Contoh: C:\\vcpkg\\installed\\x64-windows\\lib',
              '',
              'DLL Path: Copy DLL ke folder project atau system32'
            ]
          }
        ];
      } else if (os === 'linux') {
        paths = [
          {
            title: 'Lokasi Default Library (Linux)',
            steps: [
              'Include files biasanya di: /usr/include/',
              'Library files biasanya di: /usr/lib/ atau /usr/lib/x86_64-linux-gnu/',
              '',
              'Cek lokasi library:',
              '  pkg-config --cflags glfw3',
              '  pkg-config --libs glfw3'
            ]
          }
        ];
      } else if (os === 'macos') {
        paths = [
          {
            title: 'Lokasi Default Library (macOS)',
            steps: [
              'Include files biasanya di: /usr/local/include/',
              'Library files biasanya di: /usr/local/lib/',
              '',
              'Cek lokasi library:',
              '  brew --prefix glfw',
              '  brew --prefix glew'
            ]
          }
        ];
      }
    }

    setPathSetup(paths);
  };

  const generateExampleCode = () => {
    if (library.id === 'opengl') {
      setExampleCode(`// main.cpp - OpenGL Hello Window
#include <GL/glew.h>
#include <GLFW/glfw3.h>
#include <iostream>

int main() {
    // Initialize GLFW
    if (!glfwInit()) {
        std::cerr << "Failed to initialize GLFW" << std::endl;
        return -1;
    }

    // Create window
    GLFWwindow* window = glfwCreateWindow(800, 600, "OpenGL Window", NULL, NULL);
    if (!window) {
        std::cerr << "Failed to create window" << std::endl;
        glfwTerminate();
        return -1;
    }

    glfwMakeContextCurrent(window);

    // Initialize GLEW
    if (glewInit() != GLEW_OK) {
        std::cerr << "Failed to initialize GLEW" << std::endl;
        return -1;
    }

    std::cout << "OpenGL Version: " << glGetString(GL_VERSION) << std::endl;

    // Main loop
    while (!glfwWindowShouldClose(window)) {
        glClear(GL_COLOR_BUFFER_BIT);
        
        // Render here
        
        glfwSwapBuffers(window);
        glfwPollEvents();
    }

    glfwTerminate();
    return 0;
}`);
    }
  };

  const generateCommands = () => {
    const os = deviceSpecs.os;
    let generatedCommands = [];

    if (library.id === 'opengl') {
      if (os === 'windows') {
        generatedCommands = [
          {
            title: '1. Install vcpkg (Package Manager)',
            command: 'git clone https://github.com/Microsoft/vcpkg.git\ncd vcpkg\n.\\bootstrap-vcpkg.bat',
            description: 'Install vcpkg untuk manage dependencies'
          },
          {
            title: '2. Install GLEW',
            command: 'vcpkg install glew:x64-windows',
            description: 'Install OpenGL Extension Wrangler Library'
          },
          {
            title: '3. Install GLFW',
            command: 'vcpkg install glfw3:x64-windows',
            description: 'Install windowing library'
          },
          {
            title: '4. Integrate vcpkg (Opsional - untuk Visual Studio)',
            command: 'vcpkg integrate install',
            description: 'Auto-detect libraries di Visual Studio'
          },
          {
            title: '5. Compile dengan Path Manual (GCC/MinGW)',
            command: 'g++ src/main.cpp -o app.exe -IC:/vcpkg/installed/x64-windows/include -LC:/vcpkg/installed/x64-windows/lib -lglfw3 -lglew32 -lopengl32 -lgdi32',
            description: 'Compile dengan specify include & library path'
          },
          {
            title: '6. Compile dengan CMake (Recommended)',
            command: 'mkdir build\ncd build\ncmake .. -DCMAKE_TOOLCHAIN_FILE=C:/vcpkg/scripts/buildsystems/vcpkg.cmake\ncmake --build .',
            description: 'Compile menggunakan CMake (lebih mudah manage path)'
          }
        ];
      } else if (os === 'linux') {
        generatedCommands = [
          {
            title: '1. Update Package Manager',
            command: 'sudo apt-get update',
            description: 'Update repository'
          },
          {
            title: '2. Install OpenGL Development Files',
            command: 'sudo apt-get install libgl1-mesa-dev libglu1-mesa-dev',
            description: 'Install OpenGL libraries'
          },
          {
            title: '3. Install GLEW',
            command: 'sudo apt-get install libglew-dev',
            description: 'Install GLEW library'
          },
          {
            title: '4. Install GLFW',
            command: 'sudo apt-get install libglfw3-dev',
            description: 'Install GLFW library'
          },
          {
            title: '5. Compile dengan pkg-config (Recommended)',
            command: 'g++ src/main.cpp -o app $(pkg-config --cflags --libs glfw3 glew) -lGL',
            description: 'pkg-config otomatis detect path library'
          },
          {
            title: '6. Compile dengan Path Manual',
            command: 'g++ src/main.cpp -o app -I/usr/include -L/usr/lib/x86_64-linux-gnu -lglfw -lGLEW -lGL',
            description: 'Compile dengan specify path manual'
          }
        ];
      } else if (os === 'macos') {
        generatedCommands = [
          {
            title: '1. Install Homebrew (jika belum)',
            command: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
            description: 'Install package manager untuk macOS'
          },
          {
            title: '2. Install GLEW',
            command: 'brew install glew',
            description: 'Install GLEW library'
          },
          {
            title: '3. Install GLFW',
            command: 'brew install glfw',
            description: 'Install GLFW library'
          },
          {
            title: '4. Compile dengan Homebrew paths',
            command: 'g++ src/main.cpp -o app -I/usr/local/include -L/usr/local/lib -lglfw -lGLEW -framework OpenGL',
            description: 'Compile dengan path Homebrew default'
          },
          {
            title: '5. Compile dengan pkg-config',
            command: 'g++ src/main.cpp -o app $(pkg-config --cflags --libs glfw3 glew) -framework OpenGL',
            description: 'Menggunakan pkg-config untuk auto-detect path'
          }
        ];
      }
    }

    setCommands(generatedCommands);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!library || !deviceSpecs) {
    return (
      <div className="card">
        <div className="text-center text-gray-500 py-8">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>Pilih library dan isi spesifikasi device untuk generate commands</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Project Structure */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-800">📁 Struktur Project</h2>
        </div>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto whitespace-pre">
          {projectStructure}
        </div>
        <div className="mt-3 text-sm text-gray-600">
          💡 <strong>Tips:</strong> Buat folder sesuai struktur di atas untuk organize project dengan baik
        </div>
      </div>

      {/* Path Setup Guide */}
      {pathSetup.length > 0 && (
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <h2 className="text-xl font-bold text-gray-800">🛣️ Setup Path & Environment</h2>
          </div>
          <div className="space-y-4">
            {pathSetup.map((section, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{section.title}</h3>
                <div className="bg-blue-50 p-3 rounded text-sm space-y-1">
                  {section.steps.map((step, stepIdx) => (
                    <div key={stepIdx} className={step.startsWith('  ') ? 'ml-4 text-blue-700 font-mono text-xs' : 'text-blue-900'}>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Installation Commands */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-800">⚙️ Installation & Compile Commands</h2>
        </div>

        <div className="space-y-4">
          {commands.map((cmd, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-sky-300 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">{cmd.title}</h3>
                  <p className="text-sm text-gray-600">{cmd.description}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(cmd.command, index)}
                  className="btn-secondary text-sm py-1 px-3 flex-shrink-0"
                >
                  {copiedIndex === index ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                {cmd.command}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Example Code */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <h2 className="text-xl font-bold text-gray-800">📝 Example Code</h2>
        </div>
        <div className="mb-2">
          <button
            onClick={() => copyToClipboard(exampleCode, 'code')}
            className="btn-secondary text-sm py-1 px-3"
          >
            {copiedIndex === 'code' ? '✓ Copied' : 'Copy Code'}
          </button>
        </div>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-xs overflow-x-auto whitespace-pre">
          {exampleCode}
        </div>
        <div className="mt-3 text-sm text-gray-600">
          💡 Save code ini sebagai <code className="bg-gray-100 px-2 py-1 rounded">src/main.cpp</code> di project folder
        </div>
      </div>

      {/* CMakeLists.txt Example */}
      {deviceSpecs.os === 'windows' && (
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-xl font-bold text-gray-800">🔧 CMakeLists.txt (Recommended)</h2>
          </div>
          <div className="mb-2">
            <button
              onClick={() => copyToClipboard(`cmake_minimum_required(VERSION 3.10)
project(OpenGLProject)

set(CMAKE_CXX_STANDARD 11)

# Find packages
find_package(OpenGL REQUIRED)
find_package(GLEW REQUIRED)
find_package(glfw3 REQUIRED)

# Add executable
add_executable(app src/main.cpp)

# Link libraries
target_link_libraries(app 
    OpenGL::GL 
    GLEW::GLEW 
    glfw
)`, 'cmake')}
              className="btn-secondary text-sm py-1 px-3"
            >
              {copiedIndex === 'cmake' ? '✓ Copied' : 'Copy CMakeLists.txt'}
            </button>
          </div>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-xs overflow-x-auto whitespace-pre">
{`cmake_minimum_required(VERSION 3.10)
project(OpenGLProject)

set(CMAKE_CXX_STANDARD 11)

# Find packages
find_package(OpenGL REQUIRED)
find_package(GLEW REQUIRED)
find_package(glfw3 REQUIRED)

# Add executable
add_executable(app src/main.cpp)

# Link libraries
target_link_libraries(app 
    OpenGL::GL 
    GLEW::GLEW 
    glfw
)`}
          </div>
          <div className="mt-3 text-sm text-gray-600">
            💡 CMake otomatis handle path detection, lebih mudah dari manual compile
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandGenerator;
