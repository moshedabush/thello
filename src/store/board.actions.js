import { boardService } from "../services/board.service.js";
import { showErrorMsg } from '../services/event-bus.service.js'

export function onSaveBoard(board) {  
    console.log('hi from onSaveBoard')
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

export function openQuickPopUp(top,left,cmpName,cmpTitle,task,group,from) {
    return dispatch => {
        const popUp = {
            type:'SET_POPUP',
            cmpName,
            cmpTitle,
            task,
            group,
            top,
            left,
            from,
        }
        dispatch(popUp)
    }
}

export function onSetTask(taskToSave) {  
    return dispatch => {
        const currTask = {
            type:'SET_CURRTASK',
            task:taskToSave
        }
        dispatch(currTask)
    }
}

export function updateBoard(board, groupId, taskToUpdateId, taskToSave) {
    const newBoard = {...board};
    const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
    newBoard.groups[groupIdx].tasks = newBoard.groups[groupIdx].tasks.map(task => {
        if (task.id === taskToUpdateId) return taskToSave
        else return task;
    })
console.log('newBoard',newBoard)
  return newBoard
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