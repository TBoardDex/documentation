---
title: "显示输出"
sidebar_label: "Display"
sidebar_position: 8
slug: "/display"
---

# 显示输出

![显示连接占位图 800 x 450 px](/img/placeholder-800x450.png)

> 图片占位：**800 × 450 px**（建议用途：接法照片 / 接线示意图）。后期请替换为
> 相同尺寸的真实图片。

RK3588(S) 可同时驱动多路显示输出：HDMI（最高 8K）、DP 与 MIPI DSI 屏。板卡
实际引出哪些输出、采用什么接口、支持什么分辨率由板卡决定——请查看对应板卡
页面，例如 [TBoard R5A](/tboard-r5a)。

## 检查输出状态

```bash
cat /sys/class/drm/*/status
# 桌面会话下
xrandr --query
```

## MIPI DSI 屏

1. 将 FFC 排线按丝印方向插入 DSI 连接器。
2. 屏幕供电与 GND 按板卡引脚定义接取（R5A：40-pin 的 Pin 2 / Pin 6）。
3. 启用 TBoard 镜像自带的屏幕 overlay（确切文件名与镜像版本对应），然后重启。

## 相关页面

- [TBoard R5A](/tboard-r5a)
- [R5A 40-PIN 引脚定义](/r5a-pinout) — DSI 屏供电引脚。
