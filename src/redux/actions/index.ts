export const increment = () => 
{
    return {
        type: 'INCREMENT'
    }
}

export const decrement = () => 
{
    return {
        type: 'DECREMENT'
    }
}

export const reset = () => {
    return {
        type: 'RESET'
    }
}

export const start = () => {
    return {
        type: '180'
    }
}

export const resetCamera = () => {
    return {
        type: '0'
    }
}

export const setCameraAnimating = (camState: boolean) => {
    if (camState) return { type: 'TRUE' }
    else return { type: 'FALSE'}
}

// export const cameraNotAnimating = () => {
//     return {
//         type: 'false'
//     }
// }