import { BookPlaceRequestModel } from '@/api/BronePlacePOST';
import { NextResponse } from 'next/server';

const getCurDate = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const remarkedErrors: Record<string, { field: string; message: string }> = {
  '`reserve`.`date`': {
    field: 'date',
    message: 'Некорректная дата',
  },
  '`reserve`.`time`': {
    field: 'time',
    message: 'Некорректное время',
  },
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
  try {
    const { name, phone, place, date, time, guests, comment }: BookPlaceRequestModel = await req.json();

    const request_id = Date.now();

    const body = {
      method: 'CreateReserve',
      token: config.token,
      reserve: {
        name,
        phone,
        date,
        time,
        guests_count: guests,
        comment,
      },
      request_id,
    };

    const response = await fetch(config.api_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.status === 'error') {
      const matchedKey = Object.keys(remarkedErrors).find(key => data.message?.includes(key));

      const known = matchedKey ? remarkedErrors[matchedKey] : null;

      if (known) {
        return NextResponse.json(
          {
            field: known.field,
            message: known.message,
          },
          { status: 400 },
        );
      }

      return NextResponse.json(
        {
          field: null,
          message: data.message || 'Неизвестная ошибка',
        },
        { status: 400 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Reserve API error:', error);
    return NextResponse.json({ error: 'Something went wrong' + error }, { status: 500 });
  }
}
