---
title: "音频（R5A）"
sidebar_label: "音频"
sidebar_position: 11
slug: "/r5a-audio"
---

# 音频（R5A）

[音频](/audio) 页中的 ALSA 流程对 R5A 完全适用，本页给出 codec 与典型镜像
的声卡列表。

## Codec 与声卡

3.5 mm 耳机口连接 **ES8316** codec；HDMI 与 DP 音频来自 SoC。典型镜像按通路
各列一个声卡：

```text
 0 [rockchipdp0    ]: rockchip-dp0    - rockchip-dp0
                     rockchip-dp0
 1 [rockchiphdmi0  ]: rockchip-hdmi0  - rockchip-hdmi0
                     rockchip-hdmi0
 2 [rockchipes8316c]: rockchip_es8316 - rockchip,es8316-codec
                     rockchip,es8316-codec
```

这个顺序——DP0 = card 0、HDMI0 = card 1、ES8316 = card 2——就是默认设备树生成
的结果（用 `cat /proc/asound/cards` 复核）。对应 PCM 名为
`00-00: rockchip-dp0 spdif-hifi-0`、`01-00: rockchip-hdmi0 i2s-hifi-0` 与
`02-00: dailink-multicodecs ES8316 HiFi-0`。
若修改设备树或插入 USB 声卡，声卡编号会变化——请每次都读 `aplay -l`，不要写死在脚本里。默认设备树下 ES8316 是 **card 2**，下文示例统一用 `plughw:2,0`。

三条链路在设备树（`rk3588s-TBoard-R5A.dts`）中的配置如下：

| 声卡 | 数据链路 | 说明 |
|---|---|---|
| `rockchip,es8316-codec` | `i2s0_8ch` → ES8316 | 3.5 mm 耳机，I2S 格式，MCLK = 256×fs（12.288 MHz） |
| `rockchip-hdmi0` | `i2s5_8ch` → HDMI0 | HDMI 音频，MCLK = 128×fs |
| `rockchip-dp0` | `spdif_tx2` → DP0 | DP 音频，MCLK = 512×fs |

ES8316 挂在 I2C7（地址 `0x10`）；耳机麦克风走 codec 的 MIC2 通道，插拔检测与
线控按键（播放 / 暂停）由 SARADC 通道 3 完成。

## 快速测试

```bash
alsamixer -c 2                  # 声卡 2 = ES8316：取消静音、调音量
speaker-test -D plughw:2,0 -c 2 -t wav
aplay -D plughw:2,0 /usr/share/sounds/alsa/Front_Right.wav
```

带麦克风的耳机需使用 **TRRS（四段）** 插头；三段 TRS 插头不会接通麦克风。
混音器控制项与默认输出设置见[音频](/audio)。

## 相关页面

- [音频](/audio) — 混音器、录音、默认输出、排障。
- [显示输出](/display) — HDMI / DP 音频 sink。
- [概览](/tboard-r5a) — 板载 codec 与耳机口。
