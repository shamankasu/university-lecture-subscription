export type University = {
  slug: string;
  name: string;
  initials: string;
  location: string;
  kind: "national" | "private";
  category: string;
  description: string;
  longDescription: string;
  focusAreas: string[];
  learningFeatures: {
    title: string;
    description: string;
  }[];
  courseIds: number[];
};

export const universities: University[] = [
  {
    slug: "tokyo-university-of-science",
    name: "東京理科大学",
    initials: "TUS",
    location: "東京都",
    kind: "private",
    category: "理工系大学",
    description:
      "理学・工学・情報分野を中心に、基礎から応用へつながる講義を公開しています。",
    longDescription:
      "数理的な考え方と実践的なものづくりの両面から、理工系分野を段階的に学べます。情報技術やデータ活用に関心がある人にも、工学の全体像を知りたい人にも取り組みやすい講義を掲載しています。",
    focusAreas: ["情報・AI", "データベース", "機械工学", "理学・工学"],
    learningFeatures: [
      {
        title: "理論と実践を往復する",
        description:
          "基本原理を理解したうえで、設計やデータ活用などの応用へ進みます。",
      },
      {
        title: "理工系の入口を広く知る",
        description:
          "情報、機械、数理など、進路選択に役立つ複数分野に触れられます。",
      },
      {
        title: "段階的に学べる",
        description:
          "初級から中級まで、理解度に合わせて講義を選択できます。",
      },
    ],
    courseIds: [4, 5],
  },
  {
    slug: "waseda-university",
    name: "早稲田大学",
    initials: "WU",
    location: "東京都",
    kind: "private",
    category: "総合大学",
    description:
      "情報科学から語学・文化まで、分野を横断した学びに出会えます。",
    longDescription:
      "一つの専門に閉じず、テクノロジーと社会、言語と文化などを横断して考える講義を掲載しています。新しい分野を学び始めたい人が、自分の関心を広げるきっかけを見つけられる構成です。",
    focusAreas: ["情報・AI", "語学・文化", "異文化理解", "分野横断"],
    learningFeatures: [
      {
        title: "分野を越えて学ぶ",
        description:
          "情報技術と文化など、異なる視点を組み合わせて理解を深めます。",
      },
      {
        title: "社会との接点を考える",
        description:
          "学んだ知識が社会やコミュニケーションでどう活きるかを考えます。",
      },
      {
        title: "初学者から始められる",
        description:
          "専門知識がなくても、基本概念から順番に学習できます。",
      },
    ],
    courseIds: [1, 7],
  },
  {
    slug: "keio-university",
    name: "慶應義塾大学",
    initials: "KU",
    location: "東京都",
    kind: "private",
    category: "総合大学",
    description:
      "経済・経営を中心に、社会やビジネスを読み解く講義を学べます。",
    longDescription:
      "企業活動や市場の変化を題材に、戦略とマーケティングの考え方を学べます。身近なサービスや企業事例から、ビジネスを構造的に捉える視点を身につけたい人に向いた講義を掲載しています。",
    focusAreas: ["経済・経営", "マーケティング", "経営戦略", "ビジネス"],
    learningFeatures: [
      {
        title: "事例から考える",
        description:
          "企業や市場の具体例を通じて、抽象的な理論を理解します。",
      },
      {
        title: "意思決定の視点を学ぶ",
        description:
          "戦略を立て、顧客へ価値を届けるまでの流れを考えます。",
      },
      {
        title: "仕事にもつながる",
        description:
          "学習内容を日々の仕事やキャリア選択へ応用できます。",
      },
    ],
    courseIds: [8],
  },
  {
    slug: "meiji-university",
    name: "明治大学",
    initials: "MU",
    location: "東京都",
    kind: "private",
    category: "総合大学",
    description:
      "法律と社会の関係を、身近なテーマから分かりやすく学べます。",
    longDescription:
      "社会を支えるルールを題材に、法律の基本的な読み方や考え方を学べます。法律を初めて学ぶ人が、日常生活やニュースを法的な視点から捉えるための入口となる講義を掲載しています。",
    focusAreas: ["法律・政治", "社会科学", "憲法", "民法"],
    learningFeatures: [
      {
        title: "身近なテーマで理解する",
        description:
          "日常生活や社会の出来事と結びつけながら法律を学びます。",
      },
      {
        title: "考え方の型を身につける",
        description:
          "条文や事例から、筋道を立てて考える力を養います。",
      },
      {
        title: "社会を見る視点を増やす",
        description:
          "制度やルールが社会で果たす役割を多面的に理解します。",
      },
    ],
    courseIds: [6],
  },
  {
    slug: "chiba-university",
    name: "千葉大学",
    initials: "CU",
    location: "千葉県",
    kind: "national",
    category: "国立大学",
    description:
      "心理・教育分野を通じて、人の心と行動を科学的に学べます。",
    longDescription:
      "記憶、感情、学習、対人関係など、日常生活に近いテーマから心理学の基礎を学べます。人の行動を感覚だけでなく科学的な視点で捉えたい人に向けた講義を掲載しています。",
    focusAreas: ["心理・教育", "認知", "学習", "対人関係"],
    learningFeatures: [
      {
        title: "日常から心理を考える",
        description:
          "身近な行動や感情を題材に、心理学の考え方を学びます。",
      },
      {
        title: "科学的な視点を得る",
        description:
          "心の働きを観察や研究の視点から客観的に捉えます。",
      },
      {
        title: "人との関わりに活かす",
        description:
          "学習した内容を自己理解やコミュニケーションへつなげます。",
      },
    ],
    courseIds: [3],
  },
  {
    slug: "yokohama-national-university",
    name: "横浜国立大学",
    initials: "YNU",
    location: "神奈川県",
    kind: "national",
    category: "国立大学",
    description:
      "経済の仕組みを通して、現代社会を読み解く視点を学べます。",
    longDescription:
      "市場、企業、家計、金融といった経済学の基本を、身近なニュースや社会の動きと結びつけて学べます。数字や専門用語に不慣れな人でも、経済を見るための土台を作れる講義を掲載しています。",
    focusAreas: ["経済・経営", "市場経済", "金融", "社会分析"],
    learningFeatures: [
      {
        title: "ニュースと結びつける",
        description:
          "経済の基本概念を現実の社会や出来事から理解します。",
      },
      {
        title: "仕組みから理解する",
        description:
          "価格、市場、景気が動く理由を順序立てて学びます。",
      },
      {
        title: "社会を見る解像度を上げる",
        description:
          "経済学の視点で企業活動や政策を読み解く力を養います。",
      },
    ],
    courseIds: [2],
  },
];

export function getUniversityBySlug(slug: string) {
  return universities.find((university) => university.slug === slug) ?? null;
}
