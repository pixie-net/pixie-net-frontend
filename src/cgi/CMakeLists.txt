set(INSTALL_PATH assets/cgi)

add_executable(cgiwaveforms.cgi cgiwaveforms.c)
target_link_libraries(cgiwaveforms.cgi PixieNetCommon_STATIC)
install(TARGETS cgiwaveforms.cgi DESTINATION ${INSTALL_PATH})

add_executable(cgiavgtraces.cgi cgiavgtraces.c)
target_link_libraries(cgiavgtraces.cgi PixieNetConfig_STATIC)
install(TARGETS cgiavgtraces.cgi DESTINATION ${INSTALL_PATH})