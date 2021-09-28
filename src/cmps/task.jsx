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

    handleClick = (bool) => {
       
        this.setState({ isClicked: bool })

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
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    >
                        {<SimpleDialog open={this.state.isClicked} onClose={this.onClose} selectedValue={'task'} task={this.props.task} groupTitle={this.props.groupTitle}/>}
                        <div style={{width: 100 + '%', height: 100 + '%' }} onClick={()=>{this.handleClick(!this.state.isClicked)}}> 
                        {this.props.task.title}
                        <span className="edit-icon"><CreateIcon fontSize="small" onClick={this.togglePopUpMenu} /></span>
                        {isPopUpMenuOpen? <Card className="quick-menu"> <Button size="small">Learn More</Button> </Card> : ''}
                        </div>
                    </Container>
                )}
                
            </Draggable>
        )
    }
}