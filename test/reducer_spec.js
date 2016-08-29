import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';
import {setEntries, next, reset} from '../src/actions';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const entries = [{picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"}];
    const action = setEntries(entries);
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: [{picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"}]
    }));
  });
  it('handles SET_ENTRIES with undefined initial state', () => {
    
    const entries = [{picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"}];
    const action = setEntries(entries);
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      entries: [{picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"}]
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: [
        {picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"},
        {picture: "myPic", option1: "Gimli", option2: "Frodo", name: "Gimli"}
      ]
    });
    const action = next();
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      guess: {picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"},
      entries: [{picture: "myPic", option1: "Gimli", option2: "Frodo", name: "Gimli"}]
    }));
  });
  it('RESET the game', () => {
    const initialState = fromJS({
      guess:{picture: "myPic", option1: "Gimli", option2: "Frodo", name: "Gimli"},
      entries: [
        {picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"}
      ]  
    });
    const action = reset();
    const nextState = reducer(initialState, action);
    const entries = require('../characters.json');
    expect(nextState).to.equal(fromJS({
      guess: fromJS(entries).first(),
      entries: fromJS(entries).skip(1)
    }));
  });
  /*it('can be used with reduce', () => {
    const entries = [
      {picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"},
      {picture: "myPic", option1: "Gimli", option2: "Frodo", name: "Gimli"}
    ];
    const actions = [
      setEntries(entries),
      next(),
      next(),
      next(),
      reset(),
      next(),
      next()
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'you win!'
    }));
  });*/

});