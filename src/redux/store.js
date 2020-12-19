import {createStore,applyMiddleware,combineReducers} from 'redux';
import contactReducer from './contactReducer'
import thunk from 'redux-thunk';


const rootReducer=combineReducers({
    contact : contactReducer,
  });
const store=createStore(rootReducer,applyMiddleware(thunk))

export default store;