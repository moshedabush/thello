import React from 'react';
import { connect } from 'react-redux';
import { userService } from '../services/user.service';
import { loadUsers } from '../store/user.actions';
// import boardData from '../data/boardsData';
import  boardsData from '../data/boards.json'
import { Link } from 'react-router-dom';

class _BoardList extends React.Component {
  state = {
    loggedUser: {},
    boards: [],
  };
  
  async componentDidMount() {
    const loggedUser = await userService.getLoggedinUser();
    const boardIds = await this.getUserBoardsIds(loggedUser);
    const boards = await this.getBoards(boardIds);
    this.setState({ loggedUser , boards });
    console.log('this.state',this.state)
  }

  getUserBoardsIds = (loggedUser) => {
    //test with multiple board ids
    const boardIds = [loggedUser.userBoardIds];
    return boardIds;
  };

  getBoards = (boardIds) => {
    let filteredBoards = boardIds.map((id)=> boardsData.find(({_id})=>_id===id))
    return filteredBoards;
    
  };
  

  render() {
   
    const { boards } = this.state;
    if (!boards) return <div>Loading</div>;
    console.log('boards in render',boards)
    return (
      <div>
        <h1>Board List</h1>
        {boards.map((board, idx) => (
          <Link to={`board/${board._id}`} key={idx}>
            <span>{board.title}</span>
          </Link>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
  };
}
const mapDispatchToProps = {
  loadUsers,
};

export const BoardList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardList);
