import React from 'react';
import { connect } from 'react-redux'
import Modal from '@mui/material/Modal'
import { onSaveBoard,openQuickPopUp  } from '../store/board.actions';
import { TaskTitleEdit } from '../cmps/TaskTitleEdit';
import {QuickPopUp} from '../cmps/QuickPopUp'
import {PopUpHandler} from '../cmps/PopUpHandler'




class _TaskQuickMenu extends React.Component {

    state = {
        isMenuOpen: true,
        taskTitle: '',
        isQuickPopUpOpen:false
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

     setPopUpDims = ({target}) => {
        const cmpName = target.name
        const cmpTitle = target.title
        const group = this.props.group
        const task =  this.props.task
        const menuBtnDims = this.btnDims.getBoundingClientRect();        
        let { top, left } = menuBtnDims;
        this.props.openQuickPopUp(top,left,cmpName,cmpTitle,task.id,group.id)
        const { isQuickPopUpOpen } = this.state;
        this.setState({ isQuickPopUpOpen: !isQuickPopUpOpen })
    };


    sendToArchive = ({ target }) => {
        const { task, onSaveBoard, board } = this.props
        if (target.name === 'archive') {
            task.isArchived = true
            onSaveBoard(board)
        }
    }


    render() {
        const { isMenuOpen, isQuickPopUpOpen } = this.state
        const { task,group, width, height, right, onSaveBoard, board } = this.props
        
       
        return (

            <div>
                {isMenuOpen ?
                    <Modal className="quick-menu-modal" style={{ bottom: this.props.bottom, top: this.props.top, left: this.props.left }}
                        onClose={this.handleClose}
                        closeAfterTransition
                        open={isMenuOpen}
                        onBackdropClick={this.toggleQuickMenu}
                        disableAutoFocus
                        onKeyDown={this.handleClose}
                        onClick={this.handleClose}
                    >
                        <div >
                            <div>
                                <TaskTitleEdit task={task} group={group} width={width} height={height} right={right} onSaveBoard={onSaveBoard} board={board} />
                            </div>
                            <div>
                                <a className="quick-task-editor-buttons-items">Open card</a>
                                <a className="quick-task-editor-buttons-items" ref={(a) => {
                                    this.btnDims = a;}} name="LABELS" group ={group} task={task} title="Labels" onClick={this.setPopUpDims}>Edit labels</a>
                                <a className="quick-task-editor-buttons-items">Change members</a>
                                <a className="quick-task-editor-buttons-items">Change cover</a>
                                <a className="quick-task-editor-buttons-items">Change Move</a>
                                <a className="quick-task-editor-buttons-items">Copy</a>
                                <a className="quick-task-editor-buttons-items">Edit dates</a>
                                <a className="quick-task-editor-buttons-items" name="archive" onClick={(ev) => this.sendToArchive(ev)}>Archive</a>
                            </div>
                            {isQuickPopUpOpen? <QuickPopUp> <PopUpHandler/> </QuickPopUp> :''
                            }
                        </div>
                    </Modal>
                    : ''
                }
            </div >
        )
    }
}


function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        currPopUp: state.boardModule.currPopUp,
    }
}

const mapDispatchToProps = {
    onSaveBoard,
    openQuickPopUp
}


export const TaskQuickMenu = connect(mapStateToProps, mapDispatchToProps)(_TaskQuickMenu)