---
title: "GPIO 编号与控制"
sidebar_label: "GPIO"
sidebar_position: 2
slug: "/gpio"
---

# GPIO 编号与控制

GPIO（General Purpose I/O，通用输入输出）是 CPU 可直接控制的引脚，最基本的用途
是高低电平输出与输入检测；部分引脚还与片上外设绑定，可复用为 UART、I2C、SPI、
PWM 等通讯引脚。

## GPIO 架构与编号

瑞芯微 SoC 内置 5 个 GPIO 控制器（bank：GPIO0 – GPIO4），每个 bank 分 A–D 四个
端口，每个端口 8 个引脚（索引 0 – 7）。引脚名由三部分组成：
**控制器（bank）+ 端口（port）+ 索引（pin）**，例如 GPIO4_A0。

同一物理引脚在 sysfs 与 libgpiod 两套体系中编号不同：

- sysfs 全局编号：`全局编号 = bank × 32 + port × 8 + index`
- libgpiod 组内偏移：`组内偏移 = port × 8 + index`，与 gpiochip（编号 = bank）搭配使用

| 引脚 | bank | port | pin | sysfs 全局编号 | libgpiod（chip，偏移） |
|---|---|---|---|---|---|
| GPIO4_A0 | 4 | A | 0 | **128** | 4，**0** |
| GPIO1_A7 | 1 | A | 7 | **39** | 1，**7** |
| GPIO1_B0 | 1 | B | 0 | **40** | 1，**8** |
| GPIO4_A3 | 4 | A | 3 | **131** | 4，**3** |
| GPIO3_C3 | 3 | C | 3 | **115** | 3，**19** |

每个 GPIO 实际引到排针的哪个脚由板卡决定——请查看 Boards 下对应板卡的引脚定义
页，该页同时会标出哪些引脚可直接作为 GPIO、哪些带默认或可选的复用功能。

## 找到对应的芯片

`/dev/gpiochip*` 的编号在不同镜像中可能不同，先列出来：

```bash
gpiodetect                     # 列出所有 GPIO 控制器
gpioinfo                       # 芯片、线路、当前方向与占用者
gpiofind GPIO4_A3              # 输出 "gpiochip4 3"
```

全局编号 131（GPIO4_A3）对应第 4 个芯片的第 3 号线路。

## 用 libgpiod 控制（推荐）

libgpiod 是推荐的控制方式，先安装命令行工具：

```bash
sudo apt install gpiod
```

以 GPIO4_A3（chip 4、组内偏移 3）为例：

```bash
# 以下操作需要 root 权限

gpioset gpiochip4 3=1   # 输出高
gpioset gpiochip4 3=0   # 输出低
gpioget gpiochip4 3     # 读取输入
gpiomon gpiochip4 3     # 监控电平变化（相当于输入模式）
```

`gpioset` 退出时会释放线路，所以这样写入的值不会保持。需要持续驱动时让进程
保持运行（`gpioset --mode=wait`），或在应用程序中设置。libgpiod v2 改了参数
写法（`gpioset -c gpiochip4 3=1`、`gpioget -c gpiochip4 3`），照抄其他页面的
命令前先看 `gpioset --version`。

## 传统 sysfs 接口

厂商内核仍然提供 `/sys/class/gpio`，在 shell 脚本中很方便（kernel 4.8 起加入
libgpiod 支持，sysfs 方式将逐渐废弃）：

```bash
# 以下操作需要 root 权限（sudo -i 或每条命令前加 sudo）

# 使能引脚 GPIO4_A3
echo 131 > /sys/class/gpio/export

# 设置引脚为输入模式
echo in > /sys/class/gpio/gpio131/direction

# 读取引脚的值
cat /sys/class/gpio/gpio131/value

# 设置引脚为输出模式
echo out > /sys/class/gpio/gpio131/direction

# 设置引脚为低电平
echo 0 > /sys/class/gpio/gpio131/value

# 设置引脚为高电平
echo 1 > /sys/class/gpio/gpio131/value

# 复位引脚
echo 131 > /sys/class/gpio/unexport
```

## 查看引脚复用

写引脚之前，先确认它没有被别处占用：

```bash
sudo cat /sys/kernel/debug/gpio                     # 已导出与被占用的线路
sudo cat /sys/kernel/debug/pinctrl/*/pinmux-pins    # 每个引脚的复用归属
sudo cat /sys/kernel/debug/pinctrl/*/pinconf-pins   # 上下拉配置
```

在 `/sys/kernel/debug/gpio` 中显示 consumer 名称的线路已被驱动占用，例如电源
管理或 LED。

## 一个引脚只有一个功能

一个引脚同一时刻只能有一个功能。通过设备树启用复用功能（I2C / SPI / UART /
PWM / CAN）就把引脚从普通 GPIO 拿走，反之亦然。SoC 只有一部分引脚引到排针，
其中又只有一部分默认启用——各板卡的引脚定义页是权威列表，其余功能的启用方法
见该板的接口使用页。

## 电气注意

> 所有排针均为 3.3 V 电平且不耐 5 V，请勿向 GPIO 引脚馈入 5 V 逻辑。驱动外部
> 负载（继电器、电机等）请使用三极管或 MOS 管，不要直接从引脚取电。

## 常见问题

| 现象 | 原因 |
|---|---|
| `gpioset: Device or resource busy` | 驱动（或其他进程）已占用该线路——用 `gpioinfo` 查 |
| 写入了值但引脚电平不变 | 引脚仍复用给外设，或外部器件在拉拽 |
| 无论输入什么都读到 0 | 缺少上拉：在设备树中加 `bias-pull-up`，或外接电阻 |
| 带负载切换时板卡复位 | 负载电流超过引脚驱动能力（几 mA），请用三极管或 MOS 管 |

## 相关页面

- [PWM](/pwm) — 同一引脚上的 PWM 用法。
- [I2C](/i2c) · [SPI](/spi) · [UART 与串口](/uart-serial) — 复用功能的替代用法。
- [GPIO 使用（R5A）](/r5a-gpio) — R5A 板级引脚分配与稳妥 GPIO 速查。
- [Linux](/linux#设备树与-overlay) — 启用与关闭功能的方法。
