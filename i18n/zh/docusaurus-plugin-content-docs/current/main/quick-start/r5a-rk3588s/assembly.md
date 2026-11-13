---
title: "组装与连接"
sidebar_label: "组装与连接"
sidebar_position: 2
slug: "/assembly"
---

# 组装与连接

![组装步骤照片占位图 800 x 450 px](/img/placeholder-800x450.png)

> 图片占位：**800 × 450 px**（建议用途：操作照片 / 截图）。后期请替换为
> 相同尺寸的真实图片。

## 1. 安装散热

先把散热片贴到主芯片上；长时间高负载场景再装风扇——无风冷时 RK3588S 表面
温度可能超过 60 °C。注意散热鳍片不要压住 40-pin 排针和摄像头 / 屏幕排线座。

![散热安装照片占位图 800 x 450 px](/img/placeholder-800x450.png)

> 图片占位：**800 × 450 px**（建议用途：散热片 / 风扇安装照片）。后期请替换为
> 相同尺寸的真实图片。

## 2. 接入存储

把 eMMC 模块插入模块槽，或把 microSD 卡（≥ 32 GB）插入卡槽。
注意启动顺序：**优先 eMMC**，其次 microSD。

![eMMC 模块与 microSD 卡槽位置（板卡背面）](/img/r5a-storage-install.png)

## 3. 连接显示

- **HDMI**，两种接线方式任选其一：
  - **Micro HDMI 转 HDMI 母线** + 一根标准 HDMI 线：母线接板卡的 Micro HDMI
    口，再经标准 HDMI 线连接显示器；

  ![Micro HDMI 转 HDMI 母头转接线](/img/r5a-hdmi-female-adapter.png)

  - 一根 **Micro HDMI 转 HDMI 公线**（Micro HDMI 公头 → HDMI 公头）：可直接接
    HDMI 显示器。

  ![Micro HDMI 转 HDMI 双公头线](/img/r5a-hdmi-direct-cable.png)

- **DP**，两种接线方式任选其一：
  - **Mini DP 转 HDMI 线**（有源）：接 HDMI 显示器——DP 转 HDMI 只能用**有源**
    方案；

  ![Mini DP 转 HDMI 线](/img/r5a-minidp-hdmi.png)

  - **Mini DP 转 DP 线**：直连 DP 显示器。

  ![Mini DP 转 DP 线](/img/r5a-minidp-dp.png)
- **MIPI DSI 屏幕**：15-pin FFC 排线插入 DSI 接口，并从 40-pin 的 Pin 2 /
  Pin 6 取 5 V / GND——详见[显示输出](/display)。

## 4. 网络与外设

- 有线网络：插入 RJ45 网线（默认 DHCP），或使用板载 Wi-Fi 6 / 蓝牙 5.2。
- 键鼠：四个 USB-A 口任接（2× USB 3.0、2× USB 2.0）。
- 调试串口（可选）：3.3 V USB 转 TTL 接 Pin 8（TX）/ Pin 10（RX），GND 接
  Pin 6——详见 [UART 与串口](/uart-serial)。

## 5. 上电前检查清单

- [ ] 散热已安装，板上无松动物件
- [ ] 启动介质已插入（卡或 eMMC）
- [ ] 显示器已连接（如需本地输出）
- [ ] 5 V / 3 A Type-C 电源就绪——只接 **PWR IN** 口，不要接 USB 3.0 口

## 相关页面

- [下载固件](/download-firmware) — 下一步。
- [TBoard R5A](/tboard-r5a) — 接口布局。
