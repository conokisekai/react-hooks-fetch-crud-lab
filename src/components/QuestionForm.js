import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const initialFormState = {
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddQuestion(formData);
    resetForm();
  }

  function resetForm() {
    setFormData({ ...initialFormState });
  }

  const answerInputs = Array.from({ length: 4 }, (_, index) => index + 1).map(
    (index) => (
      <label key={index}>
        {"Answer " + index + ":"}
        <input
          type="text"
          name={`answer${index}`}
          value={formData.answers[index - 1]}
          onChange={handleChange}
        />
      </label>
    )
  );

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
          />
        </label>
        {answerInputs}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            {formData.answers.map((answer, index) => (
              <option key={index} value={index}>
                {answer}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;

