import { asset } from "$fresh/runtime.ts";
import { type PageProps } from "$fresh/server.ts";
import { TitleLogo } from "../components/TitleLogo.tsx";

export default function App({ Component }: PageProps) {
  const headerLinks = {
    "X": "https://x.com/ras0q",
    "GitHub": "https://github.com/ras0q",
  };

  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href={asset("/logo.svg")} />
        <meta name="description" content="Ras's Homepage" />
        <meta property="og:url" content="https://ras0q.com" key="url" />
        <meta property="og:title" content="ras0q.com" key="title" />
        <meta property="og:image" content={asset("/ogp.png")} key="image" />
        <meta property="og:image:width" content="1200" key="image-width" />
        <meta property="og:image:height" content="630" key="image-height" />
        <title>ras0q.com</title>
        <link rel="stylesheet" href={asset("/styles.css")} />
      </head>
      <body
        style={{
          minHeight: "100svh",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.5rem 2rem",
            background: "var(--ctp-latte-mantle)",
          }}
        >
          <a href="/" style={{ fontSize: "2rem" }}>
            <TitleLogo />
          </a>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
            }}
          >
            {Object.entries(headerLinks).map(([key, link]) => (
              <a
                key={key}
                href={link}
                style={{
                  color: "var(--ctp-latte-text)",
                }}
              >
                <strong>{key}</strong>↗
              </a>
            ))}
          </div>
        </header>
        <Component />
      </body>
    </html>
  );
}
