import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



export class TaskTitleEdit extends React.Component {

    state = {
        isTextEditOpen: true,
        taskTitle: ''
    }

    componentDidMount() {
        const title = this.props.task.title
        this.setState({ taskTitle: title })
    }

    toggleTitleEdit = () => {
        const { isTextEditOpen } = this.state
        this.setState({ isTextEditOpen: !isTextEditOpen })
    }

    handleChange = (ev) => {
        if (ev.key === 'Enter') {
            this.toggleTitleEdit()
            ev.preventDefault();
            this.onEditTaskTitle()
            return
        }
        const { value } = ev.target
        this.setState({ taskTitle: value })
    }

    onEditTaskTitle = () => {
        const { task, onSaveBoard, board } = this.props
        task.title = this.state.taskTitle
        onSaveBoard(board)
        this.setState({ taskTitle: '' })
        return

    }

    handleClose = () => {
        const { isTextEditOpen } = this.state
        this.setState({ isTextEditOpen: !isTextEditOpen })
    }

    render() {
        const { isTextEditOpen ,taskTitle } = this.state
        return (
            <div className="quick-task-editor-title-wrapper"
                style={{
                    width: this.props.width,
                }}
            >
                {isTextEditOpen ?
                    <div>
                        <TextField className="quick-task-editor-title-input" style={{
                            width: this.props.width,
                            height: this.props.height,
                            top: this.props.top,
                            bottom: this.props.bottom,
                        }}
                            multiline
                            autoFocus
                            open={isTextEditOpen}
                            value={taskTitle}
                            onChange={this.handleChange}
                            onKeyDown={this.handleChange}
                            minRows={4}
                        />
                          <div className="quick-task-editor-title-save-btn">
                            <Button onClick={this.handleChange} variant="contained">Save</Button>
                        </div>
                      
                    </div>
                    :
                    ''
                }

            </div>
        )
    }

}

