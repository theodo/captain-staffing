import moment from 'moment';

const Checker = {};

Checker.isValid = (day, standards, tasks) => {
  if (!moment.isMoment(day)) {
    moment(day);
  }

  const todayTask = tasks.filter(task => (
    moment(task.startDate).isSame(day)
  ));

  return todayTask.length <= standards.projects;
};

export default Checker;
