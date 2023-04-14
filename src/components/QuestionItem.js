import React from "react";

function QuestionItem({ question, handleDelete, handleUpdate}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function deleteQuestion() {
    handleDelete(id)
  }

  function changeCorrectAnswer(e) {
    const updateAnswer = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({correctIndex: e.target.value})
    }

    fetch("http://localhost:4000/questions/"+`${id}`, updateAnswer)
    .then(r => r.json())
    .then(data => handleUpdate(data))
    //even though without handleUpdate (which is to update the state), what users see are the same; the state is however different
    //always make sure state is in sync with the backend 
  }


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={changeCorrectAnswer} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={deleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
