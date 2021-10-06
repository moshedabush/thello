import { storageService } from './async-storage.service'
const gBoards = require('../data/boards.json')
localStorage.setItem("boards",JSON.stringify(gBoards));
// const STORAGE_KEY_BOARD = 'board'

export const boardService = {
    save,
    getBoardById,
    query
}

window.boardService = boardService

async function getBoardById(boardId){
    try{
        const boards = await storageService.query('board') 
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
        // return await storageService.get('boards',userId)
        return filterBoards
    } catch (err) {
        throw err
    }
}

async function save(data) {
    if(Array.isArray(data)){
        try {
            console.log(data,'service data');
            return await storageService.put('boards', data)
        } catch (err) {
            throw err
        }
    }else {
    if (data._id) {
        try {
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
    // } else {
    //     try {
    //         return await storageService.post('boards', data)
    //     } catch (err) {
    //         throw err
    //     }
    // }
}
}
