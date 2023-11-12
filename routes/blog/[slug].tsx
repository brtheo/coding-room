import type { IComment, IPost, sha } from "../../types/Octoblog.d.ts";
import { render } from "$gfm";

import { Head } from "$fresh/runtime.ts";
import { CSS } from "$gfm";
import { Handler, HandlerContext, Handlers, PageProps } from "$fresh/server.ts";

import Header from "../../components/Header.tsx";
import Menu from "../../components/Menu.tsx";
import Post from "../../components/Post.tsx";
import Octoblog from "../../utils/octoblog.ts";

type postWithComment = [IPost, IComment[], sha]

const turnstileValidation = async (token: string | undefined, ip: string | null): Promise<boolean> => {

  const headers = new Headers()
  headers.append('accept','application/x-www-form-urlencoded')

  const body = new FormData();
	body.append('secret', Deno.env.get('CLOUDFLARE_KEY') as string);
	body.append('response', token as string);
	body.append('remoteip', ip as string);

  const method = 'POST'

	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, 
    { headers, body, method }
  );

	const outcome = await result.json();
  return outcome.success
}


export const handler: Handlers<postWithComment> = {
  async POST(_req, ctx) {
    const payload = (await _req.text()).split('\r\n')
    payload.pop()
    const props: Map<string, string> = new Map()
    payload.forEach(line => {
      const [key, value] = line.split("=")
      props.set(key,value)
    })
    const slug = new URL(_req.url).pathname.split('/').at(-1);
    const turnstileToken = props.get('cf-turnstile-response');
    const turnstileIp = _req.headers.get('CF-Connecting-IP');
    const isTurnistileValidated = await turnstileValidation(turnstileToken, turnstileIp);
    if(isTurnistileValidated) 
      await Octoblog.commitComment(props,(slug as string))

    return await handler['GET'](_req,ctx)
  },
  async GET(_req: Request, ctx) {
    const { slug } = ctx.params;
    const post = await Octoblog.getPostBySlug(slug),
          [comments, relatesTo] = await Octoblog.getCommentsByPost(slug)
    return ctx.render([post,comments,relatesTo] as postWithComment)
  }
}

export default function Blog(props: PageProps<postWithComment>) {
  const [post, comments, relatesTo] = props.data;
  // const theme = Boolean(+globalThis.sessionStorage.getItem('dark')!) ? 'light' : 'dark';
  // console.log(theme)
  return (
    <>
      <Head>
        <title>Coding room</title>
        {/* <link rel="stylesheet" href="/shared.css"></link>
        <link rel="stylesheet" href="/blog.css"></link>
        <link rel="stylesheet" href="/animations.css"></link> */}
        <script defer async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
        
        <link rel="stylesheet" href="https://use.typekit.net/ppc0skv.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-dark.min.css" integrity="sha512-Mo2QuokS9Y0JOuzVLUh3o9A07RqSXcpc2KC9LXxOwfaBgPt8ZHRiDfGQ2+tZw7xIno+ViWipTNLg1StC6TmwMA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="/blogv2.css" />
        {/* <link rel="stylesheet" href="/theme.css" /> */}
        <style dangerouslySetInnerHTML={{__html:CSS}}></style>
      </Head>
      <x-card blog-post title={post.title} style="width: 80%; grid-column: span 2;">
        <main class="markdown-body" data-color-mode="dark"
          data-dark-theme="dark" dangerouslySetInnerHTML={
            { __html: render(post?.content,{disableHtmlSanitization:true}) }
          }></main>
      </x-card>
      {/* <section 
        id="content"
        class="p-4 mx-auto min-h-[100dvh] bg-black text-white grid grid-cols-3 auto-rows-max" >
        <Header />
        <Menu />
        <main 
          data-color-mode="dark"
          data-dark-theme="dark"
          class="markdown-body place-self-center min-h-full w-[95vw] md:w-[980px] row-start-3 col-start-2 p-2 mt-5 flex flex-col gap-5" >
          <Post isMainPage={false} post={post} comments={comments} sha={relatesTo}/>
        </main>
      </section>    */}
    </>
  );
}
