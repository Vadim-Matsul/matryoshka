import { BookPlaceRequestModel } from '@/api/BronePlacePOST';
import { NextResponse } from 'next/server';

const getCurDate = () => {
  const now = new Date();

  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

  return Math.floor(startOfDay.getTime() / 1000);
};

const config = {
  api_url: 'https://app.remarked.ru/api/v1/ApiReservesWidget',
  domain: 'https://matreshka-karaoke.ru',
  tokens: {
    red_october: '8ceab82028b4c1e7edb37efebb35a2dd',
    sochi: '',
  },
  envs: {},
};

export async function POST(req: Request) {
  const date = getCurDate();
  console.log(date);

  try {
    const { name, phone, agree, place }: BookPlaceRequestModel = await req.json();

    // генерация request_id и session_id
    const request_id = Date.now();
    const session_id = `session_${Date.now()}_${Math.random()}`;

    const token = config.tokens.red_october;

    const body = {
      method: 'CreateReserve',
      token: token,
      reserve: {
        name,
        phone,
        date, // TODO: plug
        time: 1098, // TODO: plug
        guests_count: 1000, // TODO: plug
        comment: '',
        utm: '',
        duration: 120,
      },
      request_id,
      session_id,
      site_url: config.domain,
    };

    const response = await fetch(config.api_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Reserve API error:', date, error);
    return NextResponse.json({ error: 'Something went wrong' + error }, { status: 500 });
  }
}
