import React, { useEffect, useState } from "react";
import Start from "./Start";
import Question from "./Question";

export default function App() {
  const NUM_QUESTIONS = 5;
  const [start, setStart] = useState(false);
  const [currentGame, setCurrentGame] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionsLoaded, setCurrentQuestionsLoaded] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function checkAnswers() {
    let count = 0;
    for (let i = 0; i < questions.length; i++) {
      if (formData[`q${i}`] === questions[i].correct_answer) {
        count++;
      }
    }
    return count;
  }

  useEffect(() => {
    setLoading(true);
    fetch(`https://opentdb.com/api.php?amount=${NUM_QUESTIONS}&type=multiple`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.results);
        setCurrentQuestionsLoaded((prev) => prev + 1);
      });
  }, [currentGame]);

  useEffect(() => {
    setQuestions(
      questions.map((question) => {
        return {
          ...question,
          options: shuffle([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
        };
      })
    );
    setLoading(false);
  }, [currentQuestionsLoaded]);

  function reloadQuestions() {
    setGameFinished(false);
    setCurrentGame((prev) => prev + 1);
  }

  const questionElements = questions.map((question, i) => (
    <Question
      key={i}
      id={i}
      formData={formData}
      handleChange={handleChange}
      gameFinished={gameFinished}
      question={question}
    />
  ));

  const disabled = {
    pointerEvents: "none",
  };

  return !start ? (
    <Start startGame={() => setStart(true)} questions={questions} />
  ) : (
    <>
      {loading ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : (
        <>
          <div className="questions" style={gameFinished ? disabled : {}}>
            {questionElements}
          </div>
          {!gameFinished ? (
            <button
              className="game--button"
              onClick={() => setGameFinished(true)}
            >
              Check Answers
            </button>
          ) : (
            <div className="replay">
              <h3>
                You scored {checkAnswers()}/{questions.length} correct answers
              </h3>
              <button className="game--button" onClick={reloadQuestions}>
                Play again
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
