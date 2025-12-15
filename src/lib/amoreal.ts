import { promises as fs } from 'fs';
import path from 'path';
import z from 'zod';

export const amoVars = {
  tokensDir: path.join(process.cwd(), '/tmp/tokens'),
  tokensFileName: 'amo_tokens.json',
  tokenSchema: z.object({
    auth_code: z.string(),
    access: z.string(),
    refresh: z.string(),
    expire: z.number(),
    server_time: z.number(),
  }),
  envs: {
    client_id: process.env.AMOCRM_CLIENT_ID,
    client_secret: process.env.AMOCRM_CLIENT_SECRET,
    long_token: process.env.AMOCRM_LONG_TOKEN,
    redirect_url: process.env.AMOCRM_REDIRECT_URL,
    base_domain: process.env.AMOCRM_BASE_DOMAIN,
    api_url: `https://${process.env.AMOCRM_BASE_DOMAIN}.amocrm.ru/api/v4`,
  },
};

export async function amoRequest(endpoint: string, method = 'GET', body?: any) {
  try {
    console.log('amoRequest ', amoVars);

    const response = await fetch(`${amoVars.envs.api_url}${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${amoVars.envs.long_token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Ошибка запроса AMOcrm: ${response.status} ${await response.text()}`);
    }

    return response.json();
  } catch (err) {
    throw new Error(`Ошибка запроса: ${err}`);
  }
}
