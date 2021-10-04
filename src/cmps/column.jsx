import React from 'react';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components'
import { Task } from './Task.jsx'
import { TaskAdd } from './TaskAdd'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

//Need to convert it to scss
const Container = styled.div`
transform: ${props => (props.isDragging ? 'rotate(3deg)' : '0')}; 
box-sizing:border-box;
display: inline-block;
display:flex;
flex-direction: column;
justify-content: space-between;
min-height:100px;
height: 100%;
margin: 4px;
border-radius: 3px;
background-color:#ebecf0;
width: 272px;
white-space: normal
max-height:100%
`;

const Title = styled.h2`
box-sizing: border-box;
font-weight: 600;
white-space:pre;
overflow: hidden;
white-space: pre-wrap;
word-break:break-word;
font-size: 14px;
line-height: 24px;
min-height: 20px;
padding: 4px 8px;
position: relative;

`


const TaskList = styled.div`

background-color: ${props => (props.isDraggingOver ? `#e1e1e1` : 'inherit')};
flex: 1 1 auto;
margin: 0 4px;
min-height: 0;
overflow-x: hidden;
overflow-y: visible;
padding: 0 4px;
`;

class _Column extends React.Component {

    state = {}




    render() {
        const { board } = this.props
        const { group } = this.props
        const { onSaveBoard } = this.props

        if (!board) return <div>loading...</div> // Create cmp with killer loading
        return (

            <Draggable draggableId={this.props.group.id} index={this.props.index}>
                {(provided) => (
                    <Container {...provided.draggableProps} ref={provided.innerRef}{...provided.dragHandleProps}
                    >
                        <div className="group-header">
                            <MoreHorizIcon className="group-header-tool" fontSize="small" 
                            style={{fontSize:'16px', height:'20px', lineHeight:'20px', width:'20px'}}
                            />
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
                                                group={group}
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