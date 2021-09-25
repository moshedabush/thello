import { boardService } from '../services/board.service.js'

const initialState = {
    boards: [],
}


export function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SAVE_BOARD':
            console.log( 'SAVE_BOARD at Boardreducer');
            return { ...state, board: { ...action.board } }
        default:
            
    }
    return state
}

