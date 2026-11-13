---
title: "显示输出"
sidebar_label: "显示"
sidebar_position: 8
slug: "/display"
---

# 显示输出

RK3588(S) 可以同时驱动多路显示：HDMI（最高 8K）、DP 以及 MIPI DSI 屏幕。板卡
提供哪些输出、用什么连接器、支持到什么分辨率，由板卡决定——请查看 Boards 下
对应板卡的页面。板卡的所有输出可以同时工作，由 SoC 内不同的显示控制器驱动。

## 查看输出状态

```bash
cat /sys/class/drm/*/status                # 每路输出的 connected / disconnected
cat /sys/class/drm/card0-HDMI-A-1/modes    # 显示器上报的模式
modetest -M rockchip                       # 连接器、编码器、CRTC（libdrm-tests）
```

桌面版镜像中：

```bash
xrandr --query                      # X11：输出、模式、当前布局
```

服务器版没有显示管理器：屏幕只显示内核控制台（`console=tty1`），也没有
`xrandr`。这不是故障——要么换桌面版镜像，要么自行启动合成器。

## HDMI 与 DP

带这两种输出的板卡默认开启，无需 overlay。显示器黑屏时按顺序排查：

1. `cat /sys/class/drm/*/status` —— 状态是否为 `connected`？
2. 换线：4K 需要 High Speed / Premium 认证线材。
3. HDMI 转 VGA 可以用，但带独立供电的转换器要接上电源。
4. 笔记本的 HDMI 口通常是**只输出**，不能把笔记本当板卡的显示器。
5. DP 转 HDMI 需要**主动式**转换器；被动 Mini-DP → HDMI 线只有在板卡把 DP 口
   输出 HDMI 信号时才有效，通常并非如此。

## MIPI DSI 屏幕

1. 先断电——DSI 接口不支持热插拔，带电插拔可能短路电源轨，损坏屏幕或 SoC。
2. 按丝印标示的方向插入 FFC（金手指朝向要看清），再压紧锁扣。
3. 屏幕逻辑电源与背光可能来自 40-pin 排针（排针上有 3.3 V 与 5 V），也可能来自
   屏幕自带的升压电路。接线前请同时查阅屏幕规格书与对应板卡的引脚定义。
4. 启用与屏幕分辨率匹配的 overlay：
   ```bash
   ls /boot/dtb/overlay/ | grep -iE "dsi|panel|display"
   ```
   加入 `/boot/uEnv/uEnv.txt` 或 `/boot/armbianEnv.txt`，`sync` 后重启。

overlay 选错时典型现象是背光亮但黑屏，或画面滚动——都说明时序或初始化序列不
匹配。overlay 文件名中通常包含分辨率（例如 `…-1200x1920-…`），请选与屏幕完全
一致的那个。

## 多屏布局

```bash
xrandr --output HDMI-1 --primary --mode 1920x1080
xrandr --output DSI-1 --right-of HDMI-1 --mode 1200x1920
```

竖屏旋转同样用 `xrandr --rotate` 设置，它不改变屏幕时序。连接器名称
（`HDMI-1`、`DSI-1` …）因板卡而异——用 `xrandr --query` 或
`cat /sys/class/drm/card*/card*-*/status` 列出。

## 常见问题

| 现象 | 检查 |
|---|---|
| 所有接口都无输出 | `cat /sys/class/drm/*/status`，再看串口里的 DRM 报错 |
| 检测到输出但没有画面 | 是否桌面版镜像？会话是否运行在该输出上？ |
| 屏幕背光亮但黑屏 | 设备树（DTS）配置缺失或分辨率不对 |
| 画面偏移 / 折叠 | 设备树（DTS）配置中的屏幕时序错误 |
| 4K 下闪烁 | 线材质量，或用 `xrandr` 降一档模式 |

## 相关页面

- [音频](/audio) — HDMI / DP 音频通路。
- [Linux](/linux#设备树与-overlay) — 启用屏幕 overlay。
