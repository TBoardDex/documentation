import React from 'react';

/* Pinout function colour chips. The colour encodes the peripheral type so a
   40-pin table reads like the official pinmux diagram: GPIO green, UART
   orange, I2C purple, SPI pink, PWM teal, CAN blue, and so on. The kind is
   auto-detected from the function name prefix; pass `kind` to override
   (power / gnd are not detectable from a GPIO-style name). */
const PREFIX_KIND = [
  ['JTAG', 'jtag'],
  ['SPDIF', 'spdif'],
  ['UART', 'uart'],
  ['I2C', 'i2c'],
  ['SPI', 'spi'],
  ['PWM', 'pwm'],
  ['CAN', 'can'],
  ['I2S', 'i2s'],
  ['PDM', 'pdm'],
  ['GPIO', 'gpio'],
];

function detectKind(name) {
  const text = String(name).trim().toUpperCase();
  for (const [prefix, kind] of PREFIX_KIND) {
    if (text.startsWith(prefix)) return kind;
  }
  return 'gpio';
}

export default function PinFunc({ kind, children }) {
  const resolved = kind || detectKind(children);
  return <span className={`pinfunc pinfunc--${resolved}`}>{children}</span>;
}
