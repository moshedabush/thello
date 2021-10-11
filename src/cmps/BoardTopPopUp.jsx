import React from 'react';
import { connect } from 'react-redux'
import { onSaveBoard,onSaveBoards,loadBoards,loadBoard } from '../store/board.actions';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { ChangeBackground } from './ChangeBackground';
import { BoardsList } from './boards-list';

class _TopPopUp extends React.Component {

    state = {
        isMenuOpen: true,
        anchor: 'top',
        open: true,
    }

    toggleSidePopUp = (ev) => {
        const { open } = this.state
        if (ev.type === 'keydown' &&
            (ev.key === 'Tab' || ev.key === 'Shift')) {
            return;
        }

        this.setState({ open: !open })
    }
    onToggleFavorite = (ev, boardId) => {
        ev.preventDefault()
        const { boards,onSaveBoards } = this.props
        const board = boards.find(board => board._id === boardId)
        board.isFavorite = !board.isFavorite
        onSaveBoards(boards);
      };
      onToggleBoard = (ev,boardId) =>{
           ev.preventDefault();
          this.props.loadBoard(boardId);
      }

    render() {
        const { board } = this.props
        const { boards } = this.props
        const { isMenuOpen, anchor, open } = this.state

        return (
            <section  className="board-filter-pop-over">
                <Drawer className="side-popup-container"
                    anchor={anchor}
                    open={open}
                    hideBackdrop
                >
                    <div className="side-popup-wrapper">
                        <div>
                            <div className="side-popup-header">
                                <a href="#" className="side-popup-close-btn" onClick={(ev)=>{this.toggleSidePopUp(ev)}}><CloseIcon /></a>
                            </div>
                        {isMenuOpen ? 
                        <div>
                            <BoardsList onToggleFavorite={this.onToggleFavorite} onToggleBoard={this.onToggleBoard} boards={boards} />
                            </div> :
                            
                            <ChangeBackground board={board}/>
                            }
                        </div>
                        
                    </div>
                </Drawer>
            </section>
        )
    }
}



function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        boards: state.boardModule.boards,
    }
}


const mapDispatchToProps = {
    onSaveBoard,
    onSaveBoards,
    loadBoards,
    loadBoard,
}

export const TopPopUp = connect(mapStateToProps, mapDispatchToProps)(_TopPopUp)