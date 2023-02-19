import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

function Letter({children}:{children:string}) {
  const letterToEffect = new Map([
    ['H', {
      'text': 'ello',
      'position': 'after',
      'step': 0
    }],
    ['o', {
      'text': 'The',
      'position': 'before',
      'step':3
    }],
    ['e', {
      'before': {
        'text': `My nam`,
        'step':1
      },
      'after': {
        'step':2,
        'text': 'is'
      },
    }]
  ])
  const [typeWriterAnimationStep, setAnimationStep] = useState(null)

  const letter = letterToEffect.get(children)
  const handleAnimationEnd = _ => document.body.setAttribute('data-state','ready')
  return (
    <span data-letter class="w-fit h-fit">
      {letter?.position === 'before' 
        ? <span onAnimationEnd={handleAnimationEnd} style={`--delayMultiplier:${letter?.step}`} data-step={letter?.step} class={letter?.step >= typeWriterAnimationStep ? "letterHidden typeWriter" : "letterHidden done"}>{letter?.text}</span>
        : <span style={`--delayMultiplier:${letter?.before?.step}`} data-step={letter?.before?.step} class={letter?.before?.step >= typeWriterAnimationStep ? "letterHidden typeWriter" : "letterHidden done"}>{letter?.before?.text}</span>
      }
      {children}
      {letter?.position === 'after' 
        ? <span style={`--delayMultiplier:${letter?.step}`} data-step={letter?.step} class={letter?.step >= typeWriterAnimationStep ? "letterHidden typeWriter" : "letterHidden done"}>{letter?.text}</span>
        : <span style={`--delayMultiplier:${letter?.after?.step}`} data-step={letter?.after?.step} class={letter?.after?.step >= typeWriterAnimationStep ? "letterHidden typeWriter" : "letterHidden done"}>{letter?.after?.text}</span>
      }
    </span>
  )
}


export default function Fancy({text, cancel}:{text:string, cancel:boolean}) {
  const [isRotated, setRotated] = useState(false)

  if(IS_BROWSER && cancel) {
    document.body.setAttribute('data-state','cancel')
  }

  const handleScroll = () => {
      setRotated(true)
  }


  return (
    <div id="fancy" class="flex gap-x-5 w-[100%]" onClick={handleScroll} data-rotated={isRotated ? 'on':'off'} >
      {Array.from(text).map((letter: string) => <Letter>{letter}</Letter>)}
    </div>
  )
}
