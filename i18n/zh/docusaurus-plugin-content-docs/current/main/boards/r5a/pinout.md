---
title: "R5A 40-PIN 引脚定义"
sidebar_label: "40Pin引脚定义"
sidebar_position: 2
slug: "/r5a-pinout"
---

# R5A 40-PIN 引脚定义

R5A 提供 40-pin 排针，兼容大多数树莓派式传感器与扩展板。所有逻辑电平均为
**3.3 V**——请勿向 GPIO 引脚馈入 5 V 逻辑。每个 GPIO 引脚都可用作普通 GPIO；
信号名下方列出的是该引脚可选的复用功能。一个引脚同一时刻只有一个功能。

:::caution
出厂镜像中可用的只有默认功能与普通 GPIO。如需复用其他功能，需手动修改
dts 配置，并重新编译、烧写内核镜像后才能使用。
:::

各接口的启用方法与 DTS 配置示例见对应接口文档：[I2C（R5A）](/r5a-i2c)、
[UART 与串口（R5A）](/r5a-uart)、[SPI（R5A）](/r5a-spi)、[PWM（R5A）](/r5a-pwm)。

## 引脚表

`GPIO 编号` 为 Linux 全局（sysfs）编号：`32 × bank + 8 × port + pin`，例如
GPIO4_A3 = 32×4 + 8×0 + 3 = **131**。复用功能中的 `_M0/_M1/_M2 …` 后缀是引脚
复用编号（mux index），修改设备树时用于选择复用方案。

左列为奇数引脚，右列为偶数引脚；信号名下方的第二行是该引脚的复用功能。颜色按外设类型区分：

<PinFunc>GPIO4_A0</PinFunc> GPIO　<PinFunc>UART2_TX_M0</PinFunc> UART　<PinFunc>I2C1_SDA_M2</PinFunc> I2C　<PinFunc>SPI0_MOSI_M2</PinFunc> SPI　<PinFunc>PWM2_M1</PinFunc> PWM　<PinFunc>CAN1_RX_M1</PinFunc> CAN　<PinFunc>I2S1_SDO0_M0</PinFunc> I2S　<PinFunc>SPDIF1_TX_M1</PinFunc> SPDIF　<PinFunc>PDM1_SDI0_M1</PinFunc> PDM　<PinFunc>JTAG_TCK_M2</PinFunc> JTAG　<PinFunc kind="power">3V3 / 5V0</PinFunc> 电源　<PinFunc kind="gnd">GND</PinFunc> 地

