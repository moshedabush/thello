import * as React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@mui/material/TextField';
import BasicMenu from './SideMenuDialog';
import { makeStyles } from '@material-ui/styles';
import {onSaveBoard, onSetTask,updateBoard} from '../store/board.actions'
import { width } from '@mui/system';


function _DialogModal(props) {
  const { onClose, selectedValue, open,coverColor,currTask } = props;
  const [value, setValue] = React.useState('Controlled');
  const handleChange = (event) => {
    props.task.title=event.target.value;
    setValue(event.target.value);
  };
  const setCoverColor = async (coverColor)=>{
    const taskToSave = {...currTask,coverColor}
  props.onSetTask(taskToSave)
  const { board} = props
  updateBoard(board, props.groupId, currTask.id, taskToSave)
  
  }

  const { title, members,style } = currTask;
  console.log('currTask',currTask)
  console.log('board in dialog',props.board)
  return (
   
    <Dialog onClose={props.onClose} open={open} className={'DIALOG-CMP@@@@@'}>
     {style.coverColor.length !== 0 &&   <div className={'cover'} style={{backgroundColor:style.coverColor}} ></div>}
     {style.imgUrl.length !== 0 &&
                <div 
                 style={{
                  backgroundImage: `url(${currTask.style.imgUrl})`,
                  height: 145+'px',
                  backgroundPosition: 'center center',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: '#5f9ea0a8',
                  
                }}>
                </div>}
      <section className={ 'dialog-container' }>
        <header className={'header-dialog' }>
          <IconButton className={'close-btn'} onClick={()=>{onClose()}}>
            <CloseIcon  />
          </IconButton>
          <DialogTitle  >
          <TextField
          id="flexible"
          multiline
          maxRows={2}
          value={title}
          onChange={handleChange}
         
        />          
            <div>in list: {props.groupTitle}</div>
          </DialogTitle>
         
        </header>
        <main className={'main'}>

          <div> Desc: {currTask.description}</div>
          {currTask.byMember && (
            <List>
              <ListItem> Created by: {currTask.byMember.fullname}</ListItem>
              <ListItem>
                {' '}
                At: {new Date(currTask.createdAt).toLocaleDateString('en-US')}
              </ListItem>
              <ListItem>
                {' '}
                Due Date: {new Date(currTask.dueDate).toLocaleDateString('en-US')}
              </ListItem>
            </List>
          )}
        </main>
        <section className={'sidebar-menu-dialog'}>
          <BasicMenu  setCoverColor={setCoverColor} groupId={props.groupId}/>
        </section>
      </section>
    </Dialog>
  );
}

_DialogModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
    board: state.boardModule.board,
    currTask: state.boardModule.currTask,
  };
}
const mapDispatchToProps = {
  updateBoard,
  onSetTask,
  onSaveBoard,
};

export const DialogModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(_DialogModal);