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
import  { ActionsContainer  } from './ActionsContainer';
import {onSaveBoard,openQuickPopUp } from '../store/board.actions'
import { connect } from 'react-redux'
import { QuickPopUp } from '../cmps/QuickPopUp'
import { PopUpHandler } from '../cmps/PopUpHandler'



const useStyles = makeStyles({
  paper: {
  
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

  },
  icon: {
    fontSize: 16 + 'px',
    margin: '0 6px 0 -6px',
  },
});

 function _SideMenu(props) {
  const [open, setOpen] = React.useState(false);
  const [isClicked, click] = React.useState(false);
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
 const setPopUpDims =(ev,group,task,title)=> {
   console.log('props',props)
    console.log('evv', ev);
    console.log('ev.target',ev.target)
    const cmpName = ev.target.name
    const cmpTitle = title
    const menuBtnDims = ev.target.getBoundingClientRect();
    let { top, left } = menuBtnDims;
    props.openQuickPopUp(top, left, cmpName, cmpTitle, task.id, group.id)
    click(isClicked? null : title);
};

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
            className={`MuiButtonBase-root`}
            onClick={() => {
              click(isClicked? null : 'Members');
            }}>
            <span>
              <PersonOutlineOutlinedIcon className={classes.icon} />
            </span>
            Members
          </MenuItem>
            {isClicked==='Members' && <ActionsContainer type={'Members'}/>}{' '}

            <a name="LABELS"  
          
          className={`MuiButtonBase-root`}  onClick={(ev) => {setPopUpDims(ev,props.group,props.task,"Labels")}}>
            <span>
              <LocalOfferOutlinedIcon style={{ pointerEvents: 'none'}} className={classes.icon}  />
            </span>
            Labels
          </a>
          {isClicked==='Labels' && <QuickPopUp> <PopUpHandler from={'MainDialog'} groupId={props.group.id}/> </QuickPopUp> }

          {/* <MenuItem className={classes.field}> */}
          <MenuItem className={'MuiButtonBase-root'}>
            <span>
              <AssignmentTurnedInOutlinedIcon className={classes.icon} />
            </span>
            Checklist
          </MenuItem>
          <MenuItem className={`MuiButtonBase-root`}
           onClick={() => {
            click(isClicked? null : 'Dates');
          }}>
            <span>
              <AccessTimeOutlinedIcon className={classes.icon} />
            </span>
            Dates
          </MenuItem>
          {isClicked==='Dates' && <ActionsContainer type={'Dates'} onClose={()=>{click(null)}}/>}{' '}
          <MenuItem className={classes.field}>
            <span>
              <AttachFileOutlinedIcon className={classes.icon} />
            </span>
            Attachment
          </MenuItem>
          <MenuItem className={`MuiButtonBase-root`}>
            <span>
              <LocationOnOutlinedIcon className={classes.icon} />
            </span>
            Location
          </MenuItem>
          <a name="COVERS"  
          
          className={`MuiButtonBase-root`}  onClick={(ev) => {setPopUpDims(ev,props.group,props.task,"Cover")}}>
            <span>
              <PanoramaOutlinedIcon style={{ pointerEvents: 'none'}} className={classes.icon} />
            </span>
            Cover
            </a>
           
           {isClicked==='Cover' && <QuickPopUp> <PopUpHandler from={'MainDialog'} groupId={props.group.id}/> </QuickPopUp> }
          <span className={classes.title}>actions </span>
          <MenuItem className={`MuiButtonBase-root`}>
            <span>
              <ArrowForwardOutlinedIcon className={classes.icon} />
            </span>
            Move
          </MenuItem>
          <MenuItem className={`MuiButtonBase-root`}>
            <span>
              <ContentCopyOutlinedIcon className={classes.icon} />
            </span>
            Copy
          </MenuItem>
          <MenuItem className={`MuiButtonBase-root`}>
            <span>
              <CollectionsBookmarkOutlinedIcon className={classes.icon} />
            </span>
            Make Template
          </MenuItem>
          <MenuItem className={`MuiButtonBase-root`}>
            <span>
              <RemoveRedEyeOutlinedIcon className={classes.icon} />
            </span>
            Watch
          </MenuItem>
          <MenuItem className={`MuiButtonBase-root`}>
            <span>
              <ArchiveOutlinedIcon className={classes.icon} />
            </span>
            Archive
          </MenuItem>
          <MenuItem className={`MuiButtonBase-root`}>
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
          disablePortal
          display={'none'}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                 
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
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


export const SideMenu = connect(mapStateToProps, mapDispatchToProps)(_SideMenu)