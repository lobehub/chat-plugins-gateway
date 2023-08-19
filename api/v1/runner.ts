import {
  ErrorType,
  LobeChatPlugin,
  LobeChatPluginsMarketIndex,
  createErrorResponse,
  marketIndexSchema,
  pluginManifestSchema,
  pluginMetaSchema,
} from '@lobehub/chat-plugin-sdk';
import { Validator } from 'jsonschema';

import { PluginPayload, payloadSchema } from './_validator';

export const config = {
  runtime: 'edge',
};

const INDEX_URL = `https://registry.npmmirror.com/@lobehub/lobe-chat-plugins/latest/files`;

export default async (req: Request) => {
  // ==========  1. 校验请求方法 ========== //
  if (req.method !== 'POST')
    return createErrorResponse(ErrorType.MethodNotAllowed, {
      message: '[gateway] only allow POST method',
    });

  // ==========  2. 校验请求入参基础格式 ========== //
  const requestPayload = (await req.json()) as PluginPayload;

  const payloadParseResult = payloadSchema.safeParse(requestPayload);

  if (!payloadParseResult.success)
    return createErrorResponse(ErrorType.BadRequest, payloadParseResult.error);

  const { name, arguments: args } = requestPayload;

  console.info(`plugin call: ${name}`);

  // ==========  3. 获取插件市场索引 ========== //

  let marketIndex: LobeChatPluginsMarketIndex | undefined;
  try {
    const indexRes = await fetch(INDEX_URL);
    marketIndex = await indexRes.json();
  } catch (error) {
    console.error(error);
    marketIndex = undefined;
  }

  // 插件市场索引不存在
  if (!marketIndex)
    return createErrorResponse(ErrorType.PluginMarketIndexNotFound, {
      indexUrl: INDEX_URL,
      message: '[gateway] plugin market index not found',
    });

  // 插件市场索引解析失败
  const indexParseResult = marketIndexSchema.safeParse(marketIndex);

  if (!indexParseResult.success)
    return createErrorResponse(ErrorType.PluginMarketIndexInvalid, {
      error: indexParseResult.error,
      indexUrl: INDEX_URL,
      marketIndex,
      message: '[gateway] plugin market index is invalid',
    });

  console.info('marketIndex:', marketIndex);

  // ==========  4. 校验插件 meta 完备性 ========== //

  const pluginMeta = marketIndex.plugins.find((i) => i.name === name);

  // 一个不规范的插件示例
  // const pluginMeta = {
  //   createAt: '2023-08-12',
  //   homepage: 'https://github.com/lobehub/chat-plugin-real-time-weather',
  //   manifest: 'https://registry.npmmirror.com/@lobehub/lobe-chat-plugins/latest/files',
  //   meta: {
  //     avatar: '☂️',
  //     tags: ['weather', 'realtime'],
  //   },
  //   name: 'realtimeWeather',
  //   schemaVersion: 'v1',
  // };

  // 校验插件是否存在
  if (!pluginMeta)
    return createErrorResponse(ErrorType.PluginMetaNotFound, {
      message: `[gateway] plugin '${name}' is not found，please check the plugin list in ${INDEX_URL}, or create an issue to [lobe-chat-plugins](https://github.com/lobehub/lobe-chat-plugins/issues)`,
      name,
    });

  const metaParseResult = pluginMetaSchema.safeParse(pluginMeta);

  if (!metaParseResult.success)
    return createErrorResponse(ErrorType.PluginMetaInvalid, {
      error: metaParseResult.error,
      message: '[plugin] plugin meta is invalid',
      pluginMeta,
    });

  // ==========  5. 校验插件 manifest 完备性 ========== //

  // 获取插件的 manifest
  let manifest: LobeChatPlugin | undefined;
  try {
    const pluginRes = await fetch(pluginMeta.manifest);
    manifest = (await pluginRes.json()) as LobeChatPlugin;
  } catch (error) {
    console.error(error);
    manifest = undefined;
  }

  if (!manifest)
    return createErrorResponse(ErrorType.PluginManifestNotFound, {
      manifestUrl: pluginMeta.manifest,
      message: '[plugin] plugin manifest not found',
    });

  const manifestParseResult = pluginManifestSchema.safeParse(manifest);

  if (!manifestParseResult.success)
    return createErrorResponse(ErrorType.PluginManifestInvalid, {
      error: manifestParseResult.error,
      manifest: manifest,
      message: '[plugin] plugin manifest is invalid',
    });

  console.log(`[${name}] plugin manifest:`, manifest);

  // ==========  6. 校验请求入参与 manifest 要求一致性 ========== //
  const v = new Validator();

  if (args) {
    const validator = v.validate(JSON.parse(args!), manifest.schema.parameters as any);

    if (!validator.valid)
      return createErrorResponse(ErrorType.BadRequest, {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        error: validator.errors.map(({ schema: _, ...res }) => res),
        manifest,
        message: '[plugin] args is invalid with plugin manifest schema',
      });
  }

  // ==========  7. 发送请求 ========== //

  const response = await fetch(manifest.server.url, { body: args, method: 'post' });

  // 不正常的错误，直接返回请求
  if (!response.ok) return response;

  const data = await response.text();

  console.log(`[${name}]`, args, `result:`, data.slice(0, 3600));

  return new Response(data);
};
