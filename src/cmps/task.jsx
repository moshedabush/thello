import React from 'react';
import ReactDOM from 'react-dom';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import SimpleDialog from './dialog-modal';
import CreateIcon from '@mui/icons-material/Create';
import Card from '@mui/material/Card';
import { TaskQuickMenu } from './TaskQuickMenu';
import { TaskTitleEdit } from './TaskTitleEdit.jsx';
import { Icon } from '@mui/material';

//Need to convert it to scss
const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 3px;
  min-width: 256px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? 'lightblue' : 'white')};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
  white-space: pre-wrap;
  word-break: break-word;
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

  render() {
    const { isQuickMenuOpen } = this.state;
    const { left, top, bottom, width, height, right } = this.state;
    const { task, onSaveBoard, board } = this.props;

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
                  onClose={this.onClose}
                  selectedValue={'task'}
                  task={this.props.task}
                  groupTitle={this.props.groupTitle}
                />
              }
              <div
                style={{ width: 100 + '%', height: 100 + '%' }}
                onClick={() => {
                  this.handleClick(!this.state.isClicked);
                }}>
                {this.props.task.title}
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
                {isQuickMenuOpen ? (
                  <div>
                    <TaskQuickMenu
                      left={left}
                      right={right}
                      top={top}
                      bottom={bottom}
                      onSaveBoard={onSaveBoard}
                      height={height}
                      width={width}
                      task={task}
                      board={board}
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>
            </Container>
          )}
        </Draggable>
      </div>
    );
  }
}
