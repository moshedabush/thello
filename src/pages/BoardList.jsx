import React from "react";
import { connect } from "react-redux";
import { onSaveBoard,loadBoards } from '../store/board.actions';
import { AppHeader } from "../cmps/app-header";
import { BoardsList } from '../cmps/boards-list';
import { ReactComponent as BoardIcon } from "../assets/img/board-icon.svg";
import { ReactComponent as StarIcon } from "../assets/img/star-icon.svg";

class _BoardList extends React.Component {
 
  async componentDidMount() {
    await this.props.loadBoards()
  }


  get favoriteBoards() {
    const { boards } = this.props
    return boards.filter(board => board.isFavorite)
  };  

  onToggleFavorite = (ev, boardId) => {
    ev.preventDefault()
    const { boards,onSaveBoard } = this.props
    const board = boards.find(board => board._id === boardId)
    board.isFavorite = !board.isFavorite
    onSaveBoard(board);
  };

  render() {
    const { boards, loggedUser } = this.props;
    if (!boards) return <div>Loading</div>;
    return (
      <section>
        <AppHeader />
        <section className="board-list-container flex align-flex-start justify-center">
          <div className="boards-wrapper flex column">
            <div className="boards-preview flex column">
              <div className="preview-title flex align-center">
                <StarIcon className=" far fa-star"/>
                <h3 className="flex"> Starred boards</h3>
              </div>
              <BoardsList onToggleFavorite={this.onToggleFavorite} boards={this.favoriteBoards} />
            </div>

            <div className={"boards-preview"}>
              <div className={"preview-title flex align-center"}>
                 <BoardIcon /> 
                <h3 className="flex">
                  {/* {loggedUser.username}'s Workspaces */}
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
    boards: state.boardModule.boards,
    loggedUser: state.userModule.user,
  };
}
const mapDispatchToProps = {
  onSaveBoard,
  loadBoards,
};

export const BoardList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardList);
