---
title: "UART 与串口"
sidebar_label: "UART 与串口"
sidebar_position: 3
slug: "/uart-serial"
---

# UART 与串口

瑞芯微方案的板卡沿用同一串口约定：一路 **1500000 波特率的调试串口**，加上若干
可引到 40-pin 排针的通用 UART。每个 UART 占哪些引脚、默认镜像中启用哪几路，由
板卡决定——请查看 Boards 下对应板卡的引脚定义页与接口使用页。

## 调试串口

串口参数：**1500000 波特率、8 数据位、1 停止位、无校验、无流控**。请使用
**3.3 V TTL** 电平的 USB 转串口模块，不要直接接 RS-232 电平的转换器。控制台
的 TX / RX 与 GND 引脚请查对应板卡的引脚定义页。

```bash
# Linux
sudo picocom -b 1500000 /dev/ttyUSB0
# 或
sudo minicom -D /dev/ttyUSB0 -b 1500000
```

Windows 下用 PuTTY / MobaXterm，参数相同。没有显示器时，串口可以看到 U-Boot
输出和 Linux 登录提示。

该控制台是 `ttyFIQ0`，由瑞芯微 FIQ debugger 驱动，并非普通 8250 串口。这带来
两个限制：波特率由设备树固定（只支持 115200 与 1500000），修改内核命令行上的
`console=` 也不能把控制台换到别的 UART。

接线为 **TX 接 RX、RX 接 TX**，GND 对接。只显示光标、没有任何字符通常是波特率
不匹配；看到乱码一般是没接地。

## 通用 UART

大多数板卡上通用 UART **默认关闭**，由设备树 overlay 启用。overlay 文件名以
当前镜像中的实际文件为准——文件名编码了 SoC、板卡与复用编号：

```bash
ls /boot/dtb/overlay/ | grep uart          # TBoard SDK 镜像
ls /boot/dtb/rockchip/overlay/ | grep uart # Armbian 镜像
```

在所属镜像类型的配置文件中启用（见 [Linux](/linux#设备树与-overlay)），然后
`sync` 并重启。

设备节点编号由板级设备树的 `aliases` 决定，请实际确认而不是猜：

```bash
ls -l /dev/ttyS*
dmesg | grep -i "ttyS\|uart"
```

## 回环测试

用跳线短接 TX 与 RX，确认数据能原样回来：

```bash
stty -F /dev/ttyS1 115200 raw -echo
cat /dev/ttyS1 &
printf 'hello\n' > /dev/ttyS1
```

能看到 `hello` 就说明控制器、引脚复用和电平转换都正常。之后再去对接真实设备：
按外设要求设置波特率和帧格式（`stty -F /dev/ttyS1 9600 cs8 -cstopb -parenb`）。
瑞芯微 UART 最高支持 4 Mbaud，但杜邦线很少能跑那么高。

## 在应用程序中使用

`/dev/ttyS*` 就是普通字符设备：`open()` 打开、`termios` 设置参数、`read()` /
`write()` 收发。建议使用现成库（Python 的 `pyserial`、C++ 的
`asio::serial_port`），超时与半包处理都已经做好。如果重启后设备节点消失，是
overlay 没生效，而不是驱动有问题。

## 相关页面

- [首次启动](/first-boot) — 首次开机时使用串口。
- [Linux](/linux#设备树与-overlay) — 启用 overlay。
- [GPIO](/gpio) — 把同一引脚当普通 GPIO 使用。
