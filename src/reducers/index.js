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

const start = (state = false, action) =>
{
    switch (action.type)
    {
        case '180':
            return !state;
        default:
            return state;
    }

    /*
    return !state 
    */
}

const overlay = (state = false, action) => 
{
    switch (action.type)
    {
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