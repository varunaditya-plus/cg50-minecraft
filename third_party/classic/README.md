# Minecraft Classic source used by this port

The calculator port translates the game logic served by [classic.minecraft.net](https://classic.minecraft.net/). It uses the original world generator and texture pixels. The browser's WebGL, DOM and WebRTC integration require calculator platform code.

The official bundle retrieved on 12 October 2026 is `assets/js/app.js?34ecd8a604d38d02ba1e` (8,396,505 bytes, SHA256 `e57c662e3e095bde0e8e6e64e914d1e0394c1ece51deeaeb1cd452d214e79272`). `entry.js` and `modules/*.js` were extracted from that webpack bundle and formatted without changing the code. `source-manifest.json` records their hashes and source roles. The entire bundle is available at the recorded URL rather than duplicated here.

[TheSunCat/Minecraft-Classic-Reversed](https://github.com/TheSunCat/Minecraft-Classic-Reversed/tree/03f234ae8c10f74c22e1dd5429c368610c9c4a2a) documents the original source. Its readable `RandomLevelWorker.js` is included as `RandomLevelWorker.readable.js`, alongside the worker currently served by Mojang. The readable and live workers produced identical 128×128×64 worlds for seeds 1, 42 and 12345.

| Upstream source | Function in the calculator port |
| --- | --- |
| `RandomLevelWorker.js` | Exact seed, distorted Perlin noise, raising, erosion, soil, cave and ore carving, water, lava, grass and trees. Executed directly during the resource build. |
| `entry.js` | Original block IDs, materials, lighting, block interaction, grass, foliage, falling sand/gravel, fluids, sponges and finite world boundaries. |
| `modules/37119.js` | Noa engine's player dimensions, eye position, targeting and terrain placement collision. |
| `modules/90583.js`, `20713.js` | Player movement, jump force, liquid behaviour and input headings. |
| `modules/66358.js`, `55132.js`, `26579.js`, `64601.js` | Physics adapter, rigid integration, buoyancy and swept voxel AABB collision. |
| `modules/29692.js`, `46280.js` | Voxel ray targeting and camera rotation limits. |
| `modules/43936.js` | Material face assignments and block registry. |
| `modules/187.js`, `67343.js` | Original nine-slot hotbar and 32-entry inventory order. |
| `modules/98296.js`, `96834.js`, `21703.js` | Greedy terrain face generation and mesh construction. |
| `modules/80131.js`, `71268.js`, `9210.js` | Rendering integration, crossed foliage planes and water surface geometry. |

All 83 original PNG files are stored without alterations under `assets-cg/classic/textures`. `assets-manifest.json` records their original URLs, dimensions and SHA256 hashes. `tools/build_classic_assets.py` converts pixels to RGB565 and preserves alpha separately. Opaque black pixels remain visible. Textures retain their original 16×16 size; previews retain their original 32×32 size. The original browser displays previews at 16×16. The hotbar background is 182×22, its selection sprite is 24×24 and the crosshair PNG is 64×64.

The original small world is 128×128×64, requiring 1,048,576 bytes even at one byte per voxel. It is generated at build time by executing the original worker, then stored in ROM as lossless 8×8×8 chunk runs. A chunk can be decoded into 512 bytes. Each run stores `((run_length - 1) << 6) | block_id`. No terrain algorithm is substituted or rewritten. The tool checks every decoded chunk and compares the complete decoded world byte for byte with the worker's output before writing resources. `level-manifest.json` records the seed, world hash and storage layout.

Regenerate the resources with:

```sh
node tools/generate_classic_level.cjs --seed 12345
python3 tools/build_classic_assets.py
```

The asset conversion requires Pillow. The committed level uses seed 12345. Its exact original-worker world SHA256 is `2865b462809b9f6ceed34651e26be7c0c930d3efb5e31385f79d723b629edca1`.

## Attribution and licences

Minecraft's game-specific code, names and PNG assets originate from Mojang/Microsoft. A reverse-engineering repository's MIT licence does not establish an MIT licence for Mojang's original code or artwork. This directory does not relabel those assets as MIT-licensed.

The original browser game uses [Noa](https://github.com/fenomas/noa), [voxel-physics-engine](https://github.com/fenomas/voxel-physics-engine), [voxel-aabb-sweep](https://github.com/fenomas/voxel-aabb-sweep) and [fast-voxel-raycast](https://github.com/fenomas/fast-voxel-raycast), by Andy Hall, and Babylon.js for WebGL rendering. Andy Hall's MIT notices are preserved in `LICENSE-noa.txt` and `LICENSE-voxel-physics.txt`. TheSunCat's own reverse-documentation licence is preserved in `LICENSE-reversed.txt`. The notices shipped beside the official app bundle are preserved in `app.js.LICENSE.txt`.
