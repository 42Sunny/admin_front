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
const enqueueSnackbarOptions = {
  variant: 'info',
  anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
};
const LOST_SOCKET_CONNECTION_MESSAGE = '서버와 연결이 끊겼습니다. 새로고침 해주세요.';
const SOCKET_CONNECTION_CHECK_IDLE = 7000;

export const VisitorContext = createContext({});

export const VisitorProviderWrapper = ({ children }) => (
  <SnackbarProvider maxSnack={3}>
    <VisitorProvider>{children}</VisitorProvider>
  </SnackbarProvider>
);

const VisitorProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [stompClient, setStompClient] = useState(null);
  // eslint-disable-next-line no-unused-vars
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

  const initSocket = useCallback(() => {
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
            enqueueSnackbar(body, enqueueSnackbarOptions);
          });
        },
        (error) => {
          if (process.env.REACT_APP_DEBUG) console.log(`>>> Error\n${error}`);
          setSocketChecker((socketChecker) =>
            createSocketChecker(socketChecker, sockJS, enqueueSnackbar),
          );
        },
      );
    }

    setSockJS(sockJS);
    setStompClient(stompClient);
  }, [enqueueSnackbar, getVisitorCheckInLogs]);

  useEffect(() => initSocket(), [initSocket]);

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

const createSocketChecker = (socketChecker, sockJS, enqueueSnackbar) => {
  if (socketChecker !== null) clearInterval(socketChecker);
  return window.setInterval(() => {
    if (sockJS?.readyState === 3) {
      enqueueSnackbar(LOST_SOCKET_CONNECTION_MESSAGE, {
        variant: 'error',
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
      });
    }
  }, SOCKET_CONNECTION_CHECK_IDLE);
};
