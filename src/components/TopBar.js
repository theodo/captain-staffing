import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class TopBar extends Component {
    render() {
        const style = {
            transform: `translate3D(${this.props.xoffset}px, 0px, 0px)`
        }

        return (
        <div className="topbar" style={style}>
            {
                this.props.weeks.map((week) =>
                    <Week key={week.format('X')} week={week} className={this._getWeekClassName(moment(week))} />
                , this)
            }
        </div>
        )
    }

    _getWeekClassName(week) {
        let className = ""  
                                      
        if (week.isSame(this.props.currentWeek)) {
            className = 'current-week'
        } else if (week.isSame(this.props.crisisWeek)) {
            className = 'crisis-week'
        } else if(week.isSame(this.props.alertWeek)) {
            className = 'alert-week'
        }

        return className
    }
}

TopBar.propTypes = {
    xoffset: PropTypes.number.isRequired,
    currentWeek: PropTypes.instanceOf(moment),
    crisisWeek: PropTypes.instanceOf(moment),
    alertWeek: PropTypes.instanceOf(moment),
    weeks: PropTypes.array.isRequired
}

class Week extends Component {
    render() {
        const classNames = `topbar-cell ${this.props.className}`
        let days = []

        for(let weekday=0; weekday < 7; weekday++) {
            const day = this.props.week.clone().add(weekday, 'days')
            days.push(<div key={weekday} className="day">{day.format('dd D')}</div>)
        }

        return <div className={classNames}>
            <div className="weeks">{this.props.week.format('MMM W')}</div>
            <div className="days">
                { days }
            </div>
        </div>
    }
}

Week.propTypes = {
    week: PropTypes.instanceOf(moment),
    currentWeek: PropTypes.instanceOf(moment)
}