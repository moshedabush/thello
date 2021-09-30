import React from 'react';
import Modal from '@mui/material/Modal'
import { TaskTitleEdit } from '../cmps/TaskTitleEdit';




export class TaskQuickMenu extends React.Component {

    state = {
        isMenuOpen: true,
        taskTitle: ''
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


    render() {
        const { isMenuOpen } = this.state
        const { task, width, height, right, onSaveBoard, board } = this.props
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
                    >
                        <div >
                            <div>
                                <TaskTitleEdit task={task} width={width} height={height} right={right} onSaveBoard={onSaveBoard} board={board} />
                            </div>
                            <div>
                                <a className="quick-task-editor-buttons-items">Open card</a>
                                <a className="quick-task-editor-buttons-items">Edit labels</a>
                                <a className="quick-task-editor-buttons-items">Change members</a>
                                <a className="quick-task-editor-buttons-items">Change cover</a>
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


