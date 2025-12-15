import { NextRequest } from 'next/server';
import { mkdir, appendFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';

const DATA_DIR = join(process.cwd(), 'data');
const FILE_NDJSON = join(DATA_DIR, 'dym_db.ndjson');

const NAME_BY_TOKEN = {
  dbd5df85745f3821512e25a1479fe0b7: {
    title: 'РАССВЕТ',
  },
  // red_october — ПОДСТАВЬ верный домен, если известен
  '6fa131296c485a5f478e7e197232972c': {
    title: 'КРАСНЫЙ ОКТЯБРЬ',
  },
  // vernadka — ПОДСТАВЬ верный домен
  '961a8f7ebd4c5e39d13e8893d554b9f9': {
    title: 'ВЕРНАДКА',
  },
  // khamovniki — ПОДСТАВЬ верный домен
  '37fbc804bc6ea72eeb1a54bfca5fe682': {
    title: 'ХАМОВНИКИ',
  },
};

type BodyIn = {
  id: number;
  tokenKey: string; // rassvet / red_october / vernadka / khamovniki
  token: string;
  response: unknown; // что вернул Remarked (reserve-объект и т.д.)
};

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as BodyIn;

    if (
      typeof payload?.id !== 'number' ||
      !payload?.tokenKey ||
      !payload?.token ||
      typeof payload?.response === 'undefined'
    ) {
      return Response.json({ status: 'error', message: 'id, tokenKey, token, response are required' }, { status: 400 });
    }

    // обеспечим наличие папки
    await mkdir(DATA_DIR, { recursive: true });

    const line =
      JSON.stringify({
        // ts: new Date().toISOString(),
        id: payload.id,
        name: NAME_BY_TOKEN[payload.token].title,
        // tokenKey: payload.tokenKey,
        // token: payload.token,
        response: payload.response,
      }) + '\n';

    await appendFile(FILE_NDJSON, line, { encoding: 'utf8' });

    return Response.json({ status: 'ok' }, { status: 200 });
  } catch (e: any) {
    return Response.json({ status: 'error', message: e?.message ?? 'write failed' }, { status: 500 });
  }
}
