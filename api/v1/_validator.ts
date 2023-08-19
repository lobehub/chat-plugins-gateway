import { z } from 'zod';

export const payloadSchema = z.object({
  arguments: z.string().optional(),
  name: z.string(),
});

export type PluginPayload = z.infer<typeof payloadSchema>;
