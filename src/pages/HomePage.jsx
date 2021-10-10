import React from "react";
import Hero from "../assets/img/hero.png";
import Product from "../assets/img/home-product.png";
import { connect } from "react-redux";

import { userService } from "../services/user.service";
import { onSignup } from "../store/user.actions";
import { HomeHeader } from "../cmps/home-header";


class _HomePage extends React.Component {
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
      _ID: "u101",
      fullname: "Guest Guest",
      username: "Guest",
      password: "Guest",
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
    return (
      <div className="home">
        <main style={sectionStyle} className="home-container">
          <HomeHeader />
          <div className="hero-container">
            <section className="hero">
              <div className="hero-info">
                <h1>Thello helps teams move work forward.</h1>
                <p>
                  Collaborate, manage projects, and reach new productivity
                  peaks. From high rises to the home office, the way your team
                  works is unique—accomplish it all with Thello.
                </p>
                <button
                  className="clean-link"
                  onClick={() => {
                    this.onGuestLogin();
                  }}
                >
                  Get started! Guest Mode
                </button>
              </div>
              <div className="hero-img">
                <img src={Hero} alt="" />
              </div>
            </section>
          </div>
          <section className="product">
            <div className="product-info">
              <h2>It's more than work. It's a way of working together.</h2>
              <p>Start with a Bambello board, lists, and cards. Customize and 
                expand with more features as your teamwork grows. Manage projects, 
                organize tasks, and build team spirit—all in one place.</p>
                <button className="clean-link"
                onClick={() => {
                    this.onGuestLogin();
                  }}>
                    Start doing →
                    </button>
                    </div><div>
                    <img src={Product} alt="" />
                  </div>
                  </section>
          <section>
   
          </section>
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

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage);
