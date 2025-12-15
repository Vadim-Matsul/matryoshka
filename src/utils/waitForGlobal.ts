export function waitForGlobal<T = any>(key: string, tries = 50, interval = 50): Promise<T | null> {
  return new Promise(resolve => {
    let attempt = 0;

    const timer = setInterval(() => {
      const value = window[key];

      if (value) {
        clearInterval(timer);
        resolve(value);
      }

      attempt++;
      if (attempt >= tries) {
        clearInterval(timer);
        resolve(null);
      }
    }, interval);
  });
}
