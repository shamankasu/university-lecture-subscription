export type Course = {
  id: number;
  title: string;
  university: string;
  teacher: string;
  category: string;
  level: "初級" | "中級" | "上級";
  rating: number;
  students: number;
  duration: string;
  description: string;
  longDescription: string;
  icon: string;
  outcomes: string[];
  lessons: {
    id: number;
    title: string;
    duration: string;
    isFree: boolean;
  }[];
  materials: {
    id: number;
    title: string;
    type: string;
  }[];
  reviews: {
    id: number;
    userName: string;
    rating: number;
    comment: string;
  }[];
};

export const categories = [
  "すべて",
  "情報・AI",
  "経済・経営",
  "心理・教育",
  "理学・工学",
  "法律・政治",
  "語学・文化",
];

export const levels = ["すべて", "初級", "中級", "上級"];

export const courses: Course[] = [
  {
    id: 1,
    title: "はじめての人工知能",
    university: "東京○○大学",
    teacher: "山田 太郎 教授",
    category: "情報・AI",
    level: "初級",
    rating: 4.8,
    students: 1240,
    duration: "全12回",
    description:
      "AIの基本的な考え方、機械学習、ニューラルネットワークの基礎を学ぶ講義です。",
    longDescription:
      "人工知能の歴史や基本概念から始め、機械学習、深層学習、ニューラルネットワークの仕組みまでを初学者向けに解説します。数学やプログラミングに不安がある人でも理解できるよう、具体例を交えながら学習を進めます。",
    icon: "AI",
    outcomes: [
      "人工知能の基本的な仕組みを説明できる",
      "機械学習と深層学習の違いを理解できる",
      "ニューラルネットワークの基礎を理解できる",
      "AIが社会でどのように活用されているかを説明できる",
    ],
    lessons: [
      {
        id: 1,
        title: "AIとは何か",
        duration: "42分",
        isFree: true,
      },
      {
        id: 2,
        title: "機械学習の基本",
        duration: "48分",
        isFree: false,
      },
      {
        id: 3,
        title: "教師あり学習と教師なし学習",
        duration: "45分",
        isFree: false,
      },
      {
        id: 4,
        title: "ニューラルネットワーク入門",
        duration: "52分",
        isFree: false,
      },
    ],
    materials: [
      {
        id: 1,
        title: "第1回 講義スライド",
        type: "PDF",
      },
      {
        id: 2,
        title: "AI用語集",
        type: "PDF",
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "大学生ユーザー",
        rating: 5,
        comment: "初学者でも分かりやすく、AIの全体像をつかめました。",
      },
      {
        id: 2,
        userName: "社会人ユーザー",
        rating: 4,
        comment: "仕事でAIを使う前提知識として役立ちました。",
      },
    ],
  },
  {
    id: 2,
    title: "現代社会を読み解く経済学",
    university: "○○経済大学",
    teacher: "佐藤 花子 教授",
    category: "経済・経営",
    level: "初級",
    rating: 4.6,
    students: 980,
    duration: "全10回",
    description:
      "市場、企業、家計、金融など、現代社会を理解するための経済学の基礎を学びます。",
    longDescription:
      "経済学の基本概念を、身近なニュースや企業活動と結びつけながら学びます。需要と供給、価格形成、金融政策、企業行動などを通じて、現代社会を経済の視点から理解する力を身につけます。",
    icon: "EC",
    outcomes: [
      "需要と供給の考え方を理解できる",
      "市場経済の仕組みを説明できる",
      "金融政策や景気変動の基本を理解できる",
      "ニュースを経済学の視点で読み解ける",
    ],
    lessons: [
      {
        id: 1,
        title: "経済学とは何か",
        duration: "40分",
        isFree: true,
      },
      {
        id: 2,
        title: "需要と供給",
        duration: "46分",
        isFree: false,
      },
      {
        id: 3,
        title: "市場と価格の仕組み",
        duration: "44分",
        isFree: false,
      },
      {
        id: 4,
        title: "金融と景気",
        duration: "50分",
        isFree: false,
      },
    ],
    materials: [
      {
        id: 1,
        title: "経済学基礎スライド",
        type: "PDF",
      },
      {
        id: 2,
        title: "確認問題集",
        type: "PDF",
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "高校生ユーザー",
        rating: 5,
        comment: "経済学部に興味を持つきっかけになりました。",
      },
    ],
  },
  {
    id: 3,
    title: "人間の心を学ぶ心理学入門",
    university: "○○総合大学",
    teacher: "鈴木 一郎 教授",
    category: "心理・教育",
    level: "初級",
    rating: 4.9,
    students: 1520,
    duration: "全8回",
    description:
      "記憶、感情、学習、対人関係など、人間の心理を基礎から理解する講義です。",
    longDescription:
      "心理学の代表的なテーマである記憶、感情、認知、学習、対人関係について学びます。日常生活の具体例を用いながら、人間の行動や心の働きを科学的に理解することを目指します。",
    icon: "PS",
    outcomes: [
      "心理学の基本分野を理解できる",
      "記憶や感情の仕組みを説明できる",
      "人間関係に関する心理的要因を理解できる",
      "日常生活を心理学の視点で考えられる",
    ],
    lessons: [
      {
        id: 1,
        title: "心理学とは何か",
        duration: "38分",
        isFree: true,
      },
      {
        id: 2,
        title: "記憶の仕組み",
        duration: "43分",
        isFree: false,
      },
      {
        id: 3,
        title: "感情と行動",
        duration: "47分",
        isFree: false,
      },
      {
        id: 4,
        title: "対人関係の心理",
        duration: "45分",
        isFree: false,
      },
    ],
    materials: [
      {
        id: 1,
        title: "心理学入門スライド",
        type: "PDF",
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "大学生ユーザー",
        rating: 5,
        comment: "身近な例が多く、心理学を初めて学ぶ人に向いています。",
      },
    ],
  },
  {
    id: 4,
    title: "情報工学のためのデータベース基礎",
    university: "東京理工大学",
    teacher: "高橋 健 教授",
    category: "情報・AI",
    level: "中級",
    rating: 4.7,
    students: 860,
    duration: "全14回",
    description:
      "リレーショナルデータベース、SQL、正規化、トランザクション処理を学びます。",
    longDescription:
      "情報システムに欠かせないデータベースの基礎を学ぶ講義です。リレーショナルモデル、SQL、正規化、トランザクション、インデックスなど、実際のシステム設計に必要な知識を扱います。",
    icon: "DB",
    outcomes: [
      "リレーショナルデータベースの仕組みを理解できる",
      "基本的なSQL文を読める",
      "正規化の目的を説明できる",
      "トランザクション処理の重要性を理解できる",
    ],
    lessons: [
      {
        id: 1,
        title: "データベースとは何か",
        duration: "44分",
        isFree: true,
      },
      {
        id: 2,
        title: "リレーショナルモデル",
        duration: "50分",
        isFree: false,
      },
      {
        id: 3,
        title: "SQLの基本",
        duration: "55分",
        isFree: false,
      },
      {
        id: 4,
        title: "正規化",
        duration: "52分",
        isFree: false,
      },
    ],
    materials: [
      {
        id: 1,
        title: "SQL練習問題",
        type: "PDF",
      },
      {
        id: 2,
        title: "ER図サンプル",
        type: "PDF",
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "情報系学生",
        rating: 5,
        comment: "データベース設計の流れがかなり理解しやすかったです。",
      },
    ],
  },
  {
    id: 5,
    title: "機械工学概論",
    university: "○○工業大学",
    teacher: "田中 誠 教授",
    category: "理学・工学",
    level: "初級",
    rating: 4.5,
    students: 740,
    duration: "全11回",
    description:
      "力学、材料、熱、流体など、機械工学の基本分野を横断的に学ぶ講義です。",
    longDescription:
      "機械工学を初めて学ぶ人に向けて、力学、材料、熱、流体、設計などの基本分野を横断的に紹介します。工学系分野への進学を考える高校生にも向いた内容です。",
    icon: "ME",
    outcomes: [
      "機械工学の主要分野を理解できる",
      "力学や材料の基礎を説明できる",
      "工学的なものづくりの流れを理解できる",
    ],
    lessons: [
      {
        id: 1,
        title: "機械工学とは何か",
        duration: "41分",
        isFree: true,
      },
      {
        id: 2,
        title: "力学の基礎",
        duration: "49分",
        isFree: false,
      },
      {
        id: 3,
        title: "材料と設計",
        duration: "46分",
        isFree: false,
      },
    ],
    materials: [
      {
        id: 1,
        title: "機械工学概論資料",
        type: "PDF",
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "高校生ユーザー",
        rating: 4,
        comment: "工学部で何を学ぶのかイメージしやすくなりました。",
      },
    ],
  },
  {
    id: 6,
    title: "法律学入門",
    university: "○○法科大学",
    teacher: "伊藤 亮 教授",
    category: "法律・政治",
    level: "初級",
    rating: 4.4,
    students: 690,
    duration: "全9回",
    description:
      "憲法、民法、刑法など、法律を学ぶための基本的な考え方を身につけます。",
    longDescription:
      "法律を初めて学ぶ人に向けて、憲法、民法、刑法などの基礎を扱います。条文の読み方や法的な考え方を学び、社会のルールを理解する力を養います。",
    icon: "LW",
    outcomes: [
      "法律学の基本的な考え方を理解できる",
      "憲法・民法・刑法の違いを説明できる",
      "条文を読む基礎力を身につけられる",
    ],
    lessons: [
      {
        id: 1,
        title: "法律とは何か",
        duration: "39分",
        isFree: true,
      },
      {
        id: 2,
        title: "憲法の基本",
        duration: "45分",
        isFree: false,
      },
      {
        id: 3,
        title: "民法と契約",
        duration: "48分",
        isFree: false,
      },
    ],
    materials: [
      {
        id: 1,
        title: "法律学入門資料",
        type: "PDF",
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "社会人ユーザー",
        rating: 4,
        comment: "日常生活にも関係する内容で分かりやすかったです。",
      },
    ],
  },
  {
    id: 7,
    title: "英語で学ぶ異文化コミュニケーション",
    university: "国際○○大学",
    teacher: "中村 エリ 教授",
    category: "語学・文化",
    level: "中級",
    rating: 4.6,
    students: 810,
    duration: "全10回",
    description:
      "英語表現と異文化理解を組み合わせ、国際的なコミュニケーション力を高めます。",
    longDescription:
      "英語での表現力と異文化理解を同時に学ぶ講義です。文化による価値観やコミュニケーションの違いを理解し、国際的な場面で必要な考え方を身につけます。",
    icon: "EN",
    outcomes: [
      "異文化理解の基本を説明できる",
      "英語で意見を伝える表現を学べる",
      "文化の違いによるコミュニケーションの特徴を理解できる",
    ],
    lessons: [
      {
        id: 1,
        title: "異文化コミュニケーションとは",
        duration: "43分",
        isFree: true,
      },
      {
        id: 2,
        title: "文化と価値観",
        duration: "46分",
        isFree: false,
      },
      {
        id: 3,
        title: "英語で意見を伝える",
        duration: "50分",
        isFree: false,
      },
    ],
    materials: [
      {
        id: 1,
        title: "英語表現リスト",
        type: "PDF",
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "大学生ユーザー",
        rating: 5,
        comment: "英語と文化を同時に学べるのが良かったです。",
      },
    ],
  },
  {
    id: 8,
    title: "経営戦略とマーケティング",
    university: "○○経営大学",
    teacher: "森 直人 教授",
    category: "経済・経営",
    level: "中級",
    rating: 4.7,
    students: 1110,
    duration: "全12回",
    description:
      "企業の競争戦略、ブランド設計、マーケティング施策を事例とともに学びます。",
    longDescription:
      "企業がどのように市場で競争し、顧客に価値を届けるのかを学びます。経営戦略、ブランド、マーケティング、消費者行動を事例とともに扱います。",
    icon: "MK",
    outcomes: [
      "経営戦略の基本を理解できる",
      "マーケティング施策の考え方を説明できる",
      "企業事例を分析する視点を身につけられる",
    ],
    lessons: [
      {
        id: 1,
        title: "経営戦略とは何か",
        duration: "44分",
        isFree: true,
      },
      {
        id: 2,
        title: "ブランド戦略",
        duration: "47分",
        isFree: false,
      },
      {
        id: 3,
        title: "マーケティング分析",
        duration: "51分",
        isFree: false,
      },
    ],
    materials: [
      {
        id: 1,
        title: "マーケティング事例集",
        type: "PDF",
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "社会人ユーザー",
        rating: 5,
        comment: "企業事例が多く、仕事にも活かせそうでした。",
      },
    ],
  },
];