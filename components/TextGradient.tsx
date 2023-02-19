import { JSX } from "preact";
export default function TextGradient({children,idx}:{children:any, idx?:number}) {
  const style = {'--idx':idx+1}
  return (
    <span style={style} class="textGradient">{children}</span>
  )
}