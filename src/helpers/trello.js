export function checkTrelloAuth(callback) {
  const token = window.localStorage.trello_token
  window.Trello.setToken(token)
  callback(token !== null && token !== undefined)
}
