import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Column } from '../cmps/column.jsx'
import boardData from '../data/boardsData';
import styled from 'styled-components';


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

        
        if(type === 'group') {
            const newGroupOrder = [...this.state.groups]
            const movedGroup = newGroupOrder.splice(source.index, 1)
            newGroupOrder.splice(destination.index, 0, movedGroup[0])

            const newState= {
                ...this.state,
                groups: newGroupOrder,
            }
            this.setState(newState)
            console.log('Checking state of columns order:', newState.groups)

            return
        }


        // Check and move task inside same list
        
        const locationGroupStart = source.droppableId
        console.log('locationGroupStart - BEFORE FUNCTION',locationGroupStart);
        
        const locationGroupFinish = destination.droppableId
        console.log('locationGroupFinish - BEFORE FUNCTION',locationGroupFinish);


        if(locationGroupStart === locationGroupFinish) {

            console.log('Entered same list function');
            const newGroups = Array.from(this.state.groups)
            const indexOfSourceGroup = newGroups.findIndex(group => group.id === source.droppableId)
            // console.log('indexOfSourceGroup',indexOfSourceGroup);
            const isolatedGroup = newGroups.splice(indexOfSourceGroup,1)
            console.log('isolatedGroup',isolatedGroup);
            const isolatedTasks = isolatedGroup.map(task => task.tasks)
            console.log('isolatedTasks',isolatedTasks);

            const newTask = isolatedTasks.splice(0,1)
            console.log('newTask',newTask);
         

                        
            
            // console.log('locationGroupStart - INSIDE FUNCTION',locationGroupStart);
            // console.log('locationGroupFinish - INSIDE FUNCTION',locationGroupFinish);
            


            // const newTasksOrder = this.state.groups.find(group => group.droppableId = source.droppableId)
            // console.log('newTasksOrder',newTasksOrder);
         
            // const newTaskOrder = this.state.groups.find(task => task.draggableId = source.draggableId)
            // console.log('ddddfdfd',newTaskOrder);

            // const movedGroup = newTaskOrder.splice(source.index, 1)
            // newTaskOrder.splice(destination.index, 0, movedGroup[0])

            // const newState= {
            //     ...this.state,
            //     groups: newTaskOrder,
            // }
            // this.setState(newState)
            // console.log('Checking state of columns order:', newState.groups)

            // return
        }
        



        


        // if(type === 'task') {
        //     const newTaskOrder = [...this.state.groups.tasks]
        //     const movedTask = newTaskOrder.splice(source.index, 1)
        //     newTaskOrder.splice(destination.index, 0, movedTask[0])
        //     console.log('newTaskOrder', newTaskOrder);

        //     const newState= {
        //         ...this.state,
        //         task: newTaskOrder,
        //     }
        //     this.setState(newState)
        //     console.log('Checking state of columns order:', newState.tasks)

        //     return
        // }
        
        // if (locationGroupStart.droppableId === locationGroupFinish.droppableId) {
        //     const newTask = Array.from(locationGroupStart.tasks)
        //     newTask.splice(source.index, 1)
        //     newTask.splice(destination.index, 0, draggableId)

        //     // const newColumn = { 
        //     //     tasks: newTask,
        //     // }


            
        //     // const newState = { 
        //     //     ...this.state,
        //     //     groups: {
        //     //         ...this.state.groups,
        //     //         [newColumn.id]: newColumn,
        //     //     },
        //     // }

        //     // this.setState(newState)
        //     return
        //     console.log('same');
        // }



        // Moving from one list to another

        // const startTaskIds = Array.from(start.tasks) 
        // console.log('startTaskIds',startTaskIds);
        // startTaskIds.splice(source.index, 1)
        // const newStart = { 
        //     ...start,
        //     task: startTaskIds,
        // }

        // const finishTaskIds = Array.from(finish.tasks)
        // finishTaskIds.splice(destination.index, 0, draggableId)
        // const newFinish = { 
        //     ...finish,
        //     taskIds: finishTaskIds,
        // }

        // const newState = { 
        //     ...this.state,
        //     groups: {
        //         ...this.state.groups,
        //         [newStart.id]: newStart,
        //         [newFinish.id]: newFinish,

        //     },
        // }
        // this.setState(newState, () => {
        //     console.log('Checking state of tasks:', newState.groups);
        // })

        return
    }

    render() {
        
        const {groups} = this.state
       
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
                                return <Column key={column.id} column={column} tasks= {tasks}  index={index}/>
                            })}
                            {provided.placeholder}
                        </Container>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

