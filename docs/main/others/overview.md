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
neofetch                         # one-screen summary (not preinstalled: sudo apt install neofetch)
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

The stock image has **no watchdog device**. Verified on a bench TBoard R5A: `ls /dev/watchdog*` returns nothing, `/sys/class/watchdog` does
not exist, and the board device tree has no `&wdt` node. The driver is compiled
in — `snps,dw-wdt` is registered for `wdt: watchdog@feaf0000`
(`CONFIG_DW_WATCHDOG=y`) — it is only switched off in the device tree.

To enable it, add one node to `rk3588s-TBoard-R5A.dts`, rebuild the kernel and
flash the new `boot.img`:

```dts
&wdt {
    status = "okay";
};
```

```bash
# on the SDK host
./build.sh kernel                 # writes kernel/boot.img
# on the PC, board in Loader / Maskrom mode
upgrade_tool di -b boot.img       # or ./build.sh updateimg and flash the package
```

After the reboot `/dev/watchdog0` and `/sys/class/watchdog/watchdog0/` appear.
The DesignWare watchdog starts with the driver default period; read the real
value instead of assuming one:

```bash
cat /sys/class/watchdog/watchdog0/timeout
cat /sys/class/watchdog/watchdog0/identity
```

Either drive it by hand (`echo 1 > /dev/watchdog0`, then keep writing inside
the timeout; `V` hands control back to the kernel) or let systemd own it:

```bash
# /etc/systemd/system.conf
RuntimeWatchdogSec=15
ShutdownWatchdogSec=60
```

`systemctl daemon-reexec` applies that without a reboot. Without a kernel
rebuild the only reset path is an external supervisor, for example a GPIO
reset driven by an MCU.

**Default image status: no watchdog.** A hung stock board cannot reset itself.
## First things to check when something fails

| Symptom | Check first |
|---|---|
| No output at all | Power supply voltage/current, then the serial console at 1500000 baud |
| Boots to a shell but no display | `cat /sys/class/drm/*/status`, then the display-related DTS configuration |
| Interface missing (`/dev/i2c-*`, `/dev/spidev*`) | Whether the interface is enabled in the device tree and the dtb was replaced |
| Peripheral silent after a device tree change | Pin mux conflict — one function per pin group |
| Board reboots under load | Power budget: USB devices, fan, Type-C adapter rating |
| eMMC not detected | `lsblk`, `dmesg \| grep mmc`, then re-seat or re-flash |

Logs worth reading before changing anything: `dmesg -T | tail -50`,
`journalctl -b -p err`, and `/var/log/syslog` (on the eMMC root filesystem: `/dev/zram0` exists in the stock image but is used neither as swap nor as log storage).

## Related

- [Linux](/linux) — accounts, network, device tree, kernel.
- [UART & Serial](/uart-serial) — the console used for recovery.
- [GPIO](/gpio) / [I2C](/i2c) — interface verification.
- [TBoard R5A](/tboard-r5a) — connectors and specifications.
