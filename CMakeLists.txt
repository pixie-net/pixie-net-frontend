# @file CMakeLists.txt
# @brief CMake configuration to build the Pixie-Net programs.
# @authors S. V. Paulauskas
# @date November 10, 2019
# @copyright Copyright (c) 2019 S. V. Paulauskas. 
cmake_minimum_required(VERSION 3.10)

project(pixie-net)

# Set the C++ standard to c++11.
# @TODO : After we move to GCC v. 6.1+ we will no longer need this statement.
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED YES)

if (CMAKE_COMPILER_IS_GNUCXX)
    if (${CMAKE_CXX_COMPILER_VERSION} VERSION_LESS "4.9.2")
        message(FATAL_ERROR "GCC version 4.9+ required for regex support. We recommend GCC 7+.")
    endif ()
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -pedantic -fPIC -fdiagnostics-color=auto")
endif ()

# If user does not specify prefix we assign it to the install directory
#@TODO: I do not like the fact that it makes the install directory before I'm
#       ready for it. There are cases where I do not want to actually install just
#       build. This configuration adds additional junk to my directory that I may
#       not actually want or need.
if (CMAKE_INSTALL_PREFIX_INITIALIZED_TO_DEFAULT)
    message(STATUS "Install Prefix not specified.")
    file(MAKE_DIRECTORY install)
    get_filename_component(INSTALL_DIR ${CMAKE_BINARY_DIR}/../install REALPATH)
    set(CMAKE_INSTALL_PREFIX ${INSTALL_DIR} CACHE PATH "Install Prefix" FORCE)
endif ()
message(STATUS "Installing to ${CMAKE_INSTALL_PREFIX}")

if (NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release CACHE STRING
            "Build type, options are: None Debug Release RelWithDebInfo MinSizeRel." FORCE)
    message(STATUS "Build type not defined, using default: ${CMAKE_BUILD_TYPE}")
endif (NOT CMAKE_BUILD_TYPE)
message(STATUS "Build type: ${CMAKE_BUILD_TYPE}")

if (CMAKE_BUILD_TYPE MATCHES "Debug")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -pg")
endif (CMAKE_BUILD_TYPE MATCHES "Debug")

include(CMakeDependentOption)
option(BUILD_TESTS "Builds programs designed to test the package. Including UnitTest++ test." OFF)

set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${CMAKE_SOURCE_DIR}/cmake/modules/")
find_package(Threads REQUIRED)

# https://github.com/unittest-cpp/unittest-cpp.git
if (BUILD_TESTS)
    find_package(UnitTest++ REQUIRED)
    link_directories(${UNITTEST++_LIBRARY_DIR})
    include_directories(${UNITTEST++_INCLUDE_DIR})
    enable_testing()
endif (BUILD_TESTS)

#------------------------------------------------------------------------------
#We use this instead of target_include_directories since every target has the same includes.
include_directories(include)

