---
title: "Hola Mundo en C++"
date: 2026-05-30
status: published
platform: medium
publication: cpp
tags: [c++, system, programming]
description: "Setup para programación en C++."
---

El Hola Mundo es el programa más básico que se puede escribir en cualquier lenguaje de programación.

Estructura básica de un programa Hola Mundo:

```cpp
#include <iostream>

int main() {
    std::cout << "Hola, mundo!" << std::endl;
    return 0;
}
```

_Local Compiler:_

```bash
g++ holaMundo.cpp -o holaMundo && ./holaMundo
```

_Formating Files Like Google:_

```bash
~/.local/share/nvim/mason/bin/clang-format --style Google --dump-config > .clang-format
```
