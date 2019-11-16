set(INSTALL_PATH web/cgi)

add_executable(cgitraces.cgi cgitraces.c)
install(TARGETS cgitraces.cgi DESTINATION ${INSTALL_PATH})

FOREACH (prog cgistats cgiwaveforms)
    add_executable(${prog}.cgi ${prog}.c)
    target_link_libraries(${prog}.cgi PixieNetCommon_STATIC)
    install(TARGETS ${prog}.cgi DESTINATION ${INSTALL_PATH})
ENDFOREACH (prog)

add_executable(cgiavgtraces.cgi cgiavgtraces.c)
target_link_libraries(cgiavgtraces.cgi PixieNetConfig_STATIC)
install(TARGETS cgiavgtraces.cgi DESTINATION ${INSTALL_PATH})