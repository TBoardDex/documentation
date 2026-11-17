---
title: "Audio (R5A)"
sidebar_label: "Audio"
sidebar_position: 11
slug: "/r5a-audio"
---

# Audio (R5A)

The ALSA procedures on [Audio](/audio) apply unchanged to the R5A. This page
lists the codec and the cards a typical image reports.

## Codec and cards

The 3.5 mm jack carries an **ES8316** codec; HDMI and DP carry audio from the
SoC. A typical image lists one card per path:

```text
 0 [rockchipdp0    ]: rockchip-dp0    - rockchip-dp0
                     rockchip-dp0
 1 [rockchiphdmi0  ]: rockchip-hdmi0  - rockchip-hdmi0
                     rockchip-hdmi0
 2 [rockchipes8316c]: rockchip_es8316 - rockchip,es8316-codec
                     rockchip,es8316-codec
```

That order — DP0 = card 0, HDMI0 = card 1, ES8316 = card 2 — is what the stock
device tree produces (read back with `cat /proc/asound/cards`). The PCM names
are `00-00: rockchip-dp0 spdif-hifi-0`, `01-00: rockchip-hdmi0 i2s-hifi-0` and
`02-00: dailink-multicodecs ES8316 HiFi-0`.
Card numbers shift if you edit the device tree or plug in a USB sound card — always read `aplay -l`
instead of hard-coding an index. On the stock device tree ES8316 is **card 2**; the
examples below all use `plughw:2,0`.

How the three paths map to the device tree (`rk3588s-TBoard-R5A.dts`):

| Card | Data path | Notes |
|---|---|---|
| `rockchip,es8316-codec` | `i2s0_8ch` → ES8316 | 3.5 mm jack, I2S format, MCLK = 256×fs (12.288 MHz) |
| `rockchip-hdmi0` | `i2s5_8ch` → HDMI0 | HDMI audio, MCLK = 128×fs |
| `rockchip-dp0` | `spdif_tx2` → DP0 | DP audio, MCLK = 512×fs |

The ES8316 sits on I2C7 (address `0x10`); the headset microphone uses the
codec's MIC2 input, and jack detection plus the play/pause media key are
handled on SARADC channel 3.

## Quick test

```bash
alsamixer -c 2                  # card 2 = ES8316: unmute, raise volume
speaker-test -D plughw:2,0 -c 2 -t wav
aplay -D plughw:2,0 /usr/share/sounds/alsa/Front_Right.wav
```

Headset microphones need a **TRRS (4-pole)** plug; TRS plugs will not route the
microphone. Mixer control names and the default-output setup are on
[Audio](/audio).

## Related

- [Audio](/audio) — mixer, recording, default output, troubleshooting.
- [Display](/display) — HDMI/DP audio sinks.
- [Overview](/tboard-r5a) — onboard codec and jack.
