---
title: "基础编译"
sidebar_label: "Basic Compilation"
sidebar_position: 6
slug: "/basic-compile"
---

# 基础编译

![交叉编译流程图占位图 960 x 540 px](/img/placeholder-960x540.png)

> 图片占位：**960 × 540 px**（建议用途：构建流程图）。后期请替换为
> 相同尺寸的真实图片。

在 PC 上交叉编译一个小程序并放到 R5A 上运行。SDK 源码与成品固件镜像见
[资料下载](/downloads)页面。

## 1. 安装工具链（PC）

```bash
sudo apt install gcc-aarch64-linux-gnu
```

## 2. 编译测试程序（PC）

```c
/* hello.c */
#include <stdio.h>
int main(void) { printf("Hello from TBoard R5A\n"); return 0; }
```

```bash
aarch64-linux-gnu-gcc -o hello hello.c
file hello     # 应显示 "ARM aarch64"
```

## 3. 拷贝并运行（板卡）

```bash
scp hello <user>@<board-ip>:/home/<user>/
# 在板卡上：
./hello
```

## 4. 查看运行时 CPU 状态

8 核以三个 cpufreq policy 呈现（小核 / 大核簇）：

```bash
lscpu
cat /sys/devices/system/cpu/cpufreq/policy*/scaling_cur_freq
```

## 相关页面

- [SDK 源码](/sdk-sources) — 完整 SDK 与固件源码。
- [TBoard R5A](/tboard-r5a)
