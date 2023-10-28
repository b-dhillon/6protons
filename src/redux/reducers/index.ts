import { combineReducers } from 'redux';

function sectionCounter(state = 0, action: { type: string }): number {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      if (state > 0) return state - 1;
      else return state;
    case 'RESET':
      // better to treat this like a stack and start at -1.
      // this might require a re-thinking of how the animation data structure
      // is set up and how it plugs into the generation of animationClips.
      return (state = 0);
    default:
      return state;
  }
}

function start(state = false, action: { type: any }) {
  switch (action.type) {
    case '180':
      return !state;
    default:
      return state;
  }

  /*
    return !state 
    */
}

function overlay(state = false, action: { type: any }) {
  switch (action.type) {
    case 'rotated':
      return !state;
    default:
      return state;
  }
}

function isCameraAnimating(state = true, action: { type: any }): boolean {
  switch (action.type) {
    case 'TRUE':
      return true;
    case 'FALSE':
      return false;
    default:
      return state;
  }
}

const allReducers = combineReducers({
  section: sectionCounter,
  isCameraAnimating: isCameraAnimating,
  start: start,
  overlay: overlay,
});

export default allReducers;
