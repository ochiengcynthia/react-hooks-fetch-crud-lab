import React, { useState } from "react";

function QuestionForm({ addQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newQuestion = {
      prompt: formData.prompt,
      answers: formData.answers,
      correctIndex: parseInt(formData.correctIndex),
    };
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((data) => {
        addQuestion(data);
        setFormData({
          prompt: "",
          answers: ["", "", "", ""],
          correctIndex: 0,
        });
      })
      .catch((error) => console.log(error));
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Answer 1:
          <input
            type="text"
            name="answers[0]"
            value={formData.answers[0]}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Answer 2:
          <input
            type="text"
            name="answers[1]"
            value={formData.answers[1]}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Answer 3:
          <input
            type="text"
            name="answers[2]"
            value={formData.answers[2]}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Answer 4:
          <input
            type="text"
            name="answers[3]"
            value={formData.answers[3]}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
            required
          >
            <option value="0">Answer 1</option>
            <option value="1">Answer 2</option>
            <option value="2">Answer 3</option>
            <option value="3">Answer 4</option>
          </select>
        </label>
        <br />
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
