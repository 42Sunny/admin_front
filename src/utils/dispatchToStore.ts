import store from 'store/configureStore';

export const dispatchToStore = <T>(action: T) => store.dispatch(action);
