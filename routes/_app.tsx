import { type PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";
export default function App({ Component }: PageProps) {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <meta name="description" content="Ras's Homepage" />
        <meta property="og:url" content="https://ras0q.com" key="url" />
        <meta property="og:title" content="ras0q.com" key="title" />
        <meta property="og:image" content={asset("/ogp.png")} key="image" />
        <meta property="og:image:width" content="1200" key="image-width" />
        <meta property="og:image:height" content="630" key="image-height" />
        <title>ras0q.com</title>
        <link rel="stylesheet" href={asset("/styles.css")} />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
