import type { Log } from "./components/Log.tsx";

export const title = {
  name: "ras0q.com",
  left: 345,
  top: 276,
};

export const icons = [
  {
    name: "X",
    link: "https://x.com/ras0q",
    path: "/img/x.svg",
    left: 550,
    top: 250,
  },
  {
    name: "GitHub",
    link: "https://github.com/ras0q",
    path: "/img/github.svg",
    left: 600,
    top: 250,
  },
  {
    name: "Bluesky",
    link: "https://bsky.app/profile/ras0q.com",
    path: "/img/bluesky.svg",
    left: 650,
    top: 250,
  },
  {
    name: "Nostr",
    link: "https://njump.me/ras0q.com",
    path: "/img/nostr.svg",
    left: 700,
    top: 250,
  },
  {
    name: "mixi2",
    link: "https://mixi.social/@ras0q",
    path: "/img/mixi2.svg",
    left: 750,
    top: 250,
  },
];

export const subDomains = [
  {
    name: "slitscan3d.",
    left: 100,
    top: 150,
  },
  {
    name: "blog.",
    left: 100,
    top: 315,
  },
  {
    name: "nostraq.",
    left: 100,
    top: 450,
  },
];

export const subRoutes = [
  {
    path: "#about",
    left: 900,
    top: 50,
  },
  {
    path: "#careers",
    left: 900,
    top: 150,
  },
  {
    path: "#skills",
    left: 900,
    top: 250,
  },
  {
    path: "#talks",
    left: 900,
    top: 350,
  },
  {
    path: "#contests",
    left: 900,
    top: 450,
  },
  {
    path: "#works",
    left: 900,
    top: 550,
  },
];

export const aboutDescription = `東京科学大学 修士課程1年
Webバックエンド、iOSアプリの開発が得意です。
現在は、開発ツールやプラグインなど普段の開発体験を拡張する形で開発者を支援する技術、機械学習のプライバシー保護技術などに興味があります。`;

export const skills = [
  {
    name: "Go",
    level: 5,
    description:
      "文法がシンプルで、最も使用頻度の高い言語です。Webバックエンド、CLIの開発やOSS Contributionの経験があります。ISUCONなどのパフォーマンスチューニングコンテストでもよく用いています。",
  },
  {
    name: "Git",
    level: 5,
    description:
      "個人・チーム開発問わずコードを扱う際にはほとんど使っています。",
  },
  {
    name: "Docker / Docker Compose",
    level: 5,
    description: "チーム開発の環境を揃えるために使っています。",
  },
  {
    name: "Swift",
    level: 4,
    description:
      "iOSアプリの開発がメインですが、Webバックエンド、WASMを用いたWebフロントエンドの経験もあります。iOSアプリ開発というよりはSwiftという言語自体が好きです。",
  },
  {
    name: "JavaScript / TypeScript",
    level: 4,
    description:
      "シェルスクリプトよりは複雑だがGo等のコンパイラ言語で書くほどではないスクリプトを書くときによく用いています。最近はDenoをJSランタイムにして書くことが多いです。",
  },
  {
    name: "Python",
    level: 4,
    description: "研究で機械学習関連のコードを書く際に用いています。",
  },
  {
    name: "MySQL",
    level: 3,
    description: "RDBの中では最も親しみがあります。",
  },
  {
    name: "Project Management",
    level: 2,
    description:
      "プログラミング技術とは異なりますが、部内のプロジェクトやハッカソンなどで何度か経験があります。",
  },
  {
    name: "Vim Keybindings",
    level: 2,
    description:
      "基本的な操作ができます。最近はVimではなくHelixをメインのエディタとして用いています。",
  },
  {
    name: "Rust",
    level: 1,
    description: "書くのは怪しいですが、ある程度読むことはできます。",
  },
];

type LogProps = Parameters<typeof Log>[0];

export const careers: LogProps[] = [
  {
    duration: "2020.04 ~ 2024.03",
    title: "東京工業大学 工学院 情報通信系",
    link: "https://educ.titech.ac.jp/ict/",
    subtitle: "学士課程",
  },
  {
    duration: "2020.04 ~ now",
    title: "デジタル創作同好会traP",
    link: "https://trap.jp/",
    subtitle: "SysAd班",
    related: {
      Blog: "https://trap.jp/author/Ras",
    },
  },
  {
    duration: "2022.04 ~ now",
    title: "ピクシブ株式会社",
    link: "https://www.pixiv.co.jp/",
    subtitle: "学生アルバイト",
    related: {
      Blog: "https://inside.pixiv.blog/2023/09/21/160000",
    },
  },
  {
    duration: "2024.04 ~ now",
    title: "東京科学大学 工学院 情報通信系 情報通信コース",
    link: "https://educ.titech.ac.jp/ict/",
    subtitle: "修士課程",
  },
];

