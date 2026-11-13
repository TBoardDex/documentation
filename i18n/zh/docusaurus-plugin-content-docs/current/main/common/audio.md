---
title: "音频"
sidebar_label: "音频"
sidebar_position: 10
slug: "/audio"
---

# 音频

TBoard 镜像提供标准 ALSA 音频通路。HDMI 与 DP 音频来自 SoC，带这两种输出的
板卡都能用；板载 codec 的板卡还会引出 3.5 mm 耳机口，部分板卡在同一连接器上带
麦克风输入。具体 codec 与接口配置见 Boards 下对应板卡的页面。

## 声卡与设备

每条音频通路对应一个 ALSA 声卡。瑞芯微桌面镜像的典型输出：

```text
card 0: ...dp...      # DP 音频
card 1: ...codec...   # 板载 codec，3.5 mm 耳机口
card 2: ...hdmi...    # HDMI 音频
```

```bash
aplay -l                       # 播放设备
aplay -L                       # 可用 -D 指定的 PCM 名称
```

声卡编号在启动时分配，输出启用或关闭后会变化——请每次都读 `aplay -l`，不要
把声卡号写死在脚本里。各板卡页面会给出 codec 名称及其在镜像上的常见声卡号。

## 确认与测试

```bash
alsamixer                      # 选择声卡、取消静音、调音量
speaker-test -D plughw:1,0 -c 2 -t wav
aplay -D plughw:1,0 /usr/share/sounds/alsa/Front_Right.wav
```

`plughw:1,0` 表示声卡 1、设备 0。只有确认采样率与格式和硬件一致时才用
`hw:1,0`，`plughw` 会自动转换。

录音（板卡带麦克风输入时）：

```bash
arecord -l
arecord -D plughw:1,0 -f cd -d 5 test.wav
aplay -D plughw:1,0 test.wav
```

带麦克风的耳机请使用 **TRRS（四段）** 插头；三段 TRS 插头不会接通麦克风。

## 混音器设置

```bash
amixer -c 1 scontrols          # codec 声卡的控制项名称
amixer -c 1 sset 'Playback Volume' 80%
amixer -c 1 sset 'Headphone' on
amixer -c 1 sget 'Playback Volume'
```

不保存的话，重启后设置会丢失：

```bash
sudo alsactl store
```

探索时用 `alsamixer` 更快：`F6` 切换声卡，`M` 静音/取消静音，方向键调音量。
耳机口没声音，绝大多数情况是 `Headphone` 被静音或 `Playback Volume` 为 0，
而不是驱动问题。

## 选择默认输出

桌面版镜像使用 PipeWire / PulseAudio，输出由应用（或 `pavucontrol`）选择。无
桌面的系统在 `/etc/asound.conf` 中指定默认 PCM：

```text
defaults.pcm.card 1
defaults.pcm.device 0
defaults.ctl.card 1
```

HDMI / DP 音频依附于显示：只有在显示器连接且该模式激活时，对应的 sink 才存在。

## 常见问题

| 现象 | 检查 |
|---|---|
| 一个声卡都没有 | codec 的 overlay 未启用，或 `snd_soc` 模块未加载——`dmesg \| grep -i <codec>` |
| 耳机无声，HDMI 有声 | `alsamixer` 中 codec 声卡的静音状态与音量 |
| 大音量破音 | 降低 `Playback Volume`，codec 比喇叭更早削顶 |
| 只有单声道 | TRS/TRRS 插头类型，或单声道喇叭接线错误 |
| HDMI 有爆音 | 显示模式切换导致，尝试降低分辨率或换线 |

## 相关页面

- [显示输出](/display) — HDMI / DP 音频 sink。
- [Linux](/linux#设备树与-overlay) — 启用 codec 相关 overlay。
