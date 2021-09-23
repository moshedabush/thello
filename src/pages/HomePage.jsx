import React from 'react';
import HomePageCover from '../assets/img/home-page-hero.png';
import { userService } from '../services/user.service';

export class HomePage extends React.Component {
  state = {
      isSignup : false,
  };
  componentDidMount=()=>{
      console.log('loggedInUser',userService.getLoggedinUser());
  }

  onSignup = () => {
      this.setState({isSignup:!this.state.isSignup})
      console.log('signed up')
  };
  onGuestLogin = () => {
    userService.login({ username: 'Guest', password: 'Guest' });
    setTimeout(()=>{console.log('loggedInUser- after guest login',userService.getLoggedinUser())},2000)
    //TODO : redirect to guest board
  };

  render() {
    const sectionStyle = {
      textAlign: 'center',
      margin: '10px',
    };
    const imgStyle = {
      width: '400px',
    };
    const {isSignup} = this.state
    return (
      <main style={sectionStyle}>
        <h1>Thello</h1>
        <h3>Home Page</h3>
        <img
          style={imgStyle}
          className='home-page-hero'
          src={HomePageCover}
          alt=''
        />
        <section>
        {isSignup&& <div>move to login/signup cmp</div>}
       <button className='signup-btn' onClick={()=>{this.onSignup()}}>Sign Up!(link to signup-cmp)</button>
        <button
          className='guest-login-btn'
          onClick={() => {
              this.onGuestLogin();
            }}>
          Try As Guest!(logs in with Guest creds)
        </button>
              </section>
      </main>
    );
  }
}
