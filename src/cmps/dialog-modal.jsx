import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
// import PersonIcon from '@mui/icons-material/Person';
// import AddIcon from '@mui/icons-material/Add';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@mui/material/Typography';
import { blue, blueGrey, grey, red } from '@mui/material/colors';
import { color, fontSize } from '@mui/system';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const { title, members } = props.task;
  const { task } = props;
  return (
    <Dialog onClose={handleClose} open={open} className={'dialog-container'}>
      <main className={'dialog'}>
        <header className={'header-dialog '}>
          <IconButton className={'closeBtn'} onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <DialogTitle>
            Title: {title}
          </DialogTitle>
            <small>in list: {props.columnTitle}</small>
         
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
