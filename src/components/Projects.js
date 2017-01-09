import React from 'react'
import config from '../config'

import { tail } from 'lodash'

export default class Projects extends React.Component {

  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      projects: [],
    }
  }

  componentDidMount() {
    window.Trello.get('/lists/' + config.trelloListId + '/cards', (cards) =>
      this.setState({
        projects: tail(cards)
      })
    );
  }

  render() {
    return (
      <div className="projects-container">
        {
          this.state.projects.map((project) => {
            return (
              <div className="project" key={project.id}>
                <div className="project-name">{project.name}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
