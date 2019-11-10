add_library(PixieNetCommon_STATIC STATIC PixieNetCommon.c)
add_library(PixieNetCommon SHARED PixieNetCommon.c)
install(TARGETS PixieNetCommon DESTINATION lib)

add_library(PixieNetConfig_STATIC STATIC PixieNetConfig.cpp)
add_library(PixieNetConfig SHARED PixieNetConfig.cpp)
install(TARGETS PixieNetConfig DESTINATION lib)