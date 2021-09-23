import React from 'react';
import { connect } from 'react-redux';

class _BoardList extends React.Component {
  state = {};
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>Board List</h1>
        {/* Boards */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
const mapDispatchToProps = {};

export const BoardList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardList);
