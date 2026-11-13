---
title: "MIPI CSI 摄像头"
sidebar_label: "摄像头"
sidebar_position: 9
slug: "/camera"
---

# MIPI CSI 摄像头

RK3588(S) 内置 ISP 与 MIPI CSI 输入。TBoard 板卡提供 CSI 连接器用于接摄像头
模组；连接器数量与支持的模组系列由板卡决定——请查看 Boards 下对应板卡的页面。

## 连接摄像头

1. 断开板卡电源。
2. 打开 CSI 连接器的 FFC 锁扣，按丝印标示的方向插入排线（金手指朝向要看清），
   再压回锁扣。
3. 上电，启用镜像自带的摄像头 overlay（文件名以你的镜像版本与 sensor 为准），
   重启。

```bash
ls /boot/dtb/overlay/ | grep -i camera            # TBoard SDK 镜像
ls /boot/dtb/rockchip/overlay/ | grep -i camera   # Armbian 镜像
```

overlay 中声明了 sensor 节点、I2C 地址、时钟与 CSI lane 数量。lane 数不匹配是
“能识别但出不了图”的常见原因：2-lane 模组配 4-lane overlay（或反之）会在
stream-on 阶段失败。

## 确认摄像头已识别

按你启用的 overlay 取得 sensor 名称，然后检查探测日志：

```bash
dmesg | grep -i <sensor名称>    # 驱动版本、检测到的芯片 ID
v4l2-ctl --list-devices         # 采集节点与 ISP 节点
media-ctl -p -d /dev/media0     # 通路：sensor -> dphy -> rkcif -> rkisp
```

正常的探测日志会给出 sensor 名称与 I2C 地址，例如
`imx219 4-0010: Detected IMX219 sensor`。没有地址时，在 overlay 分配的 I2C 总线
上执行 `i2cdetect -y <总线号>`——无响应说明供电、排线方向或 overlay 有问题。

## 采集图像

每路摄像头经 ISP 后会产生多个 video 节点：self path、main path 与 metadata。
除非需要未处理的 Bayer 数据，请使用 ISP 节点而不是裸 `rkcif` 节点。各板卡页面
会给出该镜像上常用的节点名称。

```bash
# 查看支持的格式与分辨率
v4l2-ctl -d /dev/video0 --list-formats-ext

# 抓一帧 1920x1080 NV12
v4l2-ctl -d /dev/video0 \
  --set-fmt-video=width=1920,height=1080,pixelformat=NV12 \
  --stream-mmap --stream-count=1 --stream-to=frame.nv12
```

用 GStreamer 预览（桌面版镜像已安装）：

```bash
gst-launch-1.0 v4l2src device=/dev/video0 ! \
  video/x-raw,width=1920,height=1080,format=NV12 ! \
  videoconvert ! autovideosink
```

NV12 裸数据可以转成 PNG 查看：

```bash
ffmpeg -f rawvideo -pixel_format nv12 -video_size 1920x1080 -i frame.nv12 frame.png
```

## 多摄像头

RK3588 的 ISP 支持复用：单个 ISP 最多服务 4 路 sensor，分辨率相应下降（2 路
→ 3840×2160，3–4 路 → 2560×1536）。每路摄像头需要各自的 overlay（对应各自的
CSI 连接器）以及不同的 sensor I2C 地址——多数模组提供地址选择电阻正是为此。

## 常见问题

| 现象 | 检查 |
|---|---|
| 没有 `/dev/video*` 节点 | overlay 未启用，或探测失败——看 `dmesg` |
| 探测报 `-ENODEV` / 无地址 | 排线方向、模组供电、overlay 选错 |
| 有节点但 stream-on 超时 | lane 数不匹配，或 link 频率不被支持 |
| 画面偏绿 / 偏紫 | 媒体通路中的 Bayer 顺序错误 |
| 高分辨率丢帧 | 增加缓冲区或降低分辨率；`dmesg` 中查 `csi` 报错 |

## 相关页面

- [显示输出](/display) — 预览视频流。
- [Linux](/linux#设备树与-overlay) — overlay 配置方法。
