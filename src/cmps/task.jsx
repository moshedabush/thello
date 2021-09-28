import React from 'react';
import ReactDOM from 'react-dom';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components'
import SimpleDialog from './dialog-modal';

//Need to convert it to scss
const Container = styled.div`
border: 1px solid lightgrey;
border-radius: 3px;
min-width: 256px;
padding: 8px;
margin-bottom: 8px;
background-color: ${props => (props.isDragging ? 'lightblue' :'white')};
`;

export class Task extends React.Component {
    state={
        board:'',
        columnId: '',
        taskId: '',
        isClicked: false,
    }
   
    handleClick=(ev)=>{
        this.setState({isClicked:ev})
       
    }
    onClose=()=>{
        this.setState({isClicked:false})
    }
    render() {
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>

                {(provided, snapshot) => (
                    <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    >
                        {<SimpleDialog open={this.state.isClicked} onClose={this.onClose} selectedValue={'task'} task={this.props.task} groupTitle={this.props.groupTitle}/>}
                        <div onClick={()=>{this.handleClick(!this.state.isClicked)}}> 
                        {this.props.task.title}
                        </div>
                    </Container>
                )}
            </Draggable>
        )
    }
}