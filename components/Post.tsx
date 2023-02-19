import { Handlers, PageProps } from "$fresh/server.ts";
import {render } from "https://deno.land/x/gfm/mod.ts";
import type { IPost } from "../utils/bloggish.ts";
export default function Post({post}: {post: IPost | null}) {
  const cp = ``
  return (
    <article >
      <h1 class="font-display m-3 text-xl capitalize">{post?.title}</h1>
      <main  class="font-body m-5"
        dangerouslySetInnerHTML={{ __html: render(post?.content, {disableHtmlSanitization:true}) }}
      >
      </main>
      <aside class="font-serif mt-2">
        <span class="float-right">Published at {post?.publishedAt}</span>
      </aside>
      <script defer async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
    </article>     
  )
}