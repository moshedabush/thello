import React from "react";
import { connect } from "react-redux";
import { userService } from "../services/user.service";
import { loadUsers } from "../store/user.actions";
// import boardData from '../data/boardsData';
import boardsData from "../data/boards.json";
import { Link } from "react-router-dom";
import { AppHeader } from "../cmps/app-header";
import BoardIcon from "../assets/img/board-icon.svg";

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
    console.log("this.state", this.state);
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
    console.log("boards in render", boards);
    return (
      <section>
        <AppHeader />
        <section className="board-list-container flex align-flex-start justify-center">
          <div className="boards-wrapper flex column">
            <div className="boards-preview flex column">
              <div className="preview-title flex align-center">
                <i class="far fa-star"></i>
                <h3> Starred boards</h3>
              </div>
              <div className="board-list"></div>
            </div>
            {/* <div className=" flex align-center">
              <div>
                <h3> 🕒 Recently viewed</h3>
              </div>
            </div> */}

            <div className={"boards-preview"}>
              <div className={"preview-title flex align-center"}>
                {/* <h3> Workspaces</h3> */}
                <h3>
                  <img src={BoardIcon} alt="" /> {loggedUser.username}'s
                  Workspaces
                </h3>
              </div>

              {boards.map((board, idx) => (
                <div className={"board-list"}>
                  <Link
                    className="clean-link"
                    to={`board/${board._id}`}
                    key={idx}
                  >
                    <div
                      className={"board-preview"}
                      style={{
                        backgroundColor: board.style.backgroundColor
                          ? board.style.backgroundColor
                          : "green",
                      }}
                    >
                      {/* {console.log("board.style", board.style)} */}
                      <h3 className={"board-preview-details"}>{board.title}</h3>
                    </div>
                  </Link>
                </div>
              ))}
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
