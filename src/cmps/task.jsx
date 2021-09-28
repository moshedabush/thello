import React from 'react';
import ReactDOM from 'react-dom';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components'

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
                        {this.props.task.title}
                    </Container>
                )}
            </Draggable>
        )
    }
}