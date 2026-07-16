cmake_minimum_required(VERSION 3.15)
project(Minecraft LANGUAGES C)

# Make sure CMake can find fxSDK modules (FindGint, GenerateG3A, etc).
list(APPEND CMAKE_MODULE_PATH "$ENV{HOME}/.local/lib/cmake/fxsdk")

include(GenerateG3A)
find_package(Gint 2.9 REQUIRED)

add_executable(minecraft src/main.c)
target_compile_options(minecraft PRIVATE -Wall -Wextra -Os)
target_link_libraries(minecraft Gint::Gint)

generate_g3a(
  TARGET minecraft
  OUTPUT "${CMAKE_SOURCE_DIR}/Minecraft.g3a"
  NAME "Minecraft"
  ICONS
    "${CMAKE_SOURCE_DIR}/assets-cg/icon-uns.png"
    "${CMAKE_SOURCE_DIR}/assets-cg/icon-sel.png"
)

