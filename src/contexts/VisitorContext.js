import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { createContext, useCallback } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { getVisitorLogs } from 'api/visitorApi';
import useCriteria from 'hooks/useCriteria';
import { getClusterName } from 'utils/getCluster';

const WS_URL = `${process.env.REACT_APP_VISITOR_API_URL}/ws`;
const checkInPath = '/visitor';
const options = { variant: 'info', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } };
const LOST_SOCKET_CONNECTION_MESSAGE = '서버와 연결이 끊겼습니다. 새로고침 해주세요.';
const SOCKET_CONNECTION_CHECK_IDLE = 5000;

export const VisitorContext = createContext({});

export const VisitorProviderWrapper = ({ children }) => (
  <SnackbarProvider maxSnack={3}>
    <VisitorProvider>{children}</VisitorProvider>
  </SnackbarProvider>
);

const VisitorProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [stompClient, setStompClient] = useState(null);
  const [sockJS, setSockJS] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [socketChecker, setSocketChecker] = useState(null);
  const [visitorCheckInLogs, setCheckInData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const {
    criteria: { clusterNumber },
  } = useCriteria();

  const getVisitorCheckInLogs = useCallback(async () => {
    const result = await getVisitorLogs({ size: 1000, place: getClusterName(clusterNumber) });
    if (result.data.error) setCheckInData([]);
    else setCheckInData(result.data.checkInLogs);
  }, [clusterNumber]);

  const initSocket = () => {
    const sockJS = new SockJS(WS_URL);
    const stompClient = Stomp.over(sockJS);

    stompClient.debug = (msg) => {
      if (process.env.REACT_APP_DEBUG) console.log(`>>> Debug\n${msg}`);
    };

    stompClient.heartbeat = {
      incoming: 4000,
      outgoing: 4000,
    };

    stompClient.reconnectDelay = 5000;

    if (stompClient !== null) {
      stompClient.connect(
        { login: 'user', passcode: 'password' },
        () => {
          stompClient.subscribe(checkInPath, (data) => {
            const { body } = data;
            getVisitorCheckInLogs();
            enqueueSnackbar(body, options);
          });
        },
        (error) => {
          if (process.env.REACT_APP_DEBUG) console.log(`>>> Error\n${error}`);
        },
      );
    }

    setSockJS(sockJS);
    setStompClient(stompClient);
  };

  useEffect(() => {
    initSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createSocketChecker = useCallback(
    (sockJS) => {
      setSocketChecker((socketChecker) => {
        if (socketChecker !== null) clearInterval(socketChecker);
        return window.setInterval(() => {
          if (sockJS?.readyState === 3) {
            enqueueSnackbar(LOST_SOCKET_CONNECTION_MESSAGE, {
              variant: 'error',
              anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
            });
          }
        }, SOCKET_CONNECTION_CHECK_IDLE);
      });
    },
    [enqueueSnackbar],
  );

  useEffect(() => {
    if (sockJS !== null) createSocketChecker(sockJS);
  }, [createSocketChecker, sockJS]);

  return (
    <VisitorContext.Provider
      value={{
        visitorCheckInLogs,
        getVisitorCheckInLogs,
      }}
    >
      {children}
    </VisitorContext.Provider>
  );
};
