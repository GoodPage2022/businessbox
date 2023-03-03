import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import auth from './reducers/auth';
import currency from './reducers/currency';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import persistStore from 'redux-persist/lib/persistStore';


const reducers = combineReducers({
    auth,
    currency
});

const persistConfig = {
    key: 'root',
    storage,

    whitelist: [
		'currency',
		'auth',
	],
};

const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

setupListeners(store.dispatch);

export const persistor = persistStore(store, {}, () => {
	persistor.persist();
});

export default store;