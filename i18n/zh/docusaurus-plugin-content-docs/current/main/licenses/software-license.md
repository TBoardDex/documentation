---
title: "软件开源协议"
sidebar_label: "软件开源协议"
sidebar_position: 1
slug: "/licenses/software"
---

# 软件开源协议

![TBoard placeholder image 640 x 360 px](/img/placeholder-640x360.png)

> 图片占位：**640 × 360 px**（建议用途：许可说明配图）。后续请用同尺寸的真实图片替换。


## 分层许可模型

TBoard 软件采用分层许可。每一层保持其上游组件原有的许可证，不合并为单一许可证。

| 层级 | 组件 | 许可证 |
| --- | --- | --- |
| 平台基础 | Linux 内核、U-Boot | GPL v2 |
| 厂商二进制 | Rockchip loader / trust 二进制（`rkbin`） | 瑞芯微专有，闭源 |
| TBoard 自研代码 | 板级支持包、脚本、设备树、工具 | Apache License 2.0 |

## 使用者义务

- GPL v2 组件：若分发修改后的内核或 U-Boot 二进制，须以同一许可证提供对应源码。
- Apache 2.0 组件：保留版权与许可声明、说明修改、保留 NOTICE 文件；该许可证包含明确的专利授权。
- 厂商专有二进制仅可按原样再分发，不受任何开源授权覆盖，不得逆向工程。
- 各层彼此独立。使用 Apache 2.0 的 TBoard 代码不会改变 GPL 层或专有层的许可。

## 源码获取

TBoard 自研仓库统一发布在 GitHub 的 TBoardDex 组织下。发布帖与版本对应关系见
[论坛的资料下载板块](https://forum.tboard.org)。
