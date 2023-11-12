import { Head } from "$fresh/runtime.ts";
import Fancy from "../islands/Fancy.tsx";
import Content from "../components/Content.tsx";


export default function Home() {
  
  return (
    <>
      <Head>
        <title>Theo's Coding Room</title>
        <link rel="stylesheet" href="/index.css"></link>
        {/* <link rel="stylesheet" href="shared.css"></link>
        <link rel="stylesheet" href="main.css"></link>
        <link rel="stylesheet" href="fancy.css"></link>  
        <link rel="stylesheet" href="animations.css"></link>*/}
        {/* <script defer src="utils.js"></script> */}
      </Head>
      <x-card title="Hello, I'm Theo." style="--delay:1" >
        <main>
          Full Stack lead engineer at <span style="color:#0070ad">Capgemini ♠️</span>
          Living in Nantes, France.
        </main>
      </x-card>
      <x-card title="In love with web components." style="--delay:2" >
        <main>
        I'm the creator and maintainer of <a style="all: unset; color: var(--accent)" href="https://github.com/brtheo/lwcToolbox">Lwc Toolbox</a>, a set of utilities simplifying the way we design salesforce app using Lightning Web Component.
        </main>
      </x-card>
      <x-card title="Salesforce developer." slf style="--delay:3" >
        <main>
        Part of my job revolves around the <span style="color:#00a1e0">Salesforce </span> ecosystem.
        I'm 5x certified developer.
        </main>
        <img slot="footer" class="badge" style="--x: 340px;" src="badges/administrator.png"/>
        <img slot="footer" class="badge" style="--x: 255px;" src="badges/developer1.png"/>
        <img slot="footer" class="badge" style="--x: 170px;" src="badges/developer2.png"/>
        <img slot="footer" class="badge" style="--x: 85px;" src="badges/javascript.png"/>
        <img slot="footer" class="badge" style="--x: 0px;" src="badges/expcons.png"/>
      </x-card>
      {/* <div id="entry" class="p-4 mx-auto w-screen h-screen bg-black text-white text-[6vh] grid place-content-center overflow-hidden" >
        <Content  />  
        <Fancy text="Hello" cancel={true}/> 
      </div>*/}
    </>
  );
}
