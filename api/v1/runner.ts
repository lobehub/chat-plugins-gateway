import { createLobeChatPluginGateway } from '../../src';

export const config = {
  runtime: 'edge',
};

const DEFAULT_INDEX_URL =
  process.env.PLUGINS_INDEX_URL ??
  'https://registry.npmmirror.com/@lobehub/lobe-chat-plugins/latest/files';

export default createLobeChatPluginGateway(DEFAULT_INDEX_URL);
