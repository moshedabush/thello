import React from "react";
import { connect } from "react-redux";
import { userService } from "../services/user.service";
import { onSignup } from "../store/user.actions";
import { HomeHeader } from "../cmps/home-header";
import Hero from "../assets/img/hero.png";
class _HomePage extends React.Component {
  state = {
  };
  componentDidMount = () => {
    console.log("loggedInUser", userService.getLoggedinUser());
  };
  onGuestLogin = async () => {
    const guestUser = await userService.getById('u101')
    userService.login(guestUser)
    this.props.history.push("/boardlist");
    console.log("guestUser", guestUser);
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
                  className="clean-link a"
                  onClick={() => {
                    this.onGuestLogin();
                  }}
                >
                  Get started! Guest Mode
                </button>
              </div>
              <div className="hero-img">
                <img src={Hero} alt="" />
                <img src="assets/img/hero.png" alt="" />
              </div>
            </section>
          </div>
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
