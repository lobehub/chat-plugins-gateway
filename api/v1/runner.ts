// TODO：后续替换为 sdk
import { LobeChatPlugins } from '@lobehub/lobe-chat-plugins';

import { PluginsMap } from '../../plugins';
import { OpenAIPluginPayload } from '../../types/plugins';

export const config = {
  runtime: 'edge',
};

const INDEX_PKG = `@lobehub/lobe-chat-plugins`;

const INDEX_URL = `https://registry.npmmirror.com/${INDEX_PKG}/latest/files`;

export default async (req: Request) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const { name, arguments: args } = (await req.json()) as OpenAIPluginPayload;

  console.log(`检测到 functionCall: ${name}`);

  const res = await fetch(INDEX_URL);
  const manifest: LobeChatPlugins = await res.json();
  console.log(manifest);

  const item = manifest.plugins.find((i) => i.name === name);

  // 先通过插件资产路径查询
  if (item) {
    const res = await fetch(item.runtime.endpoint, { body: args, method: 'post' });
    const data = await res.text();
    console.log(`[${name}]`, args, `result:`, data.slice(0, 3600));
    return new Response(data);
  }

  // TODO：兼容性代码，全量完成迁移后移除
  const func = PluginsMap[name];

  if (func) {
    const data = JSON.parse(args);
    const result = await func.runner(data);

    console.log(`[${name}]`, args, `result:`, JSON.stringify(result, null, 2).slice(0, 3600));

    return new Response(JSON.stringify(result));
  }
  return;
};
