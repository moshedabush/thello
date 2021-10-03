import React from 'react';
import TextField from '@mui/material/TextField';
import {utilService} from '../services/util.service'
import { userService } from '../services/user.service';

export class TaskAdd extends React.Component{

    state = {
        taskTitle: '',
        isWrapperOpen: false,
        loggedUser:''
    }

    componentDidMount = () => {
       const loggedUser = userService.getLoggedinUser()
       this.setState({loggedUser:loggedUser.fullname})
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
        const {loggedUser} = this.state
        console.log('loggedinUser',loggedUser);
        const {group} = this.props
        const groupIdx = board.groups.indexOf(group)
         const task ={
            id: utilService.makeId(),
            title:taskTitle,
            description:'',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            byMember:loggedUser,
            createdAt: Date.now(),
            dueDate: 0,            
            style: {
                coverMode: '',
                bgColor: ''
            }            
        }
        board.groups[groupIdx].tasks.push(task)
        this.props.onSaveBoard(board) 
        this.setState({taskTitle:''})  
    }

    render() {
        const {taskTitle, isWrapperOpen} = this.state

        return (

            <div className="add-task-wrapper" >
                {isWrapperOpen ? 
                <div className="task-add-open">
                    
                    <TextField className="task-add-input"
                        id="outlined-multiline-static"
                        placeholder="Enter a title for this card.."
                        size="small"
                        autoFocus
                        multiline
                        rows={4}
                        onBlur = {this.toggleTaskAdd}
                        value={taskTitle}
                        onChange={this.handleChange}
                        onKeyDown = {this.handleChange}
                    />
                </div>
                :
                <div className="task-add-closed" onClick={this.toggleTaskAdd}>+ Add a card</div>
                }
            </div>
        )
    }

}

