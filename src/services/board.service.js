import { storageService } from './async-storage.service'

// const gBoards = require('../data/boards.json')
// localStorage.setItem("boards",JSON.stringify(gBoards));

export const boardService = {
    save,
    getBoardById,
    query,
    saveBoards
}

window.boardService = boardService

async function getBoardById(boardId){
    try{
        const boards = await storageService.query('boards') 
        const board = boards.find(board => board._id === boardId) 
        
        return board

    }catch (err) {
        throw err
    }
}

async function query(userId) {
    
    try {
        const boards = await storageService.query('boards') 
        const filterBoards = boards.filter(board => {
            return board.createdBy._id === userId
        })
        return filterBoards
    } catch (err) {
        throw err
    }
}

async function save(data) {
    if (data._id) {
        try {
            const boards = await storageService.query('boards')
            const idx = boards.findIndex(board => board._id === data._id);
            boards[idx] = data;
            await this.saveBoards(boards)
           return await storageService.put('board', data)
        } catch (err) {
            throw err
        }
    } else {
        try {
            return await storageService.post('board', data)
        } catch (err) {
            throw err
        }
    }
}
async function saveBoards(boards) {
        try {
            return await storageService.putArray('boards', boards)
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

