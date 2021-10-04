import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import SimpleDialog from './dialog-modal';
import CreateIcon from '@mui/icons-material/Create';
import { TaskQuickMenu } from './TaskQuickMenu';
import { TaskLabelPreview } from './TaskLabelPreview';

//Need to convert it to scss
const Container = styled.div`

  transform: ${props => (props.isDragging ? `rotate(3deg)` : '0')}; ;  
  border-radius: 3px;
  padding: 6px 8px 2px;
  margin-bottom: 8px;
  border:none;
  background-color:white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
  white-space: pre-wrap;
  word-break: break-word;
  box-shadow: 0 1px 0 #091e4240;
`;

export class Task extends React.Component {
  state = {
    board: '',
    columnId: '',
    taskId: '',
    isClicked: false,
    isQuickMenuOpen: false,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    top: 0,
    coverColor:'null',
  };

  getDimsOfObject = (ev) => {
    let divTaskDims = this.taskDims.getBoundingClientRect();
    let icon = this.editIcon.getBoundingClientRect();
    ev.preventDefault();
    let { left, bottom } = icon;
    let { top, width, height, right } = divTaskDims;
    this.setState({
      menuLeft: left,
      bottom: bottom,
      width: width,
      height: height,
      top: top,
      left: left,
      right: right,
    });
  };

  toggleQuickMenu = (ev) => {
    this.getDimsOfObject(ev);
    ev.preventDefault();
    const { isQuickMenuOpen } = this.state;
    this.setState({ isQuickMenuOpen: !isQuickMenuOpen });
  };

  handleClick = (bool) => {
    this.setState({ isClicked: bool });
  };

  onClose = () => {
    this.setState({ isClicked: false });
  };
  setCoverColor = (coverColor)=>{
    this.setState({coverColor})
  }

  render() {
    const { isQuickMenuOpen } = this.state;
    const { left, top, bottom, width, height, right } = this.state;
    const { task, onSaveBoard, board, group } = this.props;
    const {coverColor} = this.state
    console.log(this.state.coverColor);
    return (
      <div
        ref={(div) => {
          this.taskDims = div;
        }}>
        <Draggable draggableId={this.props.task.id} index={this.props.index}>
          {(provided, snapshot) => (
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}>
              
              {
                <SimpleDialog
                  open={this.state.isClicked}
                  setCoverColor={this.setCoverColor}
                  onClose={this.onClose}
                  selectedValue={'task'}
                  task={this.props.task}
                  groupTitle={this.props.groupTitle}
                  coverColor={this.state.coverColor}
                  
                />
              }
              <div className="task-labels-preview">
                  <ul className ="task-preview-labels">
                  {task.labelIds.map(labelId => <TaskLabelPreview key={labelId}  labelId={labelId} labels={board.labels}/>)}
                  </ul>
                  
                </div>
                <div
              style={{width: '-webkit-fill-available'}}
              onClick={() => {
                this.handleClick(!this.state.isClicked);
              }}>
                  {/* {coverColor!=='null' && <div style={{backgroundColor:coverColor,height: 32 + 'px'}} ></div>} */}
                 <div>
                {this.props.task.title}
                 </div>
              </div>
              <div>
                <div
                  onClick={this.toggleQuickMenu}
                  ref={(div) => {
                    this.editIcon = div;
                  }}>
                  <CreateIcon
                    className='quick-edit-icon'
                    onClick={this.toggleQuickMenu}
                    
                  />
                </div>
              </div>
                
                {isQuickMenuOpen ? (
                  <div>
                    <TaskQuickMenu left={left} right={right} top={top} bottom={bottom} onSaveBoard={onSaveBoard}
                      height={height} width={width} task={task} group={group} board={board} />
                  </div>)
                  :
                  ''
                }
              
            </Container>
          )}
        </Draggable>
      </div>
    );
  }
}
