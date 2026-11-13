import React from 'react';

/* Pin-number colour chips for the 40-pin header table. The fill encodes the
   pin's rail on the R5A header so the table scans like a printed pinout card:
   3V3 yellow, 5V0 red, GND black, pins 27/28 blue, every GPIO green. The
   category is detected from the pin number; pass `kind` to override
   (3v3 / 5v0 / gnd / special / gpio). */
const PIN_KINDS = [
  [[1, 17], '3v3'],
  [[2, 4], '5v0'],
  [[6, 9, 14, 20, 25, 30, 34, 39], 'gnd'],
  [[27, 28], 'special'],
];

function detectKind(num) {
  for (const [pins, kind] of PIN_KINDS) {
    if (pins.includes(num)) return kind;
  }
  return 'gpio';
}

export default function PinNum({ kind, children }) {
  const num = parseInt(String(children).trim(), 10);
  const resolved = kind || detectKind(num);
  return <span className={`pinnum pinnum--${resolved}`}>{children}</span>;
}
