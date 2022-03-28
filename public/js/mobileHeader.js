window.addEventListener('load', () => {
  const $mobileHamburger = d.querySelector('.hamburger')
  const $nav = d.querySelector('.nav__ul')

  $mobileHamburger.addEventListener('click', (e) => {
    $mobileHamburger.classList.toggle('is-active')
    $nav.classList.toggle('nav-active')
  })
})
