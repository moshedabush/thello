import React from 'react';
import ReactDOM from 'react-dom';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components'
import SimpleDialog from './dialog-modal';
import CreateIcon from '@mui/icons-material/Create';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

//Need to convert it to scss
const Container = styled.div`
border: 1px solid lightgrey;
border-radius: 3px;
min-width: 256px;
padding: 8px;
margin-bottom: 8px;
background-color: ${props => (props.isDragging ? 'lightblue' : 'white')};
display:flex;
flex-direction: row;
justify-content:space-between;
`;

export class Task extends React.Component {
    state = {
        board: '',
        columnId: '',
        taskId: '',
        isClicked: false,
        isPopUpMenuOpen: false,
    }


    togglePopUpMenu = () => {
        const {isPopUpMenuOpen} = this.state
        this.setState({isPopUpMenuOpen:!isPopUpMenuOpen})
    }

    handleClick = (ev) => {
        console.log('ev', ev)
        this.setState({ isClicked: !this.state.isClicked })

    }
    onClose = () => {
        this.setState({ isClicked: false })
    }
    render() {
        const {isPopUpMenuOpen} = this.state
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <Container 
                    
                        onClick={() => { this.handleClick() }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        {this.props.task.title}
                        {this.state.isClicked && <SimpleDialog open={true} onClose={this.onClose} selectedValue={'task'} task={this.props.task} groupTitle={this.props.groupTitle} />}
                        <span className="edit-icon"><CreateIcon fontSize="small" onClick={this.togglePopUpMenu} /></span>
                        {isPopUpMenuOpen? <Card sx={{ minWidth: 275 }}> <Button size="small">Learn More</Button> </Card> : ''}
                    </Container>
                )}
                
            </Draggable>
        )
    }
}