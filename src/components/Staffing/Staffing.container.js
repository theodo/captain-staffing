import { connect } from 'react-redux';
import Staffing from './Staffing.component';

const mapStateToProps = state => ({
  users: state.theodoers,
  timeline: state.timeline,
  weeks: state.weeks,
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Staffing);
