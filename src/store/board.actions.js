import { boardService } from "../services/board.service.js";
import { showErrorMsg } from '../services/event-bus.service.js'

export function onSaveBoard(board) {
    console.log('board.action test');
    return async (dispatch) => {
        console.log('dispatch in onSaveBoard(BoardAction) ',dispatch);
        try {
            console.log('board.action test - afterdispach');
            const savedBoard = await boardService.save(board)
            dispatch({
                 type: 'SAVE_BOARD',
                 board: savedBoard 
                })
        } catch (err) {
            showErrorMsg('Cannot save board')
            console.log('BoardAction: err in onSaveBoard', err)
        }
    }
}