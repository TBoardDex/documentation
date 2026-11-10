---
title: "MIPI CSI 摄像头"
sidebar_label: "Camera"
sidebar_position: 9
slug: "/camera"
---

# MIPI CSI 摄像头

![摄像头模组连接占位图 800 x 450 px](/img/placeholder-800x450.png)

> 图片占位：**800 × 450 px**（建议用途：接法照片 / 接线示意图）。后期请替换为
> 相同尺寸的真实图片。

RK3588(S) 内置 ISP 与 MIPI CSI 输入。TBoard 板卡通过 CSI 连接器接入摄像头
模组；连接器数量与支持的模组型号由板卡决定——例如 R5A 支持 IMX219 系列
模组（见 [TBoard R5A](/tboard-r5a)）。

## 连接摄像头

1. 先给板卡断电。
2. 掀开 CSI 连接器的 FFC 卡扣，按丝印方向插入排线后压回卡扣。
3. 上电并启用 TBoard 镜像自带的摄像头 overlay（确切文件名与镜像版本对应），
   然后重启。

## 验证采集

```bash
v4l2-ctl --list-devices
v4l2-ctl -d /dev/video0 --list-formats-ext
# 抓一帧：
v4l2-ctl -d /dev/video0 --set-fmt-video=width=1920,height=1080,pixelformat=NV12   --stream-mmap --stream-count=1 --stream-to=frame.nv12
```

如果没有出现 `/dev/video*` 节点，请检查排线方向与 overlay 是否启用。

## 相关页面

- [TBoard R5A](/tboard-r5a) — R5A 支持的摄像头模组。
- [R5A 40-PIN 引脚定义](/r5a-pinout)
