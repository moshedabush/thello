import React from 'react';
import { connect } from 'react-redux';
import { userService } from '../services/user.service';
import {loadUsers} from '../store/user.actions'
class _BoardList extends React.Component {
  state = {
    user: '',
  };


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
  return {
    user: state.userModule.user,
  };
}
const mapDispatchToProps = {
  loadUsers,
};

export const BoardList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardList);
