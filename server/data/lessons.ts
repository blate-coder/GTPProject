import type { Lesson } from "@shared/schema";

// Lesson database - separated from storage for easier management
export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Gurenge - Demon Slayer OP",
    description: "Learn Japanese with the opening theme of Demon Slayer",
    type: "song",
    mediaUrl: "https://www.youtube.com/embed/pmanD_s7G3U?si=lbQnY9O6gOun8uXj",
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
    mediaUrl: "https://www.youtube.com/embed/SX_ViT4Ra7k?si=_ZeGQWX12vhXDBMr",
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
    mediaUrl: "https://www.youtube.com/embed/x8VYWazR5mE?si=TYOuQU1RBOjbvYN0",
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
    mediaUrl: "https://www.youtube.com/embed/QO0B1z7-c0A?si=c26h_lfJLJGJy5GN",
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
    mediaUrl: "https://www.youtube.com/embed/pLg9fHlZqMg?si=eXf_sL3wPQilfpVS",
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
    mediaUrl: "https://www.youtube.com/embed/p5kc8hJ3GcA?si=k0XQXxrbvhJMZB3H",
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
  // Add new reading-focused lessons
  {
    id: 7,
    title: "Basic Japanese Self-Introduction",
    description: "Learn to read and understand simple Japanese self-introductions",
    type: "reading",
    mediaUrl: "",
    content: {
      lyrics: "私の名前は田中です。\n私は学生です。\n今日は天気がいいです。\n7時に起きます。\n私の部屋は小さいです。",
      translation: "My name is Tanaka.\nI am a student.\nThe weather is nice today.\nI wake up at 7:00.\nMy room is small.",
      vocabulary: [
        {
          word: "名前",
          reading: "なまえ",
          meaning: "Name",
          example: "あなたの名前は何ですか？ - What is your name?"
        },
        {
          word: "学生",
          reading: "がくせい",
          meaning: "Student",
          example: "私は大学の学生です。 - I am a university student."
        },
        {
          word: "天気",
          reading: "てんき",
          meaning: "Weather",
          example: "明日の天気はどうですか？ - How will the weather be tomorrow?"
        },
        {
          word: "起きます",
          reading: "おきます",
          meaning: "To wake up (polite form)",
          example: "毎日6時に起きます。 - I wake up at 6 every day."
        },
        {
          word: "部屋",
          reading: "へや",
          meaning: "Room",
          example: "この部屋は広いです。 - This room is spacious."
        }
      ]
    },
    difficulty: "beginner"
  },
  {
    id: 8,
    title: "Daily Life in Japanese",
    description: "Learn to read and understand simple Japanese texts about daily life",
    type: "reading",
    mediaUrl: "",
    content: {
      lyrics: "私の名前はユキです。週末に、よく公園に行きます。\n私の友達の武は犬が好きです。\nスーパーに行って、牛乳とパンを買ってください。\n今は夏です。とても暑いです。\nA: 先生、おはようございます。B: おはよう、鈴木さん。",
      translation: "My name is Yuki. I often go to the park on weekends.\nMy friend Takeshi likes dogs.\nPlease go to the supermarket and buy milk and bread.\nIt's summer now. It's very hot.\nA: Good morning, teacher. B: Good morning, Suzuki.",
      vocabulary: [
        {
          word: "週末",
          reading: "しゅうまつ",
          meaning: "Weekend",
          example: "週末何をしますか？ - What will you do on the weekend?"
        },
        {
          word: "公園",
          reading: "こうえん",
          meaning: "Park",
          example: "近くに公園があります。 - There is a park nearby."
        },
        {
          word: "友達",
          reading: "ともだち",
          meaning: "Friend",
          example: "彼は私の親しい友達です。 - He is my close friend."
        },
        {
          word: "スーパー",
          reading: "すーぱー",
          meaning: "Supermarket",
          example: "スーパーで買い物をします。 - I go shopping at the supermarket."
        },
        {
          word: "先生",
          reading: "せんせい",
          meaning: "Teacher",
          example: "田中先生は英語の先生です。 - Mr. Tanaka is an English teacher."
        }
      ]
    },
    difficulty: "beginner"
  },
  {
    id: 9,
    title: "Simple Japanese Narratives",
    description: "Practice reading and understanding everyday Japanese situations",
    type: "reading",
    mediaUrl: "",
    content: {
      lyrics: "昨日、友達と映画を見に行きました。とても面白かったです。\n立入禁止\n電車の中で携帯電話で話さないでください。\n日本の四季は春、夏、秋、冬です。春は桜がきれいです。\n明日の天気予報：東京は雨が降るでしょう。傘を持っていってください。",
      translation: "Yesterday, I went to see a movie with a friend. It was very interesting.\nNo entry\nPlease don't talk on your cell phone on the train.\nJapan has four seasons: spring, summer, fall, and winter. Cherry blossoms are beautiful in spring.\nWeather forecast for tomorrow: It will probably rain in Tokyo. Please take an umbrella with you.",
      vocabulary: [
        {
          word: "昨日",
          reading: "きのう",
          meaning: "Yesterday",
          example: "昨日何をしましたか？ - What did you do yesterday?"
        },
        {
          word: "映画",
          reading: "えいが",
          meaning: "Movie",
          example: "週末に映画を見ました。 - I watched a movie on the weekend."
        },
        {
          word: "立入禁止",
          reading: "たちいりきんし",
          meaning: "No entry",
          example: "そのエリアは立入禁止です。 - That area is off-limits."
        },
        {
          word: "四季",
          reading: "しき",
          meaning: "Four seasons",
          example: "日本には四季があります。 - Japan has four seasons."
        },
        {
          word: "天気予報",
          reading: "てんきよほう",
          meaning: "Weather forecast",
          example: "天気予報を見ましたか？ - Did you see the weather forecast?"
        }
      ]
    },
    difficulty: "intermediate"
  },
  {
    id: 10,
    title: "Practical Japanese Reading",
    description: "Read and understand commonly encountered Japanese text in daily life",
    type: "reading",
    mediaUrl: "",
    content: {
      lyrics: "田中様、お世話になっております。先日の会議の議事録を添付いたします。ご確認ください。\n明日の会議に出席できますか？ご都合を教えてください。\n風邪をひいたので、今日は休みます。\n次は新宿駅です。電車は右側のドアが開きます。\n営業時間：午前11時から午後10時まで、水曜日定休日",
      translation: "Dear Mr. Tanaka, Thank you for your continued support. I am attaching the minutes of the recent meeting. Please check them.\nCan you attend tomorrow's meeting? Please let me know your availability.\nI've caught a cold, so I'll take the day off today.\nThe next station is Shinjuku. The doors will open on the right side of the train.\nBusiness hours: 11 AM to 10 PM, closed on Wednesdays.",
      vocabulary: [
        {
          word: "お世話になっております",
          reading: "おせわになっております",
          meaning: "Thank you for your support (business formal)",
          example: "いつもお世話になっております。 - Thank you for your continued support."
        },
        {
          word: "議事録",
          reading: "ぎじろく",
          meaning: "Minutes (of a meeting)",
          example: "会議の議事録を取りました。 - I took minutes of the meeting."
        },
        {
          word: "出席",
          reading: "しゅっせき",
          meaning: "Attendance",
          example: "会議に出席する予定です。 - I plan to attend the meeting."
        },
        {
          word: "風邪をひく",
          reading: "かぜをひく",
          meaning: "To catch a cold",
          example: "昨日から風邪をひいています。 - I've had a cold since yesterday."
        },
        {
          word: "営業時間",
          reading: "えいぎょうじかん",
          meaning: "Business hours",
          example: "営業時間は何時までですか？ - Until what time are your business hours?"
        }
      ]
    },
    difficulty: "intermediate"
  },
  {
    id: 11,
    title: "Advanced Japanese Reading",
    description: "Develop advanced Japanese reading comprehension skills with complex texts",
    type: "reading",
    mediaUrl: "",
    content: {
      lyrics: "近年、日本では少子高齢化が進み、社会保障制度の見直しが課題となっている。\n1945年8月、広島と長崎に原子爆弾が投下され、多くの人々が亡くなった。\n今後ともご指導ご鞭撻のほど、よろしくお願い申し上げます。\n「もったいない」という言葉は、物を大切にする日本の伝統的な価値観を表している。\n現代の技術発展は私たちの生活を便利にする一方で、新たな問題も生み出している。",
      translation: "In recent years, Japan has been facing an aging population with declining birthrates, and reviewing the social security system has become a challenge.\nIn August 1945, atomic bombs were dropped on Hiroshima and Nagasaki, and many people died.\nWe look forward to your continued guidance and support.\nThe word 'mottainai' represents the traditional Japanese value of treasuring things and not being wasteful.\nWhile modern technological development makes our lives convenient, it also creates new problems.",
      vocabulary: [
        {
          word: "少子高齢化",
          reading: "しょうしこうれいか",
          meaning: "Declining birthrate and aging population",
          example: "少子高齢化は日本の大きな社会問題です。 - The declining birthrate and aging population is a major social issue in Japan."
        },
        {
          word: "社会保障",
          reading: "しゃかいほしょう",
          meaning: "Social security",
          example: "社会保障制度の改革が必要です。 - Reform of the social security system is necessary."
        },
        {
          word: "ご指導ご鞭撻",
          reading: "ごしどうごべんたつ",
          meaning: "Guidance and encouragement (formal business expression)",
          example: "今後ともご指導ご鞭撻のほどよろしくお願いいたします。 - We look forward to your continued guidance and encouragement."
        },
        {
          word: "もったいない",
          reading: "もったいない",
          meaning: "Wasteful",
          example: "食べ物を捨てるのはもったいないです。 - It's wasteful to throw away food."
        },
        {
          word: "技術発展",
          reading: "ぎじゅつはってん",
          meaning: "Technological development",
          example: "近年の技術発展は目覚ましいです。 - Recent technological development has been remarkable."
        }
      ]
    },
    difficulty: "advanced"
  },{
    id: 12,
    title: "晴る (Haru) - Yorushika",
    description: "Learn Japanese through this poetic song by Yorushika about weather, emotions, and the coming of spring",
    type: "song",
    mediaUrl: "https://www.youtube.com/embed/CkvWJNt77mU?si=lzlYMKolhJ2lB68i",
    content: {
      lyrics: "貴方は風のように\n目を閉じては夕暮れ\n何を思っているんだろうか\n目蓋を開いていた\n貴方の目はビイドロ\n少しだけ晴るの匂いがした\n晴れに晴れ 花よ咲け\n咲いて晴るのせい\n降り止めば雨でさえ\n貴方を飾る晴る\n胸を打つ音よ凪げ\n僕ら晴る風\nあの雲も越えてゆけ\n遠くまだ遠くまで\n貴方は晴れ模様に\n目を閉じては青色\n何が悲しいのだろうか\n目蓋を開いている\n貴方の目にビイドロ\n今少し雨の匂いがした\n泣きに泣け 空よ泣け\n泣いて雨のせい\n降り頻る雨でさえ\n雲の上では晴る\n土を打つ音よ鳴れ\n僕ら春荒れ\nあの海も越えてゆく\n遠くまだ遠くまで\n通り雨 草を靡かせ\n羊雲 あれも春のせい\n風のよう 胸に春乗せ\n晴るを待つ\n晴れに晴れ 空よ裂け\n裂いて春のせい\n降り止めば雨でさえ\n貴方を飾る晴る\n胸を打つ音奏で\n僕ら春風\n音に聞く晴るの風\nさぁこの歌よ凪げ！\n晴れに晴れ 花よ咲け\n咲いて春のせい\nあの雲も越えてゆけ\n遠くまだ遠くまで",
      translation: "You are like the wind\nClosing your eyes at dusk\nWhat are you thinking about?\nYour eyelids were open\nYour eyes are like glass\nI could smell a little of clearing weather\nClear up, clear up, flowers bloom\nBlooming because of the clearing weather\nEven the rain when it stops\nThe clear weather adorns you\nThe sound that strikes the heart, calm down\nWe are the clearing wind\nLet's go beyond those clouds\nTo far, still far away\n\nYou are in a clear pattern\nClosing your eyes to blue\nWhat could be sad?\nWith your eyelids open\nGlass in your eyes\nNow I smelled a little rain\nCry and cry, sky cry\nCrying because of the rain\nEven the frequently falling rain\nAbove the clouds it's clear\nSound striking the earth, ring out\nWe are the spring storm\nWe'll cross that sea too\nTo far, still far away\n\nA passing shower, bending the grass\nSheep-like clouds, that too is because of spring\nLike the wind, spring riding on our hearts\nWaiting for the weather to clear\nClear up, clear up, sky break open\nBreaking open because of spring\nEven the rain when it stops\nThe clear weather adorns you\nPlaying the sound that strikes the heart\nWe are the spring breeze\nHearing the sound of the clearing wind\nCome on, let this song calm down!\nClear up, clear up, flowers bloom\nBlooming because of spring\nLet's go beyond those clouds\nTo far, still far away",
      vocabulary: [
        {
          word: "貴方",
          reading: "あなた",
          meaning: "You",
          example: "貴方はどこから来ましたか？ - Where did you come from?"
        },
        {
          word: "風",
          reading: "かぜ",
          meaning: "Wind",
          example: "強い風が吹いている - A strong wind is blowing"
        },
        {
          word: "目を閉じる",
          reading: "めをとじる",
          meaning: "To close one's eyes",
          example: "瞑想するときは目を閉じます - Close your eyes when you meditate"
        },
        {
          word: "夕暮れ",
          reading: "ゆうぐれ",
          meaning: "Dusk, twilight",
          example: "夕暮れ時の空は美しい - The sky at dusk is beautiful"
        },
        {
          word: "思う",
          reading: "おもう",
          meaning: "To think, to feel",
          example: "あなたのことを思っています - I am thinking of you"
        },
        {
          word: "目蓋",
          reading: "まぶた",
          meaning: "Eyelid",
          example: "疲れると目蓋が重くなる - When tired, eyelids become heavy"
        },
        {
          word: "ビイドロ",
          reading: "びいどろ",
          meaning: "Glass (old Japanese word from Portuguese 'vidro')",
          example: "ビイドロのような透明な水 - Water as transparent as glass"
        },
        {
          word: "匂い",
          reading: "におい",
          meaning: "Smell, scent",
          example: "花の匂いがする - There is a smell of flowers"
        },
        {
          word: "晴れる",
          reading: "はれる",
          meaning: "To clear up (weather)",
          example: "雨が止んで空が晴れる - The rain stops and the sky clears"
        },
        {
          word: "晴る",
          reading: "はる",
          meaning: "To clear up (poetic form used in this song)",
          example: "空が晴るのを待つ - Waiting for the sky to clear"
        },
        {
          word: "花",
          reading: "はな",
          meaning: "Flower",
          example: "春になると花が咲く - Flowers bloom when spring comes"
        },
        {
          word: "咲く",
          reading: "さく",
          meaning: "To bloom",
          example: "桜が咲いている - The cherry blossoms are blooming"
        },
        {
          word: "降り止む",
          reading: "ふりやむ",
          meaning: "To stop falling (rain/snow)",
          example: "雨が降り止んだ - The rain has stopped"
        },
        {
          word: "飾る",
          reading: "かざる",
          meaning: "To decorate, to adorn",
          example: "部屋を花で飾る - To decorate a room with flowers"
        },
        {
          word: "胸を打つ",
          reading: "むねをうつ",
          meaning: "To touch one's heart, to be moving",
          example: "彼の話は胸を打った - His story was moving"
        },
        {
          word: "凪ぐ",
          reading: "なぐ",
          meaning: "To become calm (wind/waves)",
          example: "風が凪いだ - The wind has calmed down"
        },
        {
          word: "雲",
          reading: "くも",
          meaning: "Cloud",
          example: "雲が空を覆っている - Clouds are covering the sky"
        },
        {
          word: "越える",
          reading: "こえる",
          meaning: "To cross over, to go beyond",
          example: "山を越える - To cross over a mountain"
        },
        {
          word: "遠く",
          reading: "とおく",
          meaning: "Far away, distance",
          example: "遠くに行く - To go far away"
        },
        {
          word: "晴れ模様",
          reading: "はれもよう",
          meaning: "Clear weather pattern",
          example: "今日は晴れ模様だ - Today has a clear weather pattern"
        },
        {
          word: "青色",
          reading: "あおいろ",
          meaning: "Blue color",
          example: "空は青色だ - The sky is blue"
        },
        {
          word: "悲しい",
          reading: "かなしい",
          meaning: "Sad",
          example: "悲しい気持ち - Sad feeling"
        },
        {
          word: "泣く",
          reading: "なく",
          meaning: "To cry",
          example: "子供が泣いている - The child is crying"
        },
        {
          word: "降り頻る",
          reading: "ふりしきる",
          meaning: "To fall heavily (rain/snow)",
          example: "雨が降り頻る - Rain falls heavily"
        },
        {
          word: "土",
          reading: "つち",
          meaning: "Earth, soil",
          example: "肥沃な土 - Fertile soil"
        },
        {
          word: "鳴る",
          reading: "なる",
          meaning: "To sound, to ring",
          example: "鐘が鳴る - The bell rings"
        },
        {
          word: "春荒れ",
          reading: "はるあれ",
          meaning: "Spring storm",
          example: "春荒れの季節 - The season of spring storms"
        },
        {
          word: "海",
          reading: "うみ",
          meaning: "Sea, ocean",
          example: "広い海 - Vast ocean"
        },
        {
          word: "通り雨",
          reading: "とおりあめ",
          meaning: "Passing shower",
          example: "通り雨で少し濡れた - Got a little wet in a passing shower"
        },
        {
          word: "草",
          reading: "くさ",
          meaning: "Grass",
          example: "草が茂っている - The grass is thick"
        },
        {
          word: "靡く",
          reading: "なびく",
          meaning: "To wave, to flutter (in wind)",
          example: "風に靡く旗 - Flag fluttering in the wind"
        },
        {
          word: "羊雲",
          reading: "ひつじぐも",
          meaning: "Cirrocumulus clouds (sheep-like clouds)",
          example: "空に羊雲が浮かんでいる - Sheep-like clouds are floating in the sky"
        },
        {
          word: "春",
          reading: "はる",
          meaning: "Spring",
          example: "春が来た - Spring has come"
        },
        {
          word: "乗せる",
          reading: "のせる",
          meaning: "To place on, to carry",
          example: "希望を胸に乗せる - To carry hope in one's heart"
        },
        {
          word: "待つ",
          reading: "まつ",
          meaning: "To wait",
          example: "友達を待つ - To wait for a friend"
        },
        {
          word: "裂ける",
          reading: "さける",
          meaning: "To tear, to split open",
          example: "布が裂ける - The cloth tears"
        },
        {
          word: "奏でる",
          reading: "かなでる",
          meaning: "To play (music)",
          example: "ピアノを奏でる - To play the piano"
        },
        {
          word: "春風",
          reading: "はるかぜ",
          meaning: "Spring breeze",
          example: "春風が頬を撫でる - Spring breeze caresses the cheek"
        }
      ]
    },
    difficulty: "advanced"
  }
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