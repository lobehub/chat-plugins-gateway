import { PluginItem } from '../types/pluginItem';
import searchEngine from './searchEngine';
import webCrawler from './webCrawler';

export const PluginsMap: Record<string, PluginItem> = {
  [searchEngine.name]: searchEngine,
  [webCrawler.name]: webCrawler,
};
