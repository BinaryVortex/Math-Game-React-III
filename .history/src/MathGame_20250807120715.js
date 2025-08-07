import React, { useState } from "react";
import styles from "./MathGame.module.sass";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
  const num1 = getRandomInt(1, 10);
  const num2 = getRandomInt(1, 10);
  const ops = ["+", "-", "*"];
  const operator = ops[getRandomInt(0, ops.length - 1)];
  let correctAnswer;
  switch (operator) {
    case "+": correctAnswer = num1 + num2; break;
    case "-": correctAnswer = num1 - num2; break;
    case "*": correctAnswer = num1 * num2; break;
    default: correctAnswer = num1 + num2;
  }
  return {
    questionText: `${num1} ${operator} ${num2} = ?`,
    correctAnswer,
  };
}

export default function MathGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [q, setQ] = useState(generateQuestion());
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");
  const [resultColor, setResultColor] = useState("");

  const startGame = () => {
    setGameStarted(true);
    setQ(generateQuestion());
    setResult("");
    setResultColor("");
    setAnswer("");
  };

  const newQuestion = () => {
    setQ(generateQuestion());
    setResult("");
    setResultColor("");
    setAnswer("");
  };

  const checkAnswer = (e) => {
    e.preventDefault();
    if (Number(answer) === q.correctAnswer) {
      setResult("Correct! 🎉");
      setResultColor("#28a745");
    } else {
      setResult("Incorrect. 😞");
      setResultColor("#dc3545");
    }
  };

  return (
    <div className={styles.bodyBg}>
      {!gameStarted ? (
        <div className={styles.gameContainer}>
          <button className={styles.button} onClick={startGame}>
            Start Game
          </button>
        </div>
      ) : (
        <div className={`${styles.gameContainer} ${styles.show}`}>
          <div className={styles.gameHeader}>
            <h1>Math Game</h1>
            <p>Solve the equation by filling in the missing value</p>
          </div>
          <div className={styles.questionBox}>
            <div>{q.questionText}</div>
          </div>
          <form className={styles.controls} onSubmit={checkAnswer}>
            <input
              type="number"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="Enter your answer"
              className={styles.inputBox}
              required
            />
            <button type="submit" className={styles.button}>Submit</button>
          </form>
          <p className={styles.result} style={{ color: resultColor }}>{result}</p>
          <button className={`${styles.button} ${styles.startBtn}`} onClick={newQuestion}>
            New Question
          </button>
        </div>
      )}
    </div>
  );
}