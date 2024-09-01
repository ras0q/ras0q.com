import { Log } from "../components/Log.tsx";
// @ts-types="../static/styled-system/css/index.d.mts"
import { css } from "../static/styled-system/css/index.mjs";

export default function About() {
  return (
    <main
      class={css`
        display: grid;
        grid-template-areas:
          "profile profile"
          "careers skills"
          "contests talks";
        grid-gap: 4rem 2rem;
        grid-template-columns: 1fr 1fr;
        @media (max-width: 600px) {
          grid-template-areas:
            "profile"
            "careers"
            "skills"
            "contests"
            "talks";
        }
        padding: 5% 10%;
        & * {
          margin: 0;
        }
        & li {
          list-style: none;
        }
      `}
    >
      <h1 class={css`grid-area: profile; text-align: center;`}>
        Ras / <code>@ras0q</code>
      </h1>
      <div class={css`grid-area: skills; margin: 0 auto;`}>
        <h2 class={css`text-align: center;`}>Skills</h2>
        <ul class={css`padding: 0;`}>
          <li>★★★★★ Go</li>
          <li>★★★★☆ Swift</li>
          <li>★★★★☆ JavaScript / TypeScript</li>
          <li>★★★☆☆ Python</li>
          <li>★☆☆☆☆ C / C++</li>
          <li>★★★★★ Git</li>
          <li>★★★★☆ Docker / Docker Compose</li>
          <li>★★☆☆☆ Vim keybindings</li>
        </ul>
      </div>
      <div class={css`grid-area: careers; margin: 0 auto;`}>
        <h2 class={css`text-align: center;`}>Careers</h2>
        <div class={css`display: grid; grid-row-gap: 0.5rem;`}>
          <Log
            duration="2020.04 ~ 2024.03"
            title="東京工業大学 工学院 情報通信系"
            link="https://educ.titech.ac.jp/ict/"
          />
          <Log
            duration="2020.04 ~ now"
            title="デジタル創作同好会traP"
            link="https://trap.jp/"
            related={{
              "Blog": {
                title: "trap.jp",
                link: "https://trap.jp/author/Ras",
              },
            }}
          />
          <Log
            duration="2022.04 ~ now"
            title="ピクシブ株式会社 学生アルバイト"
            link="https://www.pixiv.co.jp/"
            related={{
              "Blog": {
                title:
                  "ピクシブで1からiOSアプリ開発を学んだ学生がサービス開発に挑戦！",
                link: "https://inside.pixiv.blog/2023/09/21/160000",
              },
            }}
          />
          <Log
            duration="2023.03.15 ~ 2023.03.17"
            title="Gopher Enablement Internship"
            link="https://job.tracks.run/challenges/kwork-24-01"
          />
          <Log
            duration="2024.04 ~ now"
            title="東京工業大学 工学院 情報通信系 情報通信コース 修士課程"
            link="https://educ.titech.ac.jp/ict/"
          />
        </div>
      </div>
      <div class={css`grid-area: talks; margin: 0 auto;`}>
        <h2 class={css`text-align: center;`}>Talks</h2>
        <div class={css`display: grid; grid-row-gap: 0.5rem;`}>
          <Log
            duration="2023.09.02"
            title="iOSDC Japan 2023 登壇（ルーキーズLT）"
            link="https://iosdc.jp/2023/"
            related={{
              "Proposal": {
                title: "iOS16で変わった画面の向きを操作する方法",
                link:
                  "https://fortee.jp/iosdc-japan-2023/proposal/85d05870-fa34-488c-a9c2-74505f35a43f",
              },
              "Slide": {
                title: "SpeakerDeck",
                link:
                  "https://speakerdeck.com/ras0q/iosdc-2023-how-to-control-device-orientations-in-ios16-8eb197f3-45a3-41eb-9937-a1b01aa86baf",
              },
              "Blog": {
                title:
                  "iOSDC Japan 2023にピクシブのエンジニアが3名登壇して、ブース展示もしました。",
                link: "https://inside.pixiv.blog/2023/09/14/183000",
              },
            }}
          />
          <Log
            duration="2023.08.24"
            title="iOSDC Japan 2024 登壇（レギュラートーク）"
            link="https://iosdc.jp/2024/"
            related={{
              "Proposal": {
                title: "PencilKitで実装するPDFへの手書き注釈",
                link:
                  "https://fortee.jp/iosdc-japan-2024/proposal/c39177cc-63a3-46f6-a3e4-5be077839662",
              },
              "Slide & Demo": {
                title: "GitHub",
                link: "https://github.com/ras0q/iosdc2024",
              },
            }}
          />
        </div>
      </div>
      <div class={css`grid-area: contests; margin: 0 auto;`}>
        <h2 class={css`text-align: center;`}>Contests</h2>
        <div class={css`display: grid; grid-row-gap: 0.5rem;`}>
          <Log
            duration="2023.02.25"
            title="UTE-1 3位（tetoraSS）"
            link="https://www.ulsystems.co.jp/news/press/2023-01-20.html"
          />
          <Log
            duration="2023.03.02 ~ 2023.03.04"
            title="みやぎハッカソン2023 出場（cat-crosswalk）"
            link="https://2023.hackathon.miyagi.jp/"
          />
          <Log
            duration="2023.09.22 ~ 2023.09.28"
            title="DIGI-CON HACKATHON 2023 畑健二郎賞 & 株式会社メディアドゥ賞（cat-crosswalk）"
            link="https://iosdc.jp/2023/"
            related={{
              "Blog": {
                title: "DIGI-CON HACKATHON 2023『Mikage』",
                link: "https://trap.jp/post/2031/",
              },
            }}
          />
          <Log
            duration="2023.12.06 ~ 2023.12.08"
            title="Mercoin Hackathon 2023"
            link="https://mercan.mercari.com/articles/40371/"
          />
        </div>
      </div>
    </main>
  );
}
