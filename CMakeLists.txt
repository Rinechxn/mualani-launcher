cmake_minimum_required(VERSION 3.16)

# Set the project name and version
project(ANIGAMELAUNCHER VERSION 1.0)

# Specify the C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Set Qt6 installation path from QTDIR environment variable
set(CMAKE_PREFIX_PATH "$ENV{QTDIR}")

# Find Qt6 packages
find_package(Qt6 COMPONENTS Core Gui Widgets REQUIRED)

# Add QCefView
add_subdirectory(./external/QCefView)

# Add executable
add_executable(${PROJECT_NAME} 
    src/renderer/chromium/main.cpp
    src/renderer/chromium/mainwindow.cpp
)

# Include directories
include_directories(
    ${CMAKE_SOURCE_DIR}/src
    "$ENV{QTDIR}/include"
    ${CMAKE_SOURCE_DIR}/external/QCefView/include
)

# Link directories
link_directories(
    "$ENV{QTDIR}/lib"
    ${CMAKE_SOURCE_DIR}/external/QCefView/lib
)

target_link_libraries(${PROJECT_NAME} PRIVATE
    Qt6::Core
    Qt6::Gui
    Qt6::Widgets
    QCefView
)

# Set output directory for the executable
set_target_properties(${PROJECT_NAME} PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Handle Qt MOC, UIC, and RCC
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)

# Add Qt binaries to the PATH for Windows
if(WIN32)
    set(QT_BIN_DIR "$ENV{QTDIR}/bin")
    set(CMAKE_INSTALL_SYSTEM_RUNTIME_LIBS_SKIP TRUE)
    include(InstallRequiredSystemLibraries)
    file(GLOB QT_DLLS "${QT_BIN_DIR}/*.dll")
    install(FILES ${QT_DLLS} DESTINATION bin)
    set(CMAKE_INSTALL_SYSTEM_RUNTIME_LIBS ${CMAKE_INSTALL_SYSTEM_RUNTIME_LIBS} ${QT_DLLS})
endif()