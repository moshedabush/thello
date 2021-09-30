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
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined';
import AllInboxOutlinedIcon from '@mui/icons-material/AllInboxOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
const useStyles = makeStyles({
  paper: {
    width: 192 + 'px',
    overflow: 'hidden',
    padding: '0 16px 8px 8px',
    zIndex: 10,
    color: '#172b4d',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
    fontSize: 14 + 'px',
    fontWeight: 400,
    lineHeight: 20 + 'px',
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
    fontFamily:
      ' -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;',
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
    marginTop: 8 + 'px',
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
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
    fontSize: 14 + 'px',
    fontWeight: 400,
    lineHeight: 20 + 'px',
    '&:hover': {
      backgroundColor: '#091e4214',
      border: 'none',
      boxShadow: 'none',
      color: '#091e42',
    },
  },
  icon: {
    fontSize: 16 + 'px',
    margin: '0 6px 0 -6px',
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
    <Stack direction='row' spacing={2}>
      <Paper className={classes.paper}>
        <MenuList
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: 5 + 'px',
            textAlign: 'left',
          }}>
          <span className={classes.title}>add to card</span>
          <MenuItem
            className={classes.field}
            onClick={(ev) => {
              console.log(ev.target.innerText);
            }}>
            {' '}
            <span>
              <PersonOutlineOutlinedIcon className={classes.icon} />
            </span>
            Members
          </MenuItem>
          <MenuItem
            className={classes.field}
           >
            <span>
              <LocalOfferOutlinedIcon className={classes.icon} />
            </span>
            Labels
          </MenuItem>
          <MenuItem className={classes.field}>
            <span>
              <AssignmentTurnedInOutlinedIcon className={classes.icon} />
            </span>
            Checklist
          </MenuItem>
          <MenuItem className={classes.field}>
            <span>
              <AccessTimeOutlinedIcon className={classes.icon} />
            </span>
            Dates
          </MenuItem>
          <MenuItem className={classes.field}>
            <span>
              <AttachFileOutlinedIcon className={classes.icon} />
            </span>
            Attachment
          </MenuItem>
          <MenuItem className={classes.field}>
            <span>
              <LocationOnOutlinedIcon className={classes.icon} />
            </span>
            Location
          </MenuItem>
          <MenuItem className={classes.field}>
            <span>
              <PanoramaOutlinedIcon className={classes.icon} />
            </span>
            Cover
          </MenuItem>
          <MenuItem className={classes.field}>
            <span>
              <AllInboxOutlinedIcon className={classes.icon} />
            </span>
            Custom Fields
          </MenuItem>
          <span className={classes.title}>power-ups</span>
          <MenuItem className={''}>+ Add Power-Ups</MenuItem>
          <span className={classes.title}>automation </span>
          <MenuItem className={''}>+ Add Button</MenuItem>
          <span className={classes.title}>actions </span>
          <MenuItem className={classes.field}>
            <span>
              <ArrowForwardOutlinedIcon className={classes.icon} />
            </span>
            Move
          </MenuItem>
          <MenuItem className={classes.field}>
            <span>
              <ContentCopyOutlinedIcon className={classes.icon} />
            </span>
            Copy
          </MenuItem>
          <MenuItem className={classes.field}>
            <span>
              <CollectionsBookmarkOutlinedIcon className={classes.icon} />
            </span>
            Make Template
          </MenuItem>
          <MenuItem className={classes.field}>
            <span>
              <RemoveRedEyeOutlinedIcon className={classes.icon} />
            </span>
            Watch
          </MenuItem>
          <MenuItem className={classes.field}>
            <span>
              <ArchiveOutlinedIcon className={classes.icon} />
            </span>
            Archive
          </MenuItem>
          <MenuItem className={classes.field}>
            <span>
              <ReplayOutlinedIcon className={classes.icon} />
            </span>
            Share
          </MenuItem>
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
                    <MenuItem onClick={handleClose}>Members</MenuItem>
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
