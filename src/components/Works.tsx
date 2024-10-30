// TODO: MarkdownをやめてJSXに整形する

import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { css } from "../styled-system/css/css.mjs";

export const Works = () => {
  const parsed = marked
    .use(gfmHeadingId())
    .parse(markdown, { async: false });

  return (
    <div
      class={css`
        padding: 5% 10%;
      `}
      dangerouslySetInnerHTML={{ __html: parsed }}
    />
  );
};

const markdown = `
# Works

## Personal Projects

### ras0q.com

2024.03 ~

このポートフォリオ
[Astro](https://astro.build)を使って作成した

- Product: **[ras0q.com](https://ras0q.com)**

### slitscan3d

2023/02 ~ 2023/04

[Slit-scan](https://en.wikipedia.org/wiki/Slit-scan_photography)を3D空間で再現するアプリ
slitの切り口を3D空間に描画し、パラメータを変更することで様々なパターンのSlit-scanを観察することができる
[React](https://react.dev)、[Three.js](https://threejs.org/) ([React Three Fiber](https://docs.pmnd.rs/react-three-fiber)) を使って作成した

- Product: **[slitscan3d.ras0q.com](https://slitscan3d.ras0q.com)**
- traP blog: **[🧬スリットスキャンをReactとThree.jsで🧬](https://trap.jp/post/1841/)**

### gcg - Go Construtor Generator

2020.11

Goの構造体のコンストラクタ関数を自動生成するCLIツール

- GitHub: **[ras0q/gcg](https://github.com/ras0q/gcg)**
- traP blog: **[Goファイルを静的解析して構造体のコンストラクタを自動生成するCLIツールを作った【AdC2021 21日目】](https://trap.jp/post/1429/)**

### wscat

2022.12

Websocket通信を対話形式でテストできるようにしたCLIツール

- GitHub: **[ras0q/go-wstest/wscat](https://github.com/ras0q/go-wstest/tree/main/wscat)**
- traP blog: **[GoでWebSocketのテスト書く](https://trap.jp/post/1790/)**

### ISUCON Dashboard

2022.07

Elasticsearch, Kibana, FluentBit, Luaなどを使用したISUCONのダッシュボード
ISUCON12で使用した

- GitHub: **[tetoraorg/isucon-dashboard](https://github.com/tetoraorg/isucon-dashboard)**
- traP blog: **[ISUCON12に向けてダッシュボードを自作してログを可視化しました](https://trap.jp/post/1628/)**

### traQ iOS (WIP)

2022.08 ~

部内SNS『traQ』をSwiftで再現したiOSアプリ (非公式)
[Swift Package centered project](https://speakerdeck.com/d_date/swift-package-centered-project-build-and-practice)、[The Composable Architecture](https://github.com/pointfreeco/swift-composable-architecture)などを使用して開発中

- GitHub: **[ras0q/traq-ios-clone](https://github.com/ras0q/traq-ios-clone)**

## traP Official Projects

### traPortfolio (WIP)

2020.03 ~

部員のポートフォリオサイトや各種リンクなどをまとめる外部向けサービス
バックエンドは[Go](https://go.dev/)、フロントエンドは[Vue.js](https://vuejs.org/)を使用して開発中
バックエンドをメインにフロントエンドも担当し、プロジェクトリーダーとして開発を進めている

## Hackathon & Internship Projects

### Make Sure The Pressure

2020.07 traP 2020年春ハッカソン

気圧を操作しゴールを目指すゲーム
ゲームプログラミングを担当

- Product: **[make-sure-the-pressure.trap.games](https://make-sure-the-pressure.trap.games)**
- traP blog: **[2020春ハッカソン 10班「Make sure the Pressure」](https://trap.jp/post/1097/)**

### Qtheme

2020.12 traP 2020年冬ハッカソン

部内SNS『traQ』のカスタムテーマを作成するサービス
バックエンドを担当

- traP blog: **[2020冬ハッカソン 2班 「Qtheme」](https://trap.jp/post/1192/)**

### Qtunes

2021.06 traP 2021年春ハッカソン

部内SNS『traQ』に投稿された曲を一覧できるサービス
チームリーダー、バックエンドを担当

- GitHub:
  - **[traP-jp/qtunes-backend](https://github.com/traP-jp/qtunes-backend)**
  - **[traP-jp/qtunes-frontend](https://github.com/traP-jp/qtunes-frontend)** (developed by other members)
- traP blog: **[2021春ハッカソン 2班「Qtunes」](https://trap.jp/post/1315/)**

### Nascalay

2021.12 traP 2021年冬ハッカソン

プレイヤー同士で協力してお題を完成させるお絵かきリレー
バックエンドを担当

- Product: **[nascalay.trap.games](https://nascalay.trap.games)**
- GitHub:
  - **[cat-crosswalk/nascalay-backend](https://github.com/cat-crosswalk/nascalay-backend)**
  - **[cat-crosswalk/nascalay-frontend](cat-crosswalk/nascalay-frontend)** (developed by other members)
- traP blog: **[2021 冬ハッカソン 2班「Nascalay」](https://trap.jp/post/1467/)**

### stanQ

2022.07 traP 2022年春ハッカソン

部内SNS『traQ』で用いるスタンプの生成ツール
チームリーダー、バックエンドを担当

- traP blog: **[2022 春 ハッカソン 14班 「stamQ」](https://trap.jp/post/1617/)**

### memoru

2023.03 みやぎハッカソン2023

旅行先で集めたアイテムを仮想空間の家に飾ることができるアプリ
バックエンドを担当

- Product: **[memoru.trasta.dev](https://memoru.trasta.dev/)**
- Presentation: **[ちょっと寄り道日記「memoru」](https://www.pref.miyagi.jp/documents/45294/04.pdf)**

### missingtypeguard

2023.03 Gopher Enablement Internship

Goのソースコードを静的解析し、type guardが不足している箇所を検出するツール

- GitHub: **[ras0q/missingtypeguard](https://github.com/ras0q/missingtypeguard)**
- Presentation: **[成果発表 - Gopher Enablement Internship](https://docs.google.com/presentation/d/e/2PACX-1vShdRaEloexbntnvyRMr1mueYPddMNAIP_dWHchedo6wleYb_sq5Ttt5sepFMniRXJjtP-4CTpxRJQG/pub)**

### traP Mission

2023.06 traP 2023年春ハッカソン

部内SNS『traQ』で用いるミッションを作成するサービス
リームリーダー、バックエンド、フロントエンドを担当

- Product: **[mission.trap.games](https://mission.trap.games/)**
- GitHub:
  - **[traP-jp/h23s_26](https://github.com/traP-jp/h23s_26)**
  - **[traP-jp/h23s_26-UI](https://github.com/traP-jp/h23s_26-UI)**
- traP blog: **[2023 春ハッカソン 26班 『traP Mission』](https://trap.jp/post/1909/)**

### Mikage

2023.09 DIGI-CON HACKATHON 2023

複数の写真データを1つの3Dシーンとして保存・閲覧できるプラットフォーム
3D Gaussian Splattingを使用して開発

- Product: **[mikage.trap.show](https://mikage.trap.show/)**
- GitHub: **[cat-crosswalk/mikage-client](https://github.com/cat-crosswalk/mikage-client)**
- Presentation: **[世界をまるごと保存。写真の中を歩く体験を「Mikage」](https://docs.google.com/presentation/d/e/2PACX-1vSdMdN8t7vee_dLETWshYUYx8Vs62xhTL0XxLDGryFWyqeRGY7LxbAZ4hfbAEH7eXAjc0fGv4-Lusl2/pub)**
- traP blog: **[DIGI-CON HACKATHON 2023『Mikage』](https://trap.jp/post/2031/)**
`;
