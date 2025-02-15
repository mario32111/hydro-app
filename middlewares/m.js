import { messageReceived } from "../redux/slices/mqttSlice";
import MQTT from 'sp-react-native-mqtt';

//import 'react-native-url-polyfill/auto';

// Declarar la variable 'client' fuera de la función del middleware
let client = null;

const mqttMiddleware = (store) => (next) => (action) => {
  if (action.type === "MQTT/CONNECT") {
    console.log("Iniciando conexión MQTT...");

    // Si no se ha creado el cliente aún, lo creamos
    if (!client) {

      MQTT.createClient({
        //uri: 'ws://test.mosquitto.org:8080/mqtt', // WebSocket con Mosquitto
        //uri: 'wss://broker.hivemq.com:8000/mqtt', // Alternativa con otro broker
        uri: 'mqtt://189.155.43.62:1883', // WebSocket con Mosquitto
        clientId: 'your_client_id',
        tls: false,
        port: 8000,
      }).then(function(newClient) {
        client = newClient;
        client.on('closed', function() {
          console.log('mqtt.event.closed');
        });
      
        client.on('error', function(msg) {
          console.log('mqtt.event.error', msg);
        });
      
        client.on('message', function(msg) {
          console.log('mqtt.event.message', msg);
          store.dispatch(messageReceived(msg));
        });
      
        client.on('connect', function() {
          console.log('connected');
          client.subscribe('/data', 0);
          client.publish('/data', "test", 0, false);
        });
      
        client.connect();
      }).catch(function(err) {
        console.log('Error al crear cliente MQTT:', err);
      });
      

    } else {
      console.log("Cliente MQTT ya creado, evitando la creación...");
    }
  }

  console.log("Middleware procesando acción:", action);
  console.log();
  // Pasar la acción al siguiente middleware o reducer
  return next(action);
};

export default mqttMiddleware;
