import React from 'react';
import TextField from '@mui/material/TextField';
import {utilService} from '../services/util.service'

export class TaskAdd extends React.Component{

    state = {
        taskTitle: '',
        isWrapperOpen: false
    }
    
    toggleTaskAdd = () => {
        const {isWrapperOpen} = this.state
        this.setState({isWrapperOpen:!isWrapperOpen})
    }
    
    handleChange =(ev) =>{
        if (ev.key === 'Enter') {
            this.toggleTaskAdd()
            ev.preventDefault();
            this.onAddTask()
            return
        }
        const {value} = ev.target
        this.setState({taskTitle:value})
    }

    onAddTask =()=> {
        const {taskTitle} = this.state
        const {board} = this.props 
        const {group} = this.props
        const groupIdx = board.groups.indexOf(group)
         const task ={
            id: utilService.makeId(),
            title:taskTitle,
            //need to add here fields
            
        }
        board.groups[groupIdx].tasks.push(task)
        this.props.onSaveBoard(board) // need to fix this. not working.
        this.setState({taskTitle:''})  
    }

    render() {
        const {taskTitle, isWrapperOpen} = this.state

        return (

            <div className="add-group-wrapper" >
                {isWrapperOpen ? 
                <div className="group-add-open">
                    
                    <TextField className="group-add-input"
                        id="outlined-size-small"
                        placeholder="Enter a title for this card.."
                        size="small"
                        autoFocus
                        onBlur = {this.toggleTaskAdd}
                        value={taskTitle}
                        onChange={this.handleChange}
                        onKeyDown = {this.handleChange}
                    />
                </div>
                :
                <div className="group-add-closed" onClick={this.toggleTaskAdd}>Add a card</div>
                }
            </div>
        )
    }

}
