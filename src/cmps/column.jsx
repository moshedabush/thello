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
min-height:100px;
margin: 4px;
border-radius: 3px;
background-color:#ebecf0;
min-width: 272px;
max-width:272px;
white-space: normal;
vertical-align: top
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
overflow-x: hidden;
overflow-y:auto ;
padding: 0 4px;
box-sizing: border-box;
position: relative;
white-space: normal
max-height:100%
::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-track {
    border-radius: $borderRad2;
    margin-bottom: 2px;
    background-color: #dadbe2;
}
&::-webkit-scrollbar-thumb {
    border-radius: $borderRad2;
    background-color: #bfc4ce;
}
`;

class _Column extends React.Component {

    state = {}




    render() {
        const { board } = this.props
        const { group } = this.props
        const { onSaveBoard } = this.props

        if (!board) return <div>loading...</div> 
        return (
            <>
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
                                    <TaskList className="scroller" ref={provided.innerRef} {...provided.droppableProps}
                                        isDraggingOver={snapshot.isDraggingOver}>
                                        {this.props.tasks.map((task, index) => (
                                            !task.isArchived && <Task key={task.id} task={task} index={index}
                                                board={this.props.board} groupTitle={this.props.group.title} onSaveBoard={onSaveBoard}
                                                group={group}
                                            />
                                        ))}
                                        {provided.placeholder}
                                        
                                    </TaskList> 
                                </>
                                
                            )}
                        </Droppable>
                        <TaskAdd board={board} group={group} onSaveBoard={onSaveBoard} />
                    </Container>
                )}
            </Draggable>
            
          </>  
        )
    }
}

const mapDispatchToProps = {

}
export const Column = connect(null, mapDispatchToProps)(_Column)