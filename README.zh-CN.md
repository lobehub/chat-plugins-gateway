<a name="readme-top"></a>

<div align="center">

<img height="120" src="https://registry.npmmirror.com/@lobehub/assets-emoji/1.3.0/files/assets/puzzle-piece.webp">
<img height="120" src="https://gw.alipayobjects.com/zos/kitchen/qJ3l3EPsdW/split.svg">
<img height="120" src="https://registry.npmmirror.com/@lobehub/assets-emoji/1.3.0/files/assets/door.webp">

<h1>LobeChat 插件网关</h1>

[English](./README.md) | **简体中文**

LobeChat Plugin Gateway 是一个为 LobeChat 和 LobeHub 提供 Chat 插件网关的后端服务。

[更新日志](./CHANGELOG.md) · [报告 Bug][issues-url] · [请求功能][issues-url]

<!-- SHIELD GROUP -->

[![plugin][plugin-shield]][plugin-url]
[![release][release-shield]][release-url]
[![releaseDate][release-date-shield]][release-date-url]
[![ciTest][ci-test-shield]][ci-test-url]
[![ciRelease][ci-release-shield]][ci-release-url] <br/>
[![contributors][contributors-shield]][contributors-url]
[![forks][forks-shield]][forks-url]
[![stargazers][stargazers-shield]][stargazers-url]
[![issues][issues-shield]][issues-url]

![](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

</div>

<details>
<summary><kbd>目录</kbd></summary>

#### 目录

- [👋 简介](#-introduction)

- [🤯 使用方法](#-usage)
-
- [🛳 自托管](#-self-hosting)

- [⌨️ 本地开发](#️-local-development)

- [🤝 贡献](#-contributing)

####

</details>

## 👋 简介

LobeChat 插件网关是一个后端服务，为 LobeChat 插件提供网关。我们使用 [vercel](https://vercel.com/) 来部署此服务。主要 API `POST /api/v1/runner` 部署为[Edge Function](https://vercel.com/docs/functions/edge-functions)。

网关服务从 [LobeChat 插件](https://github.com/lobehub/lobe-chat-plugins) 获取 Lobe 插件索引，如果您想将您的插件添加到索引中，请在 LobeChat 插件仓库中[提交 PR](https://github.com/lobehub/lobe-chat-plugins/pulls)。

## 🤯 使用方法

基本 URL：

| 环境 | URL                                  |
| ---- | ------------------------------------ |
| PROD | https://chat-plugins.lobehub.com     |
| DEV  | https://chat-plugins-dev.lobehub.com |

### POST 插件网关

POST `/api/v1/runner`

与 LobeChat 插件进行通信的接口。此接口描述了如何使用 LobeChat 插件网关 API 发送请求和获取响应。

> 请求体参数

```json
{
  "arguments": "{\n  \"city\": \"杭州\"\n}",
  "name": "realtimeWeather"
}
```

> 响应

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

TO_BE_DONE...

## ⌨️ 本地开发

您可以使用 Gitpod 进行在线开发：

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)][gitpod-url]

或者使用以下命令进行本地开发：

```bash
$ git clone https://github.com/lobehub/chat-plugins-gateway.git
$ pnpm install
$ pnpm start
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤝 贡献

<!-- CONTRIBUTION GROUP -->

> 📊 共计: <kbd>**3**</kbd>

<a href="https://github.com/arvinxx" title="arvinxx">
  <img src="https://avatars.githubusercontent.com/u/28616219?v=4" width="50" />
</a>
<a href="https://github.com/apps/dependabot" title="dependabot[bot]">
  <img src="https://avatars.githubusercontent.com/in/29110?v=4" width="50" />
</a>
<a href="https://github.com/actions-user" title="actions-user">
  <img src="https://avatars.githubusercontent.com/u/65916846?v=4" width="50" />
</a>

<!-- CONTRIBUTION END -->

<div align="right">

[![][back-to-top]](#readme-top)

</div>

---

#### 📝 许可证

版权所有 © 2023 [LobeHub][profile-url]。 <br />
此项目基于 [MIT](./LICENSE) 许可证。

<!-- PLUGIN GROUP -->

[plugin-shield]: https://img.shields.io/badge/%F0%9F%A4%AF_LobeChat-plugin-cyan
[plugin-url]: https://github.com/lobehub/lobe-chat-plugins

<!-- LINK GROUP -->

[profile-url]: https://github.com/lobehub
[gitpod-url]: https://gitpod.io/#https://github.com/lobehub/chat-plugins-gateway

<!-- SHIELD LINK GROUP -->

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square

<!-- release -->

[release-shield]: https://img.shields.io/npm/v/@lobehub/chat-plugins-gateway?label=%F0%9F%A4%AF%20NPM
[release-url]: https://www.npmjs.com/package/@lobehub/chat-plugins-gateway

<!-- releaseDate -->

[release-date-shield]: https://img.shields.io/github/release-date/lobehub/chat-plugins-gateway?style=flat
[release-date-url]: https://github.com/lobehub/chat-plugins-gateway/releases

<!-- ciTest -->

[ci-test-shield]: https://github.com/lobehub/chat-plugins-gateway/actions/workflows/test.yml/badge.svg
[ci-test-url]: https://github.com/lobehub/chat-plugins-gateway/actions/workflows/test.yml

<!-- ciRelease -->

[ci-release-shield]: https://github.com/lobehub/chat-plugins-gateway/actions/workflows/release.yml/badge.svg
[ci-release-url]: https://github.com/lobehub/chat-plugins-gateway/actions/workflows/release.yml

<!-- contributors -->

[contributors-shield]: https://img.shields.io/github/contributors/lobehub/chat-plugins-gateway.svg?style=flat
[contributors-url]: https://github.com/lobehub/chat-plugins-gateway/graphs/contributors

<!-- forks -->

[forks-shield]: https://img.shields.io/github/forks/lobehub/chat-plugins-gateway.svg?style=flat
[forks-url]: https://github.com/lobehub/chat-plugins-gateway/network/members

<!-- stargazers -->

[stargazers-shield]: https://img.shields.io/github/stars/lobehub/chat-plugins-gateway.svg?style=flat
[stargazers-url]: https://github.com/lobehub/chat-plugins-gateway/stargazers

<!-- issues -->

[issues-shield]: https://img.shields.io/github/issues/lobehub/chat-plugins-gateway.svg?style=flat
[issues-url]: https://github.com/lobehub/chat-plugins-gateway/issues/new/choose
