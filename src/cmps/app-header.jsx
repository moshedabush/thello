import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import HomeIcon from '../assets/img/home-icon.svg';
import BoardIcon from '../assets/img/board-icon.svg';

import routes from '../routes'


import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'

class _AppHeader extends React.Component {
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
        const { user } = this.props
        return (
            <header className="app-header flex ">
                <a className="btn-header" href="/">
                <img src={HomeIcon} alt="" />
                </a>
                <button className="btn-header" href="/board"> 
                <img src={BoardIcon} alt="" />
                <span>Boards</span>
                </button>
                    <div className="logo">  
                <a href="/">
                <img src={BoardIcon} alt="" />
                    <span>thello</span></a>
                    </div>
                
                
                <nav>
                    {routes.map(route => <NavLink exact key={route.path} to={route.path}>{route.label}</NavLink>)}
                    {user && <span className="user-info">
                            <Link to={`user/${user._id}`}>
                                {user.fullname}
                                <span className="score">{user.score?.toLocaleString()}</span>
                            </Link>
                        <button onClick={this.onLogout}>Logout</button>
                    </span>}
                    {!user && <section className="user-info">
                        <LoginSignup onLogin={this.onLogin} onSignup={this.onSignup} />
                    </section>}
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