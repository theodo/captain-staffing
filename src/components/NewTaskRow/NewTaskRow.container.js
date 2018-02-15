// @flow

import { connect } from 'react-redux';

import NewTaskRow from './NewTaskRow.component';
import { addTask } from '../../entities/Tasks/actions';


const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addTask: task => dispatch(addTask(task)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewTaskRow);
