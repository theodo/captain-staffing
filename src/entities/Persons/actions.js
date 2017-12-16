// @flow

/* Action types */
export const actionTypes = {
  REQUEST: {
    FETCH: {
      ERROR: 'PERSONS.REQUEST.FECTH.ERROR',
      START: 'PERSONS.REQUEST.FECTH.START',
      SUCCESS: 'PERSONS.REQUEST.FECTH.SUCCESS',
    },
  },
};

/* Action creators */
export const fetchAllPersonsRequest = () => ({
  type: actionTypes.REQUEST.FETCH.START,
});
