import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

// Для каждого токена — свой разрешённый origin/referer
const ORIGIN_BY_TOKEN: Record<string, { origin: string; referer: string }> = {
  // rassvet
  dbd5df85745f3821512e25a1479fe0b7: {
    origin: 'https://rassvet.dymzavod.ru',
    referer: 'https://rassvet.dymzavod.ru/',
  },
  // red_october — ПОДСТАВЬ верный домен, если известен
  '6fa131296c485a5f478e7e197232972c': {
    origin: 'https://redoctober.dymzavod.ru',
    referer: 'https://redoctober.dymzavod.ru/',
  },
  // vernadka — ПОДСТАВЬ верный домен
  '961a8f7ebd4c5e39d13e8893d554b9f9': {
    origin: 'https://vernadka.dymzavod.ru',
    referer: 'https://vernadka.dymzavod.ru/',
  },
  // khamovniki — ПОДСТАВЬ верный домен
  '37fbc804bc6ea72eeb1a54bfca5fe682': {
    origin: 'https://khamovniki.dymzavod.ru',
    referer: 'https://khamovniki.dymzavod.ru/',
  },
};

type BodyIn = {
  token: string;
  reserve_id: number;
  // опционально: forceHeaders = false — если true, не слать origin/referer
  forceHeaders?: boolean;
};

// export async function POST(req: NextRequest) {
//   try {
//     const { token, reserve_id, forceHeaders = false } = (await req.json()) as BodyIn;

//     if (!token || reserve_id == null) {
//       return Response.json({ status: 'error', message: 'token and reserve_id are required' }, { status: 400 });
//     }

//     const h: Record<string, string> = {
//       accept: '*/*',
//       'content-type': 'application/json',
//       'user-agent': 'Mozilla/5.0',
//     };

//     // Если токен известен и не отключили заголовки — добавим origin/referer
//     const mapped = ORIGIN_BY_TOKEN[token];
//     if (!forceHeaders && mapped) {
//       h.origin = mapped.origin;
//       h.referer = mapped.referer;
//     }

//     const upstream = await fetch('https://app.remarked.ru/api/v1/ApiReservesWidget', {
//       method: 'POST',
//       headers: h,
//       body: JSON.stringify({
//         method: 'GetReserveByID',
//         token,
//         reserve_id,
//       }),
//     });

//     // Remarked часто возвращает 200 даже при ошибке — просто пробрасываем JSON
//     const data = await upstream.json().catch(() => ({
//       status: 'error',
//       message: `Non-JSON upstream: ${upstream.status}`,
//     }));

//     return Response.json(data, {
//       status: 200,
//       headers: { 'cache-control': 'no-store' },
//     });
//   } catch (err: any) {
//     return Response.json({ status: 'error', message: err?.message ?? 'proxy failed' }, { status: 500 });
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const { token, reserve_id, forceHeaders = false } = (await req.json()) as BodyIn;

    if (!token || reserve_id == null) {
      return Response.json({ status: 'error', message: 'token and reserve_id are required' }, { status: 400 });
    }

    const h: Record<string, string> = {
      accept: '*/*',
      'content-type': 'application/json',
      'user-agent': 'Mozilla/5.0',
    };

    const mapped = ORIGIN_BY_TOKEN[token];
    if (!forceHeaders && mapped) {
      h.origin = mapped.origin;
      h.referer = mapped.referer;
    }

    const upstream = await fetch('https://app.remarked.ru/api/v1/ApiReservesWidget', {
      method: 'POST',
      headers: h,
      body: JSON.stringify({
        method: 'GetReserveByID',
        token,
        reserve_id,
      }),
    });

    const data = await upstream.json().catch(() => ({
      status: 'error',
      message: `Non-JSON upstream: ${upstream.status}`,
    }));

    return Response.json(data, { status: 200, headers: { 'cache-control': 'no-store' } });
  } catch (err: any) {
    return Response.json({ status: 'error', message: err?.message ?? 'proxy failed' }, { status: 500 });
  }
}
