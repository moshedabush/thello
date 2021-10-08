import { storageService } from './async-storage.service'

// const gBoards = require('../data/boards.json')
// const gBoards = require('../data/presentation-demo-board.json')
// localStorage.setItem("board",JSON.stringify(gBoards));
// const STORAGE_KEY_BOARD = 'board'

export const boardService = {
    save,
    getBoardById,
    query,
    saveBoards
}

window.boardService = boardService

async function getBoardById(boardId) {
    try {
        const boards = await storageService.query('board')
        const board = boards.find(board => board._id === boardId)

        return board

    } catch (err) {
        throw err
    }
}

async function query(userId) {
    console.log('query',userId);

    try {
        const boards = await storageService.query('board')
  
        return boards
    } catch (err) {
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
async function saveBoards(data) {
    try {
        return await storageService.putArray('boards', data)
    } catch (err) {
        throw err
    }
}

    // } else {
    //     try {
    //         return await storageService.post('boards', data)
    //     } catch (err) {
    //         throw err
    //     }
    // }

