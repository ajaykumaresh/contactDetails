import {createStore,applyMiddleware,combineReducers,compose} from 'redux';
import contactReducer from './contactReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer=combineReducers({
    contact : contactReducer,
  });
const store=createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;