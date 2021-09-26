import React from 'react';
// import ReactDOM from 'react-dom';
// import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { onSaveBoard, loadBoard } from '../store/board.actions.js'
import { Column } from '../cmps/column.jsx'
// import boardData from '../data/boardsData';
import styled from 'styled-components';
import { tableSortLabelClasses } from '@mui/material';



const Container = styled.div`
display: flex;
`;

class _Board extends React.Component {

    state = {
    }
        
    

    async componentDidMount() {
        try {
           const {boardId} = this.props.match.params
           await this.props.loadBoard(boardId)
           console.log('this.props.match.params',this.props.board);
           
        }catch (err) {
            console.log('err');
            
        }
    }

  
    onDragEnd = result => {
        const { destination, source, draggableId, type } = result
        const {board, board: {groups}} = this.props
        console.log('{board, board: {groups}}',{board, board: {groups}});
        
       

        if (!destination) return

        if (
            destination.droppableId === source.draggableId &&
            destination.index === source.index
        ) {
            return
        }

        // CHANGE LOCATION BETWEEN GROUPS
        if (type === 'group') {
            const newGroupOrder = [...this.props.board.groups]
            console.log('newGroupOrder',newGroupOrder);
            const movedGroup = newGroupOrder.splice(source.index, 1)
            newGroupOrder.splice(destination.index, 0, movedGroup[0])
            board.groups = newGroupOrder
            this.props.onSaveBoard(board)
            return
        }

        const locationGroupStart = source.droppableId
        const locationGroupFinish = destination.droppableId

        // CHECK AND MOVE TASKS INSIDE THE SAME GROUP
        if (locationGroupStart === locationGroupFinish) {

            const newGroups = [...groups]
            const indexOfSourceGroup = newGroups.findIndex(group => group.id === locationGroupStart)
            const isolatedGroup = newGroups.splice(indexOfSourceGroup, 1)
            const isolatedTasks = isolatedGroup.map(task => task.tasks)
            const currTasks = isolatedTasks[0].findIndex(task => task.id === draggableId)
            const targetedTask = isolatedTasks[0].splice(currTasks, 1)
            isolatedTasks[0].splice(destination.index, 0, targetedTask[0])
            groups[isolatedTasks[0]] = newGroups
            this.props.onSaveBoard(board)

        }

        // CHECK AND MOVE TASKS BETWEEN GROUPS
        if (locationGroupStart !== locationGroupFinish) {

            console.log('CHECK AND MOVE TASKS BETWEEN GROUPS', groups);
            const newGroups = [...groups]
            console.log('newGroupsnewGroups',newGroups);
            const indexOfSourceGroup = newGroups.findIndex(group => group.id === locationGroupStart)
            const isolatedStartGroup = newGroups.splice(indexOfSourceGroup, 1)
            const isolatedStartTasks = isolatedStartGroup.map(task => task.tasks)
            const currTasks = isolatedStartTasks[0].findIndex(task => task.id === draggableId)
            const targetedTask = isolatedStartTasks[0].splice(currTasks, 1)

            const indexOfDestinationGroup = newGroups.findIndex(group => group.id === locationGroupFinish)
            const isolatedDestinaionGroup = newGroups.splice(indexOfDestinationGroup, 1)
            const isolatedDestinationTasks = isolatedDestinaionGroup.map(task => task.tasks)
            isolatedDestinationTasks[0].splice(destination.index, 0, targetedTask[0])
            groups[isolatedDestinationTasks] = newGroups
            this.props.onSaveBoard(board)
        }

        return

    }

    render() {
        
        const {board} = this.props
        console.log('boards',board);
        if (!board) return <div>loading...</div>
        const {groups} = board  
     
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable
                    droppableId="groups.id"
                    direction="horizontal"
                    type="group"
                >
                    {provided => (
                        <Container
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {groups.map((group, index) => {
                                const column = group;
                                const tasks = column.tasks.map(task => task)
                                return <Column key={column.id} column={column} tasks={tasks} index={index} />
                            })}
                            {provided.placeholder}

                        </Container>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}


function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}


const mapDispatchToProps = {
    onSaveBoard,
    loadBoard,

}

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)