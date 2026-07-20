#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

G3A_OUT="$(pwd)/Minecraft.g3a"

"/Users/varunaditya/.local/bin/fxsdk" build-cg

~/Downloads/Stuff/casio-emu/build/calcemu "$G3A_OUT"
