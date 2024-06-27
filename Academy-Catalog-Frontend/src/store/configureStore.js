import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunkMiddleware from "redux-thunk";
import rootReducer from './reducers/rootReducer';

const persistConfig = {
 key: 'root',
 storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer);
 
 export let store = createStore(persistedReducer, applyMiddleware(thunkMiddleware))
 export let persistor = persistStore(store)

