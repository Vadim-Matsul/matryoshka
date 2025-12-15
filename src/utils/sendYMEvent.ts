export const sendYMEvent = (YM_ID: string, eventName: string, params: Record<string, any> = {}) => {
  if (typeof window === 'undefined') {
    console.error('Ошибка отправки event YA - сервер');
    return false;
  }
  if (!window.ym) {
    console.error('Ошибка отправки event YA - нет window.ym');
    return false;
  }

  try {
    window.ym(Number(YM_ID), 'reachGoal', eventName, params);
    return true;
  } catch (e) {
    const message = e instanceof Error ? e.message : 'неизвестная ошибка';
    console.error(`Ошибка отправки event YA - ${message}`);
    return false;
  }
};
