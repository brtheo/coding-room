import { JSX } from "preact";
import TextGradient from "./TextGradient.tsx";
import Menu from "./Menu.tsx";
import Header from "./Header.tsx";
import Salesforce from "../islands/Salesforce.tsx";


export default function Content(props: JSX.HTMLAttributes<HTMLElement>) {
  const menuItems = [
    {
      link: '/?cancelAnimation',
      textLabel: 'Home'
    },
    {
      link: '/blog',
      textLabel: 'Blog'
    },
    {
      link: 'https://www.linkedin.com/in/brtheo/',
      textLabel: 'Socials',
      opt: {newTab: true}
    }
  ]
  return(
    <section id="content" class=" p-4 pt-10 mx-auto w-screen h-screen bg-black text-[1.75rem] top-0 left-0 ">
      <Header />
      <Menu />
      <main class="mx-auto w-screen p-10 text-[1.25rem] flex flex-col gap-5 overflow-y-scroll overflow-x-hidden pl-[50%] pt-[30vh]">
        <section id="desc" data-pop style="--animationDelay:2">
          <TextGradient>
              I'm Theo Brossier <br/>
              Full Stack lead engineer at Capgemini ♠️ <br/>
              Living in Nantes, France
          </TextGradient>
        </section>
        <section id="desc" data-pop style="--animationDelay:3">
          <TextGradient>
              Typescript is the way to go and Deno has made my life easier<br/>
              I love web components and believe it's the future<br/>
              I'm also a 4x certified <Salesforce /> developer
          </TextGradient>
        </section>
        <section>
          <TextGradient>
            
          </TextGradient>
        </section>
      </main>
    </section>
  )
}