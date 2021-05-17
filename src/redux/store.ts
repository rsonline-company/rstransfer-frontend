import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AuthReducer from './reducers/Auth';

const rootReducer = combineReducers({
    auth: AuthReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;

export default store;