<a name="readme-top"></a>

<div align="center">

<img height="120" src="https://registry.npmmirror.com/@lobehub/assets-emoji/1.3.0/files/assets/puzzle-piece.webp">
<img height="120" src="https://gw.alipayobjects.com/zos/kitchen/qJ3l3EPsdW/split.svg">
<img height="120" src="https://registry.npmmirror.com/@lobehub/assets-emoji/1.3.0/files/assets/door.webp">

<h1>LobeChat Plugins Gateway</h1>

**English** | [简体中文](./README.zh-CN.md)

Plugin Gateway Service for Lobe Chat and Lobe Web

[Changelog](./CHANGELOG.md) · [Report Bug][issues-url] · [Request Feature][issues-url]

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
<summary><kbd>Table of contents</kbd></summary>

#### TOC

- [👋 Intro](#-introduction)

- [🤯 Usage](#-usage)
-
- [🛳 Self Hosting](#-self-hosting)

- [⌨️ Local Development](#️-local-development)

- [🤝 Contributing](#-contributing)

####

</details>

## 👋 Intro

LobeChat Plugins Gateway is a backend service that provides a gateway for LobeChat plugins. We use [vercel](https://vercel.com/) to deploy this service. The main API `POST /api/v1/runner` is deployed as an [Edge Function](https://vercel.com/docs/functions/edge-functions).

The gateway service fetches lobe plugins index from the [LobeChat Plugins](https://github.com/lobehub/lobe-chat-plugins), if you want to add your plugin to the index, please [submit a PR](https://github.com/lobehub/lobe-chat-plugins/pulls) to the LobeChat Plugins repository.

## 🤯 Usage

Base URLs:

| Environment | URL                                  |
| ----------- | ------------------------------------ |
| PROD        | https://chat-plugins.lobehub.com     |
| DEV         | https://chat-plugins-dev.lobehub.com |

### POST Plugin Gateway

POST `/api/v1/runner`

Interface to communicate with the LobeChat plugin. This interface describes how to use the LobeChat plugin gateway API to send requests and get responses

> Body Request Parameters

```json
{
  "arguments": "{\n  \"city\": \"杭州\"\n}",
  "name": "realtimeWeather"
}
```

> Response

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

TO_BE_DONE...

## ⌨️ Local Development

You can use Gitpod for online development:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)][gitpod-url]

Or clone it for local development:

```bash
$ git clone https://github.com/lobehub/chat-plugins-gateway.git
$ pnpm install
$ pnpm start
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤝 Contributing

<!-- CONTRIBUTION GROUP -->

> 📊 Total: <kbd>**1**</kbd>

<a href="https://github.com/arvinxx" title="arvinxx">
  <img src="https://avatars.githubusercontent.com/u/28616219?v=4" width="50" />
</a>

<!-- CONTRIBUTION END -->

<div align="right">

[![][back-to-top]](#readme-top)

</div>

---

#### 📝 License

Copyright © 2023 [LobeHub][profile-url]. <br />
This project is [MIT](./LICENSE) licensed.

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
