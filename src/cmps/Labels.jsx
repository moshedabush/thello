import React from 'react';
import { connect } from 'react-redux'
import { onSaveBoard } from '../store/board.actions'
import { LabelPreview } from './LabelPreview';
import {LabelEdit} from './LabelEdit'
import {utilService} from '../services/util.service'

class _Labels extends React.Component {

    state = {
        isEditOpen: false,
        txt:'',
        currEditLabel:null,
    }
 
 
    toggleTaskLabels = (label) => {
      const {board, onSaveBoard, currPopUp} = this.props
      const groupIdx = board.groups.findIndex(group => group.id ===currPopUp.group)
      const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === currPopUp.task)
      const labelIdx = board.groups[groupIdx].tasks[taskIdx].labelIds.findIndex(labelId => labelId === label.id)

      if (labelIdx === -1) board.groups[groupIdx].tasks[taskIdx].labelIds.push(label.id) 
      else board.groups[groupIdx].tasks[taskIdx].labelIds.splice(labelIdx,1) 
      onSaveBoard(board)
    }



    handleChange = ({ target }) => {
        this.setState({ txt: target.value })
    }

    removeLabel = (currLabel) => {
        const { board, onSaveBoard } = this.props
        const labelIdx = board.labels.findIndex(label => label.id === currLabel.id)
        board.labels.splice(labelIdx, 1)
        onSaveBoard(board)
    }

    saveLabel = (currLabel) => {
        const { board, onSaveBoard } = this.props
        if (currLabel.id) {
            const idx = board.labels.findIndex(label => label.id === currLabel.id)
            board.labels.splice(idx, 1, currLabel)
        }
        else {
            currLabel.id = utilService.makeId()
            board.labels.push(currLabel)
        }
        onSaveBoard(board)
    }
   
    toggleEditLabel = (label=null) => {
       this.setState({ isEditOpen: !this.state.isEditOpen, currEditLabel: label })
    }


    render() {

        const {isEditOpen,currEditLabel, txt} = this.state
        const {board : {labels,colorPalette}} = this.props

        return (
            <>
                {isEditOpen ? <LabelEdit saveLabel={this.saveLabel} currEditLabel={currEditLabel} colorPalette={colorPalette}
                removeLabel={this.removeLabel} toggleEditLabel={this.toggleEditLabel}  />
                    :
                    <div className="edit-labels-pop-over">  
                        <input className="label-search-input" type="text" value={txt}
                            onChange={this.handleChange} placeholder={"Search labels..."} />
                        <h4 className="edit-labels-title" >Labels</h4>
                        <ul className="edit-labels-pop-over-list">
                            {labels.map(label => <LabelPreview key={label.id} label={label} 
                                toggleLabel={this.toggleTaskLabels}
                                toggleEditLabel={this.toggleEditLabel}/>)}
                        </ul>
                        <button className="label-create-btn" onClick={(ev) => this.toggleEditLabel(ev)}>Create a new label</button>
                    </div>
                }
            </>
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
}

export const Labels = connect(mapStateToProps, mapDispatchToProps)(_Labels)