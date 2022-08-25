import React from "react";

export default function Start({ startGame, questions }) {
  return (
    <div className="start">
      <h1 className="start--title">Quizzical</h1>
      <p className="start--description">The Quiz Game!</p>
      <button
        className="start--button"
        disabled={!questions.length}
        onClick={startGame}
      >
        {questions.length ? "Start quiz" : "Loading..."}
      </button>
    </div>
  );
}
