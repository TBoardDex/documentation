---
title: "SPI"
sidebar_label: "SPI"
sidebar_position: 5
slug: "/spi"
---

# SPI

RK3588(S) 带有硬件 SPI 控制器，TBoard 板卡把它们引到 40-pin 排针。哪个控制器
引到哪些引脚、带几路片选，由板卡决定——请查看 Boards 下对应板卡的引脚定义页
与接口使用页。电平为 **3.3 V**。

## 确认总线可用

控制器需要由 overlay 启用并同时导出 `spidev`，否则引脚保持 GPIO 功能，也不会
出现 `/dev/spidev*`：

```bash
ls /boot/dtb/overlay/ | grep spi             # TBoard SDK 镜像
ls /boot/dtb/rockchip/overlay/ | grep spi    # Armbian 镜像
```

在 `/boot/uEnv/uEnv.txt`（SDK 镜像）或 `/boot/armbianEnv.txt` 的 `overlays=` 行
中启用对应项，`sync` 后重启，再检查：

```bash
ls /dev/spidev*
# 例如：/dev/spidev0.0  /dev/spidev0.1
```

`spidev0.0` 对应片选 0，`spidev0.1` 对应片选 1。如果只有一个节点，说明该
overlay 只导出了一路片选——请改用声明两路的版本，或在 overlay 中再声明一个
器件。

## 回环测试

用跳线短接 **MOSI 与 MISO**，发送数据并确认原样返回。使用内核的 `spidev_test`
工具：

```bash
spidev_test -D /dev/spidev0.0 -s 1000000 -v
```

没有该工具时，几行 Python 也可以：

```python
import spidev
spi = spidev.SpiDev()
spi.open(0, 0)              # 总线 0，片选 0
spi.max_speed_hz = 1_000_000
spi.mode = 0                # CPOL=0, CPHA=0
print(spi.xfer2([0x01, 0x02, 0x03]))
spi.close()
```

输出应与发送的字节一致。如果全是 `0x00` 或全 `0xFF`，依次检查跳线、片选引脚和
引脚复用配置。

## 器件参数

| 参数 | 说明 |
|---|---|
| 模式 | `0`–`3`，由器件手册中的 CPOL/CPHA 决定 |
| 速率 | 杜邦线上 1–10 MHz 较安全；50 MHz 需要短且阻抗受控的连接 |
| 字长 | 默认 8 位，不少 ADC 使用 16 位或 32 位 |
| 片选 | 低电平有效；部分器件要求片选跨传输保持（`spi-cs-high` / `cs_change`） |

overlay 同时定义了片选数量和最高时钟。在用户态把速率提到 overlay 声明值以上，
有些驱动会直接忽略——要改请在 overlay 中改。

## 相关页面

- [I2C](/i2c) — 低速传感器总线。
- [Linux](/linux#设备树与-overlay) — overlay 配置方法。
