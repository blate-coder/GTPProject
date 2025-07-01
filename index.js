// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import session from "express-session";
import createMemoryStore from "memorystore";

// server/data/lessons.ts
var lessons = [
  {
    id: 1,
    title: "Gurenge - Demon Slayer OP",
    description: "Learn Japanese with the opening theme of Demon Slayer",
    type: "song",
    mediaUrl: "https://www.youtube.com/embed/pmanD_s7G3U?si=lbQnY9O6gOun8uXj",
    content: {
      lyrics: "\u6CE5\u3060\u3089\u3051\u306E\u8D70\u99AC\u706F\u306B\u9154\u3046 \u3053\u308F\u3070\u308B\u5FC3\n\u9707\u3048\u308B\u624B\u306F\u63B4\u307F\u305F\u3044\u3082\u306E\u304C\u3042\u308B \u305D\u308C\u3060\u3051\u3055\n\u591C\u306E\u5302\u3044\u306B (I'll spend all thirty nights)\n\u7A7A\u7768\u3093\u3067\u3082 (Staring into the sky)\n\u5909\u308F\u3063\u3066\u3044\u3051\u308B\u306E\u306F\u81EA\u5206\u81EA\u8EAB\u3060\u3051 \u305D\u308C\u3060\u3051\u3055",
      translation: "Getting drunk on the mud-stained revolving lantern of memories, my stiffening heart\nMy trembling hand wants to grasp something, that's all\nIn the smell of the night (I'll spend all thirty nights)\nEven if I stare at the sky (Staring into the sky)\nOnly I can change myself, that's all",
      vocabulary: [
        {
          word: "\u8D6B\u304F",
          reading: "\u3042\u304B\u304F",
          meaning: "Crimson, bright red",
          example: "\u7A7A\u304C\u8D6B\u304F\u67D3\u307E\u308B - The sky is dyed crimson"
        },
        {
          word: "\u5C0A\u304D",
          reading: "\u3068\u3046\u3068\u304D",
          meaning: "Noble, precious, sacred",
          example: "\u5C0A\u304D\u547D - Precious life"
        },
        {
          word: "\u8B77\u308A\u3057",
          reading: "\u307E\u3082\u308A\u3057",
          meaning: "To protect (classical form)",
          example: "\u56FD\u3092\u8B77\u308A\u3057\u52C7\u8005 - The hero who protected the country"
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
      lyrics: "\u5922\u306A\u3089\u3070\u3069\u308C\u307B\u3069\u3088\u304B\u3063\u305F\u3067\u3057\u3087\u3046\n\u672A\u3060\u306B\u3042\u306A\u305F\u306E\u3053\u3068\u3092\u5922\u306B\u307F\u308B\n\u5FD8\u308C\u305F\u7269\u3092\u53D6\u308A\u306B\u5E30\u308B\u3088\u3046\u306B\n\u53E4\u3073\u305F\u601D\u3044\u51FA\u306E\u57C3\u3092\u6255\u3046",
      translation: "How wonderful would it be if this were just a dream\nI still see you in my dreams\nLike going back to retrieve something forgotten\nI dust off the old memories",
      vocabulary: [
        {
          word: "\u5922",
          reading: "\u3086\u3081",
          meaning: "Dream",
          example: "\u5922\u3092\u898B\u308B - To have a dream"
        },
        {
          word: "\u672A\u3060\u306B",
          reading: "\u3044\u307E\u3060\u306B",
          meaning: "Still, even now",
          example: "\u672A\u3060\u306B\u4FE1\u3058\u3089\u308C\u306A\u3044 - I still can't believe it"
        },
        {
          word: "\u5FD8\u308C\u305F",
          reading: "\u308F\u3059\u308C\u305F",
          meaning: "Forgot (past tense of \u5FD8\u308C\u308B)",
          example: "\u540D\u524D\u3092\u5FD8\u308C\u305F - I forgot the name"
        },
        {
          word: "\u57C3",
          reading: "\u307B\u3053\u308A",
          meaning: "Dust",
          example: "\u57C3\u3092\u6255\u3046 - To dust off"
        }
      ]
    },
    difficulty: "intermediate"
  },
  {
    id: 3,
    title: "Yoru ni Kakeru - YOASOBI",
    description: "Learn Japanese with this popular song by YOASOBI",
    type: "song",
    mediaUrl: "https://www.youtube.com/embed/x8VYWazR5mE?si=TYOuQU1RBOjbvYN0",
    content: {
      lyrics: "\u591C\u306B\u99C6\u3051\u308B\u306E\u306F\n\u6C7A\u307E\u3063\u3066\u6C7A\u307E\u3063\u3066\u3072\u3068\u308A\u304D\u308A\n\u305D\u3093\u306A\u98A8\u306B\u601D\u3063\u3066\u3044\u305F\n\u305D\u306E\u9803\u306E\u50D5\u3089\u306F",
      translation: "The one who runs through the night\nIs always, always all alone\nThat's what I thought\nBack when we were young",
      vocabulary: [
        {
          word: "\u99C6\u3051\u308B",
          reading: "\u304B\u3051\u308B",
          meaning: "To run, to dash",
          example: "\u516C\u5712\u3092\u99C6\u3051\u308B - To run through the park"
        },
        {
          word: "\u6C7A\u307E\u3063\u3066",
          reading: "\u304D\u307E\u3063\u3066",
          meaning: "Always, without fail",
          example: "\u6C7A\u307E\u3063\u3066\u9045\u523B\u3059\u308B - To always be late"
        },
        {
          word: "\u3072\u3068\u308A\u304D\u308A",
          reading: "\u3072\u3068\u308A\u304D\u308A",
          meaning: "All alone, by oneself",
          example: "\u3072\u3068\u308A\u304D\u308A\u3067\u65C5\u884C\u3059\u308B - To travel all alone"
        },
        {
          word: "\u305D\u306E\u9803",
          reading: "\u305D\u306E\u3053\u308D",
          meaning: "At that time, in those days",
          example: "\u305D\u306E\u9803\u306F\u82E5\u304B\u3063\u305F - I was young at that time"
        }
      ]
    },
    difficulty: "intermediate"
  },
  {
    id: 4,
    title: "Aitai - Suda Masaki",
    description: "Learn Japanese with this touching song by Suda Masaki",
    type: "song",
    mediaUrl: "https://www.youtube.com/embed/QO0B1z7-c0A?si=c26h_lfJLJGJy5GN",
    content: {
      lyrics: "\u4ECA\u3082\u5909\u308F\u3089\u305A\u3042\u306A\u305F\u3092\u597D\u304D\u3067\u3044\u308B\u3053\u3068\u3092\n\u4F1D\u3048\u305F\u3044\u3051\u308C\u3069\u4F1D\u3048\u3089\u308C\u306A\u304F\u3066\n\u4ECA\u3082\u3053\u3046\u3057\u3066\u4E00\u4EBA\u3055\u307F\u3057\u304F\u6B69\u304F\u3053\u306E\u9053\n\u3042\u306E\u65E5\u306E\u3088\u3046\u306B\u96E8\u304C\u964D\u308A\u51FA\u3057\u305F",
      translation: "I want to tell you that my feelings for you haven't changed\nBut I can't convey these feelings\nEven now I walk this lonely road by myself\nAnd just like that day, it started to rain",
      vocabulary: [
        {
          word: "\u5909\u308F\u3089\u305A",
          reading: "\u304B\u308F\u3089\u305A",
          meaning: "Without changing, still the same",
          example: "\u5909\u308F\u3089\u305A\u5143\u6C17\u3067\u3059 - I'm still doing well as always"
        },
        {
          word: "\u4F1D\u3048\u305F\u3044",
          reading: "\u3064\u305F\u3048\u305F\u3044",
          meaning: "Want to tell/convey (desire form of \u4F1D\u3048\u308B)",
          example: "\u6C17\u6301\u3061\u3092\u4F1D\u3048\u305F\u3044 - I want to convey my feelings"
        },
        {
          word: "\u3055\u307F\u3057\u304F",
          reading: "\u3055\u307F\u3057\u304F",
          meaning: "Lonely, in a lonely way (adverbial form of \u5BC2\u3057\u3044)",
          example: "\u3055\u307F\u3057\u304F\u66AE\u3089\u3059 - To live in loneliness"
        },
        {
          word: "\u964D\u308A\u51FA\u3059",
          reading: "\u3075\u308A\u3060\u3059",
          meaning: "To start raining/snowing",
          example: "\u96E8\u304C\u964D\u308A\u51FA\u3057\u305F - It started to rain"
        }
      ]
    },
    difficulty: "beginner"
  },
  {
    id: 5,
    title: "Your Name (Kimi no Na wa) - Opening Scene",
    description: "Learn Japanese with this popular anime movie by Makoto Shinkai",
    type: "anime",
    mediaUrl: "https://www.youtube.com/embed/pLg9fHlZqMg?si=eXf_sL3wPQilfpVS",
    content: {
      lyrics: "\u8AB0\u304B\u306E\u540D\u524D\u3092\u547C\u3093\u3067\u3044\u305F\n\u8A18\u61B6\u306E\u4E2D\u306E\u9065\u304B\u5965\u3067\n\u3082\u3046\u4E00\u5EA6\u3060\u3051\u4F1A\u3044\u305F\u304B\u3063\u305F",
      translation: "I was calling someone's name\nDeep within my memories\nI wanted to meet them just one more time",
      vocabulary: [
        {
          word: "\u540D\u524D",
          reading: "\u306A\u307E\u3048",
          meaning: "Name",
          example: "\u540D\u524D\u3092\u5FD8\u308C\u307E\u3057\u305F - I forgot your name"
        },
        {
          word: "\u547C\u3076",
          reading: "\u3088\u3076",
          meaning: "To call out, to summon",
          example: "\u53CB\u9054\u3092\u547C\u3076 - To call a friend"
        },
        {
          word: "\u8A18\u61B6",
          reading: "\u304D\u304A\u304F",
          meaning: "Memory, recollection",
          example: "\u8A18\u61B6\u304C\u8584\u308C\u308B - Memory fades"
        },
        {
          word: "\u9065\u304B",
          reading: "\u306F\u308B\u304B",
          meaning: "Far, distant",
          example: "\u9065\u304B\u5F7C\u65B9 - Far away"
        },
        {
          word: "\u4F1A\u3044\u305F\u3044",
          reading: "\u3042\u3044\u305F\u3044",
          meaning: "Want to meet (desire form of \u4F1A\u3046)",
          example: "\u53CB\u9054\u306B\u4F1A\u3044\u305F\u3044 - I want to meet my friend"
        }
      ]
    },
    difficulty: "intermediate"
  },
  {
    id: 6,
    title: "Hikaru Nara - Goose House",
    description: "Learn Japanese grammar with this popular song from Your Lie in April",
    type: "song",
    mediaUrl: "https://www.youtube.com/embed/p5kc8hJ3GcA?si=k0XQXxrbvhJMZB3H",
    content: {
      lyrics: "\u559C\u3073\u3068\u60B2\u3057\u307F\u306E\n\u96EB\u304C\u5149\u308B\u306A\u3089\n\u541B\u306E\u3082\u3068\u3078\u99C6\u3051\u3066\u3044\u304F\u3088\n\u5168\u3066\u3092\u3042\u3052\u308B\u3088\n\n\u76EE\u3092\u9589\u3058\u308C\u3070\n\u79FB\u308D\u3046\u666F\u8272\u306E\u4E2D\u3067\n\u541B\u304C\u6307\u3092\u3055\u3057\u793A\u3057\u305F\u5149\u304C\n\u307E\u3060\u50D5\u3092\u7167\u3089\u3057\u3066\u308B",
      translation: "If the droplets of joy and sorrow\nWere to shine\nI would run to where you are\nI would give you everything\n\nWhen I close my eyes\nAmidst the ever-changing scenery\nThe light that you pointed to\nStill illuminates me",
      vocabulary: [
        {
          word: "\u559C\u3073",
          reading: "\u3088\u308D\u3053\u3073",
          meaning: "Joy, delight",
          example: "\u559C\u3073\u3092\u611F\u3058\u308B - To feel joy"
        },
        {
          word: "\u60B2\u3057\u307F",
          reading: "\u304B\u306A\u3057\u307F",
          meaning: "Sadness, sorrow",
          example: "\u60B2\u3057\u307F\u306B\u66AE\u308C\u308B - To be overcome with sadness"
        },
        {
          word: "\u96EB",
          reading: "\u3057\u305A\u304F",
          meaning: "Droplet, drop",
          example: "\u96E8\u306E\u96EB - Raindrops"
        },
        {
          word: "\u5149\u308B",
          reading: "\u3072\u304B\u308B",
          meaning: "To shine, to glitter",
          example: "\u661F\u304C\u5149\u308B - Stars shine"
        },
        {
          word: "\u99C6\u3051\u308B",
          reading: "\u304B\u3051\u308B",
          meaning: "To run, to dash",
          example: "\u99C6\u3051\u3066\u3044\u304F - To run toward"
        },
        {
          word: "\u9589\u3058\u308B",
          reading: "\u3068\u3058\u308B",
          meaning: "To close, to shut",
          example: "\u76EE\u3092\u9589\u3058\u308B - To close one's eyes"
        },
        {
          word: "\u79FB\u308D\u3046",
          reading: "\u3046\u3064\u308D\u3046",
          meaning: "To change, to shift",
          example: "\u5B63\u7BC0\u304C\u79FB\u308D\u3046 - Seasons change"
        }
      ],
      grammar: [
        {
          pattern: "\u301C\u306A\u3089",
          explanation: "Conditional form meaning 'if'. In '\u5149\u308B\u306A\u3089', it indicates 'if [they] shine'.",
          example: "\u96E8\u304C\u964D\u308B\u306A\u3089\u3001\u5098\u3092\u6301\u3063\u3066\u3044\u304D\u307E\u3059\u3002 - If it rains, I'll take an umbrella."
        },
        {
          pattern: "\u301C\u3066\u3044\u304F",
          explanation: "Indicates movement away from the speaker or a continuing action. In '\u99C6\u3051\u3066\u3044\u304F\u3088', it means 'I will run (toward you)'.",
          example: "\u3053\u308C\u304B\u3089\u6691\u304F\u306A\u3063\u3066\u3044\u304F\u3067\u3057\u3087\u3046\u3002 - It will continue to get warmer from now on."
        },
        {
          pattern: "\u301C\u308C\u3070",
          explanation: "Another conditional form, often translated as 'if' or 'when'. In '\u9589\u3058\u308C\u3070', it means 'if/when I close'.",
          example: "\u304A\u91D1\u304C\u3042\u308C\u3070\u3001\u65B0\u3057\u3044\u8ECA\u3092\u8CB7\u3044\u307E\u3059\u3002 - If I had money, I would buy a new car."
        },
        {
          pattern: "\u301C\u3057\u3066\u3044\u308B",
          explanation: "Indicates an ongoing state or continuous action. In '\u7167\u3089\u3057\u3066\u308B' (casual form of \u7167\u3089\u3057\u3066\u3044\u308B), it means 'is illuminating'.",
          example: "\u5F7C\u306F\u4E09\u5E74\u9593\u6771\u4EAC\u306B\u4F4F\u3093\u3067\u3044\u308B\u3002 - He has been living in Tokyo for three years."
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
      lyrics: "\u79C1\u306E\u540D\u524D\u306F\u7530\u4E2D\u3067\u3059\u3002\n\u79C1\u306F\u5B66\u751F\u3067\u3059\u3002\n\u4ECA\u65E5\u306F\u5929\u6C17\u304C\u3044\u3044\u3067\u3059\u3002\n7\u6642\u306B\u8D77\u304D\u307E\u3059\u3002\n\u79C1\u306E\u90E8\u5C4B\u306F\u5C0F\u3055\u3044\u3067\u3059\u3002",
      translation: "My name is Tanaka.\nI am a student.\nThe weather is nice today.\nI wake up at 7:00.\nMy room is small.",
      vocabulary: [
        {
          word: "\u540D\u524D",
          reading: "\u306A\u307E\u3048",
          meaning: "Name",
          example: "\u3042\u306A\u305F\u306E\u540D\u524D\u306F\u4F55\u3067\u3059\u304B\uFF1F - What is your name?"
        },
        {
          word: "\u5B66\u751F",
          reading: "\u304C\u304F\u305B\u3044",
          meaning: "Student",
          example: "\u79C1\u306F\u5927\u5B66\u306E\u5B66\u751F\u3067\u3059\u3002 - I am a university student."
        },
        {
          word: "\u5929\u6C17",
          reading: "\u3066\u3093\u304D",
          meaning: "Weather",
          example: "\u660E\u65E5\u306E\u5929\u6C17\u306F\u3069\u3046\u3067\u3059\u304B\uFF1F - How will the weather be tomorrow?"
        },
        {
          word: "\u8D77\u304D\u307E\u3059",
          reading: "\u304A\u304D\u307E\u3059",
          meaning: "To wake up (polite form)",
          example: "\u6BCE\u65E56\u6642\u306B\u8D77\u304D\u307E\u3059\u3002 - I wake up at 6 every day."
        },
        {
          word: "\u90E8\u5C4B",
          reading: "\u3078\u3084",
          meaning: "Room",
          example: "\u3053\u306E\u90E8\u5C4B\u306F\u5E83\u3044\u3067\u3059\u3002 - This room is spacious."
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
      lyrics: "\u79C1\u306E\u540D\u524D\u306F\u30E6\u30AD\u3067\u3059\u3002\u9031\u672B\u306B\u3001\u3088\u304F\u516C\u5712\u306B\u884C\u304D\u307E\u3059\u3002\n\u79C1\u306E\u53CB\u9054\u306E\u6B66\u306F\u72AC\u304C\u597D\u304D\u3067\u3059\u3002\n\u30B9\u30FC\u30D1\u30FC\u306B\u884C\u3063\u3066\u3001\u725B\u4E73\u3068\u30D1\u30F3\u3092\u8CB7\u3063\u3066\u304F\u3060\u3055\u3044\u3002\n\u4ECA\u306F\u590F\u3067\u3059\u3002\u3068\u3066\u3082\u6691\u3044\u3067\u3059\u3002\nA: \u5148\u751F\u3001\u304A\u306F\u3088\u3046\u3054\u3056\u3044\u307E\u3059\u3002B: \u304A\u306F\u3088\u3046\u3001\u9234\u6728\u3055\u3093\u3002",
      translation: "My name is Yuki. I often go to the park on weekends.\nMy friend Takeshi likes dogs.\nPlease go to the supermarket and buy milk and bread.\nIt's summer now. It's very hot.\nA: Good morning, teacher. B: Good morning, Suzuki.",
      vocabulary: [
        {
          word: "\u9031\u672B",
          reading: "\u3057\u3085\u3046\u307E\u3064",
          meaning: "Weekend",
          example: "\u9031\u672B\u4F55\u3092\u3057\u307E\u3059\u304B\uFF1F - What will you do on the weekend?"
        },
        {
          word: "\u516C\u5712",
          reading: "\u3053\u3046\u3048\u3093",
          meaning: "Park",
          example: "\u8FD1\u304F\u306B\u516C\u5712\u304C\u3042\u308A\u307E\u3059\u3002 - There is a park nearby."
        },
        {
          word: "\u53CB\u9054",
          reading: "\u3068\u3082\u3060\u3061",
          meaning: "Friend",
          example: "\u5F7C\u306F\u79C1\u306E\u89AA\u3057\u3044\u53CB\u9054\u3067\u3059\u3002 - He is my close friend."
        },
        {
          word: "\u30B9\u30FC\u30D1\u30FC",
          reading: "\u3059\u30FC\u3071\u30FC",
          meaning: "Supermarket",
          example: "\u30B9\u30FC\u30D1\u30FC\u3067\u8CB7\u3044\u7269\u3092\u3057\u307E\u3059\u3002 - I go shopping at the supermarket."
        },
        {
          word: "\u5148\u751F",
          reading: "\u305B\u3093\u305B\u3044",
          meaning: "Teacher",
          example: "\u7530\u4E2D\u5148\u751F\u306F\u82F1\u8A9E\u306E\u5148\u751F\u3067\u3059\u3002 - Mr. Tanaka is an English teacher."
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
      lyrics: "\u6628\u65E5\u3001\u53CB\u9054\u3068\u6620\u753B\u3092\u898B\u306B\u884C\u304D\u307E\u3057\u305F\u3002\u3068\u3066\u3082\u9762\u767D\u304B\u3063\u305F\u3067\u3059\u3002\n\u7ACB\u5165\u7981\u6B62\n\u96FB\u8ECA\u306E\u4E2D\u3067\u643A\u5E2F\u96FB\u8A71\u3067\u8A71\u3055\u306A\u3044\u3067\u304F\u3060\u3055\u3044\u3002\n\u65E5\u672C\u306E\u56DB\u5B63\u306F\u6625\u3001\u590F\u3001\u79CB\u3001\u51AC\u3067\u3059\u3002\u6625\u306F\u685C\u304C\u304D\u308C\u3044\u3067\u3059\u3002\n\u660E\u65E5\u306E\u5929\u6C17\u4E88\u5831\uFF1A\u6771\u4EAC\u306F\u96E8\u304C\u964D\u308B\u3067\u3057\u3087\u3046\u3002\u5098\u3092\u6301\u3063\u3066\u3044\u3063\u3066\u304F\u3060\u3055\u3044\u3002",
      translation: "Yesterday, I went to see a movie with a friend. It was very interesting.\nNo entry\nPlease don't talk on your cell phone on the train.\nJapan has four seasons: spring, summer, fall, and winter. Cherry blossoms are beautiful in spring.\nWeather forecast for tomorrow: It will probably rain in Tokyo. Please take an umbrella with you.",
      vocabulary: [
        {
          word: "\u6628\u65E5",
          reading: "\u304D\u306E\u3046",
          meaning: "Yesterday",
          example: "\u6628\u65E5\u4F55\u3092\u3057\u307E\u3057\u305F\u304B\uFF1F - What did you do yesterday?"
        },
        {
          word: "\u6620\u753B",
          reading: "\u3048\u3044\u304C",
          meaning: "Movie",
          example: "\u9031\u672B\u306B\u6620\u753B\u3092\u898B\u307E\u3057\u305F\u3002 - I watched a movie on the weekend."
        },
        {
          word: "\u7ACB\u5165\u7981\u6B62",
          reading: "\u305F\u3061\u3044\u308A\u304D\u3093\u3057",
          meaning: "No entry",
          example: "\u305D\u306E\u30A8\u30EA\u30A2\u306F\u7ACB\u5165\u7981\u6B62\u3067\u3059\u3002 - That area is off-limits."
        },
        {
          word: "\u56DB\u5B63",
          reading: "\u3057\u304D",
          meaning: "Four seasons",
          example: "\u65E5\u672C\u306B\u306F\u56DB\u5B63\u304C\u3042\u308A\u307E\u3059\u3002 - Japan has four seasons."
        },
        {
          word: "\u5929\u6C17\u4E88\u5831",
          reading: "\u3066\u3093\u304D\u3088\u307B\u3046",
          meaning: "Weather forecast",
          example: "\u5929\u6C17\u4E88\u5831\u3092\u898B\u307E\u3057\u305F\u304B\uFF1F - Did you see the weather forecast?"
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
      lyrics: "\u7530\u4E2D\u69D8\u3001\u304A\u4E16\u8A71\u306B\u306A\u3063\u3066\u304A\u308A\u307E\u3059\u3002\u5148\u65E5\u306E\u4F1A\u8B70\u306E\u8B70\u4E8B\u9332\u3092\u6DFB\u4ED8\u3044\u305F\u3057\u307E\u3059\u3002\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002\n\u660E\u65E5\u306E\u4F1A\u8B70\u306B\u51FA\u5E2D\u3067\u304D\u307E\u3059\u304B\uFF1F\u3054\u90FD\u5408\u3092\u6559\u3048\u3066\u304F\u3060\u3055\u3044\u3002\n\u98A8\u90AA\u3092\u3072\u3044\u305F\u306E\u3067\u3001\u4ECA\u65E5\u306F\u4F11\u307F\u307E\u3059\u3002\n\u6B21\u306F\u65B0\u5BBF\u99C5\u3067\u3059\u3002\u96FB\u8ECA\u306F\u53F3\u5074\u306E\u30C9\u30A2\u304C\u958B\u304D\u307E\u3059\u3002\n\u55B6\u696D\u6642\u9593\uFF1A\u5348\u524D11\u6642\u304B\u3089\u5348\u5F8C10\u6642\u307E\u3067\u3001\u6C34\u66DC\u65E5\u5B9A\u4F11\u65E5",
      translation: "Dear Mr. Tanaka, Thank you for your continued support. I am attaching the minutes of the recent meeting. Please check them.\nCan you attend tomorrow's meeting? Please let me know your availability.\nI've caught a cold, so I'll take the day off today.\nThe next station is Shinjuku. The doors will open on the right side of the train.\nBusiness hours: 11 AM to 10 PM, closed on Wednesdays.",
      vocabulary: [
        {
          word: "\u304A\u4E16\u8A71\u306B\u306A\u3063\u3066\u304A\u308A\u307E\u3059",
          reading: "\u304A\u305B\u308F\u306B\u306A\u3063\u3066\u304A\u308A\u307E\u3059",
          meaning: "Thank you for your support (business formal)",
          example: "\u3044\u3064\u3082\u304A\u4E16\u8A71\u306B\u306A\u3063\u3066\u304A\u308A\u307E\u3059\u3002 - Thank you for your continued support."
        },
        {
          word: "\u8B70\u4E8B\u9332",
          reading: "\u304E\u3058\u308D\u304F",
          meaning: "Minutes (of a meeting)",
          example: "\u4F1A\u8B70\u306E\u8B70\u4E8B\u9332\u3092\u53D6\u308A\u307E\u3057\u305F\u3002 - I took minutes of the meeting."
        },
        {
          word: "\u51FA\u5E2D",
          reading: "\u3057\u3085\u3063\u305B\u304D",
          meaning: "Attendance",
          example: "\u4F1A\u8B70\u306B\u51FA\u5E2D\u3059\u308B\u4E88\u5B9A\u3067\u3059\u3002 - I plan to attend the meeting."
        },
        {
          word: "\u98A8\u90AA\u3092\u3072\u304F",
          reading: "\u304B\u305C\u3092\u3072\u304F",
          meaning: "To catch a cold",
          example: "\u6628\u65E5\u304B\u3089\u98A8\u90AA\u3092\u3072\u3044\u3066\u3044\u307E\u3059\u3002 - I've had a cold since yesterday."
        },
        {
          word: "\u55B6\u696D\u6642\u9593",
          reading: "\u3048\u3044\u304E\u3087\u3046\u3058\u304B\u3093",
          meaning: "Business hours",
          example: "\u55B6\u696D\u6642\u9593\u306F\u4F55\u6642\u307E\u3067\u3067\u3059\u304B\uFF1F - Until what time are your business hours?"
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
      lyrics: "\u8FD1\u5E74\u3001\u65E5\u672C\u3067\u306F\u5C11\u5B50\u9AD8\u9F62\u5316\u304C\u9032\u307F\u3001\u793E\u4F1A\u4FDD\u969C\u5236\u5EA6\u306E\u898B\u76F4\u3057\u304C\u8AB2\u984C\u3068\u306A\u3063\u3066\u3044\u308B\u3002\n1945\u5E748\u6708\u3001\u5E83\u5CF6\u3068\u9577\u5D0E\u306B\u539F\u5B50\u7206\u5F3E\u304C\u6295\u4E0B\u3055\u308C\u3001\u591A\u304F\u306E\u4EBA\u3005\u304C\u4EA1\u304F\u306A\u3063\u305F\u3002\n\u4ECA\u5F8C\u3068\u3082\u3054\u6307\u5C0E\u3054\u97AD\u64BB\u306E\u307B\u3069\u3001\u3088\u308D\u3057\u304F\u304A\u9858\u3044\u7533\u3057\u4E0A\u3052\u307E\u3059\u3002\n\u300C\u3082\u3063\u305F\u3044\u306A\u3044\u300D\u3068\u3044\u3046\u8A00\u8449\u306F\u3001\u7269\u3092\u5927\u5207\u306B\u3059\u308B\u65E5\u672C\u306E\u4F1D\u7D71\u7684\u306A\u4FA1\u5024\u89B3\u3092\u8868\u3057\u3066\u3044\u308B\u3002\n\u73FE\u4EE3\u306E\u6280\u8853\u767A\u5C55\u306F\u79C1\u305F\u3061\u306E\u751F\u6D3B\u3092\u4FBF\u5229\u306B\u3059\u308B\u4E00\u65B9\u3067\u3001\u65B0\u305F\u306A\u554F\u984C\u3082\u751F\u307F\u51FA\u3057\u3066\u3044\u308B\u3002",
      translation: "In recent years, Japan has been facing an aging population with declining birthrates, and reviewing the social security system has become a challenge.\nIn August 1945, atomic bombs were dropped on Hiroshima and Nagasaki, and many people died.\nWe look forward to your continued guidance and support.\nThe word 'mottainai' represents the traditional Japanese value of treasuring things and not being wasteful.\nWhile modern technological development makes our lives convenient, it also creates new problems.",
      vocabulary: [
        {
          word: "\u5C11\u5B50\u9AD8\u9F62\u5316",
          reading: "\u3057\u3087\u3046\u3057\u3053\u3046\u308C\u3044\u304B",
          meaning: "Declining birthrate and aging population",
          example: "\u5C11\u5B50\u9AD8\u9F62\u5316\u306F\u65E5\u672C\u306E\u5927\u304D\u306A\u793E\u4F1A\u554F\u984C\u3067\u3059\u3002 - The declining birthrate and aging population is a major social issue in Japan."
        },
        {
          word: "\u793E\u4F1A\u4FDD\u969C",
          reading: "\u3057\u3083\u304B\u3044\u307B\u3057\u3087\u3046",
          meaning: "Social security",
          example: "\u793E\u4F1A\u4FDD\u969C\u5236\u5EA6\u306E\u6539\u9769\u304C\u5FC5\u8981\u3067\u3059\u3002 - Reform of the social security system is necessary."
        },
        {
          word: "\u3054\u6307\u5C0E\u3054\u97AD\u64BB",
          reading: "\u3054\u3057\u3069\u3046\u3054\u3079\u3093\u305F\u3064",
          meaning: "Guidance and encouragement (formal business expression)",
          example: "\u4ECA\u5F8C\u3068\u3082\u3054\u6307\u5C0E\u3054\u97AD\u64BB\u306E\u307B\u3069\u3088\u308D\u3057\u304F\u304A\u9858\u3044\u3044\u305F\u3057\u307E\u3059\u3002 - We look forward to your continued guidance and encouragement."
        },
        {
          word: "\u3082\u3063\u305F\u3044\u306A\u3044",
          reading: "\u3082\u3063\u305F\u3044\u306A\u3044",
          meaning: "Wasteful",
          example: "\u98DF\u3079\u7269\u3092\u6368\u3066\u308B\u306E\u306F\u3082\u3063\u305F\u3044\u306A\u3044\u3067\u3059\u3002 - It's wasteful to throw away food."
        },
        {
          word: "\u6280\u8853\u767A\u5C55",
          reading: "\u304E\u3058\u3085\u3064\u306F\u3063\u3066\u3093",
          meaning: "Technological development",
          example: "\u8FD1\u5E74\u306E\u6280\u8853\u767A\u5C55\u306F\u76EE\u899A\u307E\u3057\u3044\u3067\u3059\u3002 - Recent technological development has been remarkable."
        }
      ]
    },
    difficulty: "advanced"
  },
  {
    id: 12,
    title: "\u6674\u308B (Haru) - Yorushika",
    description: "Learn Japanese through this poetic song by Yorushika about weather, emotions, and the coming of spring",
    type: "song",
    mediaUrl: "https://www.youtube.com/embed/CkvWJNt77mU?si=lzlYMKolhJ2lB68i",
    content: {
      lyrics: "\u8CB4\u65B9\u306F\u98A8\u306E\u3088\u3046\u306B\n\u76EE\u3092\u9589\u3058\u3066\u306F\u5915\u66AE\u308C\n\u4F55\u3092\u601D\u3063\u3066\u3044\u308B\u3093\u3060\u308D\u3046\u304B\n\u76EE\u84CB\u3092\u958B\u3044\u3066\u3044\u305F\n\u8CB4\u65B9\u306E\u76EE\u306F\u30D3\u30A4\u30C9\u30ED\n\u5C11\u3057\u3060\u3051\u6674\u308B\u306E\u5302\u3044\u304C\u3057\u305F\n\u6674\u308C\u306B\u6674\u308C \u82B1\u3088\u54B2\u3051\n\u54B2\u3044\u3066\u6674\u308B\u306E\u305B\u3044\n\u964D\u308A\u6B62\u3081\u3070\u96E8\u3067\u3055\u3048\n\u8CB4\u65B9\u3092\u98FE\u308B\u6674\u308B\n\u80F8\u3092\u6253\u3064\u97F3\u3088\u51EA\u3052\n\u50D5\u3089\u6674\u308B\u98A8\n\u3042\u306E\u96F2\u3082\u8D8A\u3048\u3066\u3086\u3051\n\u9060\u304F\u307E\u3060\u9060\u304F\u307E\u3067\n\u8CB4\u65B9\u306F\u6674\u308C\u6A21\u69D8\u306B\n\u76EE\u3092\u9589\u3058\u3066\u306F\u9752\u8272\n\u4F55\u304C\u60B2\u3057\u3044\u306E\u3060\u308D\u3046\u304B\n\u76EE\u84CB\u3092\u958B\u3044\u3066\u3044\u308B\n\u8CB4\u65B9\u306E\u76EE\u306B\u30D3\u30A4\u30C9\u30ED\n\u4ECA\u5C11\u3057\u96E8\u306E\u5302\u3044\u304C\u3057\u305F\n\u6CE3\u304D\u306B\u6CE3\u3051 \u7A7A\u3088\u6CE3\u3051\n\u6CE3\u3044\u3066\u96E8\u306E\u305B\u3044\n\u964D\u308A\u983B\u308B\u96E8\u3067\u3055\u3048\n\u96F2\u306E\u4E0A\u3067\u306F\u6674\u308B\n\u571F\u3092\u6253\u3064\u97F3\u3088\u9CF4\u308C\n\u50D5\u3089\u6625\u8352\u308C\n\u3042\u306E\u6D77\u3082\u8D8A\u3048\u3066\u3086\u304F\n\u9060\u304F\u307E\u3060\u9060\u304F\u307E\u3067\n\u901A\u308A\u96E8 \u8349\u3092\u9761\u304B\u305B\n\u7F8A\u96F2 \u3042\u308C\u3082\u6625\u306E\u305B\u3044\n\u98A8\u306E\u3088\u3046 \u80F8\u306B\u6625\u4E57\u305B\n\u6674\u308B\u3092\u5F85\u3064\n\u6674\u308C\u306B\u6674\u308C \u7A7A\u3088\u88C2\u3051\n\u88C2\u3044\u3066\u6625\u306E\u305B\u3044\n\u964D\u308A\u6B62\u3081\u3070\u96E8\u3067\u3055\u3048\n\u8CB4\u65B9\u3092\u98FE\u308B\u6674\u308B\n\u80F8\u3092\u6253\u3064\u97F3\u594F\u3067\n\u50D5\u3089\u6625\u98A8\n\u97F3\u306B\u805E\u304F\u6674\u308B\u306E\u98A8\n\u3055\u3041\u3053\u306E\u6B4C\u3088\u51EA\u3052\uFF01\n\u6674\u308C\u306B\u6674\u308C \u82B1\u3088\u54B2\u3051\n\u54B2\u3044\u3066\u6625\u306E\u305B\u3044\n\u3042\u306E\u96F2\u3082\u8D8A\u3048\u3066\u3086\u3051\n\u9060\u304F\u307E\u3060\u9060\u304F\u307E\u3067",
      translation: "You are like the wind\nClosing your eyes at dusk\nWhat are you thinking about?\nYour eyelids were open\nYour eyes are like glass\nI could smell a little of clearing weather\nClear up, clear up, flowers bloom\nBlooming because of the clearing weather\nEven the rain when it stops\nThe clear weather adorns you\nThe sound that strikes the heart, calm down\nWe are the clearing wind\nLet's go beyond those clouds\nTo far, still far away\n\nYou are in a clear pattern\nClosing your eyes to blue\nWhat could be sad?\nWith your eyelids open\nGlass in your eyes\nNow I smelled a little rain\nCry and cry, sky cry\nCrying because of the rain\nEven the frequently falling rain\nAbove the clouds it's clear\nSound striking the earth, ring out\nWe are the spring storm\nWe'll cross that sea too\nTo far, still far away\n\nA passing shower, bending the grass\nSheep-like clouds, that too is because of spring\nLike the wind, spring riding on our hearts\nWaiting for the weather to clear\nClear up, clear up, sky break open\nBreaking open because of spring\nEven the rain when it stops\nThe clear weather adorns you\nPlaying the sound that strikes the heart\nWe are the spring breeze\nHearing the sound of the clearing wind\nCome on, let this song calm down!\nClear up, clear up, flowers bloom\nBlooming because of spring\nLet's go beyond those clouds\nTo far, still far away",
      vocabulary: [
        {
          word: "\u8CB4\u65B9",
          reading: "\u3042\u306A\u305F",
          meaning: "You",
          example: "\u8CB4\u65B9\u306F\u3069\u3053\u304B\u3089\u6765\u307E\u3057\u305F\u304B\uFF1F - Where did you come from?"
        },
        {
          word: "\u98A8",
          reading: "\u304B\u305C",
          meaning: "Wind",
          example: "\u5F37\u3044\u98A8\u304C\u5439\u3044\u3066\u3044\u308B - A strong wind is blowing"
        },
        {
          word: "\u76EE\u3092\u9589\u3058\u308B",
          reading: "\u3081\u3092\u3068\u3058\u308B",
          meaning: "To close one's eyes",
          example: "\u7791\u60F3\u3059\u308B\u3068\u304D\u306F\u76EE\u3092\u9589\u3058\u307E\u3059 - Close your eyes when you meditate"
        },
        {
          word: "\u5915\u66AE\u308C",
          reading: "\u3086\u3046\u3050\u308C",
          meaning: "Dusk, twilight",
          example: "\u5915\u66AE\u308C\u6642\u306E\u7A7A\u306F\u7F8E\u3057\u3044 - The sky at dusk is beautiful"
        },
        {
          word: "\u601D\u3046",
          reading: "\u304A\u3082\u3046",
          meaning: "To think, to feel",
          example: "\u3042\u306A\u305F\u306E\u3053\u3068\u3092\u601D\u3063\u3066\u3044\u307E\u3059 - I am thinking of you"
        },
        {
          word: "\u76EE\u84CB",
          reading: "\u307E\u3076\u305F",
          meaning: "Eyelid",
          example: "\u75B2\u308C\u308B\u3068\u76EE\u84CB\u304C\u91CD\u304F\u306A\u308B - When tired, eyelids become heavy"
        },
        {
          word: "\u30D3\u30A4\u30C9\u30ED",
          reading: "\u3073\u3044\u3069\u308D",
          meaning: "Glass (old Japanese word from Portuguese 'vidro')",
          example: "\u30D3\u30A4\u30C9\u30ED\u306E\u3088\u3046\u306A\u900F\u660E\u306A\u6C34 - Water as transparent as glass"
        },
        {
          word: "\u5302\u3044",
          reading: "\u306B\u304A\u3044",
          meaning: "Smell, scent",
          example: "\u82B1\u306E\u5302\u3044\u304C\u3059\u308B - There is a smell of flowers"
        },
        {
          word: "\u6674\u308C\u308B",
          reading: "\u306F\u308C\u308B",
          meaning: "To clear up (weather)",
          example: "\u96E8\u304C\u6B62\u3093\u3067\u7A7A\u304C\u6674\u308C\u308B - The rain stops and the sky clears"
        },
        {
          word: "\u6674\u308B",
          reading: "\u306F\u308B",
          meaning: "To clear up (poetic form used in this song)",
          example: "\u7A7A\u304C\u6674\u308B\u306E\u3092\u5F85\u3064 - Waiting for the sky to clear"
        },
        {
          word: "\u82B1",
          reading: "\u306F\u306A",
          meaning: "Flower",
          example: "\u6625\u306B\u306A\u308B\u3068\u82B1\u304C\u54B2\u304F - Flowers bloom when spring comes"
        },
        {
          word: "\u54B2\u304F",
          reading: "\u3055\u304F",
          meaning: "To bloom",
          example: "\u685C\u304C\u54B2\u3044\u3066\u3044\u308B - The cherry blossoms are blooming"
        },
        {
          word: "\u964D\u308A\u6B62\u3080",
          reading: "\u3075\u308A\u3084\u3080",
          meaning: "To stop falling (rain/snow)",
          example: "\u96E8\u304C\u964D\u308A\u6B62\u3093\u3060 - The rain has stopped"
        },
        {
          word: "\u98FE\u308B",
          reading: "\u304B\u3056\u308B",
          meaning: "To decorate, to adorn",
          example: "\u90E8\u5C4B\u3092\u82B1\u3067\u98FE\u308B - To decorate a room with flowers"
        },
        {
          word: "\u80F8\u3092\u6253\u3064",
          reading: "\u3080\u306D\u3092\u3046\u3064",
          meaning: "To touch one's heart, to be moving",
          example: "\u5F7C\u306E\u8A71\u306F\u80F8\u3092\u6253\u3063\u305F - His story was moving"
        },
        {
          word: "\u51EA\u3050",
          reading: "\u306A\u3050",
          meaning: "To become calm (wind/waves)",
          example: "\u98A8\u304C\u51EA\u3044\u3060 - The wind has calmed down"
        },
        {
          word: "\u96F2",
          reading: "\u304F\u3082",
          meaning: "Cloud",
          example: "\u96F2\u304C\u7A7A\u3092\u8986\u3063\u3066\u3044\u308B - Clouds are covering the sky"
        },
        {
          word: "\u8D8A\u3048\u308B",
          reading: "\u3053\u3048\u308B",
          meaning: "To cross over, to go beyond",
          example: "\u5C71\u3092\u8D8A\u3048\u308B - To cross over a mountain"
        },
        {
          word: "\u9060\u304F",
          reading: "\u3068\u304A\u304F",
          meaning: "Far away, distance",
          example: "\u9060\u304F\u306B\u884C\u304F - To go far away"
        },
        {
          word: "\u6674\u308C\u6A21\u69D8",
          reading: "\u306F\u308C\u3082\u3088\u3046",
          meaning: "Clear weather pattern",
          example: "\u4ECA\u65E5\u306F\u6674\u308C\u6A21\u69D8\u3060 - Today has a clear weather pattern"
        },
        {
          word: "\u9752\u8272",
          reading: "\u3042\u304A\u3044\u308D",
          meaning: "Blue color",
          example: "\u7A7A\u306F\u9752\u8272\u3060 - The sky is blue"
        },
        {
          word: "\u60B2\u3057\u3044",
          reading: "\u304B\u306A\u3057\u3044",
          meaning: "Sad",
          example: "\u60B2\u3057\u3044\u6C17\u6301\u3061 - Sad feeling"
        },
        {
          word: "\u6CE3\u304F",
          reading: "\u306A\u304F",
          meaning: "To cry",
          example: "\u5B50\u4F9B\u304C\u6CE3\u3044\u3066\u3044\u308B - The child is crying"
        },
        {
          word: "\u964D\u308A\u983B\u308B",
          reading: "\u3075\u308A\u3057\u304D\u308B",
          meaning: "To fall heavily (rain/snow)",
          example: "\u96E8\u304C\u964D\u308A\u983B\u308B - Rain falls heavily"
        },
        {
          word: "\u571F",
          reading: "\u3064\u3061",
          meaning: "Earth, soil",
          example: "\u80A5\u6C83\u306A\u571F - Fertile soil"
        },
        {
          word: "\u9CF4\u308B",
          reading: "\u306A\u308B",
          meaning: "To sound, to ring",
          example: "\u9418\u304C\u9CF4\u308B - The bell rings"
        },
        {
          word: "\u6625\u8352\u308C",
          reading: "\u306F\u308B\u3042\u308C",
          meaning: "Spring storm",
          example: "\u6625\u8352\u308C\u306E\u5B63\u7BC0 - The season of spring storms"
        },
        {
          word: "\u6D77",
          reading: "\u3046\u307F",
          meaning: "Sea, ocean",
          example: "\u5E83\u3044\u6D77 - Vast ocean"
        },
        {
          word: "\u901A\u308A\u96E8",
          reading: "\u3068\u304A\u308A\u3042\u3081",
          meaning: "Passing shower",
          example: "\u901A\u308A\u96E8\u3067\u5C11\u3057\u6FE1\u308C\u305F - Got a little wet in a passing shower"
        },
        {
          word: "\u8349",
          reading: "\u304F\u3055",
          meaning: "Grass",
          example: "\u8349\u304C\u8302\u3063\u3066\u3044\u308B - The grass is thick"
        },
        {
          word: "\u9761\u304F",
          reading: "\u306A\u3073\u304F",
          meaning: "To wave, to flutter (in wind)",
          example: "\u98A8\u306B\u9761\u304F\u65D7 - Flag fluttering in the wind"
        },
        {
          word: "\u7F8A\u96F2",
          reading: "\u3072\u3064\u3058\u3050\u3082",
          meaning: "Cirrocumulus clouds (sheep-like clouds)",
          example: "\u7A7A\u306B\u7F8A\u96F2\u304C\u6D6E\u304B\u3093\u3067\u3044\u308B - Sheep-like clouds are floating in the sky"
        },
        {
          word: "\u6625",
          reading: "\u306F\u308B",
          meaning: "Spring",
          example: "\u6625\u304C\u6765\u305F - Spring has come"
        },
        {
          word: "\u4E57\u305B\u308B",
          reading: "\u306E\u305B\u308B",
          meaning: "To place on, to carry",
          example: "\u5E0C\u671B\u3092\u80F8\u306B\u4E57\u305B\u308B - To carry hope in one's heart"
        },
        {
          word: "\u5F85\u3064",
          reading: "\u307E\u3064",
          meaning: "To wait",
          example: "\u53CB\u9054\u3092\u5F85\u3064 - To wait for a friend"
        },
        {
          word: "\u88C2\u3051\u308B",
          reading: "\u3055\u3051\u308B",
          meaning: "To tear, to split open",
          example: "\u5E03\u304C\u88C2\u3051\u308B - The cloth tears"
        },
        {
          word: "\u594F\u3067\u308B",
          reading: "\u304B\u306A\u3067\u308B",
          meaning: "To play (music)",
          example: "\u30D4\u30A2\u30CE\u3092\u594F\u3067\u308B - To play the piano"
        },
        {
          word: "\u6625\u98A8",
          reading: "\u306F\u308B\u304B\u305C",
          meaning: "Spring breeze",
          example: "\u6625\u98A8\u304C\u982C\u3092\u64AB\u3067\u308B - Spring breeze caresses the cheek"
        }
      ]
    },
    difficulty: "advanced"
  }
];
function getAllLessons() {
  return lessons;
}
function getLessonById(id) {
  return lessons.find((lesson) => lesson.id === id);
}

// server/data/quizzes.ts
var quizzes = [
  {
    id: 1,
    lessonId: 1,
    tags: ["vocabulary"],
    questions: [
      {
        text: "What does '\u6CE5\u3060\u3089\u3051' mean?",
        options: ["Covered in mud", "Covered in snow", "Covered in water", "Covered in dust"],
        answer: "Covered in mud"
      },
      {
        text: "What does '\u8D70\u99AC\u706F' (\u305D\u3046\u307E\u3068\u3046) mean?",
        options: ["Lantern parade", "Street light", "Firefly", "Candlelight"],
        answer: "Lantern parade"
      },
      {
        text: "What is the meaning of '\u3053\u308F\u3070\u308B'?",
        options: ["To become stiff", "To become soft", "To become warm", "To become cold"],
        answer: "To become stiff"
      },
      {
        text: "Complete the lyric: '\u9707\u3048\u308B\u624B\u306F_____\u3082\u306E\u304C\u3042\u308B'",
        options: ["\u63B4\u307F\u305F\u3044", "\u898B\u305F\u3044", "\u805E\u304D\u305F\u3044", "\u8A71\u3057\u305F\u3044"],
        answer: "\u63B4\u307F\u305F\u3044"
      },
      {
        text: "What is the meaning of '\u7A7A\u7768\u3093\u3067\u3082'?",
        options: ["Even if I glare at the sky", "Even if I look up", "Even if I smile", "Even if I cry"],
        answer: "Even if I glare at the sky"
      }
    ]
  },
  {
    id: 2,
    lessonId: 2,
    tags: ["vocabulary"],
    questions: [
      {
        text: "What does '\u5922' (\u3086\u3081) mean?",
        options: ["Dream", "Memory", "Song", "Lemon"],
        answer: "Dream"
      },
      {
        text: "What is the correct reading for '\u672A\u3060\u306B'?",
        options: ["\u3044\u307E\u3060\u306B", "\u307F\u3060\u306B", "\u307E\u3060\u306B", "\u3044\u307E\u306B"],
        answer: "\u3044\u307E\u3060\u306B"
      },
      {
        text: "Complete the lyric: '\u672A\u3060\u306B\u3042\u306A\u305F\u306E\u3053\u3068\u3092_____'",
        options: ["\u5922\u306B\u307F\u308B", "\u601D\u3044\u51FA\u3059", "\u5FD8\u308C\u306A\u3044", "\u611B\u3057\u3066\u308B"],
        answer: "\u5922\u306B\u307F\u308B"
      },
      {
        text: "What does '\u57C3' (\u307B\u3053\u308A) mean?",
        options: ["Dust", "Memory", "Dream", "Light"],
        answer: "Dust"
      },
      {
        text: "Which phrase means 'to dust off'?",
        options: ["\u57C3\u3092\u6255\u3046", "\u57C3\u3092\u898B\u308B", "\u57C3\u3092\u96C6\u3081\u308B", "\u57C3\u3092\u4F5C\u308B"],
        answer: "\u57C3\u3092\u6255\u3046"
      }
    ]
  },
  {
    id: 3,
    lessonId: 3,
    tags: ["vocabulary", "phrases"],
    questions: [
      {
        text: "What does '\u99C6\u3051\u308B' (\u304B\u3051\u308B) mean?",
        options: ["To run", "To sing", "To sleep", "To eat"],
        answer: "To run"
      },
      {
        text: "What is the meaning of '\u3072\u3068\u308A\u304D\u308A'?",
        options: ["All alone", "Together", "With friends", "In a group"],
        answer: "All alone"
      },
      {
        text: "Complete the lyric: '\u591C\u306B\u99C6\u3051\u308B\u306E\u306F\u6C7A\u307E\u3063\u3066\u6C7A\u307E\u3063\u3066_____'",
        options: ["\u3072\u3068\u308A\u304D\u308A", "\u308F\u305F\u3057\u305F\u3061", "\u304B\u308C\u3089", "\u307F\u3093\u306A"],
        answer: "\u3072\u3068\u308A\u304D\u308A"
      },
      {
        text: "What does '\u305D\u306E\u9803' (\u305D\u306E\u3053\u308D) refer to?",
        options: ["At that time", "This place", "That person", "Those things"],
        answer: "At that time"
      },
      {
        text: "Which word means 'without fail' or 'always'?",
        options: ["\u6C7A\u307E\u3063\u3066", "\u99C6\u3051\u308B", "\u3072\u3068\u308A\u304D\u308A", "\u601D\u3046"],
        answer: "\u6C7A\u307E\u3063\u3066"
      }
    ]
  },
  {
    id: 4,
    lessonId: 4,
    tags: ["vocabulary", "phrases"],
    questions: [
      {
        text: "What does '\u5909\u308F\u3089\u305A' (\u304B\u308F\u3089\u305A) mean?",
        options: ["Without changing", "Slowly", "Quickly", "Forever"],
        answer: "Without changing"
      },
      {
        text: "What is the correct meaning of '\u4F1D\u3048\u305F\u3044'?",
        options: ["Want to tell", "Want to see", "Want to go", "Want to hear"],
        answer: "Want to tell"
      },
      {
        text: "Complete the lyric: '\u4ECA\u3082\u5909\u308F\u3089\u305A\u3042\u306A\u305F\u3092_____'",
        options: ["\u597D\u304D\u3067\u3044\u308B", "\u5F85\u3063\u3066\u3044\u308B", "\u5FD8\u308C\u3066\u3044\u308B", "\u898B\u3066\u3044\u308B"],
        answer: "\u597D\u304D\u3067\u3044\u308B"
      },
      {
        text: "What does '\u3055\u307F\u3057\u304F' describe in the song?",
        options: ["Walking alone", "Waiting", "Sleeping", "Meeting"],
        answer: "Walking alone"
      },
      {
        text: "Which phrase relates to weather in the song?",
        options: ["\u96E8\u304C\u964D\u308A\u51FA\u3057\u305F", "\u98A8\u304C\u5439\u3044\u305F", "\u96EA\u304C\u7A4D\u3082\u3063\u305F", "\u65E5\u304C\u6C88\u3093\u3060"],
        answer: "\u96E8\u304C\u964D\u308A\u51FA\u3057\u305F"
      }
    ]
  },
  {
    id: 5,
    lessonId: 5,
    tags: ["vocabulary", "anime"],
    questions: [
      {
        text: "What does '\u540D\u524D' (\u306A\u307E\u3048) mean?",
        options: ["Name", "Memory", "Dream", "Future"],
        answer: "Name"
      },
      {
        text: "What is the correct reading for '\u547C\u3076'?",
        options: ["\u3088\u3076", "\u304F\u308B", "\u306A\u307E\u3048", "\u3042\u3046"],
        answer: "\u3088\u3076"
      },
      {
        text: "Complete the lyric: '\u8AB0\u304B\u306E\u540D\u524D\u3092_____'",
        options: ["\u547C\u3093\u3067\u3044\u305F", "\u899A\u3048\u3066\u3044\u305F", "\u5FD8\u308C\u3066\u3044\u305F", "\u66F8\u3044\u3066\u3044\u305F"],
        answer: "\u547C\u3093\u3067\u3044\u305F"
      },
      {
        text: "What does '\u8A18\u61B6' (\u304D\u304A\u304F) mean?",
        options: ["Memory", "Name", "Meeting", "Calling"],
        answer: "Memory"
      },
      {
        text: "Which phrase means 'wanted to meet' in Japanese?",
        options: ["\u4F1A\u3044\u305F\u304B\u3063\u305F", "\u547C\u3093\u3067\u3044\u305F", "\u5FD8\u308C\u3066\u3044\u305F", "\u898B\u3066\u3044\u305F"],
        answer: "\u4F1A\u3044\u305F\u304B\u3063\u305F"
      }
    ]
  },
  {
    id: 6,
    lessonId: 6,
    tags: ["grammar", "advanced"],
    questions: [
      {
        text: "In the phrase '\u5149\u308B\u306A\u3089', what grammatical function does '\u306A\u3089' serve?",
        options: ["Conditional ('if')", "Past tense marker", "Question marker", "Imperative (command)"],
        answer: "Conditional ('if')"
      },
      {
        text: "What is the difference between '\u301C\u306A\u3089' and '\u301C\u308C\u3070', both found in the song?",
        options: [
          "'\u301C\u306A\u3089' is more hypothetical, '\u301C\u308C\u3070' is more definite",
          "They are completely different grammatical structures",
          "One is formal and one is informal",
          "There is no difference"
        ],
        answer: "'\u301C\u306A\u3089' is more hypothetical, '\u301C\u308C\u3070' is more definite"
      },
      {
        text: "In '\u99C6\u3051\u3066\u3044\u304F\u3088', what does the '\u301C\u3066\u3044\u304F' pattern indicate?",
        options: [
          "Movement away or continuing action",
          "Past experience",
          "Obligation or necessity",
          "Ability"
        ],
        answer: "Movement away or continuing action"
      },
      {
        text: "In the phrase '\u7167\u3089\u3057\u3066\u308B', what is the full, non-contracted form?",
        options: [
          "\u7167\u3089\u3057\u3066\u3044\u308B",
          "\u7167\u3089\u3057\u305F",
          "\u7167\u3089\u3059",
          "\u7167\u3089\u305B\u308B"
        ],
        answer: "\u7167\u3089\u3057\u3066\u3044\u308B"
      },
      {
        text: "What would be the appropriate negative form of '\u76EE\u3092\u9589\u3058\u308C\u3070'?",
        options: [
          "\u76EE\u3092\u9589\u3058\u306A\u3051\u308C\u3070",
          "\u76EE\u3092\u9589\u3058\u308C\u306A\u3044",
          "\u76EE\u3092\u9589\u3058\u306A\u3044\u306A\u3089",
          "\u76EE\u3092\u9589\u3058\u306A\u3044\u308C\u3070"
        ],
        answer: "\u76EE\u3092\u9589\u3058\u306A\u3051\u308C\u3070"
      },
      {
        text: "Transform the sentence '\u541B\u306E\u3082\u3068\u3078\u99C6\u3051\u3066\u3044\u304F\u3088' into the past tense.",
        options: [
          "\u541B\u306E\u3082\u3068\u3078\u99C6\u3051\u3066\u3044\u3063\u305F\u3088",
          "\u541B\u306E\u3082\u3068\u3078\u99C6\u3051\u305F\u3088",
          "\u541B\u306E\u3082\u3068\u3078\u99C6\u3051\u3066\u3044\u305F\u3088",
          "\u541B\u306E\u3082\u3068\u3078\u99C6\u3051\u3066\u304D\u305F\u3088"
        ],
        answer: "\u541B\u306E\u3082\u3068\u3078\u99C6\u3051\u3066\u3044\u3063\u305F\u3088"
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
        text: "Read and choose the correct meaning of this text: '\u79C1\u306E\u540D\u524D\u306F\u7530\u4E2D\u3067\u3059\u3002'",
        options: ["My name is Tanaka.", "His name is Tanaka.", "Her name is Tanaka.", "Their names are Tanaka."],
        answer: "My name is Tanaka."
      },
      {
        text: "What does '\u5B66\u751F' mean in '\u79C1\u306F\u5B66\u751F\u3067\u3059\u3002'?",
        options: ["Student", "Teacher", "Doctor", "Office worker"],
        answer: "Student"
      },
      {
        text: "Choose the correct translation: '\u4ECA\u65E5\u306F\u5929\u6C17\u304C\u3044\u3044\u3067\u3059\u3002'",
        options: ["The weather is nice today.", "The weather was nice yesterday.", "The weather will be nice tomorrow.", "The weather is bad today."],
        answer: "The weather is nice today."
      },
      {
        text: "What time is expressed in this sentence: '7\u6642\u306B\u8D77\u304D\u307E\u3059\u3002'?",
        options: ["7:00", "8:00", "7:30", "7:15"],
        answer: "7:00"
      },
      {
        text: "What is being described in this sentence: '\u79C1\u306E\u90E8\u5C4B\u306F\u5C0F\u3055\u3044\u3067\u3059\u3002'?",
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
        text: "Read the following text and determine what Yuki usually does on weekends: '\u79C1\u306E\u540D\u524D\u306F\u30E6\u30AD\u3067\u3059\u3002\u9031\u672B\u306B\u3001\u3088\u304F\u516C\u5712\u306B\u884C\u304D\u307E\u3059\u3002'",
        options: ["Goes to the park", "Stays at home", "Studies at the library", "Visits friends"],
        answer: "Goes to the park"
      },
      {
        text: "What does Takeshi like according to this sentence: '\u79C1\u306E\u53CB\u9054\u306E\u6B66\u306F\u72AC\u304C\u597D\u304D\u3067\u3059\u3002'?",
        options: ["Dogs", "Cats", "Birds", "Fish"],
        answer: "Dogs"
      },
      {
        text: "Read and select what you need to buy according to this text: '\u30B9\u30FC\u30D1\u30FC\u306B\u884C\u3063\u3066\u3001\u725B\u4E73\u3068\u30D1\u30F3\u3092\u8CB7\u3063\u3066\u304F\u3060\u3055\u3044\u3002'",
        options: ["Milk and bread", "Eggs and cheese", "Vegetables and fruit", "Meat and fish"],
        answer: "Milk and bread"
      },
      {
        text: "What season is described in this sentence: '\u4ECA\u306F\u590F\u3067\u3059\u3002\u3068\u3066\u3082\u6691\u3044\u3067\u3059\u3002'?",
        options: ["Summer", "Winter", "Spring", "Fall"],
        answer: "Summer"
      },
      {
        text: "What is the relationship between the speakers in this dialogue: 'A: \u5148\u751F\u3001\u304A\u306F\u3088\u3046\u3054\u3056\u3044\u307E\u3059\u3002B: \u304A\u306F\u3088\u3046\u3001\u9234\u6728\u3055\u3093\u3002'?",
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
        text: "Read this passage and answer: '\u6628\u65E5\u3001\u53CB\u9054\u3068\u6620\u753B\u3092\u898B\u306B\u884C\u304D\u307E\u3057\u305F\u3002\u3068\u3066\u3082\u9762\u767D\u304B\u3063\u305F\u3067\u3059\u3002' What did the person do yesterday?",
        options: ["Went to see a movie with a friend", "Went shopping with a friend", "Studied with a friend", "Ate dinner with a friend"],
        answer: "Went to see a movie with a friend"
      },
      {
        text: "What does this sign mean? '\u7ACB\u5165\u7981\u6B62'",
        options: ["No entry", "Exit only", "Caution", "Emergency exit"],
        answer: "No entry"
      },
      {
        text: "Read and interpret: '\u96FB\u8ECA\u306E\u4E2D\u3067\u643A\u5E2F\u96FB\u8A71\u3067\u8A71\u3055\u306A\u3044\u3067\u304F\u3060\u3055\u3044\u3002'",
        options: ["Please don't talk on your cell phone on the train.", "Please turn off your cell phone on the train.", "Please use your cell phone on the train.", "Please charge your cell phone on the train."],
        answer: "Please don't talk on your cell phone on the train."
      },
      {
        text: "What is the main idea of this text? '\u65E5\u672C\u306E\u56DB\u5B63\u306F\u6625\u3001\u590F\u3001\u79CB\u3001\u51AC\u3067\u3059\u3002\u6625\u306F\u685C\u304C\u304D\u308C\u3044\u3067\u3059\u3002'",
        options: ["Japan has four seasons and cherry blossoms are beautiful in spring.", "Japan only has spring season.", "Cherry blossoms bloom in all seasons in Japan.", "Japan has different flowers for each season."],
        answer: "Japan has four seasons and cherry blossoms are beautiful in spring."
      },
      {
        text: "What will the weather be like tomorrow according to this forecast? '\u660E\u65E5\u306E\u5929\u6C17\u4E88\u5831\uFF1A\u6771\u4EAC\u306F\u96E8\u304C\u964D\u308B\u3067\u3057\u3087\u3046\u3002\u5098\u3092\u6301\u3063\u3066\u3044\u3063\u3066\u304F\u3060\u3055\u3044\u3002'",
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
        text: "Read this email excerpt and determine its purpose: '\u7530\u4E2D\u69D8\u3001\u304A\u4E16\u8A71\u306B\u306A\u3063\u3066\u304A\u308A\u307E\u3059\u3002\u5148\u65E5\u306E\u4F1A\u8B70\u306E\u8B70\u4E8B\u9332\u3092\u6DFB\u4ED8\u3044\u305F\u3057\u307E\u3059\u3002\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002'",
        options: ["Sending minutes of a meeting", "Scheduling a new meeting", "Cancelling a meeting", "Introducing a new colleague"],
        answer: "Sending minutes of a meeting"
      },
      {
        text: "What is the writer asking in this note? '\u660E\u65E5\u306E\u4F1A\u8B70\u306B\u51FA\u5E2D\u3067\u304D\u307E\u3059\u304B\uFF1F\u3054\u90FD\u5408\u3092\u6559\u3048\u3066\u304F\u3060\u3055\u3044\u3002'",
        options: ["If you can attend tomorrow's meeting", "If you can postpone tomorrow's meeting", "If you can prepare for tomorrow's meeting", "If you can cancel tomorrow's meeting"],
        answer: "If you can attend tomorrow's meeting"
      },
      {
        text: "Read and interpret: '\u98A8\u90AA\u3092\u3072\u3044\u305F\u306E\u3067\u3001\u4ECA\u65E5\u306F\u4F11\u307F\u307E\u3059\u3002'",
        options: ["Taking a day off because of a cold", "Working from home today", "Going to see a doctor today", "Leaving early today"],
        answer: "Taking a day off because of a cold"
      },
      {
        text: "What does this train announcement mean? '\u6B21\u306F\u65B0\u5BBF\u99C5\u3067\u3059\u3002\u96FB\u8ECA\u306F\u53F3\u5074\u306E\u30C9\u30A2\u304C\u958B\u304D\u307E\u3059\u3002'",
        options: ["The next station is Shinjuku. Doors will open on the right side.", "The next station is Shinjuku. Doors will open on the left side.", "The train will skip Shinjuku station.", "The train will terminate at Shinjuku station."],
        answer: "The next station is Shinjuku. Doors will open on the right side."
      },
      {
        text: "Read this restaurant sign and determine when it's closed: '\u55B6\u696D\u6642\u9593\uFF1A\u5348\u524D11\u6642\u304B\u3089\u5348\u5F8C10\u6642\u307E\u3067\u3001\u6C34\u66DC\u65E5\u5B9A\u4F11\u65E5'",
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
        text: "Read this article excerpt and identify the main topic: '\u8FD1\u5E74\u3001\u65E5\u672C\u3067\u306F\u5C11\u5B50\u9AD8\u9F62\u5316\u304C\u9032\u307F\u3001\u793E\u4F1A\u4FDD\u969C\u5236\u5EA6\u306E\u898B\u76F4\u3057\u304C\u8AB2\u984C\u3068\u306A\u3063\u3066\u3044\u308B\u3002'",
        options: ["Aging population and social security reform", "Economic growth in Japan", "Education system reforms", "Environmental protection measures"],
        answer: "Aging population and social security reform"
      },
      {
        text: "What historical event is referenced in this passage? '1945\u5E748\u6708\u3001\u5E83\u5CF6\u3068\u9577\u5D0E\u306B\u539F\u5B50\u7206\u5F3E\u304C\u6295\u4E0B\u3055\u308C\u3001\u591A\u304F\u306E\u4EBA\u3005\u304C\u4EA1\u304F\u306A\u3063\u305F\u3002'",
        options: ["Atomic bombings of Hiroshima and Nagasaki", "The end of the Edo period", "The Meiji Restoration", "The Great Kanto Earthquake"],
        answer: "Atomic bombings of Hiroshima and Nagasaki"
      },
      {
        text: "Read and interpret this business email phrase: '\u4ECA\u5F8C\u3068\u3082\u3054\u6307\u5C0E\u3054\u97AD\u64BB\u306E\u307B\u3069\u3001\u3088\u308D\u3057\u304F\u304A\u9858\u3044\u7533\u3057\u4E0A\u3052\u307E\u3059\u3002'",
        options: ["We look forward to your continued guidance and support.", "We apologize for any inconvenience caused.", "We will contact you again soon.", "We are grateful for your business."],
        answer: "We look forward to your continued guidance and support."
      },
      {
        text: "What concept is being explained in this text? '\u300C\u3082\u3063\u305F\u3044\u306A\u3044\u300D\u3068\u3044\u3046\u8A00\u8449\u306F\u3001\u7269\u3092\u5927\u5207\u306B\u3059\u308B\u65E5\u672C\u306E\u4F1D\u7D71\u7684\u306A\u4FA1\u5024\u89B3\u3092\u8868\u3057\u3066\u3044\u308B\u3002'",
        options: ["The traditional Japanese value of not being wasteful", "The importance of punctuality in Japanese culture", "The concept of harmony in Japanese society", "The Japanese tea ceremony traditions"],
        answer: "The traditional Japanese value of not being wasteful"
      },
      {
        text: "Read and determine the author's view: '\u73FE\u4EE3\u306E\u6280\u8853\u767A\u5C55\u306F\u79C1\u305F\u3061\u306E\u751F\u6D3B\u3092\u4FBF\u5229\u306B\u3059\u308B\u4E00\u65B9\u3067\u3001\u65B0\u305F\u306A\u554F\u984C\u3082\u751F\u307F\u51FA\u3057\u3066\u3044\u308B\u3002'",
        options: ["Technology has both benefits and drawbacks", "Technology only improves our lives", "Technology is creating more problems than solutions", "Technology development should be stopped"],
        answer: "Technology has both benefits and drawbacks"
      }
    ]
  },
  {
    id: 12,
    lessonId: 12,
    tags: ["vocabulary", "full song", "weather", "emotions", "spring", "metaphors"],
    questions: [
      {
        text: "What is the song comparing 'you' to in the first line?",
        options: ["The wind", "The clouds", "The rain", "The flowers"],
        answer: "The wind"
      },
      {
        text: "What does '\u30D3\u30A4\u30C9\u30ED' (\u3073\u3044\u3069\u308D) refer to in the lyrics?",
        options: ["Glass", "Water", "Sky", "Tears"],
        answer: "Glass"
      },
      {
        text: "What smell does the singer detect in the first part of the song?",
        options: ["The smell of clearing weather", "The smell of flowers", "The smell of rain", "The smell of spring"],
        answer: "The smell of clearing weather"
      },
      {
        text: "What is the correct reading for '\u6674\u308B'?",
        options: ["\u306F\u308B", "\u305D\u308B", "\u306F\u308C\u308B", "\u304F\u3082\u308B"],
        answer: "\u306F\u308B"
      },
      {
        text: "In the line '\u6674\u308C\u306B\u6674\u308C \u82B1\u3088\u54B2\u3051', what is being asked to bloom?",
        options: ["Flowers", "Sky", "Wind", "Heart"],
        answer: "Flowers"
      },
      {
        text: "What smell does the singer detect later in the song?",
        options: ["The smell of rain", "The smell of flowers", "The smell of spring", "The smell of the sea"],
        answer: "The smell of rain"
      },
      {
        text: "What weather phenomenon is referred to as '\u7F8A\u96F2' (\u3072\u3064\u3058\u3050\u3082)?",
        options: ["Sheep-like clouds (cirrocumulus)", "Lightning", "Rainbow", "Fog"],
        answer: "Sheep-like clouds (cirrocumulus)"
      },
      {
        text: "What does '\u9761\u304F' (\u306A\u3073\u304F) mean in the context of the grass?",
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
        text: "What are '\u76EE\u84CB' (\u307E\u3076\u305F) in the song?",
        options: ["Eyelids", "Eyeballs", "Tears", "Glasses"],
        answer: "Eyelids"
      },
      {
        text: "The phrase '\u80F8\u3092\u6253\u3064\u97F3' refers to what kind of sound?",
        options: ["A sound that touches/moves the heart", "A drum sound", "Thunder", "Music"],
        answer: "A sound that touches/moves the heart"
      },
      {
        text: "What does '\u51EA\u3052' (\u306A\u3052) mean in the context of the song?",
        options: ["To calm down", "To speed up", "To disappear", "To sing"],
        answer: "To calm down"
      },
      {
        text: "Which of these lines represents a command or request to the sky?",
        options: ["\u7A7A\u3088\u88C2\u3051", "\u7A7A\u3088\u6CE3\u3051", "Both \u7A7A\u3088\u88C2\u3051 and \u7A7A\u3088\u6CE3\u3051", "Neither \u7A7A\u3088\u88C2\u3051 nor \u7A7A\u3088\u6CE3\u3051"],
        answer: "Both A and B"
      },
      {
        text: "In the phrase '\u901A\u308A\u96E8 \u8349\u3092\u9761\u304B\u305B', what is '\u901A\u308A\u96E8'?",
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
        text: "What is the grammatical structure of '\u54B2\u3044\u3066\u6625\u306E__'?",
        options: ["Te-form + noun + \u306E\u305B\u3044 (because of)", "Imperative + noun + \u306E\u305F\u3081 (for the sake of)", "Past tense + noun + \u306E\u3088\u3046 (like)", "Potential form + noun + \u306E\u3082\u3068 (under)"],
        answer: "Te-form + noun + \u306E\u305B\u3044 (because of)"
      },
      {
        text: "The word '\u9060\u304F' appears repeatedly at the end of stanzas. What does it mean?",
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
function getQuizByLessonId(lessonId) {
  return quizzes.find((quiz) => quiz.lessonId === lessonId);
}

// server/storage.ts
var MemoryStore = createMemoryStore(session);
var MemStorage = class {
  users;
  scores;
  customizations;
  currentId;
  currentScoreId;
  currentCustomizationId;
  sessionStore;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.scores = /* @__PURE__ */ new Map();
    this.customizations = /* @__PURE__ */ new Map();
    this.currentId = 1;
    this.currentScoreId = 1;
    this.currentCustomizationId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 864e5
      // prune expired entries every 24h
    });
    this.initializeDefaultCustomizations();
  }
  initializeDefaultCustomizations() {
    this.addCustomization({
      type: "avatar",
      name: "default-avatar",
      displayName: "Default Avatar",
      description: "The default user avatar",
      imageUrl: null,
      tokenCost: 0,
      requiredScore: 0,
      requiredTokensEarned: 0,
      requiredLessonsPlayed: 0
    });
    this.addCustomization({
      type: "avatar",
      name: "ninja",
      displayName: "Ninja Avatar",
      description: "For the stealthy learner",
      imageUrl: null,
      tokenCost: 100,
      requiredScore: 50,
      requiredTokensEarned: 50,
      requiredLessonsPlayed: 1
    });
    this.addCustomization({
      type: "avatar",
      name: "sakura",
      displayName: "Sakura Avatar",
      description: "Cherry blossom themed avatar",
      imageUrl: null,
      tokenCost: 150,
      requiredScore: 65,
      requiredTokensEarned: 100,
      requiredLessonsPlayed: 2
    });
    this.addCustomization({
      type: "avatar",
      name: "samurai",
      displayName: "Samurai Avatar",
      description: "The warrior's choice",
      imageUrl: null,
      tokenCost: 200,
      requiredScore: 80,
      requiredTokensEarned: 150,
      requiredLessonsPlayed: 3
    });
    this.addCustomization({
      type: "avatar",
      name: "neko",
      displayName: "Neko Avatar",
      description: "For cat lovers",
      imageUrl: null,
      tokenCost: 250,
      requiredScore: 90,
      requiredTokensEarned: 200,
      requiredLessonsPlayed: 4
    });
    this.addCustomization({
      type: "badge",
      name: "beginner",
      displayName: "Beginner",
      description: "Just starting your Japanese journey",
      imageUrl: "/assets/badges/beginner.svg",
      tokenCost: 0,
      requiredScore: 0,
      requiredTokensEarned: 0,
      requiredLessonsPlayed: 0
    });
    this.addCustomization({
      type: "badge",
      name: "intermediate",
      displayName: "Intermediate",
      description: "Making good progress in Japanese",
      imageUrl: "/assets/badges/intermediate.svg",
      tokenCost: 150,
      requiredScore: 80,
      requiredTokensEarned: 150,
      requiredLessonsPlayed: 2
    });
    this.addCustomization({
      type: "badge",
      name: "advanced",
      displayName: "Advanced",
      description: "Mastering the Japanese language",
      imageUrl: "/assets/badges/advanced.svg",
      tokenCost: 300,
      requiredScore: 90,
      requiredTokensEarned: 250,
      requiredLessonsPlayed: 5
    });
    this.addCustomization({
      type: "theme",
      name: "default",
      displayName: "Default Theme",
      description: "The standard app theme",
      imageUrl: "/assets/themes/default.svg",
      tokenCost: 0,
      requiredScore: 0,
      requiredTokensEarned: 0,
      requiredLessonsPlayed: 0
    });
    this.addCustomization({
      type: "theme",
      name: "sakura",
      displayName: "Sakura Theme",
      description: "Cherry blossom inspired theme",
      imageUrl: "/assets/themes/sakura.svg",
      tokenCost: 120,
      requiredScore: 70,
      requiredTokensEarned: 120,
      requiredLessonsPlayed: 2
    });
    this.addCustomization({
      type: "theme",
      name: "night",
      displayName: "Night Theme",
      description: "Dark theme with Japanese-inspired elements",
      imageUrl: "/assets/themes/night.svg",
      tokenCost: 250,
      requiredScore: 85,
      requiredTokensEarned: 200,
      requiredLessonsPlayed: 3
    });
  }
  addCustomization(customization) {
    const id = this.currentCustomizationId++;
    const newCustomization = { ...customization, id };
    this.customizations.set(id, newCustomization);
    return newCustomization;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentId++;
    const user = {
      ...insertUser,
      id,
      progress: {},
      tokens: 0,
      profileImage: "default-avatar",
      profileBadge: "beginner",
      profileTheme: "default",
      unlockedCustomizations: []
    };
    this.users.set(id, user);
    return user;
  }
  async updateUserTokens(userId, amount) {
    const user = await this.getUser(userId);
    if (user) {
      const newTokenBalance = Math.max(0, (user.tokens || 0) + amount);
      this.users.set(userId, { ...user, tokens: newTokenBalance });
    }
  }
  async getLessons() {
    return getAllLessons();
  }
  async getLesson(id) {
    return getLessonById(id);
  }
  async getQuiz(lessonId) {
    return getQuizByLessonId(lessonId);
  }
  async getQuizzesByTags(tags) {
    if (tags.length === 0) {
      return quizzes;
    }
    return quizzes.filter((quiz) => {
      const quizTags = Array.isArray(quiz.tags) ? quiz.tags : [];
      return quizTags.length > 0 && tags.some((tag) => quizTags.includes(tag));
    });
  }
  async updateUserProgress(userId, progress) {
    const user = await this.getUser(userId);
    if (user) {
      this.users.set(userId, { ...user, progress });
    }
  }
  async recordScore(score) {
    const id = this.currentScoreId++;
    const now = /* @__PURE__ */ new Date();
    const newScore = {
      ...score,
      id,
      completedAt: now
    };
    this.scores.set(id, newScore);
    return newScore;
  }
  async getUserScores(userId) {
    const allScores = Array.from(this.scores.values());
    const userScores = allScores.filter((score) => score.userId === userId);
    return userScores.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  }
  async getUserScoresByQuiz(userId, quizId) {
    const userScores = await this.getUserScores(userId);
    return userScores.filter((score) => score.quizId === quizId).sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  }
  async getScoreAnalytics(userId) {
    const userScores = await this.getUserScores(userId);
    if (userScores.length === 0) {
      return {
        totalQuizzesTaken: 0,
        averageScore: 0,
        bestScore: null,
        recentScores: [],
        scoresByCategory: {}
      };
    }
    const totalQuizzesTaken = userScores.length;
    const averageScore = userScores.reduce((sum, score) => sum + score.percentage, 0) / totalQuizzesTaken;
    const bestScore = userScores.reduce((best, current) => !best || current.percentage > best.percentage ? current : best, null);
    const recentScores = userScores.slice(0, 5);
    const scoresByCategory = {};
    for (const score of userScores) {
      const quiz = await this.getQuiz(score.quizId);
      if (quiz && Array.isArray(quiz.tags)) {
        for (const tag of quiz.tags) {
          if (!scoresByCategory[tag]) {
            scoresByCategory[tag] = { count: 0, avgScore: 0 };
          }
          const current = scoresByCategory[tag];
          current.avgScore = (current.avgScore * current.count + score.percentage) / (current.count + 1);
          current.count++;
          scoresByCategory[tag] = current;
        }
      }
    }
    return {
      totalQuizzesTaken,
      averageScore,
      bestScore,
      recentScores,
      scoresByCategory
    };
  }
  // Customization management methods
  async getCustomizations() {
    return Array.from(this.customizations.values());
  }
  async getCustomization(id) {
    return this.customizations.get(id);
  }
  async getCustomizationByName(name) {
    return Array.from(this.customizations.values()).find((c) => c.name === name);
  }
  async purchaseCustomization(userId, customizationId) {
    const user = await this.getUser(userId);
    const customization = await this.getCustomization(customizationId);
    if (!user || !customization) {
      return false;
    }
    const unlockedCustomizations = Array.isArray(user.unlockedCustomizations) ? user.unlockedCustomizations : [];
    if (unlockedCustomizations.includes(customization.name)) {
      return true;
    }
    const userScores = await this.getUserScores(userId);
    const highestScore = userScores.length > 0 ? Math.max(...userScores.map((s) => s.percentage)) : 0;
    const meetsScoreRequirement = highestScore >= (customization.requiredScore || 0);
    const meetsTokenRequirement = (user.tokens || 0) >= (customization.requiredTokensEarned || 0);
    const userProgress = user.progress || {};
    const completedLessons = userProgress.completedLessons || [];
    const meetsLessonRequirement = (completedLessons.length || 0) >= (customization.requiredLessonsPlayed || 0);
    const canAfford = (user.tokens || 0) >= (customization.tokenCost || 0);
    if (meetsScoreRequirement && meetsTokenRequirement && meetsLessonRequirement && canAfford) {
      const tokenCost = customization.tokenCost || 0;
      const newBalance = Math.max(0, (user.tokens || 0) - tokenCost);
      const newUnlockedCustomizations = [...unlockedCustomizations, customization.name];
      this.users.set(userId, {
        ...user,
        tokens: newBalance,
        unlockedCustomizations: newUnlockedCustomizations
      });
      return true;
    }
    return false;
  }
  async applyCustomization(userId, customizationType, customizationName) {
    const user = await this.getUser(userId);
    if (!user) {
      return false;
    }
    const unlockedCustomizations = Array.isArray(user.unlockedCustomizations) ? user.unlockedCustomizations : [];
    const isDefault = customizationName.startsWith("default") || customizationName === "beginner" || customizationName === "default";
    if (!isDefault && !unlockedCustomizations.includes(customizationName)) {
      return false;
    }
    switch (customizationType) {
      case "avatar":
        this.users.set(userId, { ...user, profileImage: customizationName });
        break;
      case "badge":
        this.users.set(userId, { ...user, profileBadge: customizationName });
        break;
      case "theme":
        this.users.set(userId, { ...user, profileTheme: customizationName });
        break;
      default:
        return false;
    }
    return true;
  }
  async getUserCustomizations(userId) {
    const user = await this.getUser(userId);
    if (!user) {
      return [];
    }
    return Array.isArray(user.unlockedCustomizations) ? user.unlockedCustomizations : [];
  }
  // Leaderboard functionality
  async getLeaderboard(limit = 10) {
    const users = Array.from(this.users.values());
    const result = [];
    for (const user of users) {
      const userScores = await this.getUserScores(user.id);
      if (userScores.length === 0) {
        continue;
      }
      const totalScore = userScores.reduce((sum, score) => sum + score.score, 0);
      result.push({
        userId: user.id,
        username: user.username,
        totalScore,
        quizzesTaken: userScores.length
      });
    }
    const sorted = result.sort((a, b) => b.totalScore - a.totalScore);
    return sorted.slice(0, limit);
  }
};
var storage = new MemStorage();

// server/auth.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session2 from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
var scryptAsync = promisify(scrypt);
async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}
async function comparePasswords(supplied, stored) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = await scryptAsync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}
function setupAuth(app2) {
  const sessionSettings = {
    secret: process.env.REPL_ID,
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore
  };
  if (app2.get("env") === "production") {
    app2.set("trust proxy", 1);
  }
  app2.use(session2(sessionSettings));
  app2.use(passport.initialize());
  app2.use(passport.session());
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await storage.getUserByUsername(username);
      if (!user || !await comparePasswords(password, user.password)) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await storage.getUser(id);
    done(null, user);
  });
  app2.post("/api/register", async (req, res, next) => {
    const existingUser = await storage.getUserByUsername(req.body.username);
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }
    const user = await storage.createUser({
      ...req.body,
      password: await hashPassword(req.body.password)
    });
    req.login(user, (err) => {
      if (err) return next(err);
      res.status(201).json(user);
    });
  });
  app2.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json(req.user);
  });
  app2.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });
  app2.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });
}

// server/routes.ts
function registerRoutes(app2) {
  setupAuth(app2);
  app2.get("/api/lessons", async (_req, res) => {
    const lessons2 = await storage.getLessons();
    res.json(lessons2);
  });
  app2.get("/api/lessons/:id", async (req, res) => {
    const lesson = await storage.getLesson(parseInt(req.params.id));
    if (!lesson) {
      res.status(404).json({ message: "Lesson not found" });
      return;
    }
    res.json(lesson);
  });
  app2.get("/api/quizzes/:lessonId", async (req, res) => {
    const quiz = await storage.getQuiz(parseInt(req.params.lessonId));
    if (!quiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }
    res.json(quiz);
  });
  app2.get("/api/quizzes-by-tags/:tags", async (req, res) => {
    const tags = req.params.tags.split(",");
    if (!tags || tags.length === 0) {
      return res.status(400).json({ error: "No tags provided" });
    }
    const filteredQuizzes = await storage.getQuizzesByTags(tags);
    res.json(filteredQuizzes);
  });
  app2.post("/api/progress/:userId", async (req, res) => {
    const { progress } = req.body;
    await storage.updateUserProgress(parseInt(req.params.userId), progress);
    res.json({ success: true });
  });
  app2.post("/api/scores", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const scoreData = {
        userId: req.user.id,
        quizId: req.body.quizId,
        score: req.body.score,
        maxScore: req.body.maxScore,
        percentage: req.body.score / req.body.maxScore * 100
      };
      const score = await storage.recordScore(scoreData);
      res.status(201).json(score);
    } catch (error) {
      res.status(400).json({ error: "Invalid score data" });
    }
  });
  app2.get("/api/scores", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const scores = await storage.getUserScores(req.user.id);
    res.json(scores);
  });
  app2.get("/api/scores/quiz/:quizId", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const scores = await storage.getUserScoresByQuiz(
      req.user.id,
      parseInt(req.params.quizId)
    );
    res.json(scores);
  });
  app2.get("/api/scores/analytics", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const analytics = await storage.getScoreAnalytics(req.user.id);
    res.json(analytics);
  });
  app2.post("/api/tokens", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { amount, reason } = req.body;
    if (typeof amount !== "number" || amount === 0) {
      return res.status(400).json({ error: "Invalid token amount" });
    }
    console.log(`Token ${amount > 0 ? "award" : "deduction"} for user ${req.user.id}: ${amount} tokens (${reason || "No reason provided"})`);
    await storage.updateUserTokens(req.user.id, amount);
    const user = await storage.getUser(req.user.id);
    res.json({
      success: true,
      newBalance: user?.tokens || 0
    });
  });
  app2.get("/api/customizations", async (req, res) => {
    const customizations = await storage.getCustomizations();
    res.json(customizations);
  });
  app2.get("/api/customizations/:id", async (req, res) => {
    const customization = await storage.getCustomization(parseInt(req.params.id));
    if (!customization) {
      return res.status(404).json({ error: "Customization not found" });
    }
    res.json(customization);
  });
  app2.get("/api/customizations/type/:type", async (req, res) => {
    const type = req.params.type;
    const allCustomizations = await storage.getCustomizations();
    const filteredCustomizations = allCustomizations.filter((c) => c.type === type);
    res.json(filteredCustomizations);
  });
  app2.get("/api/user/customizations", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const customizationNames = await storage.getUserCustomizations(req.user.id);
    const allCustomizations = await storage.getCustomizations();
    const userCustomizations = allCustomizations.filter(
      (c) => customizationNames.includes(c.name)
    );
    res.json(userCustomizations);
  });
  app2.post("/api/customizations/purchase/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const success = await storage.purchaseCustomization(
      req.user.id,
      parseInt(req.params.id)
    );
    if (!success) {
      return res.status(400).json({
        error: "Unable to purchase customization. Check requirements and token balance."
      });
    }
    res.json({ success: true });
  });
  app2.post("/api/customizations/apply", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { type, name } = req.body;
    if (!type || !name) {
      return res.status(400).json({ error: "Both type and name are required" });
    }
    const success = await storage.applyCustomization(req.user.id, type, name);
    if (!success) {
      return res.status(400).json({ error: "Unable to apply customization" });
    }
    res.json({ success: true });
  });
  app2.get("/api/leaderboard", async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const leaderboard = await storage.getLeaderboard(limit);
    res.json(leaderboard);
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [react(), runtimeErrorOverlay(), themePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const PORT = 5e3;
  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
  });
})();
