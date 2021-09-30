import React from 'react';
import TextField from '@mui/material/TextField';


export class TaskTitleEdit extends React.Component {

    state = {
        isTextEditOpen: true,
        taskTitle: ''
    }

    componentDidMount() {
        const title = this.props.task.title
        this.setState({ taskTitle: title })
    }

    handleChange = (ev) => {
        ev.preventDefault();
        const {task, onSaveBoard ,board} = this.props
        const { value } = ev.target
        task.title = value
        onSaveBoard(board)
        this.setState({ taskTitle: value })
        return
    }






    handleClose = () => {
        const { isTextEditOpen } = this.state
        this.setState({ isTextEditOpen: !isTextEditOpen })
    }

    render() {
        const { isTextEditOpen,taskTitle } = this.state
        return (
            <div className="quick-task-editor-title-wrapper"
                style={{
                    width: this.props.width,
                }}
            >
                {isTextEditOpen ?

                    <TextField className="quick-task-editor-title-input" style={{
                        width: this.props.width,
                        height: this.props.height,
                        top: this.props.top,
                        bottom: this.props.bottom,
                    }}
                        multiline
                        open={isTextEditOpen}
                        value={this.state.taskTitle}
                        onChange={this.handleChange}
                        minRows={4}
                    // onKeyDown={this.handleChange} 
                    />
                    :
                    ''
                }

            </div>
        )
    }

}

