import React from "react";
import { connect } from "react-redux";
import { onSaveBoard } from '../store/board.actions';
import { userService } from "../services/user.service";
import { loadUsers } from "../store/user.actions";
import boardsData from "../data/boards.json";
import { Link } from "react-router-dom";
import { AppHeader } from "../cmps/app-header";
import { BoardsList } from '../cmps/boards-list';
import { ReactComponent as BoardIcon } from "../assets/img/board-icon.svg";

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
  }

  getUserBoardsIds = (loggedUser) => {
    //test with multiple board ids
    const boardIds = [loggedUser.userBoardIds];
    return boardIds;
  };
  
  get favoriteBoards() {
    const { boards } = this.state
    return boards.filter(board => board.isFavorite)
  };

  getBoards = (boardIds) => {
    let filteredBoards = boardIds.map((id) =>
      boardsData.find(({ _id }) => _id === id)
    );
    return filteredBoards;
  };

  onToggleFavorite = (ev, boardId) => {
    ev.preventDefault()
    const { boards } = this.state
    const { onSaveBoard } = this.props
    const board = boards.find(board => board._id === boardId)
    board.isFavorite = !board.isFavorite
    onSaveBoard(board);
  };

  render() {
    const { boards, loggedUser } = this.state;
    if (!boards) return <div>Loading</div>;
    return (
      <section>
        <AppHeader />
        <section className="board-list-container flex align-flex-start justify-center">
          <div className="boards-wrapper flex column">
            <div className="boards-preview flex column">
              <div className="preview-title flex align-center">
                <i className="far fa-star"></i>
                <h3> Starred boards</h3>
              </div>
              <BoardsList onToggleFavorite={this.onToggleFavorite} boards={this.favoriteBoards} />
            </div>

            <div className={"boards-preview"}>
              <div className={"preview-title flex align-center"}>
                <h3>
                  <BoardIcon /> {loggedUser.username}'s Workspaces
                </h3>
              </div>
              <BoardsList onToggleFavorite={this.onToggleFavorite} boards={boards} />
            </div>
          </div>
        </section>
      </section>
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
