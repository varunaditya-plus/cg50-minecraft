cmake_minimum_required(VERSION 3.15)
project(Minecraft LANGUAGES C)

# Make sure CMake can find fxSDK modules (FindGint, GenerateG3A, etc).
list(APPEND CMAKE_MODULE_PATH "$ENV{HOME}/.local/lib/cmake/fxsdk")

include(GenerateG3A)
find_package(Gint 2.9 REQUIRED)

add_executable(minecraft
  src/main.c src/player.c src/world.c src/blocks.c src/game.c
  src/mesh.c src/mesh_data.c src/renderer.c src/ui.c
  src/level_data.c src/assets.c)
target_compile_options(minecraft PRIVATE -Wall -Wextra -O2)
target_link_libraries(minecraft Gint::Gint)

generate_g3a(
  TARGET minecraft
  OUTPUT "${CMAKE_SOURCE_DIR}/Minecraft.g3a"
  NAME "Minecraft"
  ICONS
    "${CMAKE_SOURCE_DIR}/assets-cg/icon-uns.png"
    "${CMAKE_SOURCE_DIR}/assets-cg/icon-sel.png"
)

