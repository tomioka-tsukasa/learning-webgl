import gsap from 'gsap'

export const animation = (
  canvas: HTMLCanvasElement
) => {
  gsap.fromTo(canvas, {
    opacity: 0
  }, {
    opacity: 1,
    duration: 1.5,
    ease: 'power2.in',
  })
}
