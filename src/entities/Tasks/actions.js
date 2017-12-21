// @flow

/* Action types */
export const actionTypes = {
  REQUEST: {
    FETCH: {
      ERROR: 'TASKS.REQUEST.FETCH.ERROR',
      START: 'TASKS.REQUEST.FETCH.START',
      SUCCESS: 'TASKS.REQUEST.FETCH.SUCCESS',
    },
  },
};

/* Action creators */
export const fetchAllTasksRequest = () => ({
  type: actionTypes.REQUEST.FETCH.START,
});
