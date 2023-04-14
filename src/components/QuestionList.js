import React, { useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({pageStatus}) {

  const [shownQuestions, setShownQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(questions => setShownQuestions(questions))
  }, [])

  function handleDelete(id) {
    fetch("http://localhost:4000/questions/"+`${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => setShownQuestions(shownQuestions.filter(question => question.id !== id)))
  }

  function handleUpdate(data) {
    const updatedQuestions = shownQuestions.map(question => {
      if (question.id === data.id) {
        return data
      } return question 
    })
    setShownQuestions(updatedQuestions)
  }
  const displayQuestions = shownQuestions.map( question => <QuestionItem key={question.id} question={question} handleDelete={handleDelete} handleUpdate={handleUpdate}/>)

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
        {displayQuestions}
      </ul>
    </section>
  );
}

export default QuestionList;
