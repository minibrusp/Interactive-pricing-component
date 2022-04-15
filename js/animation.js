export const numberAnimation = (elem, value) => {
   gsap.to(elem, {
      textContent: value,
      duration: .3,
      ease: Power1.easeIn,
      snap: { textContent: 1 },
      stagger: 1,
   })
}