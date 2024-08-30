# MualaniLauncher

MualaniLauncher is a cross-platform game launcher application built using Vite, React, Qt6, and QCefView.

## Features

- Cross-platform support (Windows, macOS, Linux)
- Modern UI using React and Vite
- Native desktop integration with Qt6
- Embedded web browser functionality with QCefView

## Prerequisites

- Node.js (version 14 or higher)
- pnpm (version 6 or higher)
- CMake (version 3.16 or higher)
- Qt6
- QCefView

## Building the Project

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/AniGameLauncher.git
   cd AniGameLauncher
   ```

2. Install Node.js dependencies using pnpm:
   ```
   pnpm install
   ```

3. Set the QTDIR environment variable to your Qt6 installation path:
   ```
   export QTDIR=/path/to/your/qt6/installation
   ```

4. Create a build directory and navigate to it:
   ```
   mkdir build && cd build
   ```

5. Run CMake:
   ```
   cmake ..
   ```

6. Build the project:
   ```
   cmake --build .
   ```

7. Build the Vite + React frontend:
   ```
   pnpm run build
   ```

8. The executable will be located in the `bin` directory, and the built frontend will be in the `dist` directory.

## Project Structure

- `src/`: Contains the source code
  - `renderer/`: Renderer-related code
    - `chromium/`: Chromium-specific code
  - `frontend/`: React frontend code
- `external/`: External dependencies
  - `QCefView/`: QCefView library
- `CMakeLists.txt`: Main CMake configuration file
- `package.json`: Node.js project configuration
- `vite.config.js`: Vite configuration file

## Dependencies

- Node.js
- pnpm
- Vite
- React
- Qt6 (Core, Gui, Widgets)
- QCefView

## License

[Insert your chosen license here]

## Contributing

[Insert contribution guidelines here]

## Contact

[Insert your contact information or project links here]
