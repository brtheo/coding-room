import type { IPost } from "../../types/Octoblog.d.ts";

import { Head } from "$fresh/runtime.ts";
import { CSS } from "$gfm";
import "https://esm.sh/prismjs@1.27.0/components/prism-typescript?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-bash?no-check";
import { Handlers, PageProps } from "$fresh/server.ts";

import Header from "../../components/Header.tsx";
import Menu from "../../components/Menu.tsx";
import Post from "../../components/Post.tsx";
import Octoblog from "../../utils/octoblog.ts";


export const handler: Handlers<IPost[]> = {
  async GET(_req, ctx) {
    const posts = await Octoblog.getAllPosts()
    return ctx.render(posts as IPost[])
  }
}

export default function Blog(props: PageProps<IPost[]>) {
  const posts = props.data
  return (
    <>
      <Head>
        <title>Coding room</title>
        <link rel="stylesheet" href="shared.css"></link>
        <link rel="stylesheet" href="blog.css"></link>
        <link rel="stylesheet" href="animations.css"></link>
        <style dangerouslySetInnerHTML={{__html:CSS}}></style>
      </Head>
      <section 
        id="content"
        class="p-4 mx-auto min-h-[100dvh] bg-black text-white grid grid-cols-3 auto-rows-max" >
        <Header />
        <Menu />
        <main 
          data-color-mode="dark"
          data-dark-theme="dark"
          class="markdown-body place-self-center min-h-full w-[95vw] md:w-[760px] row-start-3 col-start-2 p-2 mt-5 flex flex-col gap-5" >
          {posts.map(post => <Post isMainPage={true} post={post}/>)}
        </main>
      </section>   
    </>
  );
}
