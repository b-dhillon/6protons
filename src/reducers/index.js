import { combineReducers } from 'redux';

const sectionCounter = (state = 0, action) =>
{
    switch (action.type)
    {
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

const allReducers = combineReducers({
    counter: sectionCounter,
})

export default allReducers;