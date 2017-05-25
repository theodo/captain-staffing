import React from 'react'

export default class Header extends React.Component {

  render() {
    return (
      <nav className="nav">
        <div className="container">
          <div className="nav-left">
            <a className="nav-item brand">
              Captain Staffing
            </a>
          </div>
        </div>
      </nav>
    )
  }
}
