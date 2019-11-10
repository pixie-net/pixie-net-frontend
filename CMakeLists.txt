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
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -pedantic -fPIC -fdiagnostics-color=auto -pthread")
endif ()

# If user does not specify prefix we assign it to the project root directory
if (CMAKE_INSTALL_PREFIX_INITIALIZED_TO_DEFAULT)
    message(STATUS "Install Prefix not specified.")
    get_filename_component(INSTALL_DIR ${PROJECT_SOURCE_DIR} REALPATH)
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
option(USE_KAFKA "Builds acquire with Kafka support" OFF)

set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${CMAKE_SOURCE_DIR}/cmake/modules/")
find_package(Threads REQUIRED)
find_package(Boost 1.58.0 REQUIRED COMPONENTS
        date_time chrono atomic program_options system thread)

if (USE_KAFKA)
    find_package(LibRDKafka 0.11.0 REQUIRED)
endif (USE_KAFKA)

# https://github.com/unittest-cpp/unittest-cpp.git
if (BUILD_TESTS)
    find_package(UnitTest++ REQUIRED)
    link_directories(${UNITTEST++_LIBRARY_DIR})
    include_directories(${UNITTEST++_INCLUDE_DIR})
    enable_testing()
endif (BUILD_TESTS)

#We use this instead of target_include_directories since every target has the same includes.
include_directories(include)

add_library(PixieNetCommon_OBJ STATIC src/PixieNetCommon.c)
add_library(PixieNetCommon SHARED src/PixieNetCommon.c)
install(TARGETS PixieNetCommon DESTINATION lib)

add_library(PixieNetConfig_OBJ STATIC src/PixieNetConfig.cpp)
add_library(PixieNetConfig SHARED src/PixieNetConfig.cpp)
install(TARGETS PixieNetConfig DESTINATION lib)

add_executable(cgitraces.cgi src/cgitraces.c)
install(TARGETS cgitraces.cgi DESTINATION cgi)

FOREACH (prog cgistats cgiwaveforms)
    add_executable(${prog}.cgi src/${prog}.c)
    target_link_libraries(${prog}.cgi PixieNetCommon_OBJ)
    install(TARGETS ${prog}.cgi DESTINATION cgi)
ENDFOREACH (prog)

add_executable(cgiavgtraces.cgi src/cgiavgtraces.c)
target_link_libraries(cgiavgtraces.cgi PixieNetConfig_OBJ)
install(TARGETS cgiavgtraces.cgi DESTINATION cgi)

FOREACH (prog gettraces pollcsr)
    add_executable(${prog} src/${prog}.c)
    install(TARGETS ${prog} DESTINATION bin)
ENDFOREACH (prog)

FOREACH (prog runstats findsettings clockprog)
    add_executable(${prog} src/${prog}.c)
    target_link_libraries(${prog} PixieNetCommon_OBJ m)
    install(TARGETS ${prog} DESTINATION bin)
ENDFOREACH (prog)

add_executable(avgadc src/avgadc.c)
target_link_libraries(avgadc PixieNetConfig_OBJ)
install(TARGETS avgadc DESTINATION bin)

FOREACH (prog progfippi startdaq coincdaq)
    add_executable(${prog} src/${prog}.c)
    target_link_libraries(${prog} PixieNetCommon_OBJ PixieNetConfig_OBJ)
    install(TARGETS ${prog} DESTINATION bin)
ENDFOREACH (prog)

add_executable(acquire src/acquire.cpp)
set(BOOST_ACQ_LIBS boost_date_time boost_chrono boost_atomic boost_program_options boost_system boost_thread rt)
if (USE_KAFKA)
    set(KAFKA_LIBS ssl crypto rdkafka cppkafka)
    add_definitions(-DUSE_KAFKA)
endif (USE_KAFKA)
target_link_libraries(acquire PixieNetCommon_OBJ PixieNetConfig_OBJ m ${BOOST_ACQ_LIBS} ${KAFKA_LIBS})
install(TARGETS acquire DESTINATION bin)