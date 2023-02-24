import { Head } from "$fresh/runtime.ts";
import Fancy from "../islands/Fancy.tsx";
import Content from "../components/Content.tsx";


export default function Home() {
  
  return (
    <>
      <Head>
        <title>Theo's Coding Room</title>
        <link rel="stylesheet" href="shared.css"></link>
        <link rel="stylesheet" href="main.css"></link>
        <link rel="stylesheet" href="fancy.css"></link> 
        <link rel="stylesheet" href="animations.css"></link>
        <script defer src="utils.js"></script>
      </Head>
      <div id="entry" class="p-4 mx-auto w-screen h-screen bg-black text-white text-[6vh] grid place-content-center overflow-hidden" >
        <Content  />  
        <Fancy text="Hello" cancel={true}/>
        
      </div>
    </>
  );
}
