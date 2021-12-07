const getCookieValue = (key: string | undefined) => {
  if (key === undefined) return '';

  return (
    document.cookie
      .split(';')
      .map((cookie) => cookie.trim())
      .filter((cookie) => key === cookie.split('=')[0])
      .join('')
      .split('=')[1] ?? ''
  );
};

export default getCookieValue;
