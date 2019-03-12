import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import transforms from "./transform";

const initialState = {
     isLogin: false
};
const middleware = [thunk];

const persistConfig = {
     key: 'root',
     storage,
     //stateReconciler: hardSet,
     transforms: [transforms],
     blacklist: [],
     whitelist: ['root']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    initialState,
     compose(
         applyMiddleware(
             ...middleware),
         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
         //** Deprecated **//
         // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     )
);

export const persistor = persistStore(store);
