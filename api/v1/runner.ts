import { OpenAIPluginPayload } from '../../types/plugins';

export const runtime = 'edge';

export default async (req: Request) => {
  const { name, arguments: args } = (await req.json()) as OpenAIPluginPayload;

  console.log(`检测到 functionCall: ${name}`);

  const func = { runner: (params: any) => params };

  if (func) {
    const data = JSON.parse(args);
    const result = await func.runner(data);

    console.log(`[${name}]`, args, `result:`, JSON.stringify(result, null, 2).slice(0, 3600));

    return new Response(JSON.stringify(result));
  }
};
