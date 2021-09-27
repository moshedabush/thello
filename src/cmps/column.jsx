import React from 'react';
import ReactDOM from 'react-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components'
import { Task } from '../cmps/task.jsx'
import {TaskAdd} from '../cmps/TaskAdd'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

//Need to convert it to scss
const Container = styled.div`
margin: 8px;
border: 1px solid lightgrey;
border-radius: 2px;
background-color:white;
width: 220px;
display:flex;
flex-direction: column;
border-radius: 3px;
justify-content: space-between;
`;

const Title = styled.h3`
padding :8px;`;


const TaskList = styled.div`
padding: 8px;
background-color: ${props => (props.isDraggingOver ? 'lightgrey' : 'inherit')};
flex-grow: 1;
min-height:100px;
`;



export class Column extends React.Component {
    render() {
        const {board} = this.props
        console.log('board in render',board);
        // const {groups} = board
        // if (!board) return <div>loading...</div> // Create cmp with killer loading
        return (
            <Draggable draggableId={this.props.column.id} index={this.props.index}>
                {(provided) => (
                    <Container {...provided.draggableProps} ref={provided.innerRef}
                    >
                        <div className="group-header">
                            <MoreHorizIcon fontSize="small" />
                            <Title {...provided.dragHandleProps}>{this.props.column.title}</Title>
                        </div>
                        <Droppable droppableId={this.props.column.id} type="task">
                            {(provided, snapshot) => (
                                <TaskList ref={provided.innerRef} {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    {this.props.tasks.map((task, index) => (
                                        <Task key={task.id} task={task} index={index} />
                                    ))}
                                    {provided.placeholder}
                                    <TaskAdd board={this.props.board} groups={this.props.groups} onSaveBoard={this.props.onSaveBoard} />
                                </TaskList>
                                
                            )}
                        </Droppable>
                    </Container>
                )}
            </Draggable>
        )
    }
}