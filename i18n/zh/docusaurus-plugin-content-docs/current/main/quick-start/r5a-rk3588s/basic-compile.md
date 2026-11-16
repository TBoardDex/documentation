---
title: "基础编译"
sidebar_label: "基础编译"
sidebar_position: 6
slug: "/basic-compile"
---

# 基础编译

TBoard 的文件系统自带 GCC 编译器，可以直接在板卡上编译 C/C++ 程序；也可以
用 VSCode 通过 SSH 远程连接开发板，在 PC 的编辑器里写代码、编译、调试。
需要交叉编译时（例如构建要并入固件的组件），PC 上安装工具链即可。

## 方式一 — 板卡上直接编译

文件系统自带 GCC，无需安装。先确认编译链可用：

```bash
gcc -v
```

创建测试程序 `hello.c`：

```c
/* hello.c */
#include <stdio.h>
int main(void)
{
    printf("Hello from TBoard R5A\n");
    return 0;
}
```

编译并运行：

```bash
gcc hello.c -o hello
./hello
# Hello from TBoard R5A
```

## 方式二 — VSCode SSH 远程开发

1. PC 上安装 [VSCode](https://code.visualstudio.com/) 与 **Remote - SSH**
   插件；
2. 按 `F1`，输入 *Remote-SSH: Connect to Host*，填 `tboard@<board-ip>`
   （IP 在板卡上用 `ip a` 查看），首次连接选择平台并输入密码；
3. 连接后 *Open Folder* 打开板卡上的工作目录，即可编辑代码，并在集成终端里
   编译运行。

### 免密登录（可选）

PC 端生成密钥（Windows 在 cmd 中执行，连续回车直到结束）：

```bat
ssh-keygen -t rsa
```

打开 `C:\Users\<用户名>\.ssh\id_rsa.pub`，复制全部内容。在板卡上：

```bash
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo '<粘贴公钥内容>' >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

再次用 VSCode 连接即不再需要输入密码。

## 方式三 — PC 交叉编译

构建要并入固件的组件或大型项目时，在 PC 上用交叉工具链：

```bash
sudo apt install gcc-aarch64-linux-gnu     # PC 上安装工具链
aarch64-linux-gnu-gcc -o hello hello.c     # 编译
file hello                                 # 应显示 "ARM aarch64"
scp hello tboard@<board-ip>:/home/tboard/  # 拷到板卡
./hello                                    # 板卡上运行
```

## 相关页面

- [SDK 源码](/sdk-sources) — 完整 SDK 与固件源码。
- [TBoard R5A](/tboard-r5a)
