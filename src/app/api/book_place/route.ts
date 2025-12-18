import { BookPlaceRequestModel } from '@/api/BronePlacePOST';
import { NextResponse } from 'next/server';

const getCurDate = () => {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const getNextTimeSlotMSK = (stepMinutes = 30): string => {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));

  const minutes = now.getMinutes();
  const remainder = minutes % stepMinutes;

  if (remainder !== 0) {
    now.setMinutes(minutes + (stepMinutes - remainder));
  } else {
    now.setMinutes(minutes + stepMinutes);
  }

  now.setSeconds(0);
  now.setMilliseconds(0);

  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');

  return `${hh}:${mm}`;
};

const config = {
  api_url: 'https://app.remarked.ru/api/v1/ApiReservesWidget',
  token: '8ceab82028b4c1e7edb37efebb35a2dd',
  domain: 'https://matreshka-karaoke.ru',
  envs: {},
};

export async function POST(req: Request) {
  const date = getCurDate();
  console.log(date);

  try {
    const { name, phone }: BookPlaceRequestModel = await req.json();

    const request_id = Date.now();

    const body = {
      method: 'CreateReserve',
      token: config.token,
      reserve: {
        name,
        phone,
        date: getCurDate(),
        time: getNextTimeSlotMSK(),
        guests_count: 100,
      },
      request_id,
    };
    console.log(body)

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
