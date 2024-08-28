import { asset, Head } from "$fresh/runtime.ts";
import InfiniteCanvas from "../islands/InfiniteCanvasIsland.tsx";

export default function Blog() {
  return (
    <>
      <Head>
        <meta
          name="og:title"
          content={`Blog | ras0q.com`}
          key="title"
        />
        <title>Blog | ras0q.com</title>
        <link rel="stylesheet" href={asset("/markdown.css")} />
      </Head>
      <main>
        <h1>Blog</h1>
        <p>Coming soon...</p>
        <div
          style={{
            width: "80svw",
            height: "80svh",
            border: "1px solid black",
          }}
        >
          <InfiniteCanvas />
        </div>
      </main>
    </>
  );
}
