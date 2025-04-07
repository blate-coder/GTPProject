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
  {
    id: 2,
    title: "Lemon - Kenshi Yonezu",
    description: "Learn Japanese with this emotional hit song by Kenshi Yonezu",
    type: "song",
    mediaUrl: "https://example.com/lemon.mp4",
    content: {
      lyrics: "夢ならばどれほどよかったでしょう\n未だにあなたのことを夢にみる\n忘れた物を取りに帰るように\n古びた思い出の埃を払う",
      translation: "How wonderful would it be if this were just a dream\nI still see you in my dreams\nLike going back to retrieve something forgotten\nI dust off the old memories",
      vocabulary: [
        {
          word: "夢",
          reading: "ゆめ",
          meaning: "Dream",
          example: "夢を見る - To have a dream"
        },
        {
          word: "未だに",
          reading: "いまだに",
          meaning: "Still, even now",
          example: "未だに信じられない - I still can't believe it"
        },
        {
          word: "忘れた",
          reading: "わすれた",
          meaning: "Forgot (past tense of 忘れる)",
          example: "名前を忘れた - I forgot the name"
        },
        {
          word: "埃",
          reading: "ほこり",
          meaning: "Dust",
          example: "埃を払う - To dust off"
        }
      ]
    },
    difficulty: "intermediate"
  },{
    id: 3,
    title: "Yoru ni Kakeru - YOASOBI",
    description: "Learn Japanese with this popular song by YOASOBI",
    type: "song",
    mediaUrl: "https://example.com/yorunikakeru.mp4",
    content: {
      lyrics: "夜に駆けるのは\n決まって決まってひとりきり\nそんな風に思っていた\nその頃の僕らは",
      translation: "The one who runs through the night\nIs always, always all alone\nThat's what I thought\nBack when we were young",
      vocabulary: [
        {
          word: "駆ける",
          reading: "かける",
          meaning: "To run, to dash",
          example: "公園を駆ける - To run through the park"
        },
        {
          word: "決まって",
          reading: "きまって",
          meaning: "Always, without fail",
          example: "決まって遅刻する - To always be late"
        },
        {
          word: "ひとりきり",
          reading: "ひとりきり",
          meaning: "All alone, by oneself",
          example: "ひとりきりで旅行する - To travel all alone"
        },
        {
          word: "その頃",
          reading: "そのころ",
          meaning: "At that time, in those days",
          example: "その頃は若かった - I was young at that time"
        }
      ]
    },
    difficulty: "intermediate"
  },{
    id: 4,
    title: "Aitai - Suda Masaki",
    description: "Learn Japanese with this touching song by Suda Masaki",
    type: "song",
    mediaUrl: "https://example.com/aitai.mp4",
    content: {
      lyrics: "今も変わらずあなたを好きでいることを\n伝えたいけれど伝えられなくて\n今もこうして一人さみしく歩くこの道\nあの日のように雨が降り出した",
      translation: "I want to tell you that my feelings for you haven't changed\nBut I can't convey these feelings\nEven now I walk this lonely road by myself\nAnd just like that day, it started to rain",
      vocabulary: [
        {
          word: "変わらず",
          reading: "かわらず",
          meaning: "Without changing, still the same",
          example: "変わらず元気です - I'm still doing well as always"
        },
        {
          word: "伝えたい",
          reading: "つたえたい",
          meaning: "Want to tell/convey (desire form of 伝える)",
          example: "気持ちを伝えたい - I want to convey my feelings"
        },
        {
          word: "さみしく",
          reading: "さみしく",
          meaning: "Lonely, in a lonely way (adverbial form of 寂しい)",
          example: "さみしく暮らす - To live in loneliness"
        },
        {
          word: "降り出す",
          reading: "ふりだす",
          meaning: "To start raining/snowing",
          example: "雨が降り出した - It started to rain"
        }
      ]
    },
    difficulty: "beginner"
  },{
    id: 5,
    title: "Your Name (Kimi no Na wa) - Opening Scene",
    description: "Learn Japanese with this popular anime movie by Makoto Shinkai",
    type: "anime",
    mediaUrl: "https://example.com/yourname.mp4",
    content: {
      lyrics: "誰かの名前を呼んでいた\n記憶の中の遥か奥で\nもう一度だけ会いたかった",
      translation: "I was calling someone's name\nDeep within my memories\nI wanted to meet them just one more time",
      vocabulary: [
        {
          word: "名前",
          reading: "なまえ",
          meaning: "Name",
          example: "名前を忘れました - I forgot your name"
        },
        {
          word: "呼ぶ",
          reading: "よぶ",
          meaning: "To call out, to summon",
          example: "友達を呼ぶ - To call a friend"
        },
        {
          word: "記憶",
          reading: "きおく",
          meaning: "Memory, recollection",
          example: "記憶が薄れる - Memory fades"
        },
        {
          word: "遥か",
          reading: "はるか",
          meaning: "Far, distant",
          example: "遥か彼方 - Far away"
        },
        {
          word: "会いたい",
          reading: "あいたい",
          meaning: "Want to meet (desire form of 会う)",
          example: "友達に会いたい - I want to meet my friend"
        }
      ]
    },
    difficulty: "intermediate"
  },{
    id: 6,
    title: "Hikaru Nara - Goose House",
    description: "Learn Japanese grammar with this popular song from Your Lie in April",
    type: "song",
    mediaUrl: "https://example.com/hikarunara.mp4",
    content: {
      lyrics: "喜びと悲しみの\n雫が光るなら\n君のもとへ駆けていくよ\n全てをあげるよ\n\n目を閉じれば\n移ろう景色の中で\n君が指をさし示した光が\nまだ僕を照らしてる",
      translation: "If the droplets of joy and sorrow\nWere to shine\nI would run to where you are\nI would give you everything\n\nWhen I close my eyes\nAmidst the ever-changing scenery\nThe light that you pointed to\nStill illuminates me",
      vocabulary: [
        {
          word: "喜び",
          reading: "よろこび",
          meaning: "Joy, delight",
          example: "喜びを感じる - To feel joy"
        },
        {
          word: "悲しみ",
          reading: "かなしみ",
          meaning: "Sadness, sorrow",
          example: "悲しみに暮れる - To be overcome with sadness"
        },
        {
          word: "雫",
          reading: "しずく",
          meaning: "Droplet, drop",
          example: "雨の雫 - Raindrops"
        },
        {
          word: "光る",
          reading: "ひかる",
          meaning: "To shine, to glitter",
          example: "星が光る - Stars shine"
        },
        {
          word: "駆ける",
          reading: "かける",
          meaning: "To run, to dash",
          example: "駆けていく - To run toward"
        },
        {
          word: "閉じる",
          reading: "とじる",
          meaning: "To close, to shut",
          example: "目を閉じる - To close one's eyes"
        },
        {
          word: "移ろう",
          reading: "うつろう",
          meaning: "To change, to shift",
          example: "季節が移ろう - Seasons change"
        }
      ],
      grammar: [
        {
          pattern: "〜なら",
          explanation: "Conditional form meaning 'if'. In '光るなら', it indicates 'if [they] shine'.",
          example: "雨が降るなら、傘を持っていきます。 - If it rains, I'll take an umbrella."
        },
        {
          pattern: "〜ていく",
          explanation: "Indicates movement away from the speaker or a continuing action. In '駆けていくよ', it means 'I will run (toward you)'.",
          example: "これから暑くなっていくでしょう。 - It will continue to get warmer from now on."
        },
        {
          pattern: "〜れば",
          explanation: "Another conditional form, often translated as 'if' or 'when'. In '閉じれば', it means 'if/when I close'.",
          example: "お金があれば、新しい車を買います。 - If I had money, I would buy a new car."
        },
        {
          pattern: "〜している",
          explanation: "Indicates an ongoing state or continuous action. In '照らしてる' (casual form of 照らしている), it means 'is illuminating'.",
          example: "彼は三年間東京に住んでいる。 - He has been living in Tokyo for three years."
        }
      ]
    },
    difficulty: "intermediate"
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