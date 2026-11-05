"use client";

import { useState } from "react";
import type { ActivityQuestion } from "@/data/reading-activity";
import { scoreActivity } from "@/lib/activity-scoring";

export function ReadingActivity({ passage, questions }: { passage: string; questions: ActivityQuestion[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = scoreActivity(questions, answers);
  const allAnswered = questions.every((question) => Boolean(answers[question.id]));

  function resetActivity() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="activity-layout">
      <article className="activity-passage">
        <p className="eyebrow">Read the story</p>
        <p>{passage}</p>
      </article>
      <form
        className="activity-quiz"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        {questions.map((question, index) => (
          <fieldset className="activity-question" key={question.id}>
            <legend>{index + 1}. {question.prompt}</legend>
            <div className="activity-options">
              {question.options.map((option) => {
                const selected = answers[question.id] === option.id;
                const correct = submitted && option.id === question.correctOptionId;
                const incorrect = submitted && selected && !correct;

                return (
                  <label className={`activity-option${correct ? " is-correct" : ""}${incorrect ? " is-incorrect" : ""}`} key={option.id}>
                    <input
                      type="radio"
                      name={question.id}
                      value={option.id}
                      checked={selected}
                      disabled={submitted}
                      onChange={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))}
                    />
                    <span>{option.label}</span>
                  </label>
                );
              })}
            </div>
            {submitted && <p className="activity-explanation">{question.explanation}</p>}
          </fieldset>
        ))}

        {submitted ? (
          <div className="activity-result" role="status" aria-live="polite">
            <p>You got {score.correct} of {score.total} questions right.</p>
            <button className="button button-outline" type="button" onClick={resetActivity}>Try again</button>
          </div>
        ) : (
          <button className="button button-ink" type="submit" disabled={!allAnswered}>
            Check answers
          </button>
        )}
        <p className="activity-privacy">Your answers stay in this page and are not saved to an account.</p>
      </form>
    </div>
  );
}