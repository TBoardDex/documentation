---
title: "下载固件"
sidebar_label: "下载固件"
sidebar_position: 3
slug: "/download-firmware"
---

# 下载固件

## 选择正确的镜像

所有 R5A 镜像都可以从下面两个入口直接获取：

<div className="tb-dlcards">
  <a className="tb-dlcard" href="https://github.com/TBoardDex/tboard-manifest/releases" target="_blank" rel="noopener noreferrer">
    <span className="tb-dlcard__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg>
    </span>
    <span className="tb-dlcard__body">
      <span className="tb-dlcard__title">GitHub Releases</span>
      <span className="tb-dlcard__desc">镜像与 MD5 校验文件，海外访问推荐</span>
    </span>
    <span className="tb-dlcard__arrow">→</span>
  </a>
  <a className="tb-dlcard" href="https://pan.baidu.com/s/1YI3ILl_OfBNq9dyvJ1gJTw?pwd=egjr" target="_blank" rel="noopener noreferrer">
    <span className="tb-dlcard__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17a4 4 0 01-.6-7.96A6 6 0 0118 9.5a3.5 3.5 0 01.5 7H7z" /><path d="M12 12.5V19M9.5 16.5L12 19l2.5-2.5" /></svg>
    </span>
    <span className="tb-dlcard__body">
      <span className="tb-dlcard__title">百度网盘</span>
      <span className="tb-dlcard__desc">国内高速下载，提取码 egjr</span>
    </span>
    <span className="tb-dlcard__arrow">→</span>
  </a>
</div>

确认镜像：

- **硬件型号**：TBoard R5A。

存储推荐 **32 GB eMMC** 与 **microSD 卡**，至少接入其中一个。

## 烧录前校验

写入前先核对下载文件的 MD5 校验值。下载页同时提供 `.img` 镜像与对应的
`-md5.txt` 校验值文件。

**Windows**（在 cmd 中输入命令）：

```bat
certutil -hashfile TBoard-R5A-ubuntu22.04-GNOME-V1.0.0.img MD5
:: 输出值与 -md5.txt 中公布的校验值比对
```

<img src="/img/r5a-md5-windows.png" alt="Windows 端使用 certutil 校验 MD5" width="700" />

**Linux**（`md5sum`）：

```bash
md5sum TBoard-R5A-debian11-Xfce-V1.0.0.img
# 输出值与 -md5.txt 中公布的校验值比对
```

<img src="/img/r5a-md5-linux.png" alt="Linux 端使用 md5sum 校验 MD5" width="700" />

## 相关页面

- [资料下载](/downloads)
- [烧录镜像](/flashing) — 下一步。
