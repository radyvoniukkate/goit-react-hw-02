import Description from '../Description/Description.jsx'
import { useState, useEffect } from "react";
import Feedback from '../Feedback/Feedback.jsx'
import Options from '../Options/Options.jsx'
import Notification from "../Notification/Notification.jsx";

const App = () => {
  const [values, setValues] = useState(() => {
    const savedValues = localStorage.getItem("feedbackValues");
    return savedValues
      ? JSON.parse(savedValues)
      : { good: 0, neutral: 0, bad: 0 };
  });

  useEffect(() => {
    localStorage.setItem("feedbackValues", JSON.stringify(values));
  }, [values]);

  const updateFeedback = (feedbackType) => {
    if (feedbackType === "reset") {
      setValues({ good: 0, neutral: 0, bad: 0 });
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
      {totalFeedback > 0 ? (
        <Feedback
          states={values}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification message="No feedback given" />
      )}
    </>
  );
};

export default App;