// reason to use cfworker json schema:
// https://github.com/vercel/next.js/discussions/47063#discussioncomment-5303951
import { Validator } from '@cfworker/json-schema';
import {
  LobeChatPluginManifest,
  LobeChatPluginsMarketIndex,
  PluginErrorType,
  PluginRequestPayload,
  createErrorResponse,
  marketIndexSchema,
  pluginManifestSchema,
  pluginMetaSchema,
  pluginRequestPayloadSchema,
} from '@lobehub/chat-plugin-sdk';

/**
 * create Gateway Edge Function with plugins index url
 * @param pluginsIndexUrl
 */
export const createLobeChatPluginGateway = (pluginsIndexUrl: string) => {
  return async (req: Request) => {
    // ==========  1. 校验请求方法 ========== //
    if (req.method !== 'POST')
      return createErrorResponse(PluginErrorType.MethodNotAllowed, {
        message: '[gateway] only allow POST method',
      });

    // ==========  2. 校验请求入参基础格式 ========== //
    const requestPayload = (await req.json()) as PluginRequestPayload;

    const payloadParseResult = pluginRequestPayloadSchema.safeParse(requestPayload);

    if (!payloadParseResult.success)
      return createErrorResponse(PluginErrorType.BadRequest, payloadParseResult.error);

    const { identifier, arguments: args, indexUrl, apiName } = requestPayload;

    console.info(`[${identifier}] - ${apiName} `);

    const marketIndexUrl = indexUrl ?? pluginsIndexUrl;
    // ==========  3. 获取插件市场索引 ========== //

    let marketIndex: LobeChatPluginsMarketIndex | undefined;
    try {
      const indexRes = await fetch(marketIndexUrl);
      marketIndex = await indexRes.json();
    } catch (error) {
      console.error(error);
      marketIndex = undefined;
    }

    // 插件市场索引不存在
    if (!marketIndex)
      return createErrorResponse(PluginErrorType.PluginMarketIndexNotFound, {
        indexUrl: marketIndexUrl,
        message: '[gateway] plugin market index not found',
      });

    // 插件市场索引解析失败
    const indexParseResult = marketIndexSchema.safeParse(marketIndex);

    if (!indexParseResult.success)
      return createErrorResponse(PluginErrorType.PluginMarketIndexInvalid, {
        error: indexParseResult.error,
        indexUrl: marketIndexUrl,
        marketIndex,
        message: '[gateway] plugin market index is invalid',
      });

    console.info('marketIndex:', marketIndex);

    // ==========  4. 校验插件 meta 完备性 ========== //

    const pluginMeta = marketIndex.plugins.find((i) => i.identifier === identifier);

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
      return createErrorResponse(PluginErrorType.PluginMetaNotFound, {
        identifier,
        message: `[gateway] plugin '${identifier}' is not found，please check the plugin list in ${indexUrl}, or create an issue to [lobe-chat-plugins](https://github.com/lobehub/lobe-chat-plugins/issues)`,
      });

    const metaParseResult = pluginMetaSchema.safeParse(pluginMeta);

    if (!metaParseResult.success)
      return createErrorResponse(PluginErrorType.PluginMetaInvalid, {
        error: metaParseResult.error,
        message: '[plugin] plugin meta is invalid',
        pluginMeta,
      });

    // ==========  5. 校验插件 manifest 完备性 ========== //

    // 获取插件的 manifest
    let manifest: LobeChatPluginManifest | undefined;
    try {
      const pluginRes = await fetch(pluginMeta.manifest);
      manifest = (await pluginRes.json()) as LobeChatPluginManifest;
    } catch (error) {
      console.error(error);
      manifest = undefined;
    }

    if (!manifest)
      return createErrorResponse(PluginErrorType.PluginManifestNotFound, {
        manifestUrl: pluginMeta.manifest,
        message: '[plugin] plugin manifest not found',
      });

    const manifestParseResult = pluginManifestSchema.safeParse(manifest);

    if (!manifestParseResult.success)
      return createErrorResponse(PluginErrorType.PluginManifestInvalid, {
        error: manifestParseResult.error,
        manifest: manifest,
        message: '[plugin] plugin manifest is invalid',
      });

    console.log(`[${identifier}] plugin manifest:`, manifest);

    // ==========  6. 校验请求入参与 manifest 要求一致性 ========== //
    const api = manifest.api.find((i) => i.name === apiName);

    if (!api)
      return createErrorResponse(PluginErrorType.BadRequest, {
        apiName,
        identifier,
        message: '[plugin] api not found',
      });

    if (args) {
      const v = new Validator(api.parameters as any);
      const validator = v.validate(JSON.parse(args!));

      if (!validator.valid)
        return createErrorResponse(PluginErrorType.BadRequest, {
          error: validator.errors,
          manifest,
          message: '[plugin] args is invalid with plugin manifest schema',
        });
    }

    // ==========  7. 发送请求 ========== //

    const response = await fetch(api.url, { body: args, method: 'post' });

    // 不正常的错误，直接返回请求
    if (!response.ok) return response;

    const data = await response.text();

    console.log(`[${identifier}]`, args, `result:`, data.slice(0, 1000));

    return new Response(data);
  };
};
