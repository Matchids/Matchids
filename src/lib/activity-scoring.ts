export interface ScoredQuestion {
  id: string;
  correctOptionId: string;
}

export function scoreActivity(questions: ScoredQuestion[], answers: Record<string, string>) {
  const correct = questions.reduce(
    (score, question) => score + Number(answers[question.id] === question.correctOptionId),
    0
  );

  return { correct, total: questions.length };
}