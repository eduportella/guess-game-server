import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    // First operation to prepare the game
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of(
        Map({picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"}),
        Map({picture: "myPic", option1: "Gimli", option2: "Frodo", name: "Gimli"})
      );
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of(
          Map({picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"}),
          Map({picture: "myPic", option1: "Gimli", option2: "Frodo", name: "Gimli"})
        )
      }));
    });

    // First operation to prepare the game MUTABLE => IMMUTABLE
    it('adds the MUTABLE entries to the state and make them immutable', () => {
      const state = Map();
      const entries = [
        {picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"},
        {picture: "myPic", option1: "Gimli", option2: "Frodo", name: "Gimli"}
      ];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of(
          Map({picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"}),
          Map({picture: "myPic", option1: "Gimli", option2: "Frodo", name: "Gimli"})
        )
      }));
    }); 

  });
  describe('next', () => {
    //set the character to be guessed
    it('takes the next character to be guessed', () => {
      const state = Map({
        entries: List.of(
          Map({picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"}),
          Map({picture: "myPic", option1: "Gimli", option2: "Frodo", name: "Gimli"})
        )
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        guess: Map({picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"}),
        entries: List.of(Map({picture: "myPic", option1: "Gimli", option2: "Frodo", name: "Gimli"}))
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        guess: Map({picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"}),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'you win!'
      }));
    });

  });

});