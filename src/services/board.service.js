import { storageService } from './async-storage.service'
const gBoards = require('../data/boards.json')

export const boardService = {
    save,
    getBoardById
}

window.boardService = boardService


async function getBoardById(boardId){
    try{
        const boards = await gBoards.find(board => board._id === boardId)
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