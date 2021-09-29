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


const emails = ['username@gmail.com', 'user02@gmail.com'];

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [value, setValue] = React.useState('Controlled');

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
    <Dialog onClose={props.onClose} open={open} className={'dialog-container'}>
      <main className={'dialog'}>
        <header className={'header-dialog '}>
          <IconButton className={'closeBtn'} onClick={()=>{onClose()}}>
            <CloseIcon  />
          </IconButton>
          <DialogTitle  style={{width: 95 + '%', borderRadius: 40 + 'px'}}>
          <TextField
          id="flexible"
          multiline
          maxRows={2}
          value={title}
          style={{width: 95 + '%', borderRadius: 40 + 'px'}}
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
