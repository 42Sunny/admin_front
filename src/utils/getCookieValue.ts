const getCookieValue = (key: string | undefined) => {
  if (key === undefined) return '';

  return document.cookie
    .split(';')
    .filter((cookie) => cookie.includes(key))
    .join('')
    .split('=')[1];
};

export default getCookieValue;
