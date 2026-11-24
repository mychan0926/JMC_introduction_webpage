const root = document.documentElement
const pauseButton = document.querySelector('#pause')
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)')

pauseButton.addEventListener('click', () => {
  const paused = root.toggleAttribute('data-paused')
  pauseButton.setAttribute('aria-pressed', String(paused))
  pauseButton.textContent = paused ? '움직임 다시 켜기' : '움직임 멈추기'
})

function changeView(update) {
  if (document.startViewTransition && !reduceMotion.matches && !root.hasAttribute('data-paused')) {
    document.startViewTransition(update)
  } else {
    update()
  }
}

const layoutButton = document.querySelector('.layout-switch')
const layout = document.querySelector('#layout-preview')
layoutButton.addEventListener('click', () => changeView(() => {
  const expanded = layout.classList.toggle('expanded')
  layoutButton.setAttribute('aria-pressed', String(expanded))
}))

const spot = document.querySelector('.spotlight')
spot.addEventListener('pointermove', event => {
  if (reduceMotion.matches || root.hasAttribute('data-paused')) return
  const rect = spot.getBoundingClientRect()
  spot.style.setProperty('--x', ((event.clientX - rect.left) / rect.width * 100) + '%')
  spot.style.setProperty('--y', ((event.clientY - rect.top) / rect.height * 100) + '%')
})
spot.addEventListener('click', () => {
  spot.setAttribute('aria-pressed', String(spot.getAttribute('aria-pressed') !== 'true'))
})

if (!CSS.supports('animation-timeline', 'scroll()')) {
  document.querySelectorAll('.scrollbox').forEach(box => {
    box.addEventListener('scroll', () => {
      const range = box.scrollHeight - box.clientHeight
      box.style.setProperty('--progress', range ? box.scrollTop / range : 0)
    }, { passive: true })
  })
}

if ('IntersectionObserver' in window) {
  const sequence = document.querySelector('.sequence')
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) entry.target.classList.toggle('entered', entry.isIntersecting)
  }, { root: sequence, threshold: 0.35 })
  sequence.querySelectorAll('.sequence-line').forEach(line => observer.observe(line))
}

const looks = document.querySelectorAll('[data-look-choice]')
looks.forEach(button => button.addEventListener('click', () => changeView(() => {
  root.dataset.look = button.dataset.lookChoice
  looks.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)))
})))

const picks = document.querySelectorAll('input[type="checkbox"]')
const selection = document.querySelector('#selection-text')
const copy = document.querySelector('#copy')
const status = document.querySelector('#status')

picks.forEach(pick => pick.addEventListener('change', () => {
  selection.value = Array.from(picks).filter(item => item.checked).map(item => item.value).join(', ')
  copy.disabled = !selection.value
  status.textContent = ''
}))

copy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(selection.value)
    status.textContent = '선택한 코드를 복사했습니다.'
  } catch {
    selection.select()
    status.textContent = '코드를 선택했습니다. 복사 단축키를 사용하세요.'
  }
})
