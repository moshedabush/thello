import React from 'react';
import HomePageCover from '../assets/img/home-page-hero.png';
import { LoginSignup } from '../cmps/login-signup';
import { connect } from 'react-redux';

import { userService } from '../services/user.service';
import { onSignup } from '../store/user.actions';

class _HomePage extends React.Component {
  state = {
    credentials: {
      username: '',
      password: '',
      fullname: '',
    },
    isSignup: false,
  };
  componentDidMount = () => {
    console.log('loggedInUser', userService.getLoggedinUser());
  };
  clearState = () => {
    const clearTemplate = {
      credentials: {
        username: '',
        password: '',
        fullname: '',
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
    this.props.history.push('/boardlist');
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
      fullname: 'Guest Guest',
      username: 'Guest',
      password: 'Guest',
    });
    userService.login(guest);
    this.props.history.push('/boardlist');
console.log('guest',guest) 
 };
  toggleSignup = () => {
    this.setState({ isSignup: !this.state.isSignup });
    console.log('signed up');
  };

  render() {
    const sectionStyle = {
      textAlign: 'center',
      margin: '10px',
    };
    const imgStyle = {
      width: '400px',
    };
    const { username, password, fullname } = this.state.credentials;
    const { isSignup, users } = this.state;
    return (
      <main style={sectionStyle}>
        <h1>Thello</h1>
        <button
          className='guest-login-btn'
          onClick={() => {
            this.onGuestLogin();
          }}>
          Try As Guest!(logs in with Guest creds)
        </button>
        <h3>Home Page</h3>
        <img
          style={imgStyle}
          className='home-page-hero'
          src={HomePageCover}
          alt=''
        />
        <section>
        <button
            className='signup-btn'
            onClick={() => {
              this.toggleSignup();
            }}>
            Sign Up!(link to signup-cmp)
          </button>
          {isSignup && (
            <div className='signup-section'>
              {isSignup && (
                <form className='signup-form' onSubmit={this.onSignup}>
                  <input
                    type='text'
                    name='fullname'
                    value={fullname}
                    placeholder='Fullname'
                    onChange={this.handleChange}
                    required
                  />
                  <input
                    type='text'
                    name='username'
                    value={username}
                    placeholder='Username'
                    onChange={this.handleChange}
                    required
                  />
                  <input
                    type='password'
                    name='password'
                    value={password}
                    placeholder='Password'
                    onChange={this.handleChange}
                    required
                  />
                  <button>Sign Up!</button>
                </form>
              )}
            </div>
          )}
         
        </section>
      </main>
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
