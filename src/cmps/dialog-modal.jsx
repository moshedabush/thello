import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@mui/material/TextField';
import { SideMenu } from './SideMenuDialog';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import { makeStyles } from '@material-ui/styles';
import { onSaveBoard, onSetTask, updateBoard } from '../store/board.actions';
import { Box, width } from '@mui/system';
import { FormControl, InputLabel } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AddIcon from '@mui/icons-material/Add';

function _DialogModal(props) {
  const { onClose, selectedValue, open, coverColor, currTask, board,onSetTask } = props;
  const [value, setValue] = React.useState(currTask.title);
  const handleChange =  (event) => {
    event.preventDefault();
    currTask.title = event.target.value
    setValue(event.target.value);
  const taskToSave = {...currTask}
   onSetTask(taskToSave)
   const boardToSave = updateBoard(board, props.group.id, currTask.id, currTask)
    props.onSaveBoard(boardToSave)
  };
  
  const setCoverColor = async (coverColor) => {
    // const taskToSave = { ...currTask, coverColor };
    // props.onSetTask(taskToSave);
    // updateBoard(board, groupId, currTask.id, taskToSave);
  };
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      height:33 + 'px',
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#f4f5f7' : '#fff',
      border: 'none',
      fontSize: 20,
      fontWeight: 600,
      width: 500 + 'px',
      padding: '0px 10px',
      margin: '-8px 30px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        boxShadow:'inset 0 0 0 2px hsl(218deg 54% 20%)',
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  const { title, members, style } = currTask;
  console.log('currTask', currTask);
  console.log('board in dialog', props.board);
  return (
    <Dialog onClose={props.onClose} open={open} className={'DIALOG-CMP'}>
      {style.coverColor.length !== 0 && (
        <div
          className={'cover'}
          style={{ backgroundColor: style.coverColor }}></div>
      )}
      {style.imgUrl.length !== 0 && (
        <div
          className={'urlImg-cover'}
          style={{
            backgroundImage: `url(${currTask.style.imgUrl})`,
            height: 145 + 'px',
            backgroundPosition: 'center center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#5f9ea0a8',
          }}></div>
      )}
      <section className={'dialog-container'}>
        <header className={'header-dialog'}>
          <IconButton
            className={'close-btn'}
            onClick={() => {
              onClose();
            }}>
            <CloseIcon />
          </IconButton>
          <DialogTitle>
            <Box
              component='form'
              noValidate
              sx={{
                width:100 + '%',

              }}>
              <TvOutlinedIcon sx={{    position: 'absolute'}} />
              <FormControl variant='standard'   onBlur={(ev)=>handleChange(ev)} >
                <BootstrapInput
                  defaultValue={value}
                  id='bootstrap-input'
                
                />
              </FormControl>{' '}
            </Box>
            <div>in list: {props.groupTitle}</div>
          </DialogTitle>
        </header>
        <main className={'main'}>
          <div className={'details-badges-section'}>
            <div className='card-detail-item u-clearfix js-card-detail-members'>
              <h3 className='card-detail-item-header mod-no-top-margin'>Members</h3>
              <div className='js-card-detail-members-list'>
                {board.members.map((member)=>{
               return <div className='member member-on-card'
                  title={member.fullname}>
                      {member.fullname.substring(0,1)}                      
                </div>
                    })}
              </div>
                <div className={'add-btn-member'}>+</div>
            </div>

            <div className={'card-detail-item labels'}>
              <h3 className='card-detail-item-header'>Labels</h3>
              <div className='u-clearfix js-card-detail-labels-list js-edit-label'>
              <div>{currTask.labelIds.map((labelId)=>{
                return board.labels.map((label)=>{
                  if (label.id === labelId)
                  return <div style={{backgroundColor:label.color}} className='card-label card-label-green mod-card-detail mod-clickable'> <span className='label-text'>&nbsp;</span></div>
                })
              })}
              </div>
              </div>
            </div>

            <div className={'card-detail-item due-date'}></div>
          </div>

          <div className='window-module'>
            <div className='window-module-title window-module-title-no-divider description-title'>
              <span className='icon-description icon-lg window-module-title-icon icon-list-items fas fa-list'></span>
              <h3 className='u-inline-block '>Description</h3>
              <div className='editable' attr='desc'>
                <span className='editing-members-description js-editing-members-description hide'></span>
              </div>
            </div>
            <div className='u-gutter'>
              <div className='editable' attr='desc'>
                <div className='description-content js-desc-content'>
                  <div
                    className='current markeddown hide-on-edit js-desc js-show-with-desc hide'
                    dir='auto'></div>

                  <div className='description-edit edit'>
                    <textarea
                      className='field field-autosave js-description-draft description card-description'
                      placeholder='Add a more detailed description…'></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <section className={'sidebar-menu-dialog'}>
          <SideMenu
            setCoverColor={setCoverColor}
            groupId={props.groupId}
            group={props.group}
            task={currTask}
          />
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
