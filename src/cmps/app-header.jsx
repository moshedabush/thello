import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import {ReactComponent as BoardIcon} from '../assets/img/board-icon.svg';
import {ReactComponent as HomeIcon} from '../assets/img/home-icon.svg';
import { userService } from "../services/user.service";
// import routes from '../routes'


import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/user.actions.js'
// import { LoginSignup } from './login-signup.jsx'

class _AppHeader extends React.Component {
    state={
        user: '',
    }
    componentDidMount(){
        this.setState({user: userService.getLoggedinUser()})
    }
    onLogin = (credentials) => {
        this.props.onLogin(credentials)
        
    }
    onSignup = (credentials) => {
        this.props.onSignup(credentials)
    }
    onLogout = () => {
        this.props.onLogout()
    }

    render() {
        const { user } = this.state
        if (!user) return <div></div>
        return (
            <header className="app-header flex ">
        
                <div className="flex">
                <NavLink className="btn-header home-icon"  to="/boardlist">
                <HomeIcon/>
                </NavLink>
                <NavLink className="btn-header"  to="/boardlist" > 
                <BoardIcon/>
                <span>Boards</span>
                </NavLink>
                </div>
               
                    <div className="logo">  
                <NavLink to="/boardlist">
                <BoardIcon/>
                    <span>thello</span>
                    </NavLink>
                    </div>
                
                
                <nav>
                    { <span className="user-info flex">
                            <Link to={`user/${user._id}`} style={{marginRight:10+'px',marginTop:5+'px'}}>
                                {user.username }
                            </Link>
                        <button className="btn-header flex" to="/" onClick={this.onLogout} ><NavLink key='/' to='/'>Logout</NavLink></button>
                    </span>}
                
                </nav>
            </header>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.userModule.users,
        user: state.userModule.user,
        isLoading: state.systemModule.isLoading
    }
}
const mapDispatchToProps = {
    onLogin,
    onSignup,
    onLogout,
    loadUsers,
    removeUser
}



export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)