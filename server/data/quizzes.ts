import type { Quiz } from "@shared/schema";

// Quiz database - separated from storage for easier management
export const quizzes: Quiz[] = [
  {
    id: 1,
    lessonId: 1,
    tags: ["vocabulary"],
    questions: [
      {
        text: "What does '泥だらけ' mean?",
        options: ["Covered in mud", "Covered in snow", "Covered in water", "Covered in dust"],
        answer: "Covered in mud"
      },
      {
        text: "What does '走馬灯' (そうまとう) mean?",
        options: ["Lantern parade", "Street light", "Firefly", "Candlelight"],
        answer: "Lantern parade"
      },
      {
        text: "What is the meaning of 'こわばる'?",
        options: ["To become stiff", "To become soft", "To become warm", "To become cold"],
        answer: "To become stiff"
      },
      {
        text: "Complete the lyric: '震える手は_____ものがある'",
        options: ["掴みたい", "見たい", "聞きたい", "話したい"],
        answer: "掴みたい"
      },
      {
        text: "What is the meaning of '空睨んでも'?",
        options: ["Even if I glare at the sky", "Even if I look up", "Even if I smile", "Even if I cry"],
        answer: "Even if I glare at the sky"
      }
    ]
  },{
    id: 2,
    lessonId: 2,
    tags: ["vocabulary"],
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
    tags: ["vocabulary", "phrases"],
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
    tags: ["vocabulary", "phrases"],
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
    tags: ["vocabulary", "anime"],
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
  // Add new reading quizzes
  {
    id: 7,
    lessonId: 7,
    tags: ["reading", "beginner"],
    questions: [
      {
        text: "Read and choose the correct meaning of this text: '私の名前は田中です。'",
        options: ["My name is Tanaka.", "His name is Tanaka.", "Her name is Tanaka.", "Their names are Tanaka."],
        answer: "My name is Tanaka."
      },
      {
        text: "What does '学生' mean in '私は学生です。'?",
        options: ["Student", "Teacher", "Doctor", "Office worker"],
        answer: "Student"
      },
      {
        text: "Choose the correct translation: '今日は天気がいいです。'",
        options: ["The weather is nice today.", "The weather was nice yesterday.", "The weather will be nice tomorrow.", "The weather is bad today."],
        answer: "The weather is nice today."
      },
      {
        text: "What time is expressed in this sentence: '7時に起きます。'?",
        options: ["7:00", "8:00", "7:30", "7:15"],
        answer: "7:00"
      },
      {
        text: "What is being described in this sentence: '私の部屋は小さいです。'?",
        options: ["The size of a room", "The color of a room", "The location of a room", "The temperature of a room"],
        answer: "The size of a room"
      }
    ]
  },
  {
    id: 8,
    lessonId: 8,
    tags: ["reading", "beginner"],
    questions: [
      {
        text: "Read the following text and determine what Yuki usually does on weekends: '私の名前はユキです。週末に、よく公園に行きます。'",
        options: ["Goes to the park", "Stays at home", "Studies at the library", "Visits friends"],
        answer: "Goes to the park"
      },
      {
        text: "What does Takeshi like according to this sentence: '私の友達の武は犬が好きです。'?",
        options: ["Dogs", "Cats", "Birds", "Fish"],
        answer: "Dogs"
      },
      {
        text: "Read and select what you need to buy according to this text: 'スーパーに行って、牛乳とパンを買ってください。'",
        options: ["Milk and bread", "Eggs and cheese", "Vegetables and fruit", "Meat and fish"],
        answer: "Milk and bread"
      },
      {
        text: "What season is described in this sentence: '今は夏です。とても暑いです。'?",
        options: ["Summer", "Winter", "Spring", "Fall"],
        answer: "Summer"
      },
      {
        text: "What is the relationship between the speakers in this dialogue: 'A: 先生、おはようございます。B: おはよう、鈴木さん。'?",
        options: ["Teacher and student", "Friends", "Family members", "Colleagues"],
        answer: "Teacher and student"
      }
    ]
  },
  {
    id: 9,
    lessonId: 9,
    tags: ["reading", "intermediate"],
    questions: [
      {
        text: "Read this passage and answer: '昨日、友達と映画を見に行きました。とても面白かったです。' What did the person do yesterday?",
        options: ["Went to see a movie with a friend", "Went shopping with a friend", "Studied with a friend", "Ate dinner with a friend"],
        answer: "Went to see a movie with a friend"
      },
      {
        text: "What does this sign mean? '立入禁止'",
        options: ["No entry", "Exit only", "Caution", "Emergency exit"],
        answer: "No entry"
      },
      {
        text: "Read and interpret: '電車の中で携帯電話で話さないでください。'",
        options: ["Please don't talk on your cell phone on the train.", "Please turn off your cell phone on the train.", "Please use your cell phone on the train.", "Please charge your cell phone on the train."],
        answer: "Please don't talk on your cell phone on the train."
      },
      {
        text: "What is the main idea of this text? '日本の四季は春、夏、秋、冬です。春は桜がきれいです。'",
        options: ["Japan has four seasons and cherry blossoms are beautiful in spring.", "Japan only has spring season.", "Cherry blossoms bloom in all seasons in Japan.", "Japan has different flowers for each season."],
        answer: "Japan has four seasons and cherry blossoms are beautiful in spring."
      },
      {
        text: "What will the weather be like tomorrow according to this forecast? '明日の天気予報：東京は雨が降るでしょう。傘を持っていってください。'",
        options: ["Rainy", "Sunny", "Cloudy", "Snowy"],
        answer: "Rainy"
      }
    ]
  },
  {
    id: 10,
    lessonId: 10,
    tags: ["reading", "intermediate"],
    questions: [
      {
        text: "Read this email excerpt and determine its purpose: '田中様、お世話になっております。先日の会議の議事録を添付いたします。ご確認ください。'",
        options: ["Sending minutes of a meeting", "Scheduling a new meeting", "Cancelling a meeting", "Introducing a new colleague"],
        answer: "Sending minutes of a meeting"
      },
      {
        text: "What is the writer asking in this note? '明日の会議に出席できますか？ご都合を教えてください。'",
        options: ["If you can attend tomorrow's meeting", "If you can postpone tomorrow's meeting", "If you can prepare for tomorrow's meeting", "If you can cancel tomorrow's meeting"],
        answer: "If you can attend tomorrow's meeting"
      },
      {
        text: "Read and interpret: '風邪をひいたので、今日は休みます。'",
        options: ["Taking a day off because of a cold", "Working from home today", "Going to see a doctor today", "Leaving early today"],
        answer: "Taking a day off because of a cold"
      },
      {
        text: "What does this train announcement mean? '次は新宿駅です。電車は右側のドアが開きます。'",
        options: ["The next station is Shinjuku. Doors will open on the right side.", "The next station is Shinjuku. Doors will open on the left side.", "The train will skip Shinjuku station.", "The train will terminate at Shinjuku station."],
        answer: "The next station is Shinjuku. Doors will open on the right side."
      },
      {
        text: "Read this restaurant sign and determine when it's closed: '営業時間：午前11時から午後10時まで、水曜日定休日'",
        options: ["Wednesdays", "Weekends", "Mornings before 11 AM", "Nights after 10 PM"],
        answer: "Wednesdays"
      }
    ]
  },
  {
    id: 11,
    lessonId: 11,
    tags: ["reading", "advanced"],
    questions: [
      {
        text: "Read this article excerpt and identify the main topic: '近年、日本では少子高齢化が進み、社会保障制度の見直しが課題となっている。'",
        options: ["Aging population and social security reform", "Economic growth in Japan", "Education system reforms", "Environmental protection measures"],
        answer: "Aging population and social security reform"
      },
      {
        text: "What historical event is referenced in this passage? '1945年8月、広島と長崎に原子爆弾が投下され、多くの人々が亡くなった。'",
        options: ["Atomic bombings of Hiroshima and Nagasaki", "The end of the Edo period", "The Meiji Restoration", "The Great Kanto Earthquake"],
        answer: "Atomic bombings of Hiroshima and Nagasaki"
      },
      {
        text: "Read and interpret this business email phrase: '今後ともご指導ご鞭撻のほど、よろしくお願い申し上げます。'",
        options: ["We look forward to your continued guidance and support.", "We apologize for any inconvenience caused.", "We will contact you again soon.", "We are grateful for your business."],
        answer: "We look forward to your continued guidance and support."
      },
      {
        text: "What concept is being explained in this text? '「もったいない」という言葉は、物を大切にする日本の伝統的な価値観を表している。'",
        options: ["The traditional Japanese value of not being wasteful", "The importance of punctuality in Japanese culture", "The concept of harmony in Japanese society", "The Japanese tea ceremony traditions"],
        answer: "The traditional Japanese value of not being wasteful"
      },
      {
        text: "Read and determine the author's view: '現代の技術発展は私たちの生活を便利にする一方で、新たな問題も生み出している。'",
        options: ["Technology has both benefits and drawbacks", "Technology only improves our lives", "Technology is creating more problems than solutions", "Technology development should be stopped"],
        answer: "Technology has both benefits and drawbacks"
      }
    ]
  },{
    id: 12,
    lessonId: 12,
    tags: ["vocabulary","full song", "weather", "emotions", "spring", "metaphors"],
    questions: [
      {
        text: "What is the song comparing 'you' to in the first line?",
        options: ["The wind", "The clouds", "The rain", "The flowers"],
        answer: "The wind"
      },
      {
        text: "What does 'ビイドロ' (びいどろ) refer to in the lyrics?",
        options: ["Glass", "Water", "Sky", "Tears"],
        answer: "Glass"
      },
      {
        text: "What smell does the singer detect in the first part of the song?",
        options: ["The smell of clearing weather", "The smell of flowers", "The smell of rain", "The smell of spring"],
        answer: "The smell of clearing weather"
      },
      {
        text: "What is the correct reading for '晴る'?",
        options: ["はる", "そる", "はれる", "くもる"],
        answer: "はる"
      },
      {
        text: "In the line '晴れに晴れ 花よ咲け', what is being asked to bloom?",
        options: ["Flowers", "Sky", "Wind", "Heart"],
        answer: "Flowers"
      },
      {
        text: "What smell does the singer detect later in the song?",
        options: ["The smell of rain", "The smell of flowers", "The smell of spring", "The smell of the sea"],
        answer: "The smell of rain"
      },
      {
        text: "What weather phenomenon is referred to as '羊雲' (ひつじぐも)?",
        options: ["Sheep-like clouds (cirrocumulus)", "Lightning", "Rainbow", "Fog"],
        answer: "Sheep-like clouds (cirrocumulus)"
      },
      {
        text: "What does '靡く' (なびく) mean in the context of the grass?",
        options: ["To wave in the wind", "To grow", "To wither", "To get wet"],
        answer: "To wave in the wind"
      },
      {
        text: "What season is prominently featured in this song?",
        options: ["Spring", "Summer", "Fall", "Winter"],
        answer: "Spring"
      },
      {
        text: "What natural element does the song suggest we should go beyond?",
        options: ["Clouds", "Mountains", "Rivers", "Stars"],
        answer: "Clouds"
      },
      {
        text: "What are '目蓋' (まぶた) in the song?",
        options: ["Eyelids", "Eyeballs", "Tears", "Glasses"],
        answer: "Eyelids"
      },
      {
        text: "The phrase '胸を打つ音' refers to what kind of sound?",
        options: ["A sound that touches/moves the heart", "A drum sound", "Thunder", "Music"],
        answer: "A sound that touches/moves the heart"
      },
      {
        text: "What does '凪げ' (なげ) mean in the context of the song?",
        options: ["To calm down", "To speed up", "To disappear", "To sing"],
        answer: "To calm down"
      },
      {
        text: "Which of these lines represents a command or request to the sky?",
        options: ["空よ裂け", "空よ泣け", "Both 空よ裂け and 空よ泣け", "Neither 空よ裂け nor 空よ泣け"],
        answer: "Both A and B"
      },
      {
        text: "In the phrase '通り雨 草を靡かせ', what is '通り雨'?",
        options: ["A passing shower", "Heavy rain", "A storm", "Morning dew"],
        answer: "A passing shower"
      },
      {
        text: "What poetic technique does the song use when personifying natural elements?",
        options: ["Personification", "Simile", "Onomatopoeia", "Hyperbole"],
        answer: "Personification"
      },
      {
        text: "What feeling is conveyed by the repeated imagery of clearing weather?",
        options: ["Hope", "Despair", "Anger", "Confusion"],
        answer: "Hope"
      },
      {
        text: "What is the grammatical structure of '咲いて春の__'?",
        options: ["Te-form + noun + のせい (because of)", "Imperative + noun + のため (for the sake of)", "Past tense + noun + のよう (like)", "Potential form + noun + のもと (under)"],
        answer: "Te-form + noun + のせい (because of)"
      },
      {
        text: "The word '遠く' appears repeatedly at the end of stanzas. What does it mean?",
        options: ["Far away", "Nearby", "Quickly", "Slowly"],
        answer: "Far away"
      },
      {
        text: "What is the main contrast presented throughout the song?",
        options: ["Clear weather and rain", "Spring and winter", "Near and far", "Life and death"],
        answer: "Clear weather and rain"
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