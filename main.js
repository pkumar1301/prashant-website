// Carousel arrows, the TEDx player and the share button. The page works without
// this file: the carousel still scrolls and every card is a plain link.

(() => {
  const rail = document.querySelector('.rail')
  const buttons = document.querySelectorAll('.rail-btn')

  if (rail && buttons.length) {
    const step = () => {
      const item = rail.querySelector('.item')
      const gap = parseFloat(getComputedStyle(rail).columnGap) || 0
      return item ? item.getBoundingClientRect().width + gap : rail.clientWidth
    }

    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth - 2
      buttons[0].disabled = rail.scrollLeft <= 2
      buttons[1].disabled = rail.scrollLeft >= max
    }

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        rail.scrollBy({ left: step() * Number(btn.dataset.dir), behavior: 'smooth' })
      })
    })

    rail.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { rail.scrollBy({ left: step() }); e.preventDefault() }
      if (e.key === 'ArrowLeft') { rail.scrollBy({ left: -step() }); e.preventDefault() }
    })

    rail.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
  }

  // The talk loads from YouTube only when someone asks to play it.
  document.querySelectorAll('.video').forEach((box) => {
    const play = box.querySelector('.video-play')
    play?.addEventListener('click', () => {
      const iframe = document.createElement('iframe')
      iframe.src = `https://www.youtube-nocookie.com/embed/${box.dataset.video}?autoplay=1&rel=0`
      iframe.title = box.dataset.title
      iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen'
      iframe.allowFullscreen = true
      box.replaceChildren(iframe)
      iframe.focus()
    })
  })

  const share = document.querySelector('[data-share]')
  if (share) {
    const label = share.querySelector('span')
    const url = 'https://www.pkumarpmleader.com/'
    share.addEventListener('click', async () => {
      if (navigator.share) {
        try { await navigator.share({ title: 'Prashant Kumar', url }) } catch { /* closed */ }
        return
      }
      try {
        await navigator.clipboard.writeText(url)
        label.textContent = 'Link copied'
        setTimeout(() => { label.textContent = 'Share' }, 1800)
      } catch { /* no clipboard */ }
    })
  }
})()
