<a name="readme-top"></a>

<div align="center">

<img height="120" src="https://registry.npmmirror.com/@lobehub/assets-emoji/1.3.0/files/assets/puzzle-piece.webp">
<img height="120" src="https://gw.alipayobjects.com/zos/kitchen/qJ3l3EPsdW/split.svg">
<img height="120" src="https://registry.npmmirror.com/@lobehub/assets-emoji/1.3.0/files/assets/door.webp">

<h1>LobeChat Plugins Gateway</h1>

Plugin Gateway Service for Lobe Chat and Lobe Web

[![][🤯-🧩-lobehub-shield]][🤯-🧩-lobehub-link]
[![][npm-release-shield]][npm-release-link]
[![][github-releasedate-shield]][github-releasedate-link]
[![][github-action-test-shield]][github-action-test-link]
[![][github-action-release-shield]][github-action-release-link]<br/>
[![][github-contributors-shield]][github-contributors-link]
[![][github-forks-shield]][github-forks-link]
[![][github-stars-shield]][github-stars-link]
[![][github-issues-shield]][github-issues-link]
[![][github-license-shield]][github-license-link]

**English** · [简体中文](./README.zh-CN.md) · [Changelog](./CHANGELOG.md) · [Report Bug][github-issues-link] · [Request Feature][github-issues-link]

