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
card 0: rockchipdp0   [rockchip-dp0]           device 0: spdif-hifi-0
card 1: rockchipes8316[rockchip,es8316-codec]  device 0: fe470000.i2s-ES8316 HiFi
card 2: rockchiphdmi0 [rockchip-hdmi0]         device 0: i2s-hifi-0
```

Card numbers are assigned at boot and can change — always read `aplay -l`
instead of hard-coding an index.

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
alsamixer                       # card 1 = ES8316: unmute, raise volume
speaker-test -D plughw:1,0 -c 2 -t wav
aplay -D plughw:1,0 /usr/share/sounds/alsa/Front_Right.wav
```

Headset microphones need a **TRRS (4-pole)** plug; TRS plugs will not route the
microphone. Mixer control names and the default-output setup are on
[Audio](/audio).

## Related

- [Audio](/audio) — mixer, recording, default output, troubleshooting.
- [Display](/display) — HDMI/DP audio sinks.
- [Overview](/tboard-r5a) — onboard codec and jack.
