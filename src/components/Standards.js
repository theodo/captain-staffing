import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Standards extends Component {
    render() {
        const standards = this.props.weeks.map((week) => {
            const classNames = ['planning-cell', 'weekly-standard']

            if (this.props.weeklyTasksCount.hasOwnProperty(week.format('w')) && this.props.weeklyTasksCount[week.format('w')] > this.props.user.standards.projects) {
                classNames.push('error')
            }

            return (
                <div key={week.format('w')} className={classNames.join(' ')}></div>
            )
        })

        return (
            <div className="standards">{standards}</div>
        )
    }
}

Standards.propTypes = {
    user: PropTypes.shape({
        standards: PropTypes.shape({
            projects: PropTypes.number.isRequired
        }).isRequired
    }).isRequired,
    tasks: PropTypes.array.isRequired,
    weeks: PropTypes.array.isRequired,
    weeklyTasksCount: PropTypes.object.isRequired
}