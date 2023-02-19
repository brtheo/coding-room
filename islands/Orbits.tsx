import {JSX} from 'preact'
export default function Orbits({items}) {
  const getStyle = i => { return {
    '--idx': i
  }}
  return (
    <section id="orbits" class="absolute w-[15rem] h-[15rem] rounded-[50vw] ">
      {items.map((item, i) => 
        <div class="imgBox absolute w-[50%] h-[50%]" style={getStyle(i)}>
          <img
            title={item.title}
            src={item.src}
            class="w-[100%] absolute"
            style={getStyle(i)}/>
        </div>
      )}
    </section>
  )
}