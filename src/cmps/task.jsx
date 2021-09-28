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
console.log('ev',ev)
        this.setState({isClicked:!this.state.isClicked})
       
    }
    onClose=()=>{
        this.setState({isClicked:false})
    }
    render() {
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <Container
                    onClick={()=>{this.handleClick()}}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    >
                        {this.props.task.title}
                        {this.state.isClicked && <SimpleDialog open={true} onClose={this.onClose} selectedValue={'task'} task={this.props.task} groupTitle={this.props.groupTitle}/>}
                    </Container>
                )}
            </Draggable>
        )
    }
}