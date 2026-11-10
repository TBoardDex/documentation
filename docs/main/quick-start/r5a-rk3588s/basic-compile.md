---
title: "Basic Compilation"
sidebar_label: "Basic Compilation"
sidebar_position: 6
slug: "/basic-compile"
---

# Basic Compilation

![cross-compile flow diagram placeholder 960 x 540 px](/img/placeholder-960x540.png)

> Image placeholder: **960 × 540 px** (suggested use: build flow diagram).
> Replace it later with a verified image of the same dimensions.

Cross-compile a small C program on your PC and run it on the R5A. SDK sources
and ready-made firmware images are on the [Downloads](/downloads) page.

## 1. Install the toolchain (PC)

```bash
sudo apt install gcc-aarch64-linux-gnu
```

## 2. Build a test program (PC)

```c
/* hello.c */
#include <stdio.h>
int main(void) { printf("Hello from TBoard R5A\n"); return 0; }
```

```bash
aarch64-linux-gnu-gcc -o hello hello.c
file hello     # should report "ARM aarch64"
```

## 3. Copy and run (board)

```bash
scp hello <user>@<board-ip>:/home/<user>/
# on the board:
./hello
```

## 4. Check the CPU at runtime

The octa-core layout appears as three cpufreq policies (little / big clusters):

```bash
lscpu
cat /sys/devices/system/cpu/cpufreq/policy*/scaling_cur_freq
```

## Related

- [SDK Sources](/sdk-sources) — full SDK and firmware sources.
- [TBoard R5A](/tboard-r5a)
