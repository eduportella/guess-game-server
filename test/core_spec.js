import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, reset, add} from '../src/core';

import fs from 'fs';

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
  describe('reset', () => {
    it('Should reset the entries when there is a winner', () => {
      const state = Map({
        winner: 'you win!'
      });
      const entries = require('../characters.json');
      const nextState = reset(state);
      expect(nextState).to.equal(Map({
        entries: fromJS(entries)
      }));
    });

    it('Should reset the entries during the game', () => {
      const state = Map({
        guess: Map({picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"}),
        entries: List()
      });
      const entries = require('../characters.json');
      const nextState = reset(state);
      expect(nextState).to.equal(Map({
        entries: fromJS(entries)
      }));
    });



  });
  describe('ADD', () => {
    it('should add a new character',() => {
      const state = Map({
        guess: Map({picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"}),
        entries: List()
      });
      const character = {picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"};
      const nextState = add(state, character);
      expect(nextState).to.equal(Map({
        guess: Map({picture: "myPic", option1: "Legolas", option2: "Aragorn", name: "Aragorn"}),
        entries: List()
      }));
    });
  });

});