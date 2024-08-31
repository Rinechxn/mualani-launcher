cmake_minimum_required(VERSION 3.16)

# Set the project name and version
project(MUALANI VERSION 1.0)

# Specify the C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Set Qt6 installation path from QTDIR environment variable
set(CMAKE_PREFIX_PATH "$ENV{QTDIR}")

# Find Qt6 packages
find_package(Qt6 COMPONENTS Core Gui Widgets REQUIRED)

# Define the path to CEF
set(CEF_ROOT "${CMAKE_SOURCE_DIR}/external/CEF")

# Add your source files
set(SOURCES
    src/renderer/chromium/main.cpp
    src/renderer/chromium/mainwindow.cpp
    src/renderer/chromium/mainwindow.hpp
    src/renderer/chromium/simplehandler.hpp
)

# Add the CEF-related files
set(CEF_SOURCES
    ${CEF_ROOT}/libcef_dll/wrapper/libcef_dll_wrapper.cc
)

# Add executable
add_executable(${PROJECT_NAME} 
    ${SOURCES}
    ${CEF_SOURCES}
)

# Include directories
target_include_directories(${PROJECT_NAME} PRIVATE
    ${CMAKE_SOURCE_DIR}/src
    "$ENV{QTDIR}/include"
    ${CEF_ROOT}
    ${CEF_ROOT}/include
    ${CEF_ROOT}/libcef_dll/wrapper
)

# Link directories
target_link_directories(${PROJECT_NAME} PRIVATE
    "$ENV{QTDIR}/lib"
    ${CEF_ROOT}/Release
)

# Link libraries
target_link_libraries(${PROJECT_NAME} PRIVATE
    Qt6::Core
    Qt6::Gui
    Qt6::Widgets
    libcef
    libcef_dll_wrapper
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

# Copy CEF resources and libraries
add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy_directory
    "${CEF_ROOT}/Resources" $<TARGET_FILE_DIR:${PROJECT_NAME}>
    COMMAND ${CMAKE_COMMAND} -E copy_directory
    "${CEF_ROOT}/Release" $<TARGET_FILE_DIR:${PROJECT_NAME}>
)