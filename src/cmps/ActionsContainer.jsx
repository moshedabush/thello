import React from 'react';
import { Dates } from './Dates';

export class ActionsContainer extends React.Component {
  state = {
    type: '',
    savedDate: '',
  };
  componentDidMount() {
    this.setState({ type: this.props.type });
  }
  saveDate = (savedDate) => {
    this.setState({ savedDate });
    this.props.onClose()
    //TODO dispatch, save board with new date
  };
  render() {
    const {type} = this.state
    return (
      <div className={'menu-container'}>
        {type==='Members' && <div>abc</div>}
        {type === 'Dates' && (
          <Dates onClose={this.props.onClose} saveDate={this.saveDate}/>
        )}
      </div>
    );
  }
}
