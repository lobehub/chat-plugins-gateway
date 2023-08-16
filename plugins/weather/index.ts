import { PluginItem } from '../../types/pluginItem';
import runner from './runner';
import { WeatherResult } from './type';

const schema: PluginItem['schema'] = {
  description: '获取当前天气情况',
  name: 'realtimeWeather',
  parameters: {
    properties: {
      city: {
        description: '城市名称',
        type: 'string',
      },
    },
    required: ['city'],
    type: 'object',
  },
};

const getWeather: PluginItem<WeatherResult> = {
  avatar: '☂️',
  name: 'realtimeWeather',
  runner,
  schema,
};

export default getWeather;
