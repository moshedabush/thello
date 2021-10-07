import { connect } from 'react-redux'
import {Labels} from '../cmps/Labels'
import {Covers} from '../cmps/Covers'





// function _PopUpHandler({ currPopUp }) {
function _PopUpHandler(props) {
    const {currPopUp} = props
    const {from,groupId} = props
    const { name } = currPopUp
    if(from==='MainDialog'){
        switch (name) {
            case 'LABELS': return <Labels from={'MainDialog'} groupId={groupId} />;  
            case 'COVERS': return <Covers from={'MainDialog'} groupId={groupId} />;  
        }
    }

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