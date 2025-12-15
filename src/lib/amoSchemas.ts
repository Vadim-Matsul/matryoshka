import z from 'zod';

export const oauth2TokensSchema = z.object({
  token_type: z.string(), // например, "Bearer"
  expires_in: z.number(), // время жизни токена (в секундах)
  server_time: z.number(), // timestamp сервера
  access_token: z.string(), // access token
  refresh_token: z.string(), // refresh token
});
