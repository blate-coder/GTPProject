import type { Quiz } from "@shared/schema";

// Quiz database - separated from storage for easier management
export const quizzes: Quiz[] = [
  {
    id: 1,
    lessonId: 1,
    questions: [
      {
        text: "What does '赫く' (あかく) mean?",
        options: ["Crimson/bright red", "Blue", "Green", "Yellow"],
        answer: "Crimson/bright red"
      },
      {
        text: "What does '尊き' (とうとき) mean?",
        options: ["Noble/sacred", "Fast", "Slow", "Heavy"],
        answer: "Noble/sacred"
      },
      {
        text: "What is the correct reading for '護りし'?",
        options: ["まもりし", "かまりし", "たもりし", "はもりし"],
        answer: "まもりし"
      },
      {
        text: "What is the Japanese word for 'crimson'?",
        options: ["赫く", "尊き", "永久", "朱く"],
        answer: "赫く"
      },
      {
        text: "Complete the lyric: '命を_____ 護りし者よ'",
        options: ["燃やして", "壊して", "忘れて", "覚えて"],
        answer: "燃やして"
      }
    ]
  }
];

// Helper function to get a quiz by lesson ID
export function getQuizByLessonId(lessonId: number): Quiz | undefined {
  return quizzes.find(quiz => quiz.lessonId === lessonId);
}

// Helper function to add a new quiz
export function addQuiz(quiz: Quiz): void {
  // Check if a quiz with this ID already exists
  const existingIndex = quizzes.findIndex(q => q.id === quiz.id);
  if (existingIndex >= 0) {
    // Replace the existing quiz
    quizzes[existingIndex] = quiz;
  } else {
    // Add a new quiz
    quizzes.push(quiz);
  }
}