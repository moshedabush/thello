import React from 'react';
import { connect } from 'react-redux'
import { onSaveBoard } from '../store/board.actions'


class _Covers extends React.Component {

    state = {
        color: '',
    }
 
 
    toggleTaskLabels = (color) => {
      const {board, onSaveBoard, currPopUp} = this.props
      const groupIdx = board.groups.findIndex(group => group.id ===currPopUp.group)
      const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === currPopUp.task)
      //   const style = board.groups[groupIdx].tasks[taskIdx].style
      
      const style = {
          coverColor:color,
          bgColor:''
        }
        
        const styleIdx = board.groups[groupIdx].tasks[taskIdx].push(style)


      console.log('styleIdx',styleIdx);

    //   if (labelIdx === -1) board.groups[groupIdx].tasks[taskIdx].labelIds.push(label.id) 
    //   else board.groups[groupIdx].tasks[taskIdx].labelIds.splice(labelIdx,1) 
    //   onSaveBoard(board)
    }

    setSelectedColor = (selectedColor) =>{
        console.log('selectedColor',selectedColor);
        const {color} = selectedColor
        this.setState({color:color})
        this.toggleTaskLabels()
    }

    
    // removeLabel = (currLabel) => {
    //     const { board, onSaveBoard } = this.props
    //     const labelIdx = board.labels.findIndex(label => label.id === currLabel.id)
    //     board.labels.splice(labelIdx, 1)
    //     onSaveBoard(board)
    // }

    // saveLabel = (currLabel) => {
    //     const { board, onSaveBoard } = this.props
    //     if (currLabel.id) {
    //         const idx = board.labels.findIndex(label => label.id === currLabel.id)
    //         board.labels.splice(idx, 1, currLabel)
    //     }
    //     else {
    //         currLabel.id = utilService.makeId()
    //         board.labels.push(currLabel)
    //     }
    //     onSaveBoard(board)
    // }
   
    // toggleEditLabel = (label=null) => {
    //    this.setState({ isEditOpen: !this.state.isEditOpen, currEditLabel: label })
    // }


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