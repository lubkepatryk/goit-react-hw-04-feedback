import React, { useState } from 'react';
import { Statistics } from '../Statistics';
import { FeedbackOptions } from '../FeedbackOptions';
import { Section } from '../Section';
import { Notification } from 'components/Notification';
import css from './Feedback.module.css';

const Feedback = () => {
  const [feedbackCounts, setFeedbackCounts] = useState({
    Good: 0,
    Neutral: 0,
    Bad: 0,
  });

  const { Good, Neutral, Bad } = feedbackCounts;

  const onLeaveFeedback = (type) => {
    setFeedbackCounts((prevState) => ({
      ...prevState,
      [type]: prevState[type] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { Good, Neutral, Bad } = feedbackCounts;
    return Good + Neutral + Bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { Good } = feedbackCounts;
    const totalFeedback = countTotalFeedback();
    return Math.ceil((Good / totalFeedback) * 100);
  };

  return (
    <div className={css.all}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['Good', 'Neutral', 'Bad']}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>

      <Section title="Statistics">
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={Good}
            neutral={Neutral}
            bad={Bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default Feedback;
