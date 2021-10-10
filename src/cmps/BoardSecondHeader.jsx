import React from "react";
import { connect } from "react-redux";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {SidePopUp} from '../cmps/SidePopUp'
import { ReactComponent as StarIcon } from "../assets/img/star-icon.svg";

class _BoardSecondHeader extends React.Component {

    state = {
        isSidePopUpOpen:false
    }

    toggleSidePopUp = ()=> {
        console.log('im here');
        const {isSidePopUpOpen} = this.state
        this.setState({isSidePopUpOpen:!isSidePopUpOpen})  
    }
    
    render() {
        const {title} = this.props
        const {isSidePopUpOpen} = this.state
        return (
            <section className="board-second-wrapper flex justify-space-between">
                <div>

                        <span className="board-second-title">{title}</span>
                        <span className="board-second-title"><StarIcon/></span>
                </div>
                <div className="board-second-container">
                    <a className="board-second-btn-show-menu" onClick={(ev)=> {this.toggleSidePopUp(ev)}}>
                        <span className="board-second-icon"><MoreHorizIcon/></span>
                        <span className="board-second-btn-text">Show Menu</span>
                        
                    </a>
                    {isSidePopUpOpen && <SidePopUp/> } 
                </div>
            </section>
        )

    }

}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        boards: state.boardModule.boards,
    };
}

const mapDispatchToProps = {
    // onSaveBoard,
    // loadBoard,
};

export const BoardSecondHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardSecondHeader);
