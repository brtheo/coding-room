import type { IPost } from '../types/Octoblog.d.ts'

import Tags from './Tags.tsx'
import { render } from "$gfm";

export default function Post({post, isMainPage}: {post: IPost, isMainPage: boolean}) {
  return (
    <article
      data-blog-post
      class="p-2 pb-4"
    >
      <header class=" mb-[2rem]">
        <div class="font-serif grid grid-cols-auto-2 items-center float-right mr-[2rem] -translate-y-[30px]">
          <img title="avatar" class="w-[2.6rem] rounded-[100vh] translate-y-[50%] mr-3" src={post?.author_pic} />
          <span class="col-start-2">{new Date(post?.publishedAt).toDateString()}</span>
          <Tags className="col-start-2" tags={post.tags} />
        </div>
        <h1 class="font-display m-3 text-xl capitalize"><a style="color: white !important" href={"/blog/"+post?.slug}>{post?.title}</a></h1>
      </header>
      <main  class="font-body m-5"
        dangerouslySetInnerHTML={
          { __html: render((!isMainPage ? post?.content : post?.content.slice(0,200)+'...'), {disableHtmlSanitization:true}) }
        }
      >      
      </main>
      <footer class="font-serif mt-2 text-sm">
        {isMainPage 
        ? <a class="float-right m-5" style="color: white !important" href={"/blog/"+post?.slug}>read more...</a> 
        : <span class="float-right italic">Last revision on {new Date(post?.lastModifiedAt).toDateString()}</span>
        }
      </footer>
          
    </article>     
  )
}