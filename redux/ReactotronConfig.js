import Reactotron, { networking } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const IGNORED_API_URLS = ['https://clients3.google.com/generate_204'];

Reactotron.configure({ name: 'hydrolink' })
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative()
  .use(
    networking({
      ignoreContentTypes: /^(image)\/.*$/i,
      ignoreUrls: new RegExp(IGNORED_API_URLS.map(url => `(${url})`).join('|')),
      ignoreRequests: (request) => IGNORED_API_URLS.some((url) => request.url.includes(url)),
    })
  )
  .use(reactotronRedux()) //  <- here i am!
  .connect();


//  patch console.log to send log to reactotron
const yeOldeConsoleLog = console.log;
console.log = (...args) => {
  yeOldeConsoleLog(...args);
  Reactotron.display({
    name: 'CONSOLE.LOG',
    value: args,
    preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
  });
};

export default Reactotron;