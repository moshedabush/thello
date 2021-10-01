import React from "react";
import Hero from "../assets/img/hero.png";
import { LoginSignup } from "../cmps/login-signup";
import { connect } from "react-redux";

import { userService } from "../services/user.service";
import { onSignup } from "../store/user.actions";
import { HomeHeader } from "../cmps/home-header";


class _Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
      fullname: "",
    },
    isSignup: false,
  };
  componentDidMount = () => {
    console.log("loggedInUser", userService.getLoggedinUser());
  };
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

  onSignup = (ev = null) => {
    if (ev) ev.preventDefault();
    if (
      !this.state.credentials.username ||
      !this.state.credentials.password ||
      !this.state.credentials.fullname
    )
      return;
    this.props.onSignup(this.state.credentials);
    this.clearState();
    this.props.history.push("/boardlist");
  };
  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState({
      credentials: { ...this.state.credentials, [field]: value },
    });
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
      <div className="home">
        <main style={sectionStyle} className="home-container">
          <HomeHeader />
          
          
          
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
