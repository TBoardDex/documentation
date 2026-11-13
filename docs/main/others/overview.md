---
title: "Others"
sidebar_label: "Overview"
sidebar_position: 1
slug: "/others"
---

# Others

![TBoard system administration overview placeholder 640 x 360 px](/img/placeholder-640x360.png)

> Image placeholder: **640 × 360 px** (suggested use: overview graphic). Replace it later
> with a verified image of the same dimensions.

System-level notes that belong neither to the first-boot path nor to a single
interface: board identification, remote access, file transfer, time keeping,
thermal control and watchdog.

## Identify the board

```bash
cat /proc/device-tree/model      # model string, from the device tree
cat /proc/device-tree/compatible # "rockchip,rk3588s" plus the board compatible
uname -a                         # kernel version and build date
cat /etc/os-release              # distribution
neofetch                         # one-screen summary
```

Hardware revision and serial number are printed on the silkscreen. The
revision matters: V1.1 moved CSI1 from I2C3 to I2C4 and changed the Wi-Fi module,
see [Hardware Files](/hardware-files).

## Remote access

The images ship with an SSH server enabled; log in with the default account and
change the password immediately.

```bash
# from the PC
ssh tboard@192.168.10.100
scp file.bin tboard@192.168.10.100:/home/tboard/
scp -r tboard@192.168.10.100:/home/tboard/logs ./
```

| Task | Command |
|---|---|
| Find the board's address | `ip a`, or scan the LAN from the PC |
| Change the hostname | `sudo hostnamectl set-hostname my-gateway` |
| Copy as root | `scp` to `/tmp`, then `sudo mv` on the board |
| Session survives network drops | run long jobs under `tmux` or `nohup` |

For a graphical session install a desktop image, or use `xrdp` / VNC on a server
image — both need a desktop environment first (`sudo apt install xfce4 xrdp`).
Note that the on-board GPU is used by the local session; a remote desktop session
renders in software and feels slower.

## File transfer

| Method | When to use |
|---|---|
| `scp` / `sftp` | A few files, no extra setup |
| NFS mount | Editing on the host, running on the board |
| `rsync` | Large trees, resumable, incremental |
| USB drive | No network, large images |

NFS mount, with the host exporting `/nfs` to the same LAN:

```bash
# on the host
sudo apt install nfs-kernel-server
echo "/nfs *(rw,sync,no_root_squash)" | sudo tee -a /etc/exports
sudo systemctl restart nfs-kernel-server

# on the board
sudo mkdir -p /mnt/nfs
sudo mount -t nfs -o proto=tcp,nolock 192.168.10.10:/nfs /mnt/nfs
```

Add the mount to `/etc/fstab` (with `noauto,x-systemd.automount`) only after it
works by hand — a missing host at boot otherwise delays every service.

## Time and RTC

The board has an **HYM8563** RTC on I2C6 (address `0x51`) with a backup battery
connector; without a battery the clock stops when power is removed.

```bash
sudo hwclock -r            # read the RTC
sudo hwclock --systohc     # system time -> RTC
sudo hwclock --hctosys     # RTC -> system time
timedatectl                # timezone and NTP status
sudo timedatectl set-timezone Asia/Shanghai
```

With network access, let `systemd-timesyncd` keep the clock correct and write it
back to the RTC once after boot:

```bash
sudo timedatectl set-ntp true
```

## Thermal control and fan

The fan connector is PWM-controlled through the thermal subsystem:

```bash
cat /sys/class/thermal/thermal_zone0/temp      # millidegrees Celsius
cat /sys/class/thermal/thermal_zone0/type
ls /sys/class/thermal/                       # cooling devices, trip points
stress --cpu 8 --timeout 60                  # load test while watching the fan
```

Fan curves are defined in the device tree (`pwm-fan` + `thermal-zones`). Change
them there, not in user space, if you need a different temperature/speed
mapping. A board without a heatsink throttles near 80 °C — that is normal
protection, not a fault.

## Watchdog

```bash
ls /dev/watchdog*
echo 1 > /dev/watchdog        # start, kernel keeps kicking it
echo V > /dev/watchdog        # hand control back to the kernel
```

Once the device is opened, the kernel pets it automatically; if you write
anything other than `V` and then stop writing, the board reboots after the
timeout (44 s in the default configuration). Use `systemd`'s
`RuntimeWatchdogSec=` in `/etc/systemd/system.conf` for production devices
instead of a hand-written kick script.

## First things to check when something fails

| Symptom | Check first |
|---|---|
| No output at all | Power supply voltage/current, then the serial console at 1500000 baud |
| Boots to a shell but no display | `cat /sys/class/drm/*/status`, then the display overlay |
| Interface missing (`/dev/i2c-*`, `/dev/spidev*`) | The overlay for that interface in `uEnv.txt` / `armbianEnv.txt` |
| Peripheral silent after an overlay change | Pin mux conflict — one function per pin group |
| Board reboots under load | Power budget: USB devices, fan, Type-C adapter rating |
| eMMC not detected | `lsblk`, `dmesg \| grep mmc`, then re-seat or re-flash |

Logs worth reading before changing anything: `dmesg -T | tail -50`,
`journalctl -b -p err`, and `/var/log/syslog` (a zram device in the default
image).

## Related

- [Linux](/linux) — accounts, network, overlays, kernel.
- [UART & Serial](/uart-serial) — the console used for recovery.
- [GPIO](/gpio) / [I2C](/i2c) — interface verification.
- [TBoard R5A](/tboard-r5a) — connectors and specifications.
