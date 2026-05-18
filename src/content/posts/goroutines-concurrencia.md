---
title: "Goroutines y Canales: Concurrencia en Go"
date: 2026-05-15
status: draft
platform: medium
publication: golang
tags: [golang, concurrencia, goroutines]
description: "Guía práctica de concurrencia en Go con goroutines, canales y select."
---

Las goroutines son la unidad básica de concurrencia en Go. Son baratas de crear
(~2KB de stack inicial) y el runtime las multiplexa sobre hilos del OS.

## Goroutine básica

```go
go func() {
    fmt.Println("hola desde goroutine")
}()
```
