import React from 'react';
import Puzzle from './Puzzle';
import FruitNinja from './FruitNinja';

const Components = {
    puzzle: Puzzle,
    fruitninja: FruitNinja
}

export default gameName => {
    if (typeof Components[gameName] !== "undefined") {
      return React.createElement(Components[gameName]);
    }
    return React.createElement(
      () => <div>The component {gameName} has not been created yet.</div>);
  };