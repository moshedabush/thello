import React from 'react';
import Modal from '@mui/material/Modal'
import { TaskTitleEdit } from '../cmps/TaskTitleEdit';
import { ActionsContainer } from './ActionsContainer';




export class TaskQuickMenu extends React.Component {

    state = {
        isMenuOpen: true,
        taskTitle: '',
        clickedCover:false,
    }


    handleClose = (ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault();
            const { isMenuOpen } = this.state
            this.setState({ isMenuOpen: !isMenuOpen })
            return
        }
      
    }

    toggleQuickMenu = () => {
        const { isMenuOpen } = this.state
            this.setState({ isMenuOpen: !isMenuOpen })
    }

    sendToArchive = ({ target }) => {
        const { task, onSaveBoard, board } = this.props
        if (target.name === 'archive') {
            task.isArchived = true
            onSaveBoard(board)
        }
    }
    handleCover =()=>{
        this.setState({clickedCover:!this.state.clickedCover})
    }


    render() {
        const { isMenuOpen } = this.state
        const { task, width, height, right, onSaveBoard, board ,coverColor} = this.props
        return (

            <div>
                {isMenuOpen ?
                    <Modal className="quick-menu-modal" style={{ bottom: this.props.bottom, top: this.props.top, left: this.props.left }}
                        onClose={this.handleClose}
                        closeAfterTransition
                        open={isMenuOpen}
                        onBackdropClick ={this.toggleQuickMenu}
                        disableAutoFocus
                        onKeyDown={this.handleClose}
                        onClick ={this.handleClose}
                    >
                        <div >
                            <div>
                                <TaskTitleEdit task={task} width={width} height={height} right={right} onSaveBoard={onSaveBoard} board={board} coverColor={coverColor}/>
                            </div>
                            <div>
                                <a className="quick-task-editor-buttons-items">Open card</a>
                                <a className="quick-task-editor-buttons-items">Edit labels</a>
                                <a className="quick-task-editor-buttons-items">Change members</a>
                                <a className="quick-task-editor-buttons-items" onClick={()=>{this.handleCover()}}>Change cover</a>
                                {this.state.clickedCover && <ActionsContainer cover={'quick-menu'} type={'Cover'} onClose={()=>{this.handleCover()}} setCoverColor={this.props.setCoverColor}/>}{' '}

                                <a className="quick-task-editor-buttons-items">Change Move</a>
                                <a className="quick-task-editor-buttons-items">Copy</a>
                                <a className="quick-task-editor-buttons-items">Edit dates</a>
                                <a className="quick-task-editor-buttons-items" name="archive" onClick={(ev) => this.sendToArchive(ev)}>Archive</a>
                            </div>
                        </div>

                    </Modal>
                    : ''
                }
            </div >
        )
    }
}


