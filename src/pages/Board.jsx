import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Column } from '../cmps/column.jsx'
import boardData from '../data/boardsData';
import styled from 'styled-components';
import { tableSortLabelClasses } from '@mui/material';


const Container = styled.div`
display: flex;
`;

export class Board extends React.Component {

    state = boardData;



    onDragEnd = result => {
        const { destination, source, draggableId, type } = result

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.draggableId &&
            destination.index === source.index
        ) {
            return
        }


        if (type === 'group') {
            const newGroupOrder = [...this.state.groups]
            const movedGroup = newGroupOrder.splice(source.index, 1)
            console.log('movedGroup', movedGroup);
            newGroupOrder.splice(destination.index, 0, movedGroup[0])

            const newState = {
                ...this.state,
                groups: newGroupOrder,
            }
            this.setState(newState)
            return
        }

        const locationGroupStart = source.droppableId
        const locationGroupFinish = destination.droppableId

        // CHECK AND MOVE TASKS INSIDE THE SAME GROUP

        if (locationGroupStart === locationGroupFinish) {

            console.log('Executing the drag&drop in same group function');
            const newGroups = [...this.state.groups]
            const indexOfSourceGroup = newGroups.findIndex(group => group.id === locationGroupStart)
            const isolatedGroup = newGroups.splice(indexOfSourceGroup, 1)
            const isolatedTasks = isolatedGroup.map(task => task.tasks)
            const currTasks = isolatedTasks[0].findIndex(task => task.id === draggableId)
            const targetedTask = isolatedTasks[0].splice(currTasks, 1)
            isolatedTasks[0].splice(destination.index, 0, targetedTask[0])
            const newGroupOrder = this.state.groups

            const newState = {
                ...this.state,
                groups: newGroupOrder,
            }
            this.setState(newState)
            return

        }

        // CHECK AND MOVE TASKS BETWEEN GROUPS

        if (locationGroupStart !== locationGroupFinish) {

            console.log('Executing the drag&drop in from different groups function');
            const newGroups = [...this.state.groups]
            
            const indexOfSourceGroup = newGroups.findIndex(group => group.id === locationGroupStart)
            const isolatedStartGroup = newGroups.splice(indexOfSourceGroup, 1)
            const isolatedStartTasks = isolatedStartGroup.map(task => task.tasks)
            const currTasks = isolatedStartTasks[0].findIndex(task => task.id === draggableId)
            const targetedTask = isolatedStartTasks[0].splice(currTasks, 1)

            const indexOfDestinationGroup = newGroups.findIndex(group => group.id === locationGroupFinish)
            const isolatedDestinaionGroup = newGroups.splice(indexOfDestinationGroup, 1)
            const isolatedDestinationTasks = isolatedDestinaionGroup.map(task => task.tasks)
            isolatedDestinationTasks[0].splice(destination.index, 0, targetedTask[0])
    
            const newGroupOrder = this.state.groups

            const newState = {
                ...this.state,
                groups: newGroupOrder,
            }
            this.setState(newState)
            return

        }

        return

    }

    render() {

        const { groups } = this.state

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

