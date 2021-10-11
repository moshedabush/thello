import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as BoardIcon } from "../assets/img/board-icon.svg";
import { ReactComponent as ArrowDown } from "../assets/img/arrow-down.svg";
import { loadBoards } from '../store/board.actions';
import { onLogout } from "../store/user.actions.js";
import { openQuickPopUp } from '../store/board.actions';
import {TopPopUp} from '../cmps/BoardTopPopUp';

class _BoardHeader extends React.Component {
  state = {
    isTopPopUpOpen:false
}
async componentDidMount() {
  try {
  const userId = await this.props.user._id;
  await this.props.loadBoards(userId);
   } catch (err) {
  console.log('err');
}
}  

toggleTopPopUp = ()=> {;
    const {isTopPopUpOpen} = this.state
    this.setState({isTopPopUpOpen:!isTopPopUpOpen})  
};

    onLogout = () => {
    this.props.onLogout();
  };
  render() {
    const user = this.props.user;
    const {boards} = this.props;
    const {isTopPopUpOpen} = this.state
    if (!user) return <div></div>;
    return (
      <header className="board-header flex ">
        <div className="left-container flex">
        <div className="logo flex align-center">
          <NavLink to="/boardlist">
            <BoardIcon />
            <span>Thello</span>
          </NavLink>
        </div>
        <div className="flex">
            <div className="btn-board-header">
            <a onClick={(ev)=> {this.toggleTopPopUp(ev)}}>Workspaces</a>
            <ArrowDown />
            </div>
            {isTopPopUpOpen && <TopPopUp boards={boards}/> } 
        </div>
        </div>

        <nav>
          {
            <span className="user-info flex">
              <Link
                to={`user/${user._id}`}
                style={{ marginRight: 10 + "px", marginTop: 5 + "px" }}
              >
                {user.username}
              </Link>
              <button
                className="btn-header flex"
                to="/"
                onClick={this.onLogout}
              >
                <NavLink key="/" to="/">
                  Logout
                </NavLink>
              </button>
            </span>
          }
        </nav>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.userModule.users,
    user: state.userModule.user,
    board: state.boardModule.board,
    boards: state.boardModule.boards,
  };
}
const mapDispatchToProps = {
  onLogout,
  openQuickPopUp,
  loadBoards,
};

export const BoardHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardHeader);
