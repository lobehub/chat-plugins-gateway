<a name="readme-top"></a>

<div align="center">

<img height="120" src="https://raw.githubusercontent.com/lobehub/lobe-assets/master/packages/assets-emoji/assets/puzzle-piece.webp">
<img height="120" src="https://raw.githubusercontent.com/lobehub/lobe-assets/master/packages/assets-logo/assets/split.svg">
<img height="120" src="https://raw.githubusercontent.com/lobehub/lobe-assets/master/packages/assets-emoji/assets/door.webp">

<h1>LobeChat 插件网关</h1>

LobeChat Plugin Gateway 是一个为 LobeChat 和 LobeHub 提供 Chat 插件网关的后端服务。

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

[English](./README.md) · **简体中文** · [更新日志](./CHANGELOG.md) · [报告 Bug][github-issues-link] · [请求功能][github-issues-link]

</div>

<details>
<summary><kbd>目录</kbd></summary>

#### TOC

- [👋 简介](#-简介)
- [🤯 使用方法](#-使用方法)
  - [基本 URL](#基本-url)
  - [POST 插件网关](#post-插件网关)
- [🛳 自托管](#-自托管)
  - [部署到 Vercel](#部署到-vercel)
- [📦 插件生态](#-插件生态)
- [⌨️ Local Development](#️-local-development)
- [🤝 Contributing](#-contributing)
- [🔗 Links](#-links)

####

</details>

## 👋 简介

LobeChat 插件网关是一个后端服务，为 LobeChat 插件提供网关。我们使用 [vercel](https://vercel.com/) 来部署此服务。主要 API `POST /api/v1/runner` 部署为[Edge Function](https://vercel.com/docs/functions/edge-functions)。

网关服务从 [LobeChat 插件](https://github.com/lobehub/lobe-chat-plugins) 获取 Lobe 插件索引，如果您想将您的插件添加到索引中，请在 LobeChat 插件仓库中[提交 PR](https://github.com/lobehub/lobe-chat-plugins/pulls)。

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤯 使用方法

### 基本 URL

| 环境   | URL                                            |
| ------ | ---------------------------------------------- |
| `PROD` | <https://chat-plugins-gateway.lobehub.com>     |
| `DEV`  | <https://chat-plugins-gateway-dev.lobehub.com> |

### POST 插件网关

> **Note**\
> **POST** `/api/v1/runner`\
> 与 LobeChat 插件进行通信的接口。此接口描述了如何使用 LobeChat 插件网关 API 发送请求和获取响应。

#### Body Request Parameters 请求体参数

```json
{
  "arguments": "{\n  \"city\": \"杭州\"\n}",
  "name": "realtimeWeather"
}
```

#### Response 响应

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

更多信息请参见[API 文档](https://apifox.com/apidoc/shared-c574e77f-4230-4727-9c05-c5c9988eed06)。

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🛳 自托管

如果您想自己部署此服务，可以按照以下步骤进行操作。

### 部署到 Vercel

点击下方按钮来部署您的私有插件网关。

[![使用 Vercel 部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flobehub%2Fchat-plugins-gateway&project-name=chat-plugins-gateway&repository-name=chat-plugins-gateway)

如果您想进行一些自定义设置，可以在部署时添加环境变量（Environment Variable）：

- `PLUGINS_INDEX_URL`：你可以通过该变量指定插件市场的索引地址

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📦 插件生态

插件提供了扩展 LobeChat Function Calling 能力的方法。可以用于引入新的 Function Calling，甚至是新的消息结果渲染方式。如果你对插件开发感兴趣，请在 Wiki 中查阅我们的 [📘 插件开发指引](https://github.com/lobehub/lobe-chat/wiki/Plugin-Development.zh-CN) 。

- [lobe-chat-plugins][lobe-chat-plugins]：这是 LobeChat 的插件索引。它从该仓库的 index.json 中获取插件列表并显示给用户。
- [chat-plugin-template][chat-plugin-template]: Chat Plugin 插件开发模版，你可以通过项目模版快速新建插件项目。
- [@lobehub/chat-plugin-sdk][chat-plugin-sdk]：LobeChat 插件 SDK 可帮助您创建出色的 Lobe Chat 插件。
- [@lobehub/chat-plugins-gateway][chat-plugins-gateway]：LobeChat 插件网关是一个后端服务，作为 LobeChat 插件的网关。我们使用 Vercel 部署此服务。主要的 API POST /api/v1/runner 被部署为 Edge Function。

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## ⌨️ Local Development

可以使用 GitHub Codespaces 进行在线开发：

[![][github-codespace-shield]][github-codespace-link]

或者使用以下命令进行本地开发：

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

我们非常欢迎各种形式的贡献。如果你对贡献代码感兴趣，可以查看我们的 GitHub [Issues][github-issues-link]，大展身手，向我们展示你的奇思妙想。

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
