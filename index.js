import makeStore from './src/store';
import startServer from './src/server';
import {setEntries, next} from './src/actions';

export const store = makeStore();
startServer(store);

store.dispatch(setEntries(require('./characters.json')));
store.dispatch(next());
