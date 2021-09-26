const initialState = {
    boards: [],
}

export function boardReducer(state = initialState, action) {

    switch (action.type) {
        case 'SAVE_BOARD':
            return { ...state, boards: { ...action.board } }

        case 'SET_BOARDS':
            return { ...state, boards: action.boards }

        default:
            return state
    }

}
