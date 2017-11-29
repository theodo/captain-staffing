import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class Task extends Component {
    _getTaskLabel(task) {
        let label = `(${moment(task.endDate).diff(moment(task.startDate), 'weeks')} weeks)`

        if (!task.hasOwnProperty('leave') || !task.leave) {
            label = `${task.project} ${task.client} ${label}`
        } else {
            label = `Leave ${label}`
        }

        return label
    }

    render() {
        const style = {
            width: `${this.props.width}px`,
            left: this.props.xoffset,
            top: this.props.yoffset
        };

        const classNames = ['task']
        if (this.props.task.hasOwnProperty('leave') && this.props.task.leave) {
            classNames.push('leave')
        }

        return (
            <div className={classNames.join(' ')} style={style}>{this._getTaskLabel(this.props.task)}</div>
        );
    }
}

Task.propTypes = {
    task: PropTypes.shape({
        leave: PropTypes.boolean,
        project: PropTypes.string,
        client: PropTypes.string,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired
    }).isRequired,
    xoffset: PropTypes.number.isRequired,
    yoffset: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
}