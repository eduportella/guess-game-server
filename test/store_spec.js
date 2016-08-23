import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';
import {setEntries, next} from '../src/actions';

describe('store', () => {

  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map());
    const entries = [
      {picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"},
      {picture: "myPic", option1: "Gimli", option2: "Frodo", name: "Gimli"}
    ];   
    store.dispatch(setEntries(entries));
    expect(store.getState()).to.equal(fromJS({
      entries: [
        {picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"},
        {picture: "myPic", option1: "Gimli", option2: "Frodo", name: "Gimli"}
      ]
    }));
  });

});