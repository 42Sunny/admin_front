export const env = {
  API_URL: {
    visitor: process.env.REACT_APP_VISITOR_API_URL,
    checkin: process.env.REACT_APP_CHECKIN_API_URL,
  },
  cookie_domain: process.env.REACT_APP_COOKIE_DOMAIN,
  auth_key: process.env.REACT_APP_AUTH_KEY,
  x_42cadet_key: {
    visitor: process.env.REACT_APP_X_42CADET_VISITOR_AUTH_KEY,
    checkin: process.env.REACT_APP_X_42CADET_CHECKIN_AUTH_KEY,
  },
};
