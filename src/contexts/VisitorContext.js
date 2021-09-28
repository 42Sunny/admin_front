import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllReserves } from 'api/visitorApi';
import { getFomattedNow } from 'utils/getFormattedNow';

const WS_URL = `${process.env.REACT_APP_VISITOR_API_URL}/ws`;
const checkInPath = '/visitor';

export const VisitorContext = createContext({});

export const VisitorProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [socket, setSocket] = useState(null);
  const [checkInData, setCheckInData] = useState([]);
  const [newVisitorAlert, setNewVisitorAlert] = useState(false);

  const getReserve = (date) => {
    getAllReserves(date).then((res) => setCheckInData(res.data));
  };

  const initSocket = () => {
    const sockJs = new SockJS(WS_URL);
    const client = Stomp.over(sockJs);

    client.debug = (msg) => {
      if (process.env.REACT_APP_DEBUG) console.log(`>>> Debug\n${msg}`);
    };

    client.heartbeat = {
      incoming: 4000,
      outgoing: 4000,
    };

    client.reconnectDelay = 5000;

    if (client !== null) {
      client.connect(
        { login: 'user', passcode: 'password' },
        () => {
          client.subscribe(checkInPath, (data) => {
            getReserve(getFomattedNow());
            setNewVisitorAlert(true);
          });
        },
        (error) => {
          if (process.env.REACT_APP_DEBUG) console.log(`>>> Error\n${error}`);
        },
      );
    }
    setSocket(client);
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
        newVisitorAlert,
        setNewVisitorAlert,
      }}
    >
      {children}
    </VisitorContext.Provider>
  );
};
