import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {authReducer} from "./auth-reducer";
import {carsReducer} from "./cars-reducer";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
   auth: authReducer,
   carsPage: carsReducer,
   app: appReducer
});

export type RootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type RootActionsType = any;



// @ts-ignore
window.store = store;