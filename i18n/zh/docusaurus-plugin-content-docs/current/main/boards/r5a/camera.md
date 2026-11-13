---
title: "摄像头（R5A）"
sidebar_label: "摄像头"
sidebar_position: 10
slug: "/r5a-camera"
---

# 摄像头（R5A）

[摄像头](/camera) 页中的通路说明与采集命令对 R5A 完全适用，本页给出连接器
与支持的模组。

## R5A 的 CSI

一路 MIPI CSI 连接器，兼容 **IMX219** 模组。sensor 默认关闭，且出厂设备树
（`rk3588s-TBoard-R5A.dts`）中没有任何 CSI / sensor 节点——需手动在板级 dts 中
添加 IMX219 节点（sensor、I2C 地址、DPHY 通路），重新编译并烧写内核镜像
后才能使用。

## 确认与验证

```bash
dmesg | grep -i imx219         # 探测：sensor 名称 + I2C 地址
v4l2-ctl --list-devices        # 采集节点与 ISP 节点
media-ctl -p -d /dev/media0    # sensor -> dphy -> rkcif -> rkisp 通路
```

正常的探测会报告 sensor 与其 I2C 地址，例如
`imx219 4-0010: Detected IMX219 sensor`。采集请使用 ISP 节点而不是裸 `rkcif`
节点——v4l2 与 GStreamer 命令及排障表见[摄像头](/camera)。

## 相关页面

- [摄像头](/camera) — 探测、采集、GStreamer 预览、排障。
- [概览](/tboard-r5a) — 支持的摄像头模组。
- [显示输出](/display) — 预览视频流。
