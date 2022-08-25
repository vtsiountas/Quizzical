import React, { useEffect } from "react";

export default function Question({
  question,
  id,
  handleChange,
  formData,
  gameFinished,
}) {
  const optionsElement = question.options.map((option, i) => {
    const isCorrect = question.correct_answer === option;
    const isChecked = formData[`q${id}`] === option;
    let styles = {};
    if (gameFinished && isCorrect) {
      styles = {
        backgroundColor: "#94D7A2",
      };
    }
    if (gameFinished && isChecked && !isCorrect) {
      styles = {
        backgroundColor: "#F8BCBC",
        opacity: 0.6,
      };
    }
    return (
      <div className="option" key={i}>
        <br />
        <input
          type="radio"
          id={`q${id}o${i}`}
          name={`q${id}`}
          value={option}
          checked={isChecked}
          onChange={handleChange}
        />
        <label
          style={styles}
          dangerouslySetInnerHTML={{ __html: option }}
          htmlFor={`q${id}o${i}`}
        ></label>
      </div>
    );
  });

  return (
    <div className="question">
      <h2
        dangerouslySetInnerHTML={{ __html: question.question }}
        className="question--title"
      ></h2>
      <div className="options">{optionsElement}</div>
      <hr />
    </div>
  );
}
