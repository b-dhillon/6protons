import { combineReducers } from 'redux';

function sectionCounter(state = 0, action: { type: any; } ) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        case 'RESET':
            return state = 0
        default:
            return state;
    }
}

function start (state = false, action: { type: any; } ) {
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

function overlay (state = false, action: { type: any; } ) {
    switch (action.type) {
        case 'rotated':
            return !state;
        default:
            return state;
    }
}

const allReducers = combineReducers({
    counter: sectionCounter,
    start: start,
    overlay: overlay,
})

export default allReducers;