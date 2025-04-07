import type { Lesson } from "@shared/schema";

// Lesson database - separated from storage for easier management
export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Gurenge - Demon Slayer OP",
    description: "Learn Japanese with the opening theme of Demon Slayer",
    type: "song",
    mediaUrl: "https://example.com/gurenge.mp4",
    content: {
      lyrics: "赫く尊き 永久の盾よ\n命を燃やして 護りし者よ\n鬼を祓いて 済ませぬまま\n今日も陽は落ちて 朱く染まる",
      translation: "Oh crimson shield, noble and eternal\nThose who burned their lives to protect\nUnable to completely exorcise the demons\nToday again the sun sets, dyed in crimson",
      vocabulary: [
        {
          word: "赫く",
          reading: "あかく",
          meaning: "Crimson, bright red",
          example: "空が赫く染まる - The sky is dyed crimson"
        },
        {
          word: "尊き",
          reading: "とうとき",
          meaning: "Noble, precious, sacred",
          example: "尊き命 - Precious life"
        },
        {
          word: "護りし",
          reading: "まもりし",
          meaning: "To protect (classical form)",
          example: "国を護りし勇者 - The hero who protected the country"
        }
      ]
    },
    difficulty: "beginner"
  },
];

// Helper function to get all lessons
export function getAllLessons(): Lesson[] {
  return lessons;
}

// Helper function to get a lesson by ID
export function getLessonById(id: number): Lesson | undefined {
  return lessons.find(lesson => lesson.id === id);
}

// Helper function to add a new lesson
export function addLesson(lesson: Lesson): void {
  // Check if a lesson with this ID already exists
  const existingIndex = lessons.findIndex(l => l.id === lesson.id);
  if (existingIndex >= 0) {
    // Replace the existing lesson
    lessons[existingIndex] = lesson;
  } else {
    // Add a new lesson
    lessons.push(lesson);
  }
}