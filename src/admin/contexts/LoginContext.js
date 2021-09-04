import { useEffect } from 'react';
import { createContext, useState } from 'react';

const LoginContext = createContext({});

const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(window.localStorage.getItem('isLogin') === 'true');

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
