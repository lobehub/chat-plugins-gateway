// reason to use cfworker json schema:
// https://github.com/vercel/next.js/discussions/47063#discussioncomment-5303951
import { Validator } from '@cfworker/json-schema';
import {
  LobeChatPluginManifest,
  LobeChatPluginsMarketIndex,
  PluginErrorType,
  PluginRequestPayload,
  createErrorResponse,
  createHeadersWithPluginSettings,
  getPluginSettingsFromRequest,
  marketIndexSchema,
  pluginManifestSchema,
  pluginMetaSchema,
  pluginRequestPayloadSchema,
} from '@lobehub/chat-plugin-sdk';

import cors, { CorsOptions } from './cors';

const DEFAULT_PLUGINS_INDEX_URL = 'https://chat-plugins.lobehub.com';

const createGateway = (pluginsIndexUrl: string = DEFAULT_PLUGINS_INDEX_URL) => {
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

    let manifest = requestPayload.manifest as LobeChatPluginManifest | undefined;
    console.info(`[${identifier}] - ${apiName} `);

    // 入参中如果没有 manifest，则从插件市场索引中获取
    if (!manifest) {
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
          message: `[gateway] plugin '${identifier}' is not found，please check the plugin list in ${marketIndexUrl}, or create an issue to [lobe-chat-plugins](https://github.com/lobehub/lobe-chat-plugins/issues)`,
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
    }

    const manifestParseResult = pluginManifestSchema.safeParse(manifest);

    if (!manifestParseResult.success)
      return createErrorResponse(PluginErrorType.PluginManifestInvalid, {
        error: manifestParseResult.error,
        manifest: manifest,
        message: '[plugin] plugin manifest is invalid',
      });

    console.log(`[${identifier}] plugin manifest:`, manifest);

    // ==========  6. 校验是否按照 manifest 包含了 settings 配置 ========== //
    const settings = getPluginSettingsFromRequest(req);

    if (manifest.settings) {
      const v = new Validator(manifest.settings as any);
      const validator = v.validate(settings || {});
      if (!validator.valid)
        return createErrorResponse(PluginErrorType.PluginSettingsInvalid, {
          error: validator.errors,
          message: '[plugin] your settings is invalid with plugin manifest setting schema',
          settings,
        });
    }

    // ==========  7. 校验请求入参与 manifest 要求一致性 ========== //
    const api = manifest.api.find((i) => i.name === apiName);

    if (!api)
      return createErrorResponse(PluginErrorType.PluginApiNotFound, {
        manifest,
        message: '[plugin] api not found',
        request: {
          apiName,
          identifier,
        },
      });

    if (args) {
      const v = new Validator(api.parameters as any);
      const params = JSON.parse(args!);
      const validator = v.validate(params);

      if (!validator.valid)
        return createErrorResponse(PluginErrorType.PluginApiParamsError, {
          api,
          error: validator.errors,
          message: '[plugin] args is invalid with plugin manifest api schema',
          request: params,
        });
    }

    // ==========  8. 兼容 OpenAPI 请求模式 ========== //
    if (manifest.openapi) {
      // @ts-ignore
      const { default: SwaggerClient } = await import('swagger-client');

      const authorizations = {} as {
        [key: string]: any;
        basicAuth?: any;
        oauth2?: {
          accessToken: string;
          clientId: string;
          clientSecret: string;
        };
      };

      // 根据 settings 中的每个属性来构建 authorizations 对象
      for (const [key, value] of Object.entries(settings)) {
        if (key.endsWith('_username') && key.endsWith('_password')) {
          // 处理 HTTP Basic Authentication
          const username = settings[key];
          const password = settings[key.replace('_username', '_password')];
          authorizations.basicAuth = new SwaggerClient.PasswordAuthorization(username, password);
        } else if (
          key.endsWith('_clientId') &&
          key.endsWith('_clientSecret') &&
          key.endsWith('_accessToken')
        ) {
          // 处理 OAuth2
          const clientId = settings[key];
          const clientSecret = settings[key.replace('_clientId', '_clientSecret')];
          const accessToken = settings[key.replace('_clientId', '_accessToken')];
          authorizations.oauth2 = { accessToken, clientId, clientSecret };
        } else {
          // 处理 API Key 和 Bearer Token
          authorizations[key] = value as string;
        }
      }

      const client = await SwaggerClient({ authorizations, url: manifest.openapi });

      const parameters = JSON.parse(args || '{}');

      try {
        const res = await client.execute({ operationId: apiName, parameters });

        return new Response(res.text);
      } catch (error) {
        // 如果没有 status，说明没有发送请求，可能是 openapi 相关调用实现的问题
        if (!(error as any).status)
          return createErrorResponse('PluginGatewayError', {
            api,
            error: (error as Error).message,
            message:
              '[plugin] there are problem with sending openapi request, please contact with LobeHub Team',
          });

        // 如果是 401 则说明是鉴权问题
        if ((error as Response).status === 401)
          return createErrorResponse(PluginErrorType.PluginSettingsInvalid);

        return createErrorResponse(PluginErrorType.PluginServerError, { error });
      }
    }

    if (!api.url)
      return createErrorResponse(PluginErrorType.PluginApiParamsError, {
        api,
        message: '[plugin] missing api url',
      });

    const response = await fetch(api.url, {
      body: args,
      headers: createHeadersWithPluginSettings(settings),
      method: 'POST',
    });

    // ==========  9. 发送请求 ========== //

    // 不正常的错误，直接返回请求
    if (!response.ok) return response;

    const data = await response.text();

    console.log(`[${identifier}]`, args, `result:`, data.slice(0, 1000));

    return new Response(data);
  };
};

export interface GatewayOptions {
  cors?: CorsOptions;
  /**
   * @default https://chat-plugins.lobehub.com
   */
  pluginsIndexUrl?: string;
}

/**
 * create Gateway Edge Function with plugins index url
 * @param options {GatewayOptions}
 */
export const createLobeChatPluginGateway = (options: GatewayOptions = {}) => {
  const handler = createGateway(
    options.pluginsIndexUrl ? options.pluginsIndexUrl : DEFAULT_PLUGINS_INDEX_URL,
  );

  return async (req: Request) => cors(req, await handler(req), options.cors);
};
