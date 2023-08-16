import { PluginItem } from '../../types/pluginItem';
import runner from './runner';
import { Result } from './type';

const schema: PluginItem['schema'] = {
  description: '查询搜索引擎获取信息',
  name: 'searchEngine',
  parameters: {
    properties: {
      keywords: {
        description: '关键词',
        type: 'string',
      },
    },
    required: ['keywords'],
    type: 'object',
  },
};

const searchEngine: PluginItem<Result> = {
  avatar: '🔍',
  name: 'searchEngine',
  runner,
  schema,
};

export default searchEngine;
