export const getRoistatVisit = () => {
  if (typeof document === 'undefined') return '';
  return document.cookie.match(/roistat_visit=([^;]+)/)?.[1] ?? '';
};
