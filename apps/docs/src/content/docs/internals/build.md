---
title: Build System
description: How to build and develop the extension.
---

## Prerequisites

- Node.js (Latest LTS recommended)
- pnpm

## WXT Framework

This project uses [WXT](https://wxt.dev/) for extension development.

## Commands

### Development

```bash
pnpm dev
```
Starts the development server with HMR.

### Build

```bash
pnpm build
```
Builds the extension for production. Output is located in `.output/`.

### Zip

```bash
pnpm zip
```
Creates a zip file for store submission.
