import React from 'react';
import { connect } from 'react-redux'
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import {onSaveBoard,openQuickPopUp } from '../store/board.actions'


class _QuickPopUp extends React.Component {

    state = {
        isPopUpOpen: true,
        // top:0
    }

    // componentDidMount() {
    //     this.checkViewport()
    // }

    toggleQuickPopUp = (ev) => {
        ev.preventDefault();
        const { isPopUpOpen } = this.state;
        this.setState({ isPopUpOpen: !isPopUpOpen });
    };

    //  checkViewport = () => {
    //      let {top} = this.props.currPopUp 
    //      const vpHeight = window.innerHeight
    //     //  const vpWidth = window.innerWidth
    //      console.log('vpHeight',vpHeight);
    //      if (top < vpHeight) top = vpHeight -650
         
    //      console.log('top',top);
    //      this.setState({top:top})

    //  }
        
    


    render() {
        
        const { isPopUpOpen} = this.state
        const {children,currPopUp} = this.props
        return (
            <div >
                {isPopUpOpen ?

                    <Modal
                        style={{ top: currPopUp.top, left: currPopUp.left}} 
                        onClose={this.handleClose}
                        open={isPopUpOpen}
                        hideBackdrop= 'true'
                        disableAutoFocus
                    >
                        <div className="quick-popup-wrapper quick-popup-wrapper-dialog "> 
                            <div>
                                <div className="quick-popup-header">
                                    <span className="quick-popup-header-title">{currPopUp.title}</span>  
                                    <a href="#" className="quick-popup-close-btn" onClick={this.toggleQuickPopUp}><CloseIcon fontSize="small"/></a>
                                   
                                </div>
                                <div className="quick-popup-children-content">
                                    {children}
                                </div>
                            </div>
                        </div>
                     </Modal>
                    :
                    ''
                }

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        currPopUp: state.boardModule.currPopUp,
    }
}


const mapDispatchToProps = {
    onSaveBoard,
    openQuickPopUp,
}

export const QuickPopUp = connect(mapStateToProps, mapDispatchToProps)(_QuickPopUp)