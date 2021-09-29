import React, { createRef } from 'react';
import ReactDOM from 'react-dom';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components'
import SimpleDialog from './dialog-modal';
import CreateIcon from '@mui/icons-material/Create';
import Card from '@mui/material/Card';
import { TaskQuickMenu } from '../cmps/TaskQuickMenu'
import { Icon } from '@mui/material';


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
        isQuickMenuOpen: false,
        left: 0,
        top: 0,
        bottom: 0
    }



    getDimsOfObject = (ev) => {
        ev.preventDefault();
        let icon = this.editIcon.getBoundingClientRect()
        let divTaskDims = this.taskDims.getBoundingClientRect()
        let { left, bottom } = icon
        let { top, width, height } = divTaskDims
        this.setState({ left: left, top: top, bottom: bottom, width: width, height: height })
    }

    toggleQuickMenu = (ev) => {
        this.getDimsOfObject(ev)
        ev.preventDefault();
        const { isQuickMenuOpen } = this.state
        this.setState({ isQuickMenuOpen: !isQuickMenuOpen })

    }

    handleClick = (bool) => {

        this.setState({ isClicked: bool })

    }
    onClose = () => {
        this.setState({ isClicked: false })
    }
    render() {
        const { isQuickMenuOpen } = this.state
        const { left, top, bottom, width, height } = this.state
        const { task, onSaveBoard, board } = this.props

        return (
            <div ref={(div) => { this.taskDims = div }}>
                <Draggable draggableId={this.props.task.id} index={this.props.index}>

                    {(provided, snapshot) => (
                        <Container
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            isDragging={snapshot.isDragging}
                        >
                            {<SimpleDialog open={this.state.isClicked} onClose={this.onClose} selectedValue={'task'} task={this.props.task} groupTitle={this.props.groupTitle} />}
                            <div style={{ width: 100 + '%', height: 100 + '%' }} onClick={() => { this.handleClick(!this.state.isClicked) }}>
                                {this.props.task.title}</div>
                            <div>
                                <div onClick={this.toggleQuickMenu} ref={(div) => { this.editIcon = div }} ><CreateIcon className="quick-edit-icon" onClick={this.toggleQuickMenu} /></div>
                                {isQuickMenuOpen ? <span className="quick-menu"><TaskQuickMenu left={left} top={top} bottom={bottom} width={width} height={height} task={task} onSaveBoard={onSaveBoard} board={board} /></span> : ''}

                            </div>

                        </Container>
                    )}

                </Draggable>
            </div>
        )
    }
}