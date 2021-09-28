import React from 'react';
import ReactDOM from 'react-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components'
import { Task } from '../cmps/task.jsx'

const Container = styled.div`
margin: 8px;
border: 1px solid lightgrey;
border-radius: 2px;
background-color:white;
width: 220px;
display:flex;
flex-direction: column;
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
        return (
            <Draggable draggableId={this.props.column.id} index={this.props.index}>
                {(provided) => (
                    <Container {...provided.draggableProps} ref={provided.innerRef}
                    >
                        <Title {...provided.dragHandleProps}>{ this.props.column.title}</Title>
                        <Droppable droppableId={this.props.column.id} type="task">
                            {(provided, snapshot) => (
                                <TaskList ref={provided.innerRef} {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    {this.props.tasks.map((task, index) => (
                                        <Task key={task.id} task={task} index={index}
                                         board={this.props.board} columnTitle={this.props.column.title} 
                                         />
                                    ))}
                                    {provided.placeholder}
                                </TaskList>
                            )}
                        </Droppable>
                    </Container>
                )}
            </Draggable>
        )
    }
}