---
title: "显示（R5A）"
sidebar_label: "显示"
sidebar_position: 9
slug: "/r5a-display"
---

# 显示（R5A）

[显示输出](/display) 页中的检查命令与 DSI 接线规则对 R5A 完全适用，本页给出
板卡携带的输出接口。

## R5A 的显示输出

| 输出 | 连接器 | 说明 |
|---|---|---|
| HDMI | Micro HDMI | 最高 8Kp60；支持热插拔，带音频 |
| DP | Mini DP | 最高 4Kp60；转 HDMI 需要**主动式**转换线 |
| MIPI DSI | FPC 连接器 | 仅接屏幕，不可带电插拔 |

三路可同时输出，由 SoC 内不同的显示控制器驱动。设备树中 HDMI0 由 VP0 驱动
（VP0 与 VP1 拼接可支持 8K 输出），DDC / HPD / CEC 引脚为 `hdmim0_tx0_*`，
使能脚为 GPIO4_B6；DP0 由 VP2 驱动，经 Type-C 侧的 `usbdp_phy0` 引出 2 条
lane（`dp-lane-mux = <0 1>`）。

## 启用 DSI 屏幕

1. 先断电——DSI 接口不支持热插拔。
2. 按丝印标示的方向插入 FFC（金手指朝向要看清），再压紧锁扣。
3. 屏幕逻辑电源与背光来自 40-pin 排针（Pin 1 或 17 为 3.3 V，Pin 2 或 4 为
   5 V）以及屏幕自带的升压电路——接线前先看屏幕规格书。
4. 手动修改板级 dts 配置，写入与屏幕匹配的面板节点（面板时序、DSI host 等
   参数），重新编译并烧写内核镜像。出厂设备树（`rk3588s-TBoard-R5A.dts`）
   不含任何 DSI 面板节点，但屏幕供电（`vcc3v3_lcd_n`，GPIO3_C2）与背光
   （PWM13，40 kHz，`&backlight`，默认关闭）已有模板可参考。

面板时序与分辨率一一对应（例如 1200x1920），请选择与屏幕规格书完全一致的
参数。状态检查与多屏布局命令见[显示输出](/display)。

## 相关页面

- [显示输出](/display) — 状态检查、DSI 规则、多屏布局。
- [概览](/tboard-r5a) — 连接器类型与最高分辨率。
- [R5A 40-PIN 引脚定义](/r5a-pinout) — DSI 屏幕的供电引脚。
- [音频](/audio) — HDMI / DP 音频通路。