| 信号（奇数） | GPIO 编号 | 引脚 | 引脚 | GPIO 编号 | 信号（偶数） |
|---:|:---:|:---:|:---:|:---:|:---|
| <PinFunc kind="power">3V3</PinFunc> | — | <PinNum>1</PinNum> | <PinNum>2</PinNum> | — | <PinFunc kind="power">5V0</PinFunc> |
| <PinFunc>GPIO0_D5</PinFunc><br/><PinFunc>I2C1_SDA_M2</PinFunc>   <PinFunc>SPI3_CS1_M2</PinFunc>   <PinFunc>I2S1_SDO3_M1</PinFunc>   <PinFunc>CAN2_TX_M1</PinFunc> | 29 | <PinNum>3</PinNum> | <PinNum>4</PinNum> | — | <PinFunc kind="power">5V0</PinFunc> |
| <PinFunc>GPIO0_D4</PinFunc><br/><PinFunc>I2C1_SCL_M2</PinFunc>   <PinFunc>SPI3_CS0_M2</PinFunc>   <PinFunc>I2S1_SDO2_M1</PinFunc>   <PinFunc>CAN2_RX_M1</PinFunc>   <PinFunc>PWM3_IR_M0</PinFunc>   <PinFunc>PDM0_SDI2_M1</PinFunc> | 28 | <PinNum>5</PinNum> | <PinNum>6</PinNum> | — | <PinFunc kind="gnd">GND</PinFunc> |
| <PinFunc>GPIO1_B7</PinFunc><br/><PinFunc>SPDIF1_TX_M0</PinFunc>   <PinFunc>PWM13_M2</PinFunc>   <PinFunc>UART1_RX_M1</PinFunc>   <PinFunc>I2C5_SDA_M3</PinFunc> | 47 | <PinNum>7</PinNum> | <PinNum>8</PinNum> | 13 | <PinFunc>GPIO0_B5</PinFunc><br/><PinFunc>UART2_TX_M0</PinFunc>   <PinFunc>I2S1_MCLK_M1</PinFunc>   <PinFunc>I2C1_SCL_M0</PinFunc>   <PinFunc>JTAG_TCK_M2</PinFunc> |
| <PinFunc kind="gnd">GND</PinFunc> | — | <PinNum>9</PinNum> | <PinNum>10</PinNum> | 14 | <PinFunc>GPIO0_B6</PinFunc><br/><PinFunc>UART2_RX_M0</PinFunc>   <PinFunc>I2S1_SCLK_M1</PinFunc>   <PinFunc>I2C1_SDA_M0</PinFunc>   <PinFunc>JTAG_TMS_M2</PinFunc> |
| <PinFunc>GPIO4_A0</PinFunc><br/><PinFunc>I2S1_MCLK_M0</PinFunc>   <PinFunc>SPI0_MISO_M1</PinFunc>   <PinFunc>UART9_RTSN_M1</PinFunc> | 128 | <PinNum>11</PinNum> | <PinNum>12</PinNum> | 39 | <PinFunc>GPIO1_A7</PinFunc><br/><PinFunc>PWM13_IR_M3</PinFunc>   <PinFunc>SPI2_CS0_M0</PinFunc>   <PinFunc>PDM0_SDI0_M1</PinFunc> |
| <PinFunc>GPIO4_A1</PinFunc><br/><PinFunc>I2S1_SCLK_M0</PinFunc>   <PinFunc>SPI0_MOSI_M1</PinFunc>   <PinFunc>UART9_CTSN_M1</PinFunc> | 129 | <PinNum>13</PinNum> | <PinNum>14</PinNum> | — | <PinFunc kind="gnd">GND</PinFunc> |
| <PinFunc>GPIO4_A2</PinFunc><br/><PinFunc>I2S1_LRCK_M0</PinFunc>   <PinFunc>SPI0_CLK_M1</PinFunc> | 130 | <PinNum>15</PinNum> | <PinNum>16</PinNum> | 33 | <PinFunc>GPIO1_A1</PinFunc><br/><PinFunc>UART6_TX_M1</PinFunc>   <PinFunc>SPI4_MOSI_M2</PinFunc>   <PinFunc>I2C2_SCL_M4</PinFunc> |
| <PinFunc kind="power">3V3</PinFunc> | — | <PinNum>17</PinNum> | <PinNum>18</PinNum> | 32 | <PinFunc>GPIO1_A0</PinFunc><br/><PinFunc>UART6_RX_M1</PinFunc>   <PinFunc>SPI4_MISO_M2</PinFunc>   <PinFunc>I2C2_SDA_M4</PinFunc> |
| <PinFunc>GPIO1_B2</PinFunc><br/><PinFunc>SPI0_MOSI_M2</PinFunc>   <PinFunc>UART4_RX_M2</PinFunc>   <PinFunc>PDM1_SDI3_M1</PinFunc> | 42 | <PinNum>19</PinNum> | <PinNum>20</PinNum> | — | <PinFunc kind="gnd">GND</PinFunc> |
| <PinFunc>GPIO1_B1</PinFunc><br/><PinFunc>SPI0_MISO_M2</PinFunc>   <PinFunc>PDM1_SDI2_M1</PinFunc> | 41 | <PinNum>21</PinNum> | <PinNum>22</PinNum> | 40 | <PinFunc>GPIO1_B0</PinFunc><br/><PinFunc>SPI2_CS1_M0</PinFunc>   <PinFunc>PDM1_SDI1_M1</PinFunc> |
| <PinFunc>GPIO1_B3</PinFunc><br/><PinFunc>SPI0_CLK_M2</PinFunc>   <PinFunc>UART4_TX_M2</PinFunc>   <PinFunc>PDM1_CLK1_M1</PinFunc> | 43 | <PinNum>23</PinNum> | <PinNum>24</PinNum> | 44 | <PinFunc>GPIO1_B4</PinFunc><br/><PinFunc>SPI0_CS0_M2</PinFunc>   <PinFunc>UART7_RX_M2</PinFunc>   <PinFunc>PDM1_CLK0_M1</PinFunc> |
| <PinFunc kind="gnd">GND</PinFunc> | — | <PinNum>25</PinNum> | <PinNum>26</PinNum> | 45 | <PinFunc>GPIO1_B5</PinFunc><br/><PinFunc>SPI0_CS1_M2</PinFunc>   <PinFunc>UART7_TX_M2</PinFunc> |
| <PinFunc>GPIO4_B0</PinFunc><br/><PinFunc>I2C6_SDA_M3</PinFunc>   <PinFunc>I2S1_SDI3_M0</PinFunc>   <PinFunc>UART8_TX_M0</PinFunc>   <PinFunc>SPI2_CS1_M1</PinFunc> | 136 | <PinNum>27</PinNum> | <PinNum>28</PinNum> | 137 | <PinFunc>GPIO4_B1</PinFunc><br/><PinFunc>I2C6_SCL_M3</PinFunc>   <PinFunc>I2S1_SDO0_M0</PinFunc>   <PinFunc>UART8_RX_M0</PinFunc>   <PinFunc>SPI0_CS1_M1</PinFunc>   <PinFunc>SPDIF1_TX_M1</PinFunc> |
| <PinFunc>GPIO4_A3</PinFunc><br/><PinFunc>UART0_TX_M2</PinFunc> | 131 | <PinNum>29</PinNum> | <PinNum>30</PinNum> | — | <PinFunc kind="gnd">GND</PinFunc> |
| <PinFunc>GPIO4_A4</PinFunc><br/><PinFunc>UART0_RX_M2</PinFunc>   <PinFunc>SPI2_MISO_M1</PinFunc>   <PinFunc>I2C3_SCL_M2</PinFunc> | 132 | <PinNum>31</PinNum> | <PinNum>32</PinNum> | 105 | <PinFunc>GPIO3_B1</PinFunc><br/><PinFunc>PWM2_M1</PinFunc>   <PinFunc>UART2_TX_M2</PinFunc> |
| <PinFunc>GPIO4_A5</PinFunc><br/><PinFunc>UART3_TX_M2</PinFunc>   <PinFunc>I2S1_SDI0_M0</PinFunc>   <PinFunc>SPI2_MOSI_M1</PinFunc>   <PinFunc>I2C3_SDA_M2</PinFunc> | 133 | <PinNum>33</PinNum> | <PinNum>34</PinNum> | — | <PinFunc kind="gnd">GND</PinFunc> |
| <PinFunc>GPIO4_A6</PinFunc><br/><PinFunc>UART3_RX_M2</PinFunc>   <PinFunc>I2S1_SDI1_M0</PinFunc>   <PinFunc>SPI2_CLK_M1</PinFunc>   <PinFunc>I2C5_SCL_M2</PinFunc> | 134 | <PinNum>35</PinNum> | <PinNum>36</PinNum> | 138 | <PinFunc>GPIO4_B2</PinFunc><br/><PinFunc>CAN1_RX_M1</PinFunc>   <PinFunc>PWM14_M1</PinFunc>   <PinFunc>I2S1_SDO1_M0</PinFunc>   <PinFunc>UART8_RTSN_M0</PinFunc>   <PinFunc>SPI0_CS0_M1</PinFunc>   <PinFunc>I2C7_SCL_M3</PinFunc> |
| <PinFunc>GPIO4_A7</PinFunc><br/><PinFunc>I2S1_SDI2_M0</PinFunc>   <PinFunc>SPI2_CS0_M1</PinFunc>   <PinFunc>I2C5_SDA_M2</PinFunc> | 135 | <PinNum>37</PinNum> | <PinNum>38</PinNum> | 139 | <PinFunc>GPIO4_B3</PinFunc><br/><PinFunc>CAN1_TX_M1</PinFunc>   <PinFunc>PWM15_IR_M1</PinFunc>   <PinFunc>I2S1_SDO2_M0</PinFunc>   <PinFunc>UART8_CTSN_M0</PinFunc>   <PinFunc>I2C7_SDA_M3</PinFunc> |
| <PinFunc kind="gnd">GND</PinFunc> | — | <PinNum>39</PinNum> | <PinNum>40</PinNum> | 115 | <PinFunc>GPIO3_C3</PinFunc><br/><PinFunc>PWM15_IR_M0</PinFunc>   <PinFunc>UART7_CTSN_M1</PinFunc>   <PinFunc>SPI1_CS1_M1</PinFunc>   <PinFunc>I2C8_SDA_M4</PinFunc> |

## 相关页面

- [GPIO 使用（R5A）](/r5a-gpio) — 编号对照表与命令示例。
- [概览](/tboard-r5a) — 板卡接口与规格。
- [Linux](/linux#设备树与-overlay) — 设备树基础。
