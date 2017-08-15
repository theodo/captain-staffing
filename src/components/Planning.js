import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import moment from 'moment'
import Task from './Task'
import Staffing from './Staffing'

export default class Planning extends Component {
    componentDidMount() {
        this._initializeScroll()
        this._attachScrollEvent()
    }

    _initializeScroll() {
        ReactDOM.findDOMNode(this.refs.planning).scrollLeft = this.props.xoffset * -1
    }

    _attachScrollEvent() {
        ReactDOM.findDOMNode(this.refs.planning).addEventListener('scroll', this.props.handleScroll)
    }

    render() {
        const timelineStyles = {
            width: `${this.props.width}px`
        }

        return (
        <div ref="planning" className="scrollable-timeline">
            <div className="timeline" style={timelineStyles}>
            {
                this.props.rows.map((row) =>
                    <div key={row.user.username} className="planning-row" style={{height: `${row.maxWeeklyTasksCount * Staffing.TASK_HEIGHT + Staffing.PLANNING_ROW_PADDING}px`}}>
                        {
                            row.tasks.map((task) => {
                                return <Task 
                                    key={task.timelineTask.id} 
                                    task={task.timelineTask} 
                                    xoffset={task.xoffset} 
                                    yoffset={task.yoffset} 
                                    width={task.width} 
                                />
                            })
                        }
                        <Standards user={row.user} weeks={this.props.weeks} weeklyTasksCount={row.weeklyTasksCount} />
                    </div>
                , this)
            }
            <ColoredWeek xoffset={this.props.xoffset * -1} className="current-week" />
            <ColoredWeek xoffset={this._getWeekOffset(this.props.crisisWeek.format('w'))} className="crisis-week" />
            <ColoredWeek xoffset={this._getWeekOffset(this.props.alertWeek.format('w'))} className="alert-week" />
            </div>
        </div>
        )
    }

    _getWeekOffset(week) {
        return Staffing.WEEK_WIDTH * (week - this.props.weeks[0].format('w'))
    }
}

Planning.propTypes = {
    xoffset: PropTypes.number.isRequired,
    yoffset: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    currentWeek: PropTypes.instanceOf(moment),
    crisisWeek: PropTypes.instanceOf(moment),
    alertWeek: PropTypes.instanceOf(moment),
    weeks: PropTypes.array.isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape({
        user: PropTypes.object,
        tasks: PropTypes.array,
        maxWeeklyTasksCount: PropTypes.number,
        weeklyTasksCount: PropTypes.object
    })).isRequired,
    handleScroll: PropTypes.func.isRequired,
}

class ColoredWeek extends Component {
    state = {
        xoffset: 0
    }

    componentWillMount() {
        this.setState({xoffset: this.props.xoffset})
    }

    render() {
        const style = {
            left: this.state.xoffset
        };

        const classNames = `planning-column planning-cell ${this.props.className}`

        return (
            <div className={classNames} style={style}></div>
        )
    }
}

ColoredWeek.propTypes = {
    xoffset: PropTypes.number.isRequired
}

class Standards extends Component {
    render() {
        const standards = this.props.weeks.map((week) => {
            const classNames = ['planning-cell', 'standard']

            if (this.props.weeklyTasksCount.hasOwnProperty(week.format('w')) && this.props.weeklyTasksCount[week.format('w')] > this.props.user.standards.projects) {
                classNames.push('error')
            }

            return (<div key={week.format('w')} className={classNames.join(' ')}></div>)
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
    weeks: PropTypes.array.isRequired,
    weeklyTasksCount: PropTypes.object.isRequired
}