// @flow
import { connect } from 'react-redux';
import Staffing from './Staffing.component';
import { createWeeks } from '../../services/Staffing';


const mapStateToProps = state => ({
  users: state.theodoers,
  timeline: state.timeline,
  weeks: createWeeks(),
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Staffing);
