import { storageService } from './async-storage.service'
const gBoards = require('../data/boards.json')

export const boardService = {
    save,
    // getById,
    getBoards
}

window.boardService = boardService


async function getBoards(){
    try{
        const boards = await gBoards 
        return boards
    }catch (err) {
        throw err
    }
}

async function save(board) {
    if (board._id) {
        try {
           return await storageService.put('board', board)
        } catch (err) {
            throw err
        }
    } else {
        try {
            return await storageService.post('board', board)
        } catch (err) {
            throw err
        }
    }
}