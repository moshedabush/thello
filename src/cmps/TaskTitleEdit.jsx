import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ListItem } from '@mui/material';



export class TaskTitleEdit extends React.Component {

    state = {
        isTextEditOpen: true,
        taskTitle: '',
        coverColor:'null',
    }

    componentDidMount() {
        const title = this.props.task.title
        this.setState({ taskTitle: title,coverColor:this.props.coverColor })
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
        this.toggleTitleEdit()
        return

    }

    handleClose = () => {
        const { isTextEditOpen } = this.state
        this.setState({ isTextEditOpen: !isTextEditOpen })
    }

    render() {
        const { isTextEditOpen, taskTitle } = this.state
        const {coverColor} = this.props
        return (
            <div className="quick-task-editor-title-wrapper"
                style={{
                    width: this.props.width,
                }}
            >
                {isTextEditOpen ?
                    <form id="savetitle">
                    <div className="quick-task-editor-title-container">
                        <div className="quick-task-editor-title-input-wrapper">
                           {coverColor!=='null' && <ListItem
                           className="quick-task-editor-title-input cover-list-item"
                            style={{
                                width: this.props.width,
                                minHeight: 32+'px',
                                top: this.props.top,
                                bottom: this.props.bottom,
                                backgroundColor:coverColor,
                                
                            }} 
                            />}
                            <TextField className="quick-task-editor-title-input" style={{
                                width: this.props.width,
                                minHeight: this.props.height,
                                top: this.props.top,
                                bottom: this.props.bottom,
                                // background:  'linear-gradient(180deg, rgba(207,162,24,0.8130602582830007) 51%, rgba(50,231,33,0) 51%)',
                               
                            }}
                            multiline
                            autoFocus
                            open={isTextEditOpen}
                            value={taskTitle}
                            onChange={this.handleChange}
                            onKeyDown={this.handleChange}
                            minRows={4}
                            />
                            {/* {coverColor!=='null' && <div style={{backgroundColor:coverColor,height: 32 + 'px'}} ></div>} */}
                        </div>
                        <div className="quick-task-editor-title-save-btn">
                            <Button name="save" onClick={this.onEditTaskTitle} variant="contained">Save</Button>
                        </div>
                    </div>
                    </form>
                    :
                    ''
                }

            </div>
        )
    }

}

