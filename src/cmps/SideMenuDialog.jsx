import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

export default function MenuListComposition() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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
    <Stack direction="row" spacing={2} >
      <Paper >
        <MenuList 
            style={{display:'flex',flexDirection:'column',margin:5 + 'px',textAlign:'left'}}
            >
                ADD TO CARD
          <MenuItem divider={true} >Members</MenuItem>
          <MenuItem style={{padding: 2 + 'px'}}>Labels</MenuItem>
          <MenuItem style={{padding: 2 + 'px'}}>Checklist</MenuItem>
          <MenuItem style={{padding: 2 + 'px'}}>Dates</MenuItem>
          <MenuItem style={{padding: 2 + 'px'}}>Attachment</MenuItem>
          <MenuItem style={{padding: 2 + 'px'}}>Location</MenuItem>
          <MenuItem style={{padding: 2 + 'px'}}>Cover</MenuItem>
          <MenuItem style={{padding: 2 + 'px'}}>Custom Fields</MenuItem>
          POWER-UPS 
          <MenuItem style={{padding: 2 + 'px'}}>+ Add Power-Ups</MenuItem>
          AUTOMATION
          <MenuItem style={{padding: 2 + 'px'}}>+ Add Button</MenuItem>
          ACTIONS
          <MenuItem style={{padding: 2 + 'px'}}>Move</MenuItem>
          <MenuItem style={{padding: 2 + 'px'}}>Copy</MenuItem>
          <MenuItem style={{padding: 2 + 'px'}}>Make Template</MenuItem>
          <MenuItem style={{padding: 2 + 'px'}}>Watch</MenuItem>
          <MenuItem style={{padding: 2 + 'px'}}>Archive</MenuItem>
          <MenuItem style={{padding: 2 + 'px'}}>Share</MenuItem>

        </MenuList>
      </Paper>
      <div>
        {/* <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Dashboard
        </Button> */}
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow

              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
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