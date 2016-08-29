import {List, Map} from 'immutable';
import fs from 'fs';

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

export function reset(state) {
  const guess = state.get('guess');
  if(guess) {
    return state.remove('guess').set('entries', List(require('../characters.json').map(entry => Map(entry)))); 
  } else {
    return state.remove('winner').set('entries', List(require('../characters.json').map(entry => Map(entry)))); 
  }
}

export function add(state, character) {
  let charactersList = require('../characters.json');
  charactersList.push(character);
  
  fs.writeFile("characters.json", JSON.stringify(charactersList), function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
  });
  return state;
  
}

export const INITIAL_STATE = Map();