import * as React from 'react';
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
import { width } from '@mui/system';


const useStyles = makeStyles({
  dialog:{
    backgroundColor: '#f4f5f7',
    width: 768 + 'px',
    // padding: 16 + 'px',
    marginBlockStart:0,
   
  },
  dialogContainer:{
 
    backgroundColor: '#000000a3',
    justifyContent: 'center',
  },
  headerDialog:{
    width: 75 + '%',
  },
  closeBtn:{
    position: 'absolute',
    right: 5,
    top: 5,
  },
  cover:{
    width:768 + 'px',
    height:70 + 'px',
  }
})

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open,coverColor } = props;
  const [value, setValue] = React.useState('Controlled');
  const classes = useStyles();
  const handleChange = (event) => {
    props.task.title=event.target.value;
    setValue(event.target.value);
  };


  const { title, members } = props.task;
  const { task } = props;
  return (
    <Dialog onClose={props.onClose} open={open} className={classes.dialogContainer}>
      <main className={classes.dialog}>
        <header className={classes.headerDialog}>
          <IconButton className={classes.closeBtn} onClick={()=>{onClose()}}>
            <CloseIcon  />
          </IconButton>
     {coverColor!=='null' &&   <div className={classes.cover} style={{backgroundColor:coverColor}} ></div>}
          <DialogTitle  >
          <TextField
          id="flexible"
          multiline
          maxRows={2}
          value={title}
          onChange={handleChange}
         
        />          
          </DialogTitle>
            <small>in list: {props.groupTitle}</small>
         
        </header>
        <section className={'main-dialog'}>
          <ListItem> Desc: {task.description}</ListItem>
          {task.byMember && (
            <List>
              <ListItem> Created by: {task.byMember.fullname}</ListItem>
              <ListItem>
                {' '}
                At: {new Date(task.createdAt).toLocaleDateString('en-US')}
              </ListItem>
              <ListItem>
                {' '}
                Due Date: {new Date(task.dueDate).toLocaleDateString('en-US')}
              </ListItem>
            </List>
          )}
        </section>
        <section className={'sidebar-menu-dialog'}>
          <BasicMenu setCoverColor={props.setCoverColor}/>
        </section>
      </main>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
