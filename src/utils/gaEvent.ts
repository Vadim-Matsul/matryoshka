export const gaEvent = (name: string, params: Record<string, any> = {}) => {
  if (typeof window === 'undefined') {
    console.error('Ошибка отправки event GA - сервер');
    return false;
  }

  if (!window.gtag) {
    console.error('Ошибка отправки event GA - нет window.gtag');
    return false;
  }

  window.gtag('event', name, params);
  return true;
};
