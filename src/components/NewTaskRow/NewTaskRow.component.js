import * as React from 'react';
import PropTypes from 'prop-types';


export default class NewTaskRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selecting: false,
      selectedDays: [],
    };
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
            onMouseDown={() => {
              this.setState({
                selecting: !this.state.selecting,
                selectedDays: [...this.state.selectedDays, day],
              });
            }}
            onMouseUp={() => {
              if (this.state.selecting) {
                this.setState({ selecting: false });
              }
              alert(this.state.selectedDays);
            }}
            onMouseOver={() => {
              if (this.state.selecting) {
                  if (this.state.selectedDays.indexOf(day) === -1) {
                    this.setState({ selectedDays: [...this.state.selectedDays, day] });
                  }
              }
            }}
            style={{
              height: 30,
              backgroundColor: this.state.selectedDays.indexOf(day) !== -1 ? 'green' : 'rgba(0,0,255,0.1)',
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
