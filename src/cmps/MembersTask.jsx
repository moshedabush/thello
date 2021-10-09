import React from 'react';
import { connect } from 'react-redux';
import { onSaveBoard, onSetTask, updateBoard } from '../store/board.actions';
class _Members extends React.Component {
  state = {
      currTask:''
  };
  componentDidMount(){
      const {currTask} = this.props
      this.setState({currTask})
  }

  render() {
    return (
      <div className={'members-container'} >
       TODO
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    currPopUp: state.boardModule.currPopUp,
    currTask: state.boardModule.currTask,
  };
}

const mapDispatchToProps = {
  onSaveBoard,
  onSetTask,
  updateBoard,
};

export const Members = connect(mapStateToProps, mapDispatchToProps)(_Members);
