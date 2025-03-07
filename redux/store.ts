import { createStore, applyMiddleware, compose } from 'redux'; // Corrección: importar compose desde 'redux'
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducers/rootReducer';
import Reactotron from './ReactotronConfig';
import mqttMiddleware from '../middlewares/mqttMiddleware';

const middleware = [thunk, mqttMiddleware]; // Agrega el middleware de MQTT
let composed = applyMiddleware(...middleware);
const createdEnhancer = Reactotron.createEnhancer();

// Si estamos en desarrollo, agregamos Redux DevTools y Reactotron
if (process.env.NODE_ENV !== 'production') {
  composed = compose(
    composeWithDevTools(applyMiddleware(...middleware)), // Redux DevTools en desarrollo
    createdEnhancer // Enhancer de Reactotron
  );
} else {
  composed = compose(applyMiddleware(...middleware)); // Solo middleware en producción
} 

const store = createStore(rootReducer, composed);

store.dispatch({ type: "MQTT/CONNECT" });

export default store;
