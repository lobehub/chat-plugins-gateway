import { PluginItem } from '../types/pluginItem';
import searchEngine from './searchEngine';

export const PluginsMap: Record<string, PluginItem> = {
  [searchEngine.name]: searchEngine,
};
