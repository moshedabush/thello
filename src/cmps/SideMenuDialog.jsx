import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  paper:{
    width: 192+'px',
    // float: 'right',
    overflow: 'hidden',
    padding: '0 16px 8px 8px',
    zIndex: 10,
    color: '#172b4d',
    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
    fontSize: 14+ 'px',
    fontWeight: 400,
    lineHeight: 20+ 'px',
    backgroundColor: '#0000',
    position: 'absolute',
    right: 0,
    top: 55 + 'px',   
    
    
  },
  title: {
    fontSize: 12 + 'px',
    color: '#5e6c84',
    fontWeight: 500,
    lineHeight: 20 + 'px',
    marginBottom: -4 + 'px',
    textTransform: 'uppercase',
    marginTop: 8 + 'px',
    display: 'block',
    fontFamily:' -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;',
   
  },
  field: {
    backgroundColor: '#091e420a',
    border: 'none',
    borderRadius: 3 + 'px',
    color: '#172b4d',
    boxShadow: 'none',
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'block',
    height: 32 + 'px',
    marginTop: 8+ 'px',
    width: 168 + 'px',
    overflow: 'hidden',
    paddingTop: 6 + 'px',
    paddingRight: 12 + 'px',
    paddingLeft: 12 + 'px',
    position: 'relative',
    textDecoration: 'none',
    textOverflow: 'ellipsis',
    transitionDuration: 85 + 'ms',
    transitionProperty: 'background-color,border-color,box-shadow',
    transitionTimingFunction: 'ease',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
    fontSize: 14 + 'px',
    fontWeight: 400,
    lineHeight: 20 + 'px',
    '&:hover':{
      backgroundColor: '#091e4214',
    border: 'none',
    boxShadow: 'none',
    color: '#091e42',
    
    }
  },
});

export default function MenuListComposition() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const classes = useStyles();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction='row' spacing={2} >
      <Paper className={classes.paper}>
        <MenuList
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: 5 + 'px',
            textAlign: 'left',
          }}>
          <span className={classes.title}>add to card</span>
          <MenuItem className={classes.field}>Members</MenuItem>
          <MenuItem className={classes.field}>Labels</MenuItem>
          <MenuItem className={classes.field}>Checklist</MenuItem>
          <MenuItem className={classes.field}>Dates</MenuItem>
          <MenuItem className={classes.field}>Attachment</MenuItem>
          <MenuItem className={classes.field}>Location</MenuItem>
          <MenuItem className={classes.field}>Cover</MenuItem>
          <MenuItem className={classes.field}>Custom Fields</MenuItem>
          <span className={classes.title}>power-ups</span>
          <MenuItem className={''}>+ Add Power-Ups</MenuItem>
          <span className={classes.title}>automation </span>
          <MenuItem className={''}>+ Add Button</MenuItem>
          <span className={classes.title}>actions </span>
          <MenuItem className={classes.field}>Move</MenuItem>
          <MenuItem className={classes.field}>Copy</MenuItem>
          <MenuItem className={classes.field}>Make Template</MenuItem>
          <MenuItem className={classes.field}>Watch</MenuItem>
          <MenuItem className={classes.field}>Archive</MenuItem>
          <MenuItem className={classes.field}>Share</MenuItem>
        </MenuList>
      </Paper>
      <div>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement='bottom-start'
          transition
          disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id='composition-menu'
                    aria-labelledby='composition-button'
                    onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>Where</MenuItem>
                    <MenuItem onClick={handleClose}>Is</MenuItem>
                    <MenuItem onClick={handleClose}>This</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
