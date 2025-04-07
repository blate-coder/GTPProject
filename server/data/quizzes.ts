import type { Quiz } from "@shared/schema";

// Quiz database - separated from storage for easier management
export const quizzes: Quiz[] = [
  {
    id: 1,
    lessonId: 1,
    tags: ["vocabulary", "reading"],
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
  },{
    id: 2,
    lessonId: 2,
    tags: ["vocabulary", "reading"],
    questions: [
      {
        text: "What does '夢' (ゆめ) mean?",
        options: ["Dream", "Memory", "Song", "Lemon"],
        answer: "Dream"
      },
      {
        text: "What is the correct reading for '未だに'?",
        options: ["いまだに", "みだに", "まだに", "いまに"],
        answer: "いまだに"
      },
      {
        text: "Complete the lyric: '未だにあなたのことを_____'",
        options: ["夢にみる", "思い出す", "忘れない", "愛してる"],
        answer: "夢にみる"
      },
      {
        text: "What does '埃' (ほこり) mean?",
        options: ["Dust", "Memory", "Dream", "Light"],
        answer: "Dust"
      },
      {
        text: "Which phrase means 'to dust off'?",
        options: ["埃を払う", "埃を見る", "埃を集める", "埃を作る"],
        answer: "埃を払う"
      }
    ]
  },{
    id: 3,
    lessonId: 3,
    tags: ["vocabulary", "reading", "phrases"],
    questions: [
      {
        text: "What does '駆ける' (かける) mean?",
        options: ["To run", "To sing", "To sleep", "To eat"],
        answer: "To run"
      },
      {
        text: "What is the meaning of 'ひとりきり'?",
        options: ["All alone", "Together", "With friends", "In a group"],
        answer: "All alone"
      },
      {
        text: "Complete the lyric: '夜に駆けるのは決まって決まって_____'",
        options: ["ひとりきり", "わたしたち", "かれら", "みんな"],
        answer: "ひとりきり"
      },
      {
        text: "What does 'その頃' (そのころ) refer to?",
        options: ["At that time", "This place", "That person", "Those things"],
        answer: "At that time"
      },
      {
        text: "Which word means 'without fail' or 'always'?",
        options: ["決まって", "駆ける", "ひとりきり", "思う"],
        answer: "決まって"
      }
    ]
  },{
    id: 4,
    lessonId: 4,
    tags: ["vocabulary", "reading", "phrases"],
    questions: [
      {
        text: "What does '変わらず' (かわらず) mean?",
        options: ["Without changing", "Slowly", "Quickly", "Forever"],
        answer: "Without changing"
      },
      {
        text: "What is the correct meaning of '伝えたい'?",
        options: ["Want to tell", "Want to see", "Want to go", "Want to hear"],
        answer: "Want to tell"
      },
      {
        text: "Complete the lyric: '今も変わらずあなたを_____'",
        options: ["好きでいる", "待っている", "忘れている", "見ている"],
        answer: "好きでいる"
      },
      {
        text: "What does 'さみしく' describe in the song?",
        options: ["Walking alone", "Waiting", "Sleeping", "Meeting"],
        answer: "Walking alone"
      },
      {
        text: "Which phrase relates to weather in the song?",
        options: ["雨が降り出した", "風が吹いた", "雪が積もった", "日が沈んだ"],
        answer: "雨が降り出した"
      }
    ]
  },{
    id: 5,
    lessonId: 5,
    tags: ["vocabulary", "reading", "anime"],
    questions: [
      {
        text: "What does '名前' (なまえ) mean?",
        options: ["Name", "Memory", "Dream", "Future"],
        answer: "Name"
      },
      {
        text: "What is the correct reading for '呼ぶ'?",
        options: ["よぶ", "くる", "なまえ", "あう"],
        answer: "よぶ"
      },
      {
        text: "Complete the lyric: '誰かの名前を_____'",
        options: ["呼んでいた", "覚えていた", "忘れていた", "書いていた"],
        answer: "呼んでいた"
      },
      {
        text: "What does '記憶' (きおく) mean?",
        options: ["Memory", "Name", "Meeting", "Calling"],
        answer: "Memory"
      },
      {
        text: "Which phrase means 'wanted to meet' in Japanese?",
        options: ["会いたかった", "呼んでいた", "忘れていた", "見ていた"],
        answer: "会いたかった"
      }
    ]
  },{
    id: 6,
    lessonId: 6,
    tags: ["grammar", "advanced"],
    questions: [
      {
        text: "In the phrase '光るなら', what grammatical function does 'なら' serve?",
        options: ["Conditional ('if')", "Past tense marker", "Question marker", "Imperative (command)"],
        answer: "Conditional ('if')"
      },
      {
        text: "What is the difference between '〜なら' and '〜れば', both found in the song?",
        options: [
          "'〜なら' is more hypothetical, '〜れば' is more definite", 
          "They are completely different grammatical structures", 
          "One is formal and one is informal", 
          "There is no difference"
        ],
        answer: "'〜なら' is more hypothetical, '〜れば' is more definite"
      },
      {
        text: "In '駆けていくよ', what does the '〜ていく' pattern indicate?",
        options: [
          "Movement away or continuing action", 
          "Past experience", 
          "Obligation or necessity", 
          "Ability"
        ],
        answer: "Movement away or continuing action"
      },
      {
        text: "In the phrase '照らしてる', what is the full, non-contracted form?",
        options: [
          "照らしている", 
          "照らした", 
          "照らす", 
          "照らせる"
        ],
        answer: "照らしている"
      },
      {
        text: "What would be the appropriate negative form of '目を閉じれば'?",
        options: [
          "目を閉じなければ", 
          "目を閉じれない", 
          "目を閉じないなら", 
          "目を閉じないれば"
        ],
        answer: "目を閉じなければ"
      },
      {
        text: "Transform the sentence '君のもとへ駆けていくよ' into the past tense.",
        options: [
          "君のもとへ駆けていったよ", 
          "君のもとへ駆けたよ", 
          "君のもとへ駆けていたよ", 
          "君のもとへ駆けてきたよ"
        ],
        answer: "君のもとへ駆けていったよ"
      }
    ]
  },
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