import {List, Map} from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries.map(entry => Map(entry))));
}
export function next(state) {
  const entries = state.get('entries');
  if (entries.size === 0) {
    return state.remove('guess')
                .remove('entries')
                .set('winner', "you win!");
  } else {
  	return state.merge({
    	guess: entries.first(),
    	entries: entries.skip(1)
  	});
	}
}

export const INITIAL_STATE = Map();