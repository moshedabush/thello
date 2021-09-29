import React from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';



export class TaskQuickMenu extends React.Component {

    state = {
        isMenuOpen: true,
    }


    handleClose = () => {
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

        return (

            <div>
                {isMenuOpen ?
                    <Modal className="quick-menu-modal" style={{ bottom: this.props.bottom, top: this.props.top, left: this.props.left}}
                        onClose={this.handleClose}
                        closeAfterTransition
                        open={isMenuOpen}
                        disableAutoFocus
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                       
                            <div className="quick-task-editor-title">
                                {/* <TextField className="quick-task-editor-title-input" 
                                    style={{width:this.props.width, height:this.props.height }}
                                    id="outlined-size-small"
                                    placeholder="Enter a list title..."
                                    size="small"
                                    autoFocus */}
                                    {/* // onBlur={this.toggleGroupAdd}
                                    // value={taskTitle}
                                    // onChange={this.handleChange}
                                    // onKeyDown={this.handleChange}
                                // /> */}
                                <div>
                                    <a className="quick-task-editor-buttons-items">Open card</a>
                                    <a className="quick-task-editor-buttons-items">Edit labels</a>
                                    <a className="quick-task-editor-buttons-items">Change members</a>
                                    <a className="quick-task-editor-buttons-items">Change cover</a>
                                    <a className="quick-task-editor-buttons-items">Change Move</a>
                                    <a className="quick-task-editor-buttons-items">Copy</a>
                                    <a className="quick-task-editor-buttons-items">Edit dates</a>
                                    <a className="quick-task-editor-buttons-items" name="archive" onClick={(ev) => this.sendToArchive(ev)}>Archive</a>
                                </div >
                            </div>
                      

                    </Modal>
                    : ''
                }
            </div >
        )
    }
}


