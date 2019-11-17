set(INSTALL_PATH assets/cgi)

FOREACH (prog cgistats cgiwaveforms)
    add_executable(${prog}.cgi ${prog}.c)
    target_link_libraries(${prog}.cgi PixieNetCommon_STATIC)
    install(TARGETS ${prog}.cgi DESTINATION ${INSTALL_PATH})
ENDFOREACH (prog)

add_executable(cgiavgtraces.cgi cgiavgtraces.c)
target_link_libraries(cgiavgtraces.cgi PixieNetConfig_STATIC)
install(TARGETS cgiavgtraces.cgi DESTINATION ${INSTALL_PATH})