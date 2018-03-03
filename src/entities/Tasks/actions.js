// @flow

/* Action types */
export const actionTypes = {
  REQUEST: {
    FETCH: {
      ERROR: 'TASKS.REQUEST.FETCH.ERROR',
      START: 'TASKS.REQUEST.FETCH.START',
      SUCCESS: 'TASKS.REQUEST.FETCH.SUCCESS',
    },
    ADD: {
      START: 'TASKS.REQUEST.ADD.START',
    },
  },
};

/* Action creators */
export const fetchAllTasksRequest = () => ({
  type: actionTypes.REQUEST.FETCH.START,
});

export const addTask = task => ({
  type: actionTypes.REQUEST.ADD.START,
  task,
});
