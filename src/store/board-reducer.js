const initialState = {
    // boards: [],
    board:null
}

export function boardReducer(state = initialState, action) {

    switch (action.type) {
        case 'SAVE_BOARD':
           var newState = { ...state, board: { ...action.board } }
           console.log('newState of SAVE_BOARD in reducer',newState);
            return
        case 'SET_BOARD':
            return  { ...state, board: action.board }   
        default:
            return state
    }

}
