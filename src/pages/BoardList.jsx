import React from 'react';
import { connect } from 'react-redux';
import { userService } from '../services/user.service';
import { loadUsers } from '../store/user.actions';
// import boardData from '../data/boardsData';
import boardsData from '../data/boards.json';
import { Link } from 'react-router-dom';
import { AppHeader } from '../cmps/app-header';

class _BoardList extends React.Component {
  state = {
    loggedUser: {},
    boards: [],
  };

  async componentDidMount() {
    const loggedUser = await userService.getLoggedinUser();
    const boardIds = await this.getUserBoardsIds(loggedUser);
    const boards = await this.getBoards(boardIds);
    this.setState({ loggedUser, boards });
    console.log('this.state', this.state);
  }

  getUserBoardsIds = (loggedUser) => {
    //test with multiple board ids
    const boardIds = [loggedUser.userBoardIds];
    return boardIds;
  };

  getBoards = (boardIds) => {
    let filteredBoards = boardIds.map((id) =>
      boardsData.find(({ _id }) => _id === id)
    );
    return filteredBoards;
  };

  render() {
    const { boards, loggedUser } = this.state;
    if (!boards) return <div>Loading</div>;
    console.log('boards in render', boards);
    return (
      <div className={'board-list-container'}>
        <AppHeader />
        <div className={'board-list-recently-viewed'}>
          <div>
            <h4> 🕒 Recently viewed</h4>
          </div>
        </div>

        <ul className={'user-board-list'}>
          <div className={'your-workspaces'}>
            <h4> YOUR WORKSPACES</h4>
            <div>{loggedUser.username} Workspaces</div>
          </div>
          {boards.map((board, idx) => (
            <div className={'board-list-card'}>
              <Link to={`board/${board._id}`} key={idx}>
                <div
                  className={'board-list-card'}
                  style={{
                    backgroundColor: board.style.backgroundColor
                      ? board.style.backgroundColor
                      : 'green',
                  }}>
                  {console.log('board.style', board.style)}
                  <div className={'board-list-title'}>{board.title}</div>
                </div>
              </Link>
            </div>
          ))}
        </ul>
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
