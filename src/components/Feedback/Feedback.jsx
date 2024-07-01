import PropTypes from 'prop-types';
import "./Feedback.module.css"

const Feedback = ({ states, totalFeedback, positiveFeedback }) => {
  if (totalFeedback === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {Object.entries(states).map(([key, value]) => (
          <li key={key}>{`${key}: ${value}`}</li>
        ))}
      </ul>
      <p>Total feedback: {totalFeedback}</p>
      <p>Positive feedback: {positiveFeedback}%</p>
    </div>
  );
};

Feedback.propTypes = {
  states: PropTypes.shape({
    good: PropTypes.number.isRequired,
    neutral: PropTypes.number.isRequired,
    bad: PropTypes.number.isRequired,
  }).isRequired,
  totalFeedback: PropTypes.number.isRequired,
  positiveFeedback: PropTypes.number.isRequired,
};


export default Feedback;
