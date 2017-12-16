// @flow

/* Action types */
export const actionTypes = {
  REQUEST: {
    FETCH: {
      ERROR: 'TASKS.REQUEST.FECTH.ERROR',
      START: 'TASKS.REQUEST.FECTH.START',
      SUCCESS: 'TASKS.REQUEST.FECTH.SUCCESS',
    },
  },
};

/* Action creators */
export const fetchAllTasksRequest = () => ({
  type: actionTypes.REQUEST.FETCH.START,
});
