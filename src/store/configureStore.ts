import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import rootReducer, { rootSaga } from './modules/index';
import createSagaMiddleware from 'redux-saga';

const env = process.env.NODE_ENV;

const sagaMiddleware = createSagaMiddleware();

const configureStore = () =>
  createStore(
    rootReducer,
    env === 'development'
      ? composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
      : applyMiddleware(sagaMiddleware),
  );

const rootStore = configureStore();

sagaMiddleware.run(rootSaga);

export default rootStore;
export type RootState = ReturnType<typeof rootReducer>;
