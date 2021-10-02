import React from "react";
import { LoginSignup } from "../cmps/login-signup";
import { connect } from "react-redux";
import BoardIcon from "../assets/img/board-icon.svg";

import { userService } from "../services/user.service";
import { onSignup } from "../store/user.actions";

class _Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
      fullname: "",
    },
    isSignup: false,
    users: [],
  };
  async componentDidMount() {
    const users = await userService.getUsers();
    this.setState({ users });
  }
  clearState = () => {
    const clearTemplate = {
      credentials: {
        username: "",
        password: "",
        fullname: "",
      },
      isSignup: false,
    };
    this.setState({ clearTemplate });
  };

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState({
      credentials: { ...this.state.credentials, [field]: value },
    });
  };

  onLogin = (ev = null) => {
    if (ev) ev.preventDefault();
    if (!this.state.credentials.username) return;
    this.props.onLogin(this.state.credentials);
    this.clearState();
  };
  onGuestLogin = async () => {
    const guest = await userService.signup({
      fullname: "Guest Guest",
      username: "Guest",
      password: "Guest",
      userBoardIds: "b101",
    });
    userService.login(guest);
    this.props.history.push("/boardlist");
    console.log("guest", guest);
  };
  toggleSignup = () => {
    this.setState({ isSignup: !this.state.isSignup });
    console.log("signed up");
  };

  render() {
    const sectionStyle = {
      textAlign: "center",
    };
    const { username, password, fullname } = this.state.credentials;
    const { isSignup, users } = this.state;
    return (
      <div className="login-page">
        <main style={sectionStyle}>
          <header className="home-header ">
            <nav className="flex space-between">
              <div className="logo">
                <img src={BoardIcon} alt="" />
                thello
              </div>
              <div className="nav-btns">
            <a className="signup-btn clean-link" href="/signup">
              Sign up
            </a>
          </div>
            </nav>
          </header>
          <form className="login-form" onSubmit={this.onLogin}>
                    <select
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                    >
                        <option value="">Select User</option>
                        {users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
                    </select>

                    <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={this.handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={this.handleChange}
                        required
                    />
                    <button>Login!</button>
                </form>




        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
const mapDispatchToProps = {
  onSignup,
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);
