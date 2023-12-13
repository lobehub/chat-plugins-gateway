import { PluginRequestPayload } from '@lobehub/chat-plugin-sdk';
import { Gateway } from '@lobehub/chat-plugins-gateway';
import Ajv from 'ajv';
// @ts-ignore
import SwaggerClient from 'swagger-client';
import { describe, expect, it, vi } from 'vitest';

vi.mock('swagger-client', () => ({
  default: vi.fn(),
}));

describe('Gateway', () => {
  it('should init with pluginIndexUrl', () => {
    const gateway = new Gateway({ pluginsIndexUrl: 'https://test-market-index-url.com' });

    expect(gateway['pluginIndexUrl']).toBe('https://test-market-index-url.com');
  });

  describe('using AJV Validator', () => {
    const gateway = new Gateway({
      Validator: (schema, value) => {
        const ajv = new Ajv({ strict: false });
        const validate = ajv.compile(schema);

        const valid = validate(value);
        return {
          errors: validate.errors,
          valid,
        };
      },
    });

    it('run with ajv validator', async () => {
      const mockResult = JSON.stringify({ success: true });
      vi.mocked(SwaggerClient).mockResolvedValue({
        execute: vi.fn().mockResolvedValue({
          status: 200,
          text: mockResult,
        }),
      });

      const payload = {
        apiName: 'getSupportedVendors',
        arguments: '{}',
        identifier: 'mock-credit-card',
        manifest: {
          $schema: '../node_modules/@lobehub/chat-plugin-sdk/schema.json',
          api: [
            {
              description: 'It is API to get list of supported vendors',
              name: 'getSupportedVendors',
              parameters: {
                properties: {},
                type: 'object',
              },
            },
          ],
          author: 'arvinxx',
          createdAt: '2023-12-11',
          identifier: 'mock-credit-card',
          meta: {
            avatar: '💳',
            description: 'Credit Card Number Generator',
            tags: ['credit-card', 'mockup', 'generator'],
            title: 'Credit Card Generator',
          },
          openapi:
            'https://lobe-plugin-mock-credit-card-arvinxx.vercel.app/credit-card-number-generator.json',
          settings: {
            properties: {
              apiKeyAuth: {
                description: 'apiKeyAuth API Key',
                format: 'password',
                title: 'X-OpenAPIHub-Key',
                type: 'string',
              },
            },
            required: ['apiKeyAuth'],
            type: 'object',
          },
          version: '1',
        },
        type: 'default',
      } as PluginRequestPayload;

      const res = await gateway.execute(payload, { apiKeyAuth: 'abc' });

      expect(res.success).toBeTruthy();
      expect(res.data).toEqual(mockResult);
    });

    it('run with ajv with $$refs', async () => {
      const mockResult = JSON.stringify({ success: true });
      vi.mocked(SwaggerClient).mockResolvedValue({
        execute: vi.fn().mockResolvedValue({
          status: 200,
          text: mockResult,
        }),
      });

      const payload = {
        apiName: 'getRandomCardNumber',
        arguments: '{"vendor":"visa"}',
        identifier: 'mock-credit-card',
        manifest: {
          $schema: '../node_modules/@lobehub/chat-plugin-sdk/schema.json',
          api: [
            {
              description: 'It is API to generate random credit card numbers',
              name: 'getRandomCardNumber',
              parameters: {
                properties: {
                  vendor: {
                    $$ref: 'https://chat-dev.lobehub.com/chat#/components/schemas/Vendor',
                    enum: [
                      'visa',
                      'master-card',
                      'diners-club',
                      'american-express',
                      'discover',
                      'jcb',
                    ],
                    type: 'string',
                  },
                },
                required: ['vendor'],
                type: 'object',
              },
            },
            {
              description: 'It is API to get list of supported vendors',
              name: 'getSupportedVendors',
              parameters: { properties: {}, type: 'object' },
            },
          ],
          author: 'arvinxx',
          createdAt: '2023-12-11',
          identifier: 'mock-credit-card',
          meta: {
            avatar: '💳',
            description: 'Credit Card Number Generator',
            tags: ['credit-card', 'mockup', 'generator'],
            title: 'Credit Card Generator',
          },
          openapi:
            'https://lobe-plugin-mock-credit-card-arvinxx.vercel.app/credit-card-number-generator.json',
          settings: {
            properties: {
              apiKeyAuth: {
                description: 'apiKeyAuth API Key',
                format: 'password',
                title: 'X-OpenAPIHub-Key',
                type: 'string',
              },
            },
            required: ['apiKeyAuth'],
            type: 'object',
          },
          version: '1',
        },
        type: 'default',
      } as PluginRequestPayload;

      const res = await gateway.execute(payload, { apiKeyAuth: 'abc' });

      expect(res.success).toBeTruthy();
      expect(res.data).toEqual(mockResult);
    });
  });
});
