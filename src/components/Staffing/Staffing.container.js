// @flow
import { connect } from 'react-redux';
import Staffing from './Staffing.component';
import { createWeeks } from '../../services/Staffing';

// @todo move this to a saga as it will be an API call
const timeline = [
  {
    id: 1,
    userId: 1,
    project: null,
    client: null,
    leave: true,
    startDate: '2017-10-31',
    endDate: '2018-12-15',
  },
  {
    id: 2,
    userId: 1,
    project: "Ask'IT",
    client: 'BNP ITG - Boost IT',
    leave: false,
    startDate: '2017-12-16',
    endDate: '2018-09-01',
  },
  {
    id: 9,
    userId: 2,
    project: 'Echoline',
    client: 'Echoline',
    leave: false,
    startDate: '2017-12-15',
    endDate: '2018-08-11',
  },
  {
    id: 3,
    userId: 2,
    project: 'Allomatch',
    client: 'Allomatch',
    leave: false,
    startDate: '2017-09-18',
    endDate: '2018-10-23',
  },
  {
    id: 4,
    userId: 2,
    project: 'WEFA',
    client: 'Safran',
    leave: false,
    startDate: '2017-12-25',
    endDate: '2018-10-16',
  },
  {
    id: 5,
    userId: 2,
    project: 'B2B',
    client: 'Fundshop',
    leave: false,
    startDate: '2017-11-09',
    endDate: '2018-10-30',
  },
  {
    id: 6,
    userId: 3,
    project: 'Projet Confidentiel',
    client: 'SG - ITIM',
    leave: false,
    startDate: '2017-08-07',
    endDate: '2018-10-30',
  },
  {
    id: 7,
    userId: 3,
    project: 'Projet Confidentiel #2',
    client: 'SG - ITIM',
    leave: false,
    startDate: '2017-08-07',
    endDate: '2018-10-30',
  },
  {
    id: 8,
    userId: 4,
    project: 'Fast IT - Filgood',
    client: 'Fast IT',
    leave: false,
    startDate: '2017-08-07',
    endDate: '2018-10-30',
  },
  {
    id: 10,
    userId: 5,
    project: 'Robo Mroning Star',
    client: 'BNP AM',
    leave: false,
    startDate: '2017-08-07',
    endDate: '2018-10-30',
  },
  {
    id: 11,
    userId: 5,
    project: 'Gouvernance',
    client: 'BNP AM',
    leave: false,
    startDate: '2017-08-07',
    endDate: '2018-10-30',
  },
];

const mapStateToProps = state => ({
  users: state.theodoers,
  timeline,
  weeks: createWeeks(),
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Staffing);
