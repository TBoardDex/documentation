---
title: "其他"
sidebar_label: "概览"
sidebar_position: 1
slug: "/others"
---

# 其他

![TBoard 系统管理总览占位图 640 x 360 px](/img/placeholder-640x360.png)

> 图片占位：**640 × 360 px**（建议用途：总览配图）。后期请替换为相同尺寸的
> 真实图片。

这里收录既不属于首次启动流程、也不属于某个单独接口的系统级内容：板卡识别、
远程访问、文件传输、时间同步、散热控制与看门狗。

## 识别板卡

```bash
cat /proc/device-tree/model      # 设备树中的型号字符串
cat /proc/device-tree/compatible # "rockchip,rk3588s" 与板级兼容字符串
uname -a                         # 内核版本与构建日期
cat /etc/os-release              # 发行版
neofetch                         # 一屏概览
```

硬件版本与序列号印在丝印上，版本号很关键：V1.1 把 CSI1 的 I2C 从 I2C3 改到了
I2C4，并更换了 Wi-Fi 模组，见[硬件资料](/hardware-files)。

## 远程访问

镜像默认已启用 SSH 服务，用默认账号登录并立即修改密码。

```bash
# 在 PC 上执行
ssh tboard@192.168.10.100
scp file.bin tboard@192.168.10.100:/home/tboard/
scp -r tboard@192.168.10.100:/home/tboard/logs ./
```

| 任务 | 命令 |
|---|---|
| 找到板卡地址 | `ip a`，或在 PC 上扫描局域网 |
| 修改主机名 | `sudo hostnamectl set-hostname my-gateway` |
| 以 root 身份拷文件 | 先 `scp` 到 `/tmp`，再在板卡上 `sudo mv` |
| 断网后继续跑 | 长任务放在 `tmux` 或 `nohup` 中 |

需要图形界面时请使用桌面版镜像；服务器版上装 `xrdp` / VNC 也可以，但必须先装
桌面环境（`sudo apt install xfce4 xrdp`）。注意板载 GPU 由本地会话占用，远程
桌面会话走软件渲染，流畅度会下降。

## 文件传输

| 方式 | 适用场景 |
|---|---|
| `scp` / `sftp` | 少量文件，零配置 |
| NFS 挂载 | 在主机上编辑、在板卡上运行 |
| `rsync` | 大目录、可断点续传、增量同步 |
| U 盘 | 没有网络、或要传大镜像 |

NFS 挂载（主机把 `/nfs` 共享给同一局域网）：

```bash
# 主机端
sudo apt install nfs-kernel-server
echo "/nfs *(rw,sync,no_root_squash)" | sudo tee -a /etc/exports
sudo systemctl restart nfs-kernel-server

# 板卡端
sudo mkdir -p /mnt/nfs
sudo mount -t nfs -o proto=tcp,nolock 192.168.10.10:/nfs /mnt/nfs
```

只有在手工挂载成功后，才把挂载项写入 `/etc/fstab`（配合
`noauto,x-systemd.automount`）——否则开机时主机不在线会拖慢所有服务。

## 时间与 RTC

板载 **HYM8563** RTC 挂在 I2C6（地址 `0x51`），并预留了备份电池接口；不装电池
时断电即停走。

```bash
sudo hwclock -r            # 读取 RTC
sudo hwclock --systohc     # 系统时间 -> RTC
sudo hwclock --hctosys     # RTC -> 系统时间
timedatectl                # 时区与 NTP 状态
sudo timedatectl set-timezone Asia/Shanghai
```

有网络时让 `systemd-timesyncd` 负责校时，并在开机后回写一次 RTC：

```bash
sudo timedatectl set-ntp true
```

## 散热与风扇

风扇接口由热管理子系统通过 PWM 控制：

```bash
cat /sys/class/thermal/thermal_zone0/temp      # 摄氏度 × 1000
cat /sys/class/thermal/thermal_zone0/type
ls /sys/class/thermal/                       # 冷却设备与触发点
stress --cpu 8 --timeout 60                  # 压测时观察风扇
```

风扇曲线定义在设备树中（`pwm-fan` + `thermal-zones`），需要不同的温度/转速
映射时请改设备树，而不是在用户态硬调。未装散热器时板卡在 80 °C 附近降频，
这是正常保护，不是故障。

## 看门狗

```bash
ls /dev/watchdog*
echo 1 > /dev/watchdog        # 启动，内核自动喂狗
echo V > /dev/watchdog        # 把控制权交回内核
```

设备一旦被打开，内核会自动喂狗；如果写入的不是 `V` 又停止喂狗，超时后（默认
配置 44 秒）板卡会重启。量产设备建议用 `/etc/systemd/system.conf` 中的
`RuntimeWatchdogSec=`，而不是自己写喂狗脚本。

## 出问题时先查这些

| 现象 | 优先检查 |
|---|---|
| 完全无输出 | 电源电压/电流，然后看 1500000 波特率的调试串口 |
| 能进系统但没有显示 | `cat /sys/class/drm/*/status`，再看显示相关 overlay |
| 接口不存在（`/dev/i2c-*`、`/dev/spidev*`） | `uEnv.txt` / `armbianEnv.txt` 中该接口的 overlay |
| 改完 overlay 后外设无响应 | 引脚复用冲突——同一组引脚只能有一个功能 |
| 负载高时重启 | 供电预算：USB 设备、风扇、Type-C 适配器规格 |
| 识别不到 eMMC | `lsblk`、`dmesg \| grep mmc`，然后重插或重烧 |

动手修改前值得先看的日志：`dmesg -T | tail -50`、`journalctl -b -p err`，以及
`/var/log/syslog`（默认镜像中为 zram 设备）。

## 相关页面

- [Linux](/linux) — 账号、网络、overlay、内核。
- [UART 与串口](/uart-serial) — 用于恢复的控制台。
- [GPIO](/gpio) / [I2C](/i2c) — 接口验证方法。
- [TBoard R5A](/tboard-r5a) — 接口与规格。
