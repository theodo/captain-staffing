// @flow
import { connect } from 'react-redux';
import Staffing from './Staffing.component';
import { fetchAllPersonsRequest } from '../../entities/Persons/actions';
import { fetchAllTasksRequest } from '../../entities/Tasks/actions';
import { createWeeks } from '../../services/Staffing';

const mapStateToProps = state => ({
  persons: state.persons,
  timeline: state.tasks,
  weeks: createWeeks(),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAllPersons: dispatch(fetchAllPersonsRequest()),
  fetchAllTasks: dispatch(fetchAllTasksRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Staffing);
