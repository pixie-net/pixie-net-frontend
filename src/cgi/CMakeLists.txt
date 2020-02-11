set(INSTALL_PATH cgi)

add_executable(cgiwaveforms.cgi cgiwaveforms.c)
target_link_libraries(cgiwaveforms.cgi PixieNetCommon_STATIC)
install(TARGETS cgiwaveforms.cgi DESTINATION ${INSTALL_PATH})

add_executable(cgiavgtraces.cgi cgiavgtraces.c)
target_link_libraries(cgiavgtraces.cgi PixieNetConfig_STATIC)
install(TARGETS cgiavgtraces.cgi DESTINATION ${INSTALL_PATH})

add_executable(cgireadsettings.cgi cgireadsettings.c)
target_link_libraries(cgireadsettings.cgi PixieNetConfig_STATIC)
install(TARGETS cgireadsettings.cgi DESTINATION ${INSTALL_PATH})

add_executable(cgiwritesettings.cgi cgiwritesettings.cpp)
target_link_libraries(cgiwritesettings.cgi PixieNetConfig_STATIC)
install(TARGETS cgiwritesettings.cgi DESTINATION ${INSTALL_PATH})