export const talks: LogProps[] = [
  {
    duration: "2023.09.02",
    title: "iOSDC Japan 2023",
    link: "https://iosdc.jp/2023/",
    subtitle: "ルーキーズLT「iOS16で変わった画面の向きを操作する方法」",
    related: {
      Proposal:
        "https://fortee.jp/iosdc-japan-2023/proposal/85d05870-fa34-488c-a9c2-74505f35a43f",
      Slide:
        "https://speakerdeck.com/ras0q/iosdc-2023-how-to-control-device-orientations-in-ios16-8eb197f3-45a3-41eb-9937-a1b01aa86baf",
      Blog: "https://inside.pixiv.blog/2023/09/14/183000",
    },
  },
  {
    duration: "2023.08.24",
    title: "iOSDC Japan 2024",
    link: "https://iosdc.jp/2024/",
    subtitle: "レギュラートーク「PencilKitで実装するPDFへの手書き注釈」",
    related: {
      Proposal:
        "https://fortee.jp/iosdc-japan-2024/proposal/c39177cc-63a3-46f6-a3e4-5be077839662",
      Slide: "https://ras0q.github.io/iosdc2024/",
      GitHub: "https://github.com/ras0q/iosdc2024",
    },
  },
];

export const contests: LogProps[] = [
  {
    duration: "2023.02.25",
    title: "ULTRA TAMAGO ENGINEER No.1",
    link: "https://www.ulsystems.co.jp/news/press/2023-01-20.html",
    subtitle: "3位（tetoraSS）",
  },
  {
    duration: "2023.03.02 ~ 2023.03.04",
    title: "みやぎハッカソン2023",
    link: "https://2023.hackathon.miyagi.jp/",
    subtitle: "出場（cat-crosswalk）",
  },
  {
    duration: "2023.09.22 ~ 2023.09.28",
    title: "DIGI-CON HACKATHON 2023",
    link: "https://iosdc.jp/2023/",
    subtitle: "畑健二郎賞 & 株式会社メディアドゥ賞（cat-crosswalk）",
    related: {
      Blog: "https://trap.jp/post/2031/",
    },
  },
  {
    duration: "2024.12.8",
    title: "ISUCON14",
    link: "https://isucon.net/archives/58818382.html",
    subtitle: "25位（学生3位、MIXI賞）（tetora）",
  },
];

