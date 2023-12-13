import { Gateway } from '@lobehub/chat-plugins-gateway';
import { describe, expect, it } from 'vitest';

describe('Gateway', () => {
  it('should init with pluginIndexUrl', () => {
    const gateway = new Gateway({ pluginsIndexUrl: 'https://test-market-index-url.com' });

    expect(gateway['pluginIndexUrl']).toBe('https://test-market-index-url.com');
  });
});
