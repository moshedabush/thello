import React from 'react';
import TextField from '@mui/material/TextField';
import {utilService} from '../services/util.service'

export class GroupAdd extends React.Component {

    state = {
        groupTitle: '',
        isWrapperOpen: false
    }

    toggleGroupAdd = () => {
        const {isWrapperOpen} = this.state
        this.setState({isWrapperOpen:!isWrapperOpen})
    }

    handleChange =(ev) =>{
        if (ev.key === 'Enter') {
            this.toggleGroupAdd()
            ev.preventDefault();
            this.onAddGroup()
            return
        }
        const {value} = ev.target
        this.setState({groupTitle:value})
    }

    onAddGroup =()=> {
        const {groupTitle} = this.state
        const {board ,onSaveBoard } = this.props 
        const {groups} = board 
        const group ={
            id: utilService.makeId(),
            title:groupTitle,
            tasks: []
        }
        groups.push(group)
        this.setState({groupTitle:''})     
        onSaveBoard(board)
    }

    render() {
        const {groupTitle, isWrapperOpen} = this.state

        return (

            <div className="add-group-wrapper" >
                {isWrapperOpen ? 
                <div className="group-add-open">
                    
                    <TextField className="group-add-input"
                        id="outlined-size-small"
                        placeholder="Enter a list title..."
                        size="small"
                        autoFocus
                        onBlur = {this.toggleGroupAdd}
                        value={groupTitle}
                        onChange={this.handleChange}
                        onKeyDown = {this.handleChange}
                    />
                </div>
                :
                <div className="group-add-closed" onClick={this.toggleGroupAdd}>Add another list</div>
                }
            </div>
        )
    }

}