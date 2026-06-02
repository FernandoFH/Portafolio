---
title: "What Every Programmer Should Know About Memory [Review]"
date: 2026-06-01
status: draft
platform: published
publication: papers
tags: [memory, performance, programming]
description: ""
---

Autor: Ulrich Drepper
Red Hat, Inc.
November 21, 2007

# Abstract

As CPU cores become both faster and more numerous, the limiting factor for most programs is
now, and will be for some time, memory access. Hardware designers have come up with ever
more sophisticated memory handling and acceleration techniques–such as CPU caches–but
these cannot work optimally without some help from the programmer. Unfortunately, neither
the structure nor the cost of using the memory subsystem of a computer or the caches on CPUs
is well understood by most programmers. This paper explains the structure of memory subsystems in use on modern commodity hardware, illustrating why CPU caches were developed, how
they work, and what programs should do to achieve optimal performance by utilizing them.
