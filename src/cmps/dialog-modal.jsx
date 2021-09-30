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
import { CssBaseline } from '@mui/material';
import { InputBase } from '@mui/material';

const useStyles = makeStyles({
  dialog:{
    backgroundColor: '#f4f5f7',
    width: 768 + 'px',
    padding: 16 + 'px',
   
  },
  dialogContainer:{
    // display: 'flex',
    // alignItems: 'flex-start',
    backgroundColor: '#000000a3',
    justifyContent: 'center',
    // position: 'fixed',
  },
  headerDialog:{
    width: 75 + '%',
  },
  closeBtn:{
    position: 'absolute',
    right: 5,
    top: 5,
  }
})

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [value, setValue] = React.useState('Controlled');
  const classes = useStyles();

  // const handleListItemClick = (value) => {
  //   onClose(value);
  // };
  const handleChange = (event) => {
    props.task.title=event.target.value;
    setValue(event.target.value);
  };

  const { title, members } = props.task;
  const { task } = props;
  return (
    <Dialog onClose={props.onClose} open={open} className={classes.dialogContainer}>
      {/* <CssBaseline /> */}
      <main className={classes.dialog}>
        <header className={classes.headerDialog}>
          <IconButton className={classes.closeBtn} onClick={()=>{onClose()}}>
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
          <BasicMenu />
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
