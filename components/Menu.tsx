import { IS_BROWSER } from "$fresh/runtime.ts";
import { JSX } from "preact";
import { useState } from "preact/hooks";
import TextGradient from "./TextGradient.tsx";



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
    <>
      <input data-menu-icon type="checkbox" class="opacity-0 w-[64px] h-[64px] z-20 absolute top-10 left-10 md:hidden cursor-pointer" />
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="64" height="64" viewBox="0 0 32 32"
        class="absolute top-10 left-10 md:hidden cursor-pointer">
        <line width="28" height="1" x1="5" y1="8" x2="32" y2="8" stroke="white" stroke-linecap="round"/>
        <line width="28" height="1" x1="0" y1="18" x2="28" y2="18" stroke="white" stroke-linecap="round"/>
        </svg>
      <nav 
        class="px-6 text-[1.75rem] fixed -translate-x-[120%] mt-[6.5rem] md:flex md:translate-x-0 transition-transform transition-200 z-10 md:z-0 md:h-auto md:w-auto bg-white md:bg-transparent rounded-[2rem] h-[calc(100vh-136px)] w-[calc(100vw-32px)] backdrop-blur-md md:backdrop-blur-none"
        data-pop 
        style="--animationDelay:4; --tw-bg-opacity:.1; backdrop-filter: var(--tw-backdrop-blur)">
        <ul class="flex flex-col gap-6 mt-[120px] ml-10 md:ml-0 md:mt-0">
          {menuItems.map((item,i)=> <MenuItem idx={i} textLabel={item.textLabel} link={item.link} opt={item.opt} />)}
        </ul>
      </nav>
      
    </>
  )
}