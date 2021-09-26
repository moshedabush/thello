import { boardService } from "../services/board.service.js";
import { showErrorMsg } from '../services/event-bus.service.js'

export function onSaveBoard(board) {   
    return async dispatch => {
        try {
            const savedBoard = await boardService.save(board)
            dispatch({
                 type: 'SAVE_BOARD',
                 board:savedBoard 
                })
        } catch (err) {
            showErrorMsg('Cannot save board')
            console.log('BoardAction: err in onSaveBoard', err)
        }
    }
}


export function loadBoards(boardId) {
    return async dispatch => {
        try {
            const boards = await boardService.getBoardById(boardId)
            console.log(boards);
            dispatch({
                type: 'SET_BOARDS',
                boards :boards
            })
        } catch (err) {
            showErrorMsg('Cannot load board')
            console.log('BoardAction: err in loadBoards', err)
        }
    }
}