---
title: "Basic Compilation"
sidebar_label: "Basic Compilation"
sidebar_position: 6
slug: "/basic-compile"
---

# Basic Compilation

The TBoard root filesystem ships with a GCC toolchain, so you can compile
C/C++ programs directly on the board; you can also connect over SSH with
VSCode and edit, build, and debug from your PC. Cross-compiling on the PC
(e.g. for components that go into the firmware image) works too.

## Option 1 — Compile on the board

GCC is preinstalled. Verify the toolchain first:

```bash
gcc -v
```

Create a test program `hello.c`:

```c
/* hello.c */
#include <stdio.h>
int main(void)
{
    printf("Hello from TBoard R5A\n");
    return 0;
}
```

Build and run:

```bash
gcc hello.c -o hello
./hello
# Hello from TBoard R5A
```

## Option 2 — Remote development with VSCode over SSH

1. Install [VSCode](https://code.visualstudio.com/) and the
   **Remote - SSH** extension on your PC;
2. Press `F1`, run *Remote-SSH: Connect to Host*, enter `tboard@<board-ip>`
   (get the IP with `ip a` on the board), pick the platform and enter the
   password on first connect;
3. Once connected, *Open Folder* to open a working directory on the board and
   edit code, build, and run in the integrated terminal.

### Passwordless login (optional)

Generate a key on the PC (run in cmd on Windows, press Enter through all
prompts):

```bat
ssh-keygen -t rsa
```

Open `C:\Users\<you>\.ssh\id_rsa.pub` and copy its contents. On the board:

```bash
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo '<paste the public key>' >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

The next VSCode connection no longer asks for a password.

## Option 3 — Cross-compiling on the PC

For components that go into the firmware image or larger projects, use a
cross toolchain on the PC:

```bash
sudo apt install gcc-aarch64-linux-gnu     # install the toolchain
aarch64-linux-gnu-gcc -o hello hello.c     # build
file hello                                 # should report "ARM aarch64"
scp hello tboard@<board-ip>:/home/tboard/  # copy to the board
./hello                                    # run on the board
```

## Related

- [SDK Sources](/sdk-sources) — full SDK and firmware sources.
- [TBoard R5A](/tboard-r5a)
