const getAngle = ({x,y}) => {
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2
  const deltaX = x - centerX
  const deltaY = y - centerY
  const angleInRadians = Math.atan2(deltaY, deltaX)
  return angleInRadians * 180 / Math.PI
}
const setCSSVarOnMouseMove = (e) => {
  const rad = Math.floor(getAngle(e))
  document.documentElement.style.setProperty('--rad', `${rad}deg`);
}
document.documentElement.addEventListener('mousemove',setCSSVarOnMouseMove)

// const imgInSpiral = document.querySelectorAll('.spiral')

// function getKeyframes(i) {
//   return [
//   { offsetDistance: 0, motionOffset: 0 },
//   { offsetDistance: `${100-(i*10)}%`, motionOffset: '100%' }
// ]
// }

// const time = 4000
// for (let i = 0, len = imgInSpiral.length; i < len; ++i) {
//   const player = imgInSpiral[i].animate(getKeyframes(i), {
//     duration: time,
//     iterations: 1,
//     fill: 'both',
//     easing: 'ease-in',
//     delay: time * (i / imgInSpiral.length)
//   })
//   const scaler = imgInSpiral[i].animate([
//     { transform: 'scale(0)',
//       opacity: 0, 
//       offset: 0 },
//     { transform: 'scale(1)',
//       opacity: 1, 
//       offset: .01 },
//     { transform: 'scale(1)',
//       opacity: 1, 
//       offset: 1 }
//   ], {
//     duration: time,
//     iterations: 1,
//     direction: 'normal',
//     fill: 'both',
//     easing: 'cubic-bezier(0.55,0.055,0.675,0.19)',
//     delay: time * (i / imgInSpiral.length)
//   })
// }