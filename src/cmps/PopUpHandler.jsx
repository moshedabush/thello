import { connect } from 'react-redux'
import {Labels} from '../cmps/Labels'
import {Covers} from '../cmps/Covers'





function _PopUpHandler({ currPopUp }) {

    const { name } = currPopUp
    switch (name) {
        
        case 'LABELS': return <Labels />;  
        case 'COVERS': return <Covers />;  
  
    }
}

function mapStateToProps(state) {
    return {
    
        currPopUp: state.boardModule.currPopUp
    }
}

export const PopUpHandler = connect(mapStateToProps, null)(_PopUpHandler)