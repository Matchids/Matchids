export interface ActivityQuestion {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
  explanation: string;
}

export const readingActivity = {
  title: "Nia's Window Garden",
  ageRange: "7-9",
  estimatedMinutes: 5,
  introduction: "Read the short story, then answer three questions about its details and sequence.",
  passage: "On Saturday, Nia filled a small pot with soil. She tucked three bean seeds beneath the surface and watered them. The pot sat beside a sunny window. Each morning, Nia checked the soil. On Thursday, two green shoots appeared. She drew them in her notebook and asked her grandmother what they might need next.",
  questions: [
    {
      id: "first-step",
      prompt: "What did Nia do first?",
      options: [
        { id: "a", label: "She filled a pot with soil." },
        { id: "b", label: "She drew two green shoots." },
        { id: "c", label: "She moved the pot away from the window." },
      ],
      correctOptionId: "a",
      explanation: "The story begins with Nia filling a pot with soil on Saturday.",
    },
    {
      id: "daily-check",
      prompt: "What did Nia do each morning?",
      options: [
        { id: "a", label: "She planted new seeds." },
        { id: "b", label: "She checked the soil." },
        { id: "c", label: "She picked the green shoots." },
      ],
      correctOptionId: "b",
      explanation: "Nia checked the soil each morning while she waited.",
    },
    {
      id: "next-step",
      prompt: "After the shoots appeared, what did Nia do?",
      options: [
        { id: "a", label: "She put the pot outside in the rain." },
        { id: "b", label: "She asked her grandmother what the plants might need." },
        { id: "c", label: "She planted the shoots in a new pot." },
      ],
      correctOptionId: "b",
      explanation: "Nia drew the shoots and asked her grandmother what they might need next.",
    },
  ] satisfies ActivityQuestion[],
};