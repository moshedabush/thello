const initialState = {
  
    board: null
}

export function boardReducer(state = initialState, action) {

    switch (action.type) {
        case 'SAVE_BOARD':
            return { ...state, board: { ...action.board } }
        case 'SET_BOARD':
            return { ...state, board: action.board }
        default:
            return state
    }

}
