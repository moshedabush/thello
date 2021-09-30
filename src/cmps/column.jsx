import React from 'react';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components'
import { Task } from './task.jsx'
import { TaskAdd } from './TaskAdd'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

//Need to convert it to scss
const Container = styled.div`
box-sizing:border-box;
display: inline-block;
height: 100%;
margin: 8px;
border: 1px solid lightgrey;
border-radius: 2px;
background-color:white;
width: 272px;
display:flex;
flex-direction: column;
border-radius: 3px;
justify-content: space-between;

`;

const Title = styled.h3`
padding :8px;;
white-space:pre;
overflow: hidden;
white-space: pre-wrap;
word-break:break-word;
`


const TaskList = styled.div`
padding: 8px;
background-color: ${props => (props.isDraggingOver ? 'lightgrey' : 'inherit')};
flex-grow: 1;
`;

class _Column extends React.Component {

    state ={}


   

    render() {
        const {board} = this.props
        const {group} = this.props
        const {onSaveBoard} = this.props
             
        if (!board) return <div>loading...</div> // Create cmp with killer loading
        return (
            
            <Draggable draggableId={this.props.group.id} index={this.props.index}>
                {(provided) => (
                    <Container {...provided.draggableProps} ref={provided.innerRef}{...provided.dragHandleProps}
                    >
                        <div className="group-header">
                            <MoreHorizIcon fontSize="small" />
                            <Title >{this.props.group.title}</Title>
                        </div>
                        <Droppable droppableId={this.props.group.id} type="task">
                            {(provided, snapshot) => (
                                <>
                                <TaskList ref={provided.innerRef} {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}>
                                    {this.props.tasks.map((task, index) => (
                                        !task.isArchived && <Task key={task.id} task={task} index={index}
                                        board={this.props.board} groupTitle={this.props.group.title} onSaveBoard={onSaveBoard}
                                        />                             
                                    ))}
                                    {provided.placeholder}
                                </TaskList>
                                <TaskAdd board={board} group={group} onSaveBoard={onSaveBoard} />
                                </>
                            )}
                            
                        </Droppable>
                    </Container>
                )}
            </Draggable>
        )
    }
}

const mapDispatchToProps = {
    
}
export const Column = connect(null, mapDispatchToProps)(_Column)