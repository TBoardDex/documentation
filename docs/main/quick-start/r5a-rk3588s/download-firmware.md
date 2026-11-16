---
title: "Download Firmware"
sidebar_label: "Download Firmware"
sidebar_position: 3
slug: "/download-firmware"
---

# Download Firmware

## Pick the right image

All R5A images are available from either entry point below:

<div className="tb-dlcards">
  <a className="tb-dlcard" href="https://github.com/TBoardDex/tboard-manifest/releases" target="_blank" rel="noopener noreferrer">
    <span className="tb-dlcard__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg>
    </span>
    <span className="tb-dlcard__body">
      <span className="tb-dlcard__title">GitHub Releases</span>
      <span className="tb-dlcard__desc">Images and MD5 checksums, recommended from overseas</span>
    </span>
    <span className="tb-dlcard__arrow">→</span>
  </a>
  <a className="tb-dlcard" href="https://pan.baidu.com/s/1YI3ILl_OfBNq9dyvJ1gJTw?pwd=egjr" target="_blank" rel="noopener noreferrer">
    <span className="tb-dlcard__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17a4 4 0 01-.6-7.96A6 6 0 0118 9.5a3.5 3.5 0 01.5 7H7z" /><path d="M12 12.5V19M9.5 16.5L12 19l2.5-2.5" /></svg>
    </span>
    <span className="tb-dlcard__body">
      <span className="tb-dlcard__title">Baidu Netdisk (百度网盘)</span>
      <span className="tb-dlcard__desc">Fast downloads inside China, share code egjr</span>
    </span>
    <span className="tb-dlcard__arrow">→</span>
  </a>
</div>

Confirm the image:

- **Board model**: TBoard R5A.

For storage we recommend a **32 GB eMMC module** and a **microSD card**, with at
least one of them installed.

## Verify before flashing

Check the MD5 checksum of the downloaded file before writing it. The download
page provides the `.img` image together with its `-md5.txt` checksum file.

**Windows** (run in cmd):

```bat
certutil -hashfile TBoard-R5A-ubuntu22.04-GNOME-V1.0.0.img MD5
:: compare the output with the value in the -md5.txt file
```

<img src="/img/r5a-md5-windows.png" alt="Verifying MD5 with certutil on Windows" width="700" />

**Linux** (`md5sum`):

```bash
md5sum TBoard-R5A-debian11-Xfce-V1.0.0.img
# compare the output with the value in the -md5.txt file
```

<img src="/img/r5a-md5-linux.png" alt="Verifying MD5 with md5sum on Linux" width="700" />

## Related

- [Downloads](/downloads)
- [Flashing the Image](/flashing) — next step.
