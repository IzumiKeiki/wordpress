import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./frontend.scss";

const quizs = document.querySelectorAll(".quiz-frontend");

quizs.forEach(function (div) {
  const data = JSON.parse(div.querySelector("pre").innerHTML);
  ReactDOM.render(<Quiz {...data} />, div);
});

function Quiz(props) {
  const [isCorrect, setIsCorrect] = useState(undefined);

  function handleAnswer(idx) {
    if (idx == props.correctAnswer) {
      alert("That is correct!🎉");
      setIsCorrect(true);
    } else {
      alert("Sorry, try again.😒");
      setIsCorrect(false);
    }
  }

  return (
    <div>
      <p className={isCorrect == true ? "true" : ""}>{props.question} </p>
      <ul>
        {props.answers.map((ans, idx) => (
          <li
            onClick={isCorrect === true ? undefined : () => handleAnswer(idx)}
          >
            {ans}
          </li>
        ))}
      </ul>
    </div>
  );
}
