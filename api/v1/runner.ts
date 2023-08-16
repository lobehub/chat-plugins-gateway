import { PluginsMap } from '../../plugins';
import { OpenAIPluginPayload } from '../../types/plugins';

export const config = {
  runtime: 'edge',
};

export default async (req: Request) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const { name, arguments: args } = (await req.json()) as OpenAIPluginPayload;

  console.log(`检测到 functionCall: ${name}`);

  const func = PluginsMap[name];

  if (func) {
    const data = JSON.parse(args);
    const result = await func.runner(data);

    console.log(`[${name}]`, args, `result:`, JSON.stringify(result, null, 2).slice(0, 3600));

    return new Response(JSON.stringify(result));
  }

  return;
};
