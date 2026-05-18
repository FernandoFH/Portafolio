---
title: "Observabilidad con OpenTelemetry en Go"
date: 2026-05-10
status: published
platform: medium
publication: sre
tags: [opentelemetry, golang, observabilidad]
description: "Cómo instrumentar un servicio Go con OTel desde cero: traces, métricas y logs."
---

La observabilidad es la capacidad de entender el estado interno de un sistema
a partir de sus salidas externas. OpenTelemetry es el estándar abierto para
instrumentar aplicaciones con trazas, métricas y logs.

## Instalación

```bash
go get go.opentelemetry.io/otel
go get go.opentelemetry.io/otel/sdk/trace
```

## Primer trace

```go
ctx, span := tracer.Start(ctx, "mi-operacion")
defer span.End()
```
