import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import rootReducer from './modules/index';
import ReduxThunk from 'redux-thunk';

const env = process.env.NODE_ENV;

let configureStore;
if (env === 'development') {
  configureStore = () =>
    createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk, logger)));
} else {
  configureStore = () => createStore(rootReducer, applyMiddleware(ReduxThunk));
}
const rootStore = configureStore();
export default rootStore;
export type RootState = ReturnType<typeof rootReducer>;
