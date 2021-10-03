import { connect } from 'react-redux'
import {Labels} from '../cmps/Labels'
import {LabelEdit} from '../cmps/LabelEdit'
import {Test} from '../cmps/TEST'



function _PopUpHandler({ currPopUp }) {

    const { name } = currPopUp
    switch (name) {
        
        case 'LABELS': return <Labels />;  
  
    }
}

function mapStateToProps(state) {
    return {
    
        currPopUp: state.boardModule.currPopUp
    }
}

export const PopUpHandler = connect(mapStateToProps, null)(_PopUpHandler)