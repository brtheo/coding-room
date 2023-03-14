import type { JSXInternal } from "preact/src/jsx.d.ts";
import { useState } from "preact/hooks";

export default function PostCommentForm() {
  const handleSubmit = async (e: JSXInternal.TargetedEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const {author, body}: {author: HTMLInputElement, body: HTMLTextAreaElement} = e.target
    const headers = new Headers({
        'Content-Type': 'text/plain'
      });
    const opts = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          author: author.value,
          body: body.value,
        })
      }
    await fetch('/blog/blogception', opts);
    author.value = ''
    body.value = ''
  }
  return (
    <form
      method="post"
      encType="text/plain"
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
        <button>Comment</button>
      </form>
  )
}