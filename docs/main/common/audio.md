---
title: "Audio"
sidebar_label: "Audio"
sidebar_position: 10
slug: "/audio"
---

# Audio

TBoard images provide standard ALSA audio paths. HDMI and DP audio come from
the SoC and work on any board with those outputs; boards with an onboard codec
additionally expose a 3.5 mm jack, and some have a microphone input on the same
connector. Which codec and jacks a board carries is listed on its page under
Boards.

## Cards and devices

Every audio path shows up as one ALSA card. A Rockchip desktop image typically
lists:

```text
card 0: ...dp...      # DP audio
card 1: ...codec...   # onboard codec, 3.5 mm jack
card 2: ...hdmi...    # HDMI audio
```

```bash
aplay -l                       # playback devices
aplay -L                       # PCM names usable with -D
```

Card numbers are assigned at boot and can change when an output is enabled or
disabled — always read `aplay -l` instead of hard-coding a card index. The
board page lists the codec name and its usual card on your image.

## Verify and test

```bash
alsamixer                      # select the card, unmute and raise volume
speaker-test -D plughw:1,0 -c 2 -t wav
aplay -D plughw:1,0 /usr/share/sounds/alsa/Front_Right.wav
```

`plughw:1,0` means card 1, device 0. Use `hw:1,0` instead of `plughw` only when
you are sure the sample rate and format match the hardware; `plughw` converts
for you.

Recording (on boards with a microphone input):

```bash
arecord -l
arecord -D plughw:1,0 -f cd -d 5 test.wav
aplay -D plughw:1,0 test.wav
```

For a headset with microphone on a 3.5 mm jack, use a **TRRS (4-pole)** plug;
TRS plugs will not route the microphone.

## Mixer settings

```bash
amixer -c 1 scontrols          # control names for the codec card
amixer -c 1 sset 'Playback Volume' 80%
amixer -c 1 sset 'Headphone' on
amixer -c 1 sget 'Playback Volume'
```

Settings are lost on reboot unless stored:

```bash
sudo alsactl store
```

`alsamixer` is quicker for exploration: `F6` switches card, `M` mutes/unmutes,
arrow keys adjust the level. A silent jack is usually a muted `Headphone`
control or a zero `Playback Volume`, not a driver problem.

## Choosing the default output

Desktop images use PipeWire/PulseAudio, where the sink is selected per
application (or in `pavucontrol`). For headless systems set the default PCM in
`/etc/asound.conf`:

```text
defaults.pcm.card 1
defaults.pcm.device 0
defaults.ctl.card 1
```

HDMI/DP audio follows the display: the sink only exists while a monitor is
connected and the mode is active.

## Troubleshooting

| Symptom | Check |
|---|---|
| No cards listed | Codec overlay missing, or `snd_soc` module not loaded — `dmesg \| grep -i <codec>` |
| Jack silent, HDMI works | `alsamixer` — mute state and volume of the codec card |
| Distortion at high volume | Lower `Playback Volume`; the codec clips before the speaker does |
| Only one channel | TRS/TRRS plug type, or a mono panel wiring mistake |
| Crackle on HDMI | Display mode change; try a lower resolution or another cable |

## Related

- [Display Output](/display) — HDMI/DP audio sinks.
- [Linux](/linux#device-tree-and-overlays) — enabling codec overlays.
