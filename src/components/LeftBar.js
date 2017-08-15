import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Staffing from './Staffing'

export default class LeftBar extends Component {
    render() {
        const style = {
            transform: `translate3D(0px, ${this.props.yoffset}px, 0px)`
        }

        return (
        <div className="leftbar" style={style}>
            {
                this.props.rows.map((row) => {
                    return (<User key={row.user.username} user={row.user} maxWeeklyTasksCount={row.maxWeeklyTasksCount} />)
                })
            }
        </div>
        )
    }
}

LeftBar.propTypes = {
    users: PropTypes.array.isRequired,
    yoffset: PropTypes.number.isRequired
}

class User extends Component {
    render() {
        const style = {
            height: `${this.props.maxWeeklyTasksCount * Staffing.TASK_HEIGHT + Staffing.PLANNING_ROW_PADDING}px`
        }

        return (
        <div className="planning-row" style={style}>{this.props.user.username}</div>
        );
    }
}

User.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired
    }).isRequired
}