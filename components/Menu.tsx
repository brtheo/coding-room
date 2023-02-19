import { JSX } from "preact";
import TextGradient from "./TextGradient.tsx";
import Salesforce from "../islands/Salesforce.tsx";

import { IS_BROWSER } from "$fresh/runtime.ts";


function MenuItem({textLabel, link, idx, opt = {newTab:false}}:{textLabel:string, link:string, idx:number}) {
  return (
    <li class="p-2">
      <a href={link} target={opt.newTab ? '_blank' : '_self'} class="p-2">
        <TextGradient idx={idx} >{textLabel}</TextGradient>
      </a>
    </li>
  )
}

export default function Menu(props: JSX.HTMLAttributes<HTMLElement>) {
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
    <nav class="px-6 pt-[10rem]" data-pop style="--animationDelay:4">
      <ul class="flex flex-col gap-6">
        {menuItems.map((item,i)=> <MenuItem idx={i} textLabel={item.textLabel} link={item.link} opt={item.opt} />)}
      </ul>
    </nav>
  )
}