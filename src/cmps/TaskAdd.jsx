import React from 'react';
import {utilService} from '../services/util.service'
import { userService } from '../services/user.service';
import InputBase from '@mui/material/InputBase';
import CloseIcon from '@mui/icons-material/Close';

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
    toggleTaskAdd = (ev) => {
        const {isWrapperOpen} = this.state
        this.setState({isWrapperOpen:!isWrapperOpen})
    }
    
    handleChange =(ev) =>{
        if (ev.key === 'Enter') {
            this.toggleTaskAdd()
            ev.preventDefault();
            this.onAddTask(ev)
            return
        }
        const {value} = ev.target
        this.setState({taskTitle:value})
    }

    onAddTask =()=> {
        
        const {taskTitle} = this.state
        const {board} = this.props 
        const {loggedUser} = this.state
        const {group} = this.props
        const groupIdx = board.groups.indexOf(group)
         const task ={
            id: utilService.makeId(),
            title:taskTitle,
            description:'',
            comments: [],
            checklists: [],
            members: [...board.members],
            labelIds: [],
            byMember:loggedUser,
            createdAt: Date.now(),
            dueDate: 0,            
            style: {
                coverColor: '',
                imgUrl: '',
                bgColor:''

            }            
        }
        if (task.title)
        board.groups[groupIdx].tasks.push(task)
        this.props.onSaveBoard(board) 
        // this.props.onSetTask(task)
        this.setState({taskTitle:''})  
    }

    render() {
        const {taskTitle, isWrapperOpen} = this.state

        return (

            <div className="add-task-wrapper" >
                {isWrapperOpen ? 
                <>
                <div className="task-add-open">
                    
                    <InputBase className="task-add-input"
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
                <div className="task-add-controls-wrapper">
                            <button onClick={this.onAddTask} className="task-add-controls">Add card</button>
                            <CloseIcon onClick={this.toggleTaskAdd}
                                style={{
                                    height: '32px', lineHeight: '32px', width: '32px',
                                     marginLeft: '4px',marginBottom:'4px', cursor: 'pointer'
                                }} />
                        </div>
                </>
                
                :
                <div className="task-add-closed" onClick={(ev)=>{this.toggleTaskAdd(ev)}}>+ Add a card</div>
                }
            </div>
        )
    }

}

