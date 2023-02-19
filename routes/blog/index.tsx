import { Head } from "$fresh/runtime.ts";
import Header from "../../components/Header.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import Menu from "../../components/Menu.tsx";
import Post from "../../components/Post.tsx";
import { CSS} from "https://deno.land/x/gfm/mod.ts";
import { getPost, IPost } from "../../utils/bloggish.ts";


export const handler: Handlers<IPost> = {
  async GET(_req, ctx) {
    const post = await getPost('first-blog-post')
    return ctx.render(post as IPost)
  }
}

export default function Blog(props: PageProps<IPost>) {
  const post = props.data
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
          data-blog-post
          data-color-mode="dark"
          data-dark-theme="dark"
          class="markdown-body place-self-center min-h-full w-[95vw] md:w-[760px] row-start-3 col-start-2 p-2 mt-5" >
          <Post post={post}/>
        </main>
      </section>
      
    </>
  );
}
