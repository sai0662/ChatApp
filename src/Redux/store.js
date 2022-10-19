import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import newspostsReducer from './newspostsReducer';
import newscategoriesReducer from './newscategoriesReducer';
import newscommentsReducer from './newscommentsReducer';

import thunk from 'redux-thunk';

//enhancer : 1. thunk 2.
//27 sept for devtools
//import { composeWithDevTools } from 'remote-redux-devtools';
//import { composeWithDevTools } from 'redux-devtools-extension';
var composeEnhancers = compose;
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const reducers = combineReducers({
  posts: newspostsReducer,
  categories: newscategoriesReducer,
  comments: newscommentsReducer,
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export default store;
