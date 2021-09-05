import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllReserves } from 'admin/api/apiHandler';

const url = 'https://api.visitor.dev.42seoul.io/ws';
const checkInPath = '/visitor';

export const VisitorContext = createContext({});

export const VisitorProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [socket, setSocket] = useState(null);
  const [checkInData, setCheckInData] = useState([]);

  const getReserve = (date) => {
    getAllReserves(date).then((res) => setCheckInData(res.data));
  };

  const initSocket = () => {
    const sockJS = new SockJS(url);
    const stompClient = Stomp.over(sockJS);
    if (stompClient !== null) {
      stompClient.connect({}, () => {
        stompClient.reconnect_delay = 5000;
        stompClient.subscribe(checkInPath, (data) => {
          getReserve();
        });
      });
    }
    setSocket(stompClient);
  };

  useEffect(() => {
    initSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VisitorContext.Provider
      value={{
        checkInData,
        setCheckInData,
        getReserve,
      }}
    >
      {children}
    </VisitorContext.Provider>
  );
};
