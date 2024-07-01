import Description from '../Description/Description.jsx'
import { useState, useEffect } from "react";
import Feedback from '../Feedback/Feedback.jsx'
import Options from '../Options/Options.jsx'

const App = () => {
  const initialFeedback = JSON.parse(localStorage.getItem("feedback")) || {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  const [values, setValues] = useState(initialFeedback);

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(values));
  }, [values]);

  const updateFeedback = (feedbackType) => {
    if (feedbackType === "reset") {
      const resetValues = {
        good: 0,
        neutral: 0,
        bad: 0,
      };
      setValues(resetValues);
      localStorage.setItem("feedback", JSON.stringify(resetValues));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [feedbackType]: prevValues[feedbackType] + 1,
      }));
    }
  };

  const totalFeedback = values.good + values.neutral + values.bad;
  const positiveFeedback =
    totalFeedback > 0 ? Math.round((values.good / totalFeedback) * 100) : 0;

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} />
      <Feedback
        states={values}
        totalFeedback={totalFeedback}
        positiveFeedback={positiveFeedback}
      />
    </>
  );
};

export default App;