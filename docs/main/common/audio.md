---
title: "Audio"
sidebar_label: "Audio"
sidebar_position: 10
slug: "/audio"
---

# Audio

![3.5mm audio jack photo placeholder 800 x 450 px](/img/placeholder-800x450.png)

> Image placeholder: **800 × 450 px** (suggested use: connection photo /
> wiring diagram). Replace it later with a verified image of the same dimensions.

TBoard images provide standard ALSA audio paths. HDMI and DP audio come from
the SoC and work on any board with those outputs; many boards additionally
carry an onboard codec wired to a 3.5 mm jack (the R5A uses an **ES8316**
codec — see [TBoard R5A](/tboard-r5a)).

## Verify and test

```bash
aplay -l                # list playback devices
alsamixer               # select the card, unmute and raise volume
speaker-test -c 2 -t wav
```

For a headset with microphone on a 3.5 mm jack, use a **TRRS (4-pole)** plug;
TRS plugs will not route the microphone.

## Related

- [TBoard R5A](/tboard-r5a) — onboard codec and jack on the R5A.
- [Display Output](/display) — HDMI/DP audio sinks.
