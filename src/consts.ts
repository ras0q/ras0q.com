import type { Log } from "./components/Log.tsx";

export const skills = [
  { name: "Go", level: 5 },
  { name: "Swift", level: 4 },
  { name: "JavaScript / TypeScript", level: 4 },
  { name: "Python", level: 3 },
  { name: "C / C++", level: 1 },
  { name: "Git", level: 5 },
  { name: "Docker / Docker Compose", level: 4 },
  { name: "Vim keybindings", level: 2 },
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
    duration: "2023.03.15 ~ 2023.03.17",
    title: "株式会社ナレッジワーク",
    link: "https://kwork.studio/",
    subtitle: "インターンシップ",
    related: {
      "Job Description": "https://job.tracks.run/challenges/kwork-24-01",
    },
  },
  {
    duration: "2023.12.06 ~ 2023.12.08",
    title: "Mercoin Hackathon 2023",
    link: "https://about.mercari.com/",
    subtitle: "インターンシップ",
    related: {
      "Job Description": "https://mercan.mercari.com/articles/40371/",
    },
  },
  {
    duration: "2024.04 ~ now",
    title: "東京科学大学 工学院 情報通信系 情報通信コース",
    link: "https://educ.titech.ac.jp/ict/",
    subtitle: "修士課程",
  },
  {
    duration: "2024.08.12 ~ 2024.08.16",
    title: "日本経済新聞社",
    link: "https://hack.nikkei.com/",
    subtitle: "インターンシップ",
    related: {
      "Job Description": "https://hack.nikkei.com/internJobs/2024_summer/",
    },
  },
  {
    duration: "2024.09.02 ~ 2024.09.13",
    title: "株式会社サイボウズ",
    link: "https://cybozu.co.jp/",
    subtitle: "インターンシップ",
    related: {
      "Job Descriotion": "https://cybozu.co.jp/company/job/recruitment/intern/",
    },
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
];