![](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

</div>

<details>
<summary><kbd>Table of contents</kbd></summary>

#### TOC

- [👋 Intro](#-intro)
- [🤯 Usage](#-usage)
  - [Base URLs](#base-urls)
  - [POST Plugin Gateway](#post-plugin-gateway)
- [🛳 Self Hosting](#-self-hosting)
  - [Deploy to Vercel](#deploy-to-vercel)
- [📦 Plugin Ecosystem](#-plugin-ecosystem)
- [⌨️ Local Development](#️-local-development)
- [🤝 Contributing](#-contributing)
- [🔗 Links](#-links)

####

</details>

## 👋 Intro

LobeChat Plugins Gateway is a backend service that provides a gateway for LobeChat plugins. We use [vercel](https://vercel.com/) to deploy this service. The main API `POST /api/v1/runner` is deployed as an [Edge Function](https://vercel.com/docs/functions/edge-functions).

The gateway service fetches lobe plugins index from the [LobeChat Plugins](https://github.com/lobehub/lobe-chat-plugins), if you want to add your plugin to the index, please [submit a PR](https://github.com/lobehub/lobe-chat-plugins/pulls) to the LobeChat Plugins repository.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤯 Usage

### Base URLs

| Environment | URL                                            |
| ----------- | ---------------------------------------------- |
| `PROD`      | <https://chat-plugins-gateway.lobehub.com>     |
| `DEV`       | <https://chat-plugins-gateway-dev.lobehub.com> |

### POST Plugin Gateway

> **Note**\
> **POST** `/api/v1/runner`\
> Interface to communicate with the LobeChat plugin. This interface describes how to use the LobeChat plugin gateway API to send requests and get responses

#### Body Request Parameters

```json
{
  "arguments": "{\n  \"city\": \"杭州\"\n}",
  "name": "realtimeWeather"
}
```

#### Response

```json
[
  {
    "city": "杭州市",
    "adcode": "330100",
    "province": "浙江",
    "reporttime": "2023-08-17 23:32:22",
    "casts": [
      {
        "date": "2023-08-17",
        "week": "4",
        "dayweather": "小雨",
        "nightweather": "小雨",
        "daytemp": "33",
        "nighttemp": "24",
        "daywind": "东",
        "nightwind": "东",
        "daypower": "≤3",
        "nightpower": "≤3",
        "daytemp_float": "33.0",
        "nighttemp_float": "24.0"
      },
      {
        "date": "2023-08-18",
        "week": "5",
        "dayweather": "小雨",
        "nightweather": "小雨",
        "daytemp": "32",
        "nighttemp": "23",
        "daywind": "东北",
        "nightwind": "东北",
        "daypower": "4",
        "nightpower": "4",
        "daytemp_float": "32.0",
        "nighttemp_float": "23.0"
      },
      {
        "date": "2023-08-19",
        "week": "6",
        "dayweather": "小雨",
        "nightweather": "雷阵雨",
        "daytemp": "32",
        "nighttemp": "24",
        "daywind": "东",
        "nightwind": "东",
        "daypower": "4",
        "nightpower": "4",
        "daytemp_float": "32.0",
        "nighttemp_float": "24.0"
      },
      {
        "date": "2023-08-20",
        "week": "7",
        "dayweather": "雷阵雨",
        "nightweather": "多云",
        "daytemp": "33",
        "nighttemp": "25",
        "daywind": "东",
        "nightwind": "东",
        "daypower": "≤3",
        "nightpower": "≤3",
        "daytemp_float": "33.0",
        "nighttemp_float": "25.0"
      }
    ]
  }
]
```

See [API Document](https://apifox.com/apidoc/shared-c574e77f-4230-4727-9c05-c5c9988eed06) for more information.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🛳 Self Hosting

If you want to deploy this service by yourself, you can follow the steps below.

### Deploy to Vercel

Click button below to deploy your private plugins' gateway.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flobehub%2Fchat-plugins-gateway&project-name=chat-plugins-gateway&repository-name=chat-plugins-gateway)

If you want to make some customization, you can add environment variable:

- `PLUGINS_INDEX_URL`: You can change the default plugins index url as your need.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📦 Plugin Ecosystem

Plugins provide a means to extend the Function Calling capabilities of LobeChat. They can be used to introduce new function calls and even new ways to render message results. If you are interested in plugin development, please refer to our [📘 Plugin Development Guide](https://github.com/lobehub/lobe-chat/wiki/Plugin-Development) in the Wiki.

- [lobe-chat-plugins][lobe-chat-plugins]: This is the plugin index for LobeChat. It accesses index.json from this repository to display a list of available plugins for LobeChat to the user.
- [chat-plugin-template][chat-plugin-template]: This is the plugin template for LobeChat plugin development.
- [@lobehub/chat-plugin-sdk][chat-plugin-sdk]: The LobeChat Plugin SDK assists you in creating exceptional chat plugins for Lobe Chat.
- [@lobehub/chat-plugins-gateway][chat-plugins-gateway]: The LobeChat Plugins Gateway is a backend service that provides a gateway for LobeChat plugins. We deploy this service using Vercel. The primary API POST /api/v1/runner is deployed as an Edge Function.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## ⌨️ Local Development

You can use Github Codespaces for online development:

[![][github-codespace-shield]][github-codespace-link]

Or clone it for local development:

[![][bun-shield]][bun-link]

```bash
$ git clone https://github.com/lobehub/chat-plugins-gateway.git
$ cd chat-plugins-gateway
$ bun install
$ bun dev
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤝 Contributing

Contributions of all types are more than welcome, if you are interested in contributing code, feel free to check out our GitHub [Issues][github-issues-link] to get stuck in to show us what you’re made of.

[![][pr-welcome-shield]][pr-welcome-link]

[![][github-contrib-shield]][github-contrib-link]

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🔗 Links

- **[🤖 Lobe Chat](https://github.com/lobehub/lobe-chat)** - An open-source, extensible (Function Calling), high-performance chatbot framework. It supports one-click free deployment of your private ChatGPT/LLM web application.
- **[🧩 / 🏪 Plugin Index](https://github.com/lobehub/lobe-chat-plugins)** - This is the plugin index for LobeChat. It accesses index.json from this repository to display a list of available plugins for Function Calling to the user.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

---

#### 📝 License

Copyright © 2023 [LobeHub][profile-link]. <br />
This project is [MIT](./LICENSE) licensed.

<!-- LINK GROUP -->

[🤯-🧩-lobehub-link]: https://github.com/lobehub/lobe-chat-plugins
[🤯-🧩-lobehub-shield]: https://img.shields.io/badge/%F0%9F%A4%AF%20%26%20%F0%9F%A7%A9%20LobeHub-Plugin-95f3d9?labelColor=black&style=flat-square
[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-black?style=flat-square
[bun-link]: https://bun.sh
[bun-shield]: https://img.shields.io/badge/-speedup%20with%20bun-black?logo=bun&style=for-the-badge
[chat-plugin-sdk]: https://github.com/lobehub/chat-plugin-sdk
[chat-plugin-template]: https://github.com/lobehub/chat-plugin-
[chat-plugins-gateway]: https://github.com/lobehub/chat-plugins-gateway
[github-action-release-link]: https://github.com/lobehub/chat-plugins-gateway/actions/workflows/release.yml
[github-action-release-shield]: https://img.shields.io/github/actions/workflow/status/lobehub/chat-plugins-gateway/release.yml?label=release&labelColor=black&logo=githubactions&logoColor=white&style=flat-square
[github-action-test-link]: https://github.com/lobehub/chat-plugins-gateway/actions/workflows/test.yml
[github-action-test-shield]: https://img.shields.io/github/actions/workflow/status/lobehub/chat-plugins-gateway/test.yml?label=test&labelColor=black&logo=githubactions&logoColor=white&style=flat-square
[github-codespace-link]: https://codespaces.new/lobehub/chat-plugins-gateway
[github-codespace-shield]: https://github.com/codespaces/badge.svg
[github-contrib-link]: https://github.com/lobehub/chat-plugins-gateway/graphs/contributors
[github-contrib-shield]: https://contrib.rocks/image?repo=lobehub%2Fchat-plugins-gateway
[github-contributors-link]: https://github.com/lobehub/chat-plugins-gateway/graphs/contributors
[github-contributors-shield]: https://img.shields.io/github/contributors/lobehub/chat-plugins-gateway?color=c4f042&labelColor=black&style=flat-square
[github-forks-link]: https://github.com/lobehub/chat-plugins-gateway/network/members
[github-forks-shield]: https://img.shields.io/github/forks/lobehub/chat-plugins-gateway?color=8ae8ff&labelColor=black&style=flat-square
[github-issues-link]: https://github.com/lobehub/chat-plugins-gateway/issues
[github-issues-shield]: https://img.shields.io/github/issues/lobehub/chat-plugins-gateway?color=ff80eb&labelColor=black&style=flat-square
[github-license-link]: https://github.com/lobehub/chat-plugins-gateway/blob/main/LICENSE
[github-license-shield]: https://img.shields.io/github/license/lobehub/chat-plugins-gateway?color=white&labelColor=black&style=flat-square
[github-releasedate-link]: https://github.com/lobehub/chat-plugins-gateway/releases
[github-releasedate-shield]: https://img.shields.io/github/release-date/lobehub/chat-plugins-gateway?labelColor=black&style=flat-square
[github-stars-link]: https://github.com/lobehub/chat-plugins-gateway/network/stargazers
[github-stars-shield]: https://img.shields.io/github/stars/lobehub/chat-plugins-gateway?color=ffcb47&labelColor=black&style=flat-square
[lobe-chat-plugins]: https://github.com/lobehub/lobe-chat-plugins
[npm-release-link]: https://www.npmjs.com/package/@lobehub/chat-plugins-gateway
[npm-release-shield]: https://img.shields.io/npm/v/@lobehub/chat-plugins-gateway?color=369eff&labelColor=black&logo=npm&logoColor=white&style=flat-square
[pr-welcome-link]: https://github.com/lobehub/chat-plugins-gateway/pulls
[pr-welcome-shield]: https://img.shields.io/badge/%F0%9F%A4%AF%20PR%20WELCOME-%E2%86%92-ffcb47?labelColor=black&style=for-the-badge
[profile-link]: https://github.com/lobehub
