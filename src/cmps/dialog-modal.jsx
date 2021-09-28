import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


const emails = ['username@gmail.com', 'user02@gmail.com'];

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [value, setValue] = React.useState('Controlled');

  // const handleListItemClick = (value) => {
  //   onClose(value);
  // };
  const handleChange = (event) => {
    console.log('event',event.target.value)
    props.task.title=event.target.value;
    setValue(event.target.value);
  };

  const { title, members } = props.task;
  const { task } = props;
  return (
    <Dialog onClose={props.onClose} open={open} className={'dialog-container'}>
      <main className={'dialog'}>
        <header className={'header-dialog '}>
          <IconButton className={'closeBtn'} onClick={()=>{onClose()}}>
            <CloseIcon  />
          </IconButton>
          <DialogTitle>
          <TextField
          id="flexible"
          autoFocus 
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
          SideBar Menu CMP placeholder
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
