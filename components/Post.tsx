import type { IPost } from '../types/Octoblog.d.ts'

import { render } from "$gfm";

export default function Post({post}: {post: IPost}) {
  const cp = ``
  return (
    <article
      data-blog-post
      class="p-2 pb-4"
    >
      <h1 class="font-display m-3 text-xl capitalize">{post?.title}</h1>
      <main  class="font-body m-5"
        dangerouslySetInnerHTML={
          { __html: render(post?.content, {disableHtmlSanitization:true}) }
        }
      >
      </main>
      <aside class="font-serif mt-2 text-sm">
        <span class="float-right italic">Published on {new Date(post?.publishedAt).toDateString()}</span>
        <span class="float-right italic">Last Modified on {new Date(post?.lastModifiedAt).toDateString()}</span>
      </aside>
    </article>     
  )
}