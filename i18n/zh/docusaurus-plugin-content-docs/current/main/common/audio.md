---
title: "音频"
sidebar_label: "音频"
sidebar_position: 10
slug: "/audio"
---

# 音频

![3.5mm 耳机接口占位图 800 x 450 px](/img/placeholder-800x450.png)

> 图片占位：**800 × 450 px**（建议用途：接法照片 / 接线示意图）。后期请替换为
> 相同尺寸的真实图片。

TBoard 镜像提供标准 ALSA 音频通路。HDMI 与 DP 音频由 SoC 提供，凡引出这些
接口的板卡均可使用；许多板卡还板载一颗音频编解码器并接到 3.5 mm 耳机口
（R5A 采用 **ES8316** 编解码器——见 [TBoard R5A](/tboard-r5a)）。

## 确认与测试

```bash
aplay -l                # 列出播放设备
alsamixer               # 选择对应声卡，取消静音并调高音量
speaker-test -c 2 -t wav
```

使用带麦克风的耳机时，请插 **TRRS（4 段式）3.5 mm** 插头；TRS 插头无法
启用麦克风。

## 相关页面

- [TBoard R5A](/tboard-r5a) — R5A 的板载编解码器与耳机口。
- [显示输出](/display) — HDMI/DP 音频输出。
