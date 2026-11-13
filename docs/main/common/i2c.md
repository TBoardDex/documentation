---
title: "I2C"
sidebar_label: "I2C"
sidebar_position: 4
slug: "/i2c"
---

# I2C

Rockchip-based TBoard boards expose I2C buses on the 40-pin header for sensors,
RTCs and other low-speed peripherals. All buses run at **3.3 V** with onboard
pull-ups. How many buses are exposed, their numbers, pin positions and default
state are board-specific — see your board's pinout and interface page under
Boards.

## Buses and onboard devices

A board typically keeps some SoC I2C controllers for onboard peripherals
(audio codec, RTC, camera sensor, PMIC monitor) and routes one or two buses to
the header for user devices. The onboard buses are visible too:

```bash
ls /dev/i2c-*
```

Do not reconfigure a bus that already carries an onboard chip — the codec, RTC
or camera sensor on that bus will stop working. Your board's interface page
lists which buses are free for external devices.

## Scan the bus

```bash
i2cdetect -y 1        # probe bus 1
i2cdetect -y 6        # probe bus 6
i2cdetect -y -r 1     # read-mode scan, for devices that dislike quick writes
```

Address `UU` means the address is claimed by a driver; a number means a device
responded at that address. Onboard devices (RTC, codec) usually show `UU` on
their buses — that is expected, not a conflict.

## Read and write registers

```bash
i2cget -y 1 0x48 0x00            # read one byte
i2cset -y 1 0x48 0x01 0x60       # write one byte
i2cget -y 1 0x48 0x00 w          # read a 16-bit word
i2ctransfer -y 1 w1@0x48 0x00 r2 # write a register address, then read 2 bytes
```

`i2ctransfer` is the reliable form for register-based devices: a bare `i2cget`
performs a combined write/read that some chips reject. A `Remote I/O error`
(NACK) means either the address is wrong, the device is not powered, or the
pull-ups are missing.

## Bus speed and wiring

- Default clock is **100 kHz**; most sensors accept 400 kHz. Long wires or
  several devices on a breakout board are the usual reason to stay at 100 kHz.
- Total bus capacitance should stay below ~400 pF. Beyond that, lower the clock
  or add a bus buffer.
- Address conflicts cannot be resolved in software: two devices at the same
  address need a mux (TCA9548A) or a second bus.
- Never connect a 5 V I2C device without a level shifter — the SoC pins are not
  5 V tolerant.

## Related

- [SPI](/spi) — the other common low-speed bus.
- [Others](/others) — RTC time keeping.
- [Linux](/linux#device-tree-and-overlays) — overlay configuration.
