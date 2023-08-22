---
title: LobeChat Plugins v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: '@tarslib/widdershins v4.0.17'
---

# LobeChat Plugins

> v1.0.0

Base URLs:

- <a href="https://chat-plugins.lobehub.com"> Prod URL: https://chat-plugins.lobehub.com</a>

# Default

## POST 插件网关

POST /api/v1/runner

与 LobeChat 插件进行通信的接口。本接口描述了如何使用 LobeChat 插件网关 API 来发送请求和获取响应。

> Body 请求参数

```json
{
  "arguments": "{\n  \"city\": \"杭州\"\n}",
  "name": "realtimeWeather"
}
```

### 请求参数

| 名称        | 位置 | 类型   | 必选 | 说明 |
| ----------- | ---- | ------ | ---- | ---- |
| body        | body | object | 否   | none |
| » name      | body | string | 是   | none |
| » arguments | body | string | 是   | none |
| » indexUrl  | body | string | 否   | none |

> 返回示例

> 成功

> 请求入参校验失败

```json
{
  "body": {
    "issues": [
      {
        "code": "invalid_type",
        "expected": "string",
        "received": "undefined",
        "path": ["name"],
        "message": "Required"
      }
    ],
    "name": "ZodError"
  },
  "errorType": 400
}
```

```json
{
  "body": {
    "error": [
      {
        "path": ["city"],
        "property": "instance.city",
        "message": "is not of a type(s) string",
        "instance": 123,
        "name": "type",
        "argument": ["string"],
        "stack": "instance.city is not of a type(s) string"
      }
    ],
    "manifest": {
      "version": "1",
      "name": "realtimeWeather",
      "schema": {
        "description": "获取当前天气情况",
        "name": "realtimeWeather",
        "parameters": {
          "properties": {
            "city": {
              "description": "城市名称",
              "type": "string"
            }
          },
          "required": ["city"],
          "type": "object"
        }
      },
      "server": {
        "url": "https://realtime-weather.chat-plugin.lobehub.com/api/v1"
      }
    },
    "message": "[plugin] args is invalid with plugin manifest schema"
  },
  "errorType": 400
}
```

> 插件信息不存在

```json
{
  "body": {
    "message": "[gateway] plugin is not found",
    "name": "abcccccc"
  },
  "errorType": "pluginMetaNotFound"
}
```

```json
{
  "body": {
    "manifestUrl": "https://web-crawler.chat-plugin.lobehub.com/manifest.json",
    "message": "[plugin] plugin manifest not found"
  },
  "errorType": "pluginManifestNotFound"
}
```

> 插件元数据错误

```json
{
  "body": {
    "error": {
      "issues": [
        {
          "code": "invalid_type",
          "expected": "string",
          "received": "undefined",
          "path": ["manifest"],
          "message": "Required"
        }
      ],
      "name": "ZodError"
    },
    "message": "[plugin] plugin meta is invalid",
    "pluginMeta": {
      "createAt": "2023-08-12",
      "homepage": "https://github.com/lobehub/chat-plugin-real-time-weather",
      "meta": {
        "avatar": "☂️",
        "tags": ["weather", "realtime"]
      },
      "name": "realtimeWeather",
      "schemaVersion": "v1"
    }
  },
  "errorType": "pluginMetaInvalid"
}
```

> 491 Response

```json
{}
```

> 插件市场索引错误

```json
{
  "body": {
    "error": {
      "issues": [
        {
          "code": "invalid_type",
          "expected": "array",
          "received": "undefined",
          "path": ["plugins"],
          "message": "Required"
        },
        {
          "code": "invalid_type",
          "expected": "number",
          "received": "undefined",
          "path": ["version"],
          "message": "Required"
        }
      ],
      "name": "ZodError"
    },
    "indexUrl": "https://registry.npmmirror.com",
    "marketIndex": {
      "last_package": "@c2pkg/storage-upload",
      "last_package_version": "@c2pkg/storage-upload@3.10.0",
      "doc_count": 3561547,
      "doc_version_count": 34943697,
      "download": {
        "today": 25587449,
        "yesterday": 128550602,
        "samedayLastweek": 35493324,
        "thisweek": 776453391,
        "thismonth": 2190677962,
        "thisyear": 27479998339,
        "lastweek": 792798408,
        "lastmonth": 4224663889,
        "lastyear": 35082329272
      },
      "update_seq": 63479086,
      "sync_model": "all",
      "sync_changes_steam": {
        "since": "35627379",
        "registryId": "6306496ddd636c97816f37d4",
        "taskWorker": "npmmirror-x86-20220823002:3275935",
        "task_count": 1597861518,
        "last_package": "gridcreator",
        "last_package_created": "2023-08-09T14:38:06.068Z"
      },
      "sync_binary": true,
      "instance_start_time": "2023-08-17T14:05:53.874Z",
      "node_version": "v16.20.1",
      "app_version": "3.41.0",
      "engine": "mysql",
      "source_registry": "https://r.cnpmjs.org",
      "changes_stream_registry": "https://r.cnpmjs.org",
      "cache_time": "2023-08-19T07:05:14.181Z",
      "upstream_registries": [
        {
          "since": "35627379",
          "registryId": "6306496ddd636c97816f37d4",
          "taskWorker": "npmmirror-x86-20220823002:3275935",
          "task_count": 1597861518,
          "last_package": "gridcreator",
          "last_package_created": "2023-08-09T14:38:06.068Z",
          "source_registry": "https://r.cnpmjs.org",
          "changes_stream_url": "https://r.cnpmjs.org/_changes",
          "registry_name": "default"
        }
      ]
    },
    "message": "[gateway] plugin market index is invalid"
  },
  "errorType": "pluginMarketIndexInvalid"
}
```

```json
{
  "body": {
    "indexUrl": "https://baidu.com",
    "message": "[gateway] plugin market index not found"
  },
  "errorType": "pluginMarketIndexNotFound"
}
```

### 返回结果

| 状态码 | 状态码含义                                                       | 说明                 | 数据模型 |
| ------ | ---------------------------------------------------------------- | -------------------- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | 成功                 | Inline   |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | 请求入参校验失败     | Inline   |
| 404    | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)   | 插件信息不存在       | Inline   |
| 490    | Unknown                                                          | 插件元数据错误       | Inline   |
| 491    | Unknown                                                          | 插件描述文件校验失败 | Inline   |
| 590    | Unknown                                                          | 插件市场索引错误     | Inline   |

### 返回数据结构

状态码 **490**

| 名称          | 类型   | 必选 | 约束 | 中文名 | 说明 |
| ------------- | ------ | ---- | ---- | ------ | ---- |
| » body        | object | true | none |        | none |
| »» error      | object | true | none |        | none |
| »» message    | string | true | none |        | none |
| »» pluginMeta | object | true | none |        | none |
| » errorType   | string | true | none |        | none |

状态码 **590**

| 名称           | 类型   | 必选  | 约束 | 中文名 | 说明 |
| -------------- | ------ | ----- | ---- | ------ | ---- |
| » body         | object | true  | none |        | none |
| »» error       | object | false | none |        | none |
| »» indexUrl    | string | true  | none |        | none |
| »» marketIndex | object | false | none |        | none |
| »» message     | string | true  | none |        | none |
| » errorType    | string | true  | none |        | none |
