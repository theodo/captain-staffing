// @flow

import { connect } from 'react-redux';

import { NewTaskForm } from './NewTaskForm.component';
import { addTask } from '../../entities/Tasks/actions';


const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addTask: task => dispatch(addTask(task)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewTaskForm);
