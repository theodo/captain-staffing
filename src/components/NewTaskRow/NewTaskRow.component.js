import * as React from 'react';
import PropTypes from 'prop-types';


export default class NewTaskRow extends React.Component {
  constructor(props) {
    super(props);
    this.selecting = false;
  }

  render() {
    const numberOfDays = this.props.numberOfWeeks * 7;
    const days = [...new Array(numberOfDays).keys()];
    return (
      /* eslint-disable jsx-a11y/click-events-have-key-events */
      /* eslint-disable jsx-a11y/mouse-events-have-key-events */
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      <div>
        {days.map(day => (
          <div
            key={day}
            onMouseDown={(e) => {
              this.selecting = !this.selecting;
              e.target.style.backgroundColor = 'green';
            }}
            onMouseUp={() => {
              if (this.selecting) {
                this.selecting = false;
              }
            }}
            onMouseOver={(e) => {
              if (this.selecting) {
                  console.log('key is', day, 'person is', this.props.personId);
                  e.target.style.backgroundColor = 'green';
              }
            }}
            style={{
              height: 30,
              backgroundColor: 'rgba(0,0,255,0.1)',
              position: 'absolute',
              top: 5 + (35 * this.props.numberOfTasks),
              left: 34.9 * day,
              zIndex: 2,
              width: '34.9px',
            }}
          />
        ))}
      </div>
    );
  }
}

NewTaskRow.propTypes = {
  numberOfWeeks: PropTypes.number.isRequired,
  personId: PropTypes.number.isRequired,
  numberOfTasks: PropTypes.number.isRequired,
};
