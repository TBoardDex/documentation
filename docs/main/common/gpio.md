---
title: "GPIO Numbering & Control"
sidebar_label: "GPIO"
sidebar_position: 2
slug: "/gpio"
---

# GPIO Numbering & Control

GPIO stands for General Purpose I/O: pins the CPU can control directly. The
basic uses are driving high/low levels and detecting inputs; many pins are also
bound to on-chip peripherals and can be muxed as UART, I2C, SPI or PWM pins.

## GPIO architecture and numbering

Rockchip SoCs have 5 GPIO controllers (banks: GPIO0 – GPIO4); each bank is
split into ports A–D of 8 pins (index 0 – 7). A pin name has three parts:
**bank + port + index**, e.g. GPIO4_A0.

The same physical pin has different numbers in the sysfs and libgpiod schemes:

- sysfs global number: `global no. = bank × 32 + port × 8 + index`
- libgpiod offset: `offset = port × 8 + index`, used together with the gpiochip
  (its number equals the bank)

| Pin | bank | port | pin | sysfs global no. | libgpiod (chip, offset) |
|---|---|---|---|---|---|
| GPIO4_A0 | 4 | A | 0 | **128** | 4, **0** |
| GPIO1_A7 | 1 | A | 7 | **39** | 1, **7** |
| GPIO1_B0 | 1 | B | 0 | **40** | 1, **8** |
| GPIO4_A3 | 4 | A | 3 | **131** | 4, **3** |
| GPIO3_C3 | 3 | C | 3 | **115** | 3, **19** |

Which physical header pin each GPIO is routed to is board-specific — see your
board's pinout page under Boards. The same page lists which pins are usable as
plain GPIO and which carry a default or optional alternate function.

## Find the right chip

Chip numbering under `/dev/gpiochip*` can differ between images, so list them
first:

```bash
gpiodetect                     # list all GPIO controllers
gpioinfo                       # chips, lines, current direction and consumer
gpiofind GPIO4_A3              # "gpiochip4 3"
```

Global number 131 (GPIO4_A3) maps to line 3 of the fourth chip.

## Control with libgpiod (recommended)

libgpiod is the recommended interface. Install the command-line tools first:

```bash
sudo apt install gpiod
```

Example with GPIO4_A3 (chip 4, offset 3):

```bash
# All operations require root

gpioset gpiochip4 3=1   # output high
gpioset gpiochip4 3=0   # output low
gpioget gpiochip4 3     # read input
gpiomon gpiochip4 3     # monitor level changes (input mode)
```

`gpioset` releases the line when it exits, so a value written this way does not
survive. To keep a line driven, hold the process open (`gpioset --mode=wait`) or
set the line from your application. libgpiod v2 changed the option syntax
(`gpioset -c gpiochip4 3=1`, `gpioget -c gpiochip4 3`) — check
`gpioset --version` before copying commands from another page.

## Legacy sysfs interface

The vendor kernel still provides `/sys/class/gpio`, which is convenient in shell
scripts (libgpiod support was added in kernel 4.8 and the sysfs interface is
being phased out):

```bash
# All operations require root (sudo -i or prefix each command with sudo)

# Export (enable) GPIO4_A3
echo 131 > /sys/class/gpio/export

# Set the pin as input
echo in > /sys/class/gpio/gpio131/direction

# Read the pin value
cat /sys/class/gpio/gpio131/value

# Set the pin as output
echo out > /sys/class/gpio/gpio131/direction

# Drive the pin low
echo 0 > /sys/class/gpio/gpio131/value

# Drive the pin high
echo 1 > /sys/class/gpio/gpio131/value

# Unexport (reset) the pin
echo 131 > /sys/class/gpio/unexport
```

## Inspect the pin mux

Before writing a pin, confirm nothing else owns it:

```bash
sudo cat /sys/kernel/debug/gpio                     # exported and claimed lines
sudo cat /sys/kernel/debug/pinctrl/*/pinmux-pins    # per-pin mux owner
sudo cat /sys/kernel/debug/pinctrl/*/pinconf-pins   # pull-up / pull-down setting
```

A line that shows a consumer name in `/sys/kernel/debug/gpio` is already taken by
a driver, for example a regulator or an LED.

## One function per pin

A pin carries only one function at a time. Enabling an alternate function
(I2C / SPI / UART / PWM / CAN) through the device tree takes the pin away from
plain GPIO, and the reverse. Most boards route only a subset of SoC pins to the
header and enable a subset of those by default — the board's pinout page is the
authoritative list, and the board's interface page shows how to enable the rest.

## Electrical notes

> All header pins are 3.3 V and not 5 V tolerant — do not feed 5 V logic into a
> GPIO. Switch external loads (relays, motors …) through a transistor or MOSFET
> instead of powering them from the pin.

## Troubleshooting

| Symptom | Cause |
|---|---|
| `gpioset: Device or resource busy` | A driver (or another process) already holds the line — check `gpioinfo` |
| Value written but pin does not move | Pin still muxed to a peripheral, or an external driver fights it |
| Pin reads 0 regardless of input | Missing pull-up: enable `bias-pull-up` in the device tree or add an external resistor |
| Board resets when a load switches | Load draws more than the pin can source (a few mA); use a transistor or MOSFET |

## Related

- [PWM](/pwm) — PWM channel usage on the same pins.
- [I2C](/i2c) · [SPI](/spi) · [UART & Serial](/uart-serial) — the muxed alternatives.
- [GPIO Usage (R5A)](/r5a-gpio) — R5A pin assignment and safe-GPIO quick table.
- [Linux](/linux#device-tree-and-overlays) — enabling and disabling functions.
