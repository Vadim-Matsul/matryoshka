import { BookPlaceRequestModel } from '@/api/BronePlacePOST';
import { after, NextResponse } from 'next/server';

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

const config = {
  api_url: 'https://app.remarked.ru/api/v1/ApiReservesWidget',
  token: process.env.REMARKED_TOKEN,
  domain: 'https://matreshka-karaoke.ru',
};

const sendRoistatWebhook = async (
  data: BookPlaceRequestModel,
): Promise<void> => {
  const apiKey = process.env.ROISTAT_API_KEY;

  if (!apiKey) {
    console.warn('ROISTAT_API_KEY is not set, skipping webhook');
    return;
  }

  const payload = {
    title: 'Заявка',
    name: data.name,
    phone: data.phone,
    comment: data.comment || 'Заявка отправлена через форму бронирования',
    roistat_visit: data.roistat_visit || undefined,
    fields: {
      site: config.domain,
      place: data.place,
      date: data.date,
      time: data.time,
      guests_count: data.guests,
    },
  };

  const res = await fetch(
    `https://cloud.roistat.com/integration/webhook?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
  );

  console.log('Roistat webhook sent, status:', res.status);
};

export async function POST(req: Request) {
  try {
    if (!config.token) {
      console.error('REMARKED_TOKEN is not set');
      return NextResponse.json(
        { error: 'Сервис бронирования временно недоступен' },
        { status: 500 },
      );
    }

    const body: BookPlaceRequestModel = await req.json();
    const { name, phone, date, time, guests, comment } = body;

    const response = await fetch(config.api_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
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
        request_id: Date.now(),
      }),
    });

    const data = await response.json();

    if (data.status === 'error') {
      const matchedKey = Object.keys(remarkedErrors).find((key) =>
        data.message?.includes(key),
      );
      const known = matchedKey ? remarkedErrors[matchedKey] : null;

      return NextResponse.json(
        {
          field: known?.field ?? null,
          message: known?.message ?? data.message ?? 'Неизвестная ошибка',
        },
        { status: 400 },
      );
    }

    after(() => sendRoistatWebhook(body));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Reserve API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' + error },
      { status: 500 },
    );
  }
}
