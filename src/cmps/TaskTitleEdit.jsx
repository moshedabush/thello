import React from 'react';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import { TaskLabelPreview } from './TaskLabelPreview';


export class TaskTitleEdit extends React.Component {

    state = {
        isTextEditOpen: true,
        taskTitle: '',
    }

    componentDidMount() {
        const title = this.props.task.title
        this.setState({ taskTitle: title, coverColor: this.props.coverColor })
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
        const { task, board } = this.props
        return (
            <>
                <div className="quick-task-editor-task">
                    
                    <div className="quick-task-editor-title-wrapper"
                        style={{
                            width: this.props.width,
                        }}
                    >
                        {isTextEditOpen ?
                            <form id="savetitle">
                                {task.style && 
                                <div className="quick-task-cover-preview" style={{width:this.props.width ,backgroundColor:`${task.style.coverColor}`}}>
                                 </div>}
                               
                                <ul className="quick-task-label-preview">
                                            {task.labelIds.map(labelId => <TaskLabelPreview key={labelId} labelId={labelId} labels={board.labels} />)}
                                        </ul>
                                <div className="quick-task-editor-title-container">
                                    <div className="quick-task-editor-title-input-wrapper">
                                        <InputBase className="quick-task-editor-title-input" style={{
                                            width: this.props.width,
                                            minHeight: this.props.height,
                                            padding:'0 8px'
                                        }}
                                            multiline
                                            autoFocus
                                            open={isTextEditOpen}
                                            value={taskTitle}
                                            onChange={this.handleChange}
                                            onKeyDown={this.handleChange}
                                            minRows={4}
                                        />
                                        
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
                </div>
            </>
        )
    }

}

