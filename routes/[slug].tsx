import { Handler, PageProps } from "$fresh/server.ts";
import { render } from "@deno/gfm";
import { Head } from "$fresh/runtime.ts";
import { extract } from "@std/front-matter/yaml";
import { exists } from "@std/fs";

interface Page {
  markdown: string;
  attrs: Record<string, string>;
}

export const handler: Handler = async (_req, ctx) => {
  const path = `./static/contents/${ctx.params.slug}.md`;
  const pageExists = await exists(path);
  if (!pageExists) {
    return ctx.renderNotFound();
  }
  const raw = await Deno.readTextFile(path);
  const { attrs, body } = extract(raw);
  return ctx.render({ markdown: body, attrs });
};

export default function MarkdownPage({ data }: PageProps<Page>) {
  const { markdown, attrs } = data;

  return (
    <>
      <Head>
        <title>{attrs.title} | ras0q.com</title>
        <link rel="stylesheet" href="/markdown.css" />
      </Head>
      <main>
        <div dangerouslySetInnerHTML={{ __html: render(markdown) }}></div>
      </main>
    </>
  );
}
