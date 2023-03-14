import { IS_BROWSER } from '$fresh/runtime.ts'
import PostCommentForm  from "../islands/PostCommentForm.tsx";
import type { IComment, sha } from '../types/Octoblog.d.ts'

export default function Comment({comments, relatesTo}: {comments?: IComment[], relatesTo: sha}) {
  return (
    <>
      <form
      id="comments"
      method="post"
      encType="text/plain"
      name={relatesTo}
      data-blog-post
      class="p-5 flex flex-col gap-10"
      >
        <input
          required
          type="text" 
          name="author"
          placeholder="Your name..."
          style="outline: 2px solid white; outline-offset: .5rem"
          class="text-white bg-black rounded-md pl-2"
        />
        <input
          required
          type="text"
          name="body"
          placeholder="Your comment..."
          style="outline: 2px solid white; outline-offset: .5rem"
          class="text-white bg-black rounded-md pl-2 h-[5rem]" 
        />
        <div class="cf-turnstile" data-sitekey="0x4AAAAAAADJinU3gH_6bmS-" data-theme="dark"></div>
        <button name="sha" value={relatesTo}>Comment</button>
      </form>
      <section data-blog-post>
        {comments?.map(comment =>
        <article
          class="flex flex-col p-5"
        >
          <h5>
            <span class="font-bold capitalize">{comment.author} </span>
            on
            <span class="font-italic"> {new Date(comment.publishedAt).toDateString()}</span> :
          </h5>
          {comment.content}
        </article>)}
      </section>
    </>  
  )
}