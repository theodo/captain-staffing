import React from 'react'

import trello from '../assets/trello.jpg'

export default class Header extends React.Component {

  render() {
    return (
      <div>
        <a
          className="trelloLink"
          href="https://trello.com/b/4p4llsMz/captain-staffing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="trelloLink__img"
            alt="trello"
            src={trello}
          />
        </a>
        <h1 className="brand">
          Captain Staffing
        </h1>
      </div>
    )
  }
}
