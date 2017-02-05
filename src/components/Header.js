import React from 'react'

import trello from '../assets/trello.jpg'
import help from '../assets/help.jpg'

export default class Header extends React.Component {

  render() {
    return (
      <div>
        { Header.renderHelper() }
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

  static renderHelper() {
    return (
      <div>
        <a
          className="clickable helper"
          href="#helper-popup"
        >
          <img
            className="helper__img"
            alt="help"
            src={help}
          />
        </a>
        <div
          id="helper-popup"
          className="overlay"
        >
          <div className="popup">
            <h2>
              Aide
            </h2>
            <a
              className="close"
              href="#"
            >
              &times;
            </a>
            <div className="popup__content">
              <ul>
                <li>
                  Cliquer sur le staffing pour avoir les détails
                </li>
                <li>
                  Cliquer sur le staffing d&apos;un projet pour l&apos;éditer
                </li>
                <li>
                  Appuyer sur `Backspace` pour vider une case
                </li>
                <li>
                  Appuyer sur `Enter` pour sauvegarder
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
