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


export function loadBoard(boardId) {
 
    return async dispatch => {
        try {
            const board = await boardService.getBoardById(boardId)
            dispatch({
                type: 'SET_BOARD',
                board :board
            })
        } catch (err) {
            showErrorMsg('Cannot load board')
            console.log('BoardAction: err in loadBoard', err)
        }
    }
}

export function openQuickPopUp(top,left,cmpName,cmpTitle,task,group) {
    return dispatch => {
        const popUp = {
            type:'SET_POPUP',
            cmpName,
            cmpTitle,
            task,
            group,
            top,
            left
        }
        dispatch(popUp)
    }
}



// export function setTask(boardId,columnId,taskId) {
 
//     return async dispatch => {
//         try {
//             const task = await boardService.getTaskById(boardId,columnId,taskId)
//             dispatch({
//                 type: 'SET_TASK',
//                 task :task
//             })
//         } catch (err) {
//             showErrorMsg('Cannot set task')
//             console.log('BoardAction: err in setTask', err)
//         }
//     }
// }