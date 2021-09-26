import React from 'react';
import { connect } from 'react-redux';
import { userService } from '../services/user.service';
import { loadUsers } from '../store/user.actions';
import boardData from '../data/boardsData';
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
  }

  getUserBoardsIds = (loggedUser) => {
    //test with multiple board ids
    const boardIds = [loggedUser.userBoardIds];
    return boardIds;
  };
  getBoards = (boardIds) => {
    // TEMP! boardData is 1 object w/ 1 board, need to convert data&func to arrays.
    // RETURNS ALL CURRENT BOARDS IN THE DATA - USER DOESNT MATTER
    const boards = [];
    boards.push(boardData);
    return boards;
  };
  

  render() {
    const { boards } = this.state;
    if (!boards) return <div>Loading</div>;
    return (
      <div>
        <h1>Board List</h1>
        {boards.map((board, idx) => (
          <Link to={`board/${board._id}`} key={idx}>
            {' '}
            <div>{board.title}</div>{' '}
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
