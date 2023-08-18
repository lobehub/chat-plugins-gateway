import { LobeChatPlugin, LobeChatPluginsMarketIndex } from '@lobehub/chat-plugin-sdk';

import { OpenAIPluginPayload } from '../../types/plugins';

export const config = {
  runtime: 'edge',
};

const INDEX_URL = `https://registry.npmmirror.com/@lobehub/lobe-chat-plugins/latest/files`;

export default async (req: Request) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const indexRes = await fetch(INDEX_URL);
  const manifest: LobeChatPluginsMarketIndex = await indexRes.json();
  console.log('manifest:', manifest);

  const { name, arguments: args } = (await req.json()) as OpenAIPluginPayload;

  console.log(`检测到 functionCall: ${name}`);

  const item = manifest.plugins.find((i) => i.name === name);

  if (!item) return;

  if (!item.manifest) return;

  // 获取插件的 manifest
  const pluginRes = await fetch(item.manifest);
  const chatPlugin = (await pluginRes.json()) as LobeChatPlugin;

  const response = await fetch(chatPlugin.server.url, { body: args, method: 'post' });

  const data = await response.text();

  console.log(`[${name}]`, args, `result:`, data.slice(0, 3600));

  return new Response(data);
};
