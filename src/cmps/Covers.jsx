import React from 'react';
import { connect } from 'react-redux'
import { onSaveBoard } from '../store/board.actions'


class _Covers extends React.Component {

    state={
        coverColor:''
    }

     toggleTaskCover = (coverColor) => {
      const {board, onSaveBoard, currPopUp} = this.props
      const groupIdx = board.groups.findIndex(group => group.id ===currPopUp.group)
      const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === currPopUp.task)
      const task = board.groups[groupIdx].tasks[taskIdx]
      task.style={
          coverColor,
      }
      onSaveBoard(board)
    }

    setCover() {
        const {labelId,labels} = this.props
        const label = labels.find(label => label.id === labelId)
        this.setState({label:label})
    }


    setSelectedColor = (selectedColor) =>{
        const {color} = selectedColor
        const coverColor = color
         this.toggleTaskCover(coverColor)
    }

    render() {
        const {board : {colorPalette}} = this.props

        return (
            <>
                <div className="labcoversel-add-content">
                    <label className="covers-select-color">Colors</label>
                    <div className="covers-new-colors">
                        {colorPalette.map(color => {
                            return <div key={color.id} className="covers-edit-palette" style={{ backgroundColor: color.color }}
                                name="color"  value={color.color}
                                    onClick={()=> this.setSelectedColor(color)}/> })}
                    </div>
                </div>
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

export const Covers = connect(mapStateToProps, mapDispatchToProps)(_Covers)