export const works: { [key: string]: LogProps[] } = {
  "Personal Projects": [
    {
      duration: "2024.03 ~ now",
      title: "ras0q.com",
      link: "https://ras0q.com/",
      subtitle: `このポートフォリオ`,
      related: {
        GitHub: "https://github.com/ras0q/ras0q.com",
      },
    },
    {
      duration: "2023.02 ~ 2023.04",
      title: "slitscan3d",
      link: "https://slitscan3d.ras0q.com",
      subtitle: `Slit-scanを3D空間で再現するアプリ
slitの切り口を3D空間に描画し、パラメータを変更することで様々なパターンのSlit-scanを観察することができる
React、Three.js (React Three Fiber) を使って作成した`,
      related: {
        GitHub: "https://github.com/ras0q/slitscan3d",
        "traP blog": "https://trap.jp/post/1841/",
      },
    },
    {
      duration: "2020.11",
      title: "gcg - Go Construtor Generator",
      link: "https://github.com/ras0q/gcg",
      subtitle: `Goの構造体のコンストラクタ関数を自動生成するCLIツール`,
      related: {
        "traP blog": "https://trap.jp/post/1429/",
      },
    },
    {
      duration: "2022.12",
      title: "wscat",
      link: "https://github.com/ras0q/go-wstest/tree/main/wscat",
      subtitle: `Websocket通信を対話形式でテストできるようにしたCLIツール`,
      related: {
        "traP blog": "https://trap.jp/post/1790/",
      },
    },
    {
      duration: "2022.07",
      title: "ISUCON Dashboard",
      link: "https://github.com/tetoraorg/isucon-dashboard",
      subtitle:
        `Elasticsearch, Kibana, FluentBit, Luaなどを使用したISUCONのダッシュボード
ISUCON12で使用した`,
      related: {
        "traP blog": "https://trap.jp/post/1628/",
      },
    },
    {
      duration: "2022.08",
      title: "traQ iOS (WIP)",
      link: "https://github.com/ras0q/traq-ios-clone",
      subtitle: `部内SNS『traQ』をSwiftで再現したiOSアプリ (非公式)
Swift Package centered project、The Composable Architectureなどを使用して開発中`,
    },
  ],
  "Team Projects": [
    {
      duration: "2020.03 ~ now",
      title: "traPortfolio",
      link: "https://portfolio.trap.jp",
      subtitle:
        `部員のポートフォリオサイトや各種リンクなどをまとめる外部向けサービス
バックエンドはGo、フロントエンドはVue.jsを使用して開発中
バックエンドをメインにフロントエンドも担当し、プロジェクトリーダーとして開発を進めている`,
    },
    {
      duration: "2020.07",
      title: "Make Sure The Pressure",
      link: "https://make-sure-the-pressure.trap.games",
      subtitle: `気圧を操作しゴールを目指すゲーム
ゲームプログラミングを担当`,
      related: {
        "traP blog": "https://trap.jp/post/1097/",
      },
    },
    {
      duration: "2020.12",
      title: "Qtheme",
      subtitle: `部内SNS『traQ』のカスタムテーマを作成するサービス
バックエンドを担当`,
      related: {
        "traP blog": "https://trap.jp/post/1192/",
      },
    },
    {
      duration: "2021.06",
      title: "Qtunes",
      subtitle: `部内SNS『traQ』に投稿された曲を一覧できるサービス
チームリーダー、バックエンドを担当`,
      related: {
        "GitHub (Backend)": "https://github.com/traP-jp/qtunes-backend",
        GitHub: "https://github.com/traP-jp/qtunes-frontend",
        "traP blog": "https://trap.jp/post/1315/",
      },
    },
    {
      duration: "2021.12",
      title: "Nascalay",
      link: "https://nascalay.trap.games",
      subtitle: `プレイヤー同士で協力してお題を完成させるお絵かきリレー
バックエンドを担当`,
      related: {
        "GitHub (Backend)": "https://github.com/cat-crosswalk/nascalay-backend",
        "GitHub (Frontend)":
          "https://github.com/cat-crosswalk/nascalay-frontend",
        "traP blog": "https://trap.jp/post/1467/",
      },
    },
    {
      duration: "2022.07",
      title: "stanQ",
      subtitle: `部内SNS『traQ』で用いるスタンプの生成ツール
チームリーダー、バックエンドを担当`,
      related: {
        "traP blog": "https://trap.jp/post/1617/",
      },
    },
    {
      duration: "2023.03",
      title: "memoru",
      link: "https://memoru.trasta.dev/",
      subtitle: `旅行先で集めたアイテムを仮想空間の家に飾ることができるアプリ
バックエンドを担当`,
      related: {
        Presentation: "https://www.pref.miyagi.jp/documents/45294/04.pdf",
      },
    },
    {
      duration: "2023.03",
      title: "missingtypeguard",
      link: "https://github.com/ras0q/missingtypeguard",
      subtitle:
        `Goのソースコードを静的解析し、type guardが不足している箇所を検出するツール`,
      related: {
        Presentation:
          "https://docs.google.com/presentation/d/e/2PACX-1vShdRaEloexbntnvyRMr1mueYPddMNAIP_dWHchedo6wleYb_sq5Ttt5sepFMniRXJjtP-4CTpxRJQG/pub",
      },
    },
    {
      duration: "2023.06",
      title: "traP Mission",
      link: "https://mission.trap.games/",
      subtitle: `部内SNS『traQ』で用いるミッションを作成するサービス
リームリーダー、バックエンド、フロントエンドを担当`,
      related: {
        "GitHub (Backend)": "https://github.com/traP-jp/h23s_26",
        "GitHub (Frontend)": "https://github.com/traP-jp/h23s_26-UI",
        "traP blog": "https://trap.jp/post/1909/",
      },
    },
    {
      duration: "2023.09",
      title: "Mikage",
      link: "https://mikage.trap.show/",
      subtitle:
        `複数の写真データを1つの3Dシーンとして保存・閲覧できるプラットフォーム
3D Gaussian Splattingを使用して開発`,
      related: {
        GitHub: "https://github.com/cat-crosswalk/mikage-client",
        Presentation:
          "https://docs.google.com/presentation/d/e/2PACX-1vSdMdN8t7vee_dLETWshYUYx8Vs62xhTL0XxLDGryFWyqeRGY7LxbAZ4hfbAEH7eXAjc0fGv4-Lusl2/pub",
        "traP blog": "https://trap.jp/post/2031/",
      },
    },
  ],
};
