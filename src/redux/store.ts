// @ts-ignore
import { legacy_createStore } from 'redux';
import allReducers from './reducers/index';


const store = legacy_createStore(
    allReducers,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;