import { storageService } from './async-storage.service'

export const boardService = {
    save,
}

window.boardService = boardService


async function save(board) {
    if (board._id) {
        try {
            console.log('save function in BoardService');
            await storageService.post('board', board._id)
        } catch (err) {
            throw err
        }
    } else {
        try {
            await storageService.post('board', board)
        } catch (err) {
            throw err
        }
    }
}