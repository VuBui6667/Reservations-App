const initState = {
    reset: true
}

export const resetReducer = (state = initState, action) => {
    switch (action.type) {
        case "OPTION_TYPE":
            return {
                ...state,
                reset: action.payload
            }
        default:
            return state
    }
}

export default resetReducer;