import {setEntries, next, vote, reset, add, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_ENTRIES':
    return setEntries(state, action.entries);
  case 'NEXT':
    return next(state);
  case 'RESET':
  	return next(reset(state));
  case 'ADD':
  	return add(state, action.character);
  }
  return state;
}