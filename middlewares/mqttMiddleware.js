import { messageReceived } from "../redux/slices/mqttSlice";
import { Client } from 'paho-mqtt';
const options = {
    clientId: 'your_client_id',
    host: '107.21.152.83',  // Solo la dirección IP
    port: 8000,             // Puerto WebSocket
};

let client = new Client(options.host, options.port, options.clientId);

const mqttMiddleware = store => next => action => {
    if (action.type.includes('ui/setProgress')) {
        return next(action); // Pasa la acción directamente al siguiente middleware sin procesarla aquí
    }

/*     console.log("Middleware MQTT:", action);
 */    switch (action.type) {
        case "MQTT/CONNECT":
            console.log("Conectando al broker MQTT");
            client.connect({
                onSuccess: () => {
                    console.log("Conectado al broker MQTT");
                    client.subscribe("llave/datos", { qos: 1 });
                },
                onFailure: (err) => {
                    console.error("Error al conectar:", err);
                }
            });

            client.onMessageArrived = (message) => {
                console.log(`Mensaje recibido: ${message.payloadString}`);
                store.dispatch(messageReceived({ topic: message.destinationName, message: message.payloadString }));
            };

            break;

        case "MQTT/DISCONNECT":
            client.disconnect();
            console.log("Cliente MQTT desconectado");
            break;

        default:
            break;
    }

    return next(action);
};

export default mqttMiddleware;
