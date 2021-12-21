export const getQueryString = () =>
  window.location.href
    ?.split('/')
    ?.reverse()[0]
    ?.split('?')[1]
    ?.split('&')
    ?.reduce((prev: any, elem) => {
      const set = elem.split('=');
      return { ...prev, [set?.[0]]: set?.[1] };
    }, {});
