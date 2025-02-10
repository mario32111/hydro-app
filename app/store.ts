import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

Reactotron.configure().use(reactotronRedux()).connect();

const store = createStore(
  rootReducer,
  Reactotron.createEnhancer()
);
Reactotron.log('Redux state:', store.getState());
export default store;