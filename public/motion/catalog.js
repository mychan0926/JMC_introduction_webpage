{
  const move = (transform, opacity = 1) => ({ transform, opacity })
  const idle = move('none')
  const effect = (name, ...frames) => ({ name, frames })
  const families = [
    ['등장', [
      effect('바닥에서 올라오기', move('translateY(40px)', 0), idle),
      effect('왼쪽 슬라이드', move('translateX(-65px)', 0), idle),
      effect('오른쪽 슬라이드', move('translateX(65px)', 0), idle),
      effect('초점 맞추기', { filter: 'blur(14px)', opacity: 0 }, { filter: 'blur(0)', opacity: 1 }),
      effect('대각선 접어 들어오기', move('translate(46px,36px) rotate(14deg) scale(.82)', 0), idle),
      effect('수직 접힘 펴기', move('scaleY(.05)', .3), idle),
      effect('작게 시작해서 확대', move('scale(.55)', .2), idle),
      effect('부드러운 착지', move('translateY(-55px) scale(.9)', 0), move('translateY(4px) scale(1.04,.96)'), idle),
    ]],
    ['마스크', [
      effect('좌에서 우로 닦기', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0)' }),
      effect('아래에서 위로 열기', { clipPath: 'inset(100% 0 0)' }, { clipPath: 'inset(0)' }),
      effect('가운데에서 양옆으로', { clipPath: 'inset(0 50%)' }, { clipPath: 'inset(0)' }),
      effect('가로 창문 열기', { clipPath: 'inset(50% 0)' }, { clipPath: 'inset(0)' }),
      effect('원형 조리개', { clipPath: 'circle(0%)' }, { clipPath: 'circle(75%)' }),
      effect('사선 셔터', { clipPath: 'polygon(0 0,0 0,0 100%,0 100%)' }, { clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)' }),
      effect('마름모 조리개', { clipPath: 'polygon(50% 50%,50% 50%,50% 50%,50% 50%)' }, { clipPath: 'polygon(50% -60%,160% 50%,50% 160%,-60% 50%)' }),
      effect('한쪽 모서리부터 확장', { clipPath: 'circle(0% at 0 0)' }, { clipPath: 'circle(150% at 0 0)' }),
    ]],
    ['입체', [
      effect('위로 드는 판', move('perspective(450px) rotateX(48deg) translateY(20px)'), idle),
      effect('책장처럼 회전', move('perspective(500px) rotateY(-70deg)', .35), idle),
      effect('아래로 접는 카드', idle, move('perspective(450px) rotateX(-65deg)', .5), idle),
      effect('동전 한 바퀴', idle, move('perspective(500px) rotateY(360deg)')),
      effect('기울었다 돌아오기', idle, move('perspective(400px) rotateX(16deg) rotateY(-23deg) scale(1.1)'), idle),
      effect('줌 아웃으로 안착', move('perspective(400px) translateZ(85px)', 0), idle),
      effect('모서리 피벗', { ...idle, transformOrigin: '0 0' }, { ...move('rotate(24deg)'), transformOrigin: '0 0' }, { ...idle, transformOrigin: '0 0' }),
      effect('대각선 3D 회전', move('perspective(500px) rotate3d(1,1,0,75deg)', .1), idle),
    ]],
    ['클릭 반응', [
      effect('눌렸다 돌아오기', idle, move('scale(.86)'), idle),
      effect('짧게 튀어 오르기', idle, move('translateY(-22px)'), idle),
      effect('가로 흔들림', idle, move('translateX(-12px)'), move('translateX(10px)'), move('translateX(-5px)'), idle),
      effect('가벼운 비틀림', idle, move('rotate(-12deg)'), move('rotate(7deg)'), idle),
      effect('고무줄 복원', idle, move('scale(1.22,.77)'), move('scale(.88,1.12)'), idle),
      effect('테두리 파동', { boxShadow: '0 0 0 0 #27645070' }, { boxShadow: '0 0 0 24px #27645000' }),
      effect('배경 채우기', { backgroundColor: '#fffef8', color: '#212724' }, { backgroundColor: '#2b5748', color: '#ffffff' }, { backgroundColor: '#fffef8', color: '#212724' }),
      effect('초점 링 들어오기', { outline: '2px solid transparent', outlineOffset: '13px' }, { outline: '2px solid #276450', outlineOffset: '3px' }),
    ]],
    ['표면과 색', [
      effect('채도가 돌아오는 화면', { filter: 'grayscale(1)' }, { filter: 'grayscale(0)' }),
      effect('밝게 드러나는 화면', { filter: 'brightness(.3)' }, { filter: 'brightness(1)' }),
      effect('색조 이동', { filter: 'hue-rotate(0deg)' }, { filter: 'hue-rotate(145deg)' }, { filter: 'hue-rotate(0deg)' }),
      effect('선명도 조절', { filter: 'contrast(.5)' }, { filter: 'contrast(1.45)' }, { filter: 'contrast(1)' }),
      effect('모서리 변형', { borderRadius: '2px' }, { borderRadius: '28px 3px 28px 3px' }, { borderRadius: '2px' }),
      effect('그림자로 떠오르기', { ...idle, boxShadow: '0 0 0 #233f3600' }, { ...move('translateY(-12px)'), boxShadow: '0 24px 28px #233f364d' }, { ...idle, boxShadow: '0 0 0 #233f3600' }),
      effect('유리처럼 투명해지기', { opacity: 1 }, { opacity: .38 }, { opacity: 1 }),
      effect('프레임 두께 변화', { borderWidth: '1px' }, { borderWidth: '12px' }, { borderWidth: '1px' }),
    ]],
    ['글자와 행간', [
      effect('자간 모아쓰기', { letterSpacing: '.35em', opacity: 0 }, { letterSpacing: '0', opacity: 1 }),
      effect('굵기 전환', { fontWeight: 400 }, { fontWeight: 900 }),
      effect('제목 밑줄 그리기', { textDecoration: 'underline', textDecorationColor: 'transparent', textUnderlineOffset: '.6em' }, { textDecoration: 'underline', textDecorationColor: '#276450', textUnderlineOffset: '.2em' }),
      effect('한 줄씩 드러내기', { clipPath: 'inset(0 0 100%)', lineHeight: 2.3 }, { clipPath: 'inset(0)', lineHeight: 1.4 }),
      effect('글자 수평 확장', move('scaleX(.5)', .2), idle),
      effect('글자 색 번짐', { color: '#b0beb1', textShadow: '0 0 14px #43a278' }, { color: '#212724', textShadow: '0 0 0 transparent' }),
      effect('인라인 형광 표시', { backgroundColor: '#fffef8' }, { backgroundColor: '#e4ed9a' }),
      effect('기울기 펴기', move('skewX(-23deg)', .35), idle),
    ]],
    ['잔잔한 반복', [
      effect('호흡하듯 커지기', idle, move('scale(1.08)'), idle),
      effect('물 위처럼 부유', idle, move('translateY(-11px) rotate(-2deg)'), idle),
      effect('수평 왕복', move('translateX(-18px)'), move('translateX(18px)'), move('translateX(-18px)')),
      effect('작은 진자', { ...move('rotate(-6deg)'), transformOrigin: '50% 0' }, { ...move('rotate(6deg)'), transformOrigin: '50% 0' }, { ...move('rotate(-6deg)'), transformOrigin: '50% 0' }),
      effect('빛이 숨 쉬는 테두리', { boxShadow: '0 0 0 #579d7e00' }, { boxShadow: '0 0 24px #579d7e9a' }, { boxShadow: '0 0 0 #579d7e00' }),
      effect('조용한 색 온도 변화', { backgroundColor: '#fff3da' }, { backgroundColor: '#c9e6ed' }, { backgroundColor: '#fff3da' }),
      effect('가벼운 회전 궤적', move('translateX(-12px)'), move('translateY(-8px)'), move('translateX(12px)'), move('translateY(8px)'), move('translateX(-12px)')),
      effect('종이처럼 뒤틀리기', idle, move('skew(4deg,-2deg)'), move('skew(-3deg,2deg)'), idle),
    ]],
    ['스크롤 연동', [
      effect('스크롤 확대', move('scale(.58)'), move('scale(1.2)')),
      effect('스크롤로 가로 이동', move('translateX(-35%)'), move('translateX(35%)')),
      effect('스크롤 3D 뒤집기', move('perspective(450px) rotateY(-65deg)'), move('perspective(450px) rotateY(65deg)')),
      effect('스크롤 이미지 틀', { clipPath: 'inset(35% 0)' }, { clipPath: 'inset(0)' }),
      effect('스크롤 초점', { filter: 'blur(14px)' }, { filter: 'blur(0)' }),
      effect('스크롤 색 전환', { backgroundColor: '#f7e1aa' }, { backgroundColor: '#96c7ae' }),
      effect('스크롤 기울기 복원', move('rotate(-21deg) translateX(-15%)'), idle),
      effect('스크롤 명암 대비', { filter: 'contrast(.4) grayscale(.8)' }, { filter: 'contrast(1.2) grayscale(0)' }),
      effect('스크롤로 비율 바꾸기', move('scale(.55,1.35)'), move('scale(1.25,.8)')),
    ]],
  ]

  // Each palette also selects a composition, so previews compare more than colors.
  const designs = [
    ['책 편집', '#f7f0e3','#351e18','#ad543b','editorial'],
    ['갤러리 캡션', '#fafafa','#111111','#575757','gallery'],
    ['게임 개발 로그', '#172b24','#e1f2dc','#7dc49d','terminal'],
    ['청사진', '#18385f','#f0f7ff','#93cef5','grid'],
    ['채용용 이력서', '#ffffff','#26323d','#395e74','editorial'],
    ['아케이드 포스터', '#2b1d41','#fff2c8','#f3a55f','poster'],
    ['현장 노트', '#eee8d0','#353527','#717a45','grid'],
    ['밝은 자막', '#dbe6f0','#17293a','#6b90b3','split'],
    ['타이포 포스터', '#f6d646','#241e12','#715f14','poster'],
    ['스튜디오 소개', '#eee4e7','#2f222c','#99536e','split'],
    ['단색 인쇄', '#e5e3df','#232222','#65625d','editorial'],
    ['라임과 잉크', '#20251a','#ebf4c8','#c3d969','terminal'],
    ['도구 설명서', '#deeeee','#152e39','#487282','grid'],
    ['따뜻한 미니멀', '#f6ebe0','#382e27','#976747','gallery'],
    ['인디 게임 표지', '#2c2347','#f6e7ff','#b9a1e6','poster'],
  ]

  const code = (prefix, index) => prefix + String(index).padStart(2, '0')
  let motionIndex = 8
  const motions = families.flatMap(([category, items]) => items.map(item => ({
    ...item, category, code: code('M', motionIndex++),
  })))
  const entries = [...motions, ...designs.map(([name, bg, fg, accent, layout], index) => ({
    name, bg, fg, accent, layout, category: '디자인', code: code('D', index + 4),
  }))]
  const originals = [
    ['M01', '깊이감', '스크롤 연동'], ['M02', '화면 열기', '스크롤 연동'],
    ['M03', '순차 등장', '등장'], ['M04', '레이아웃 전환', '클릭 반응'],
    ['M05', '포인터 조명', '클릭 반응'], ['M06', '유리 위의 빛', '잔잔한 반복'],
    ['M07', '맵 위의 경로', '잔잔한 반복'], ['D01', '편집 지면', '디자인'],
    ['D02', '밝은 유리', '디자인'], ['D03', '개발 노트', '디자인'],
  ].map(([code, name, category]) => ({ code, name, category, original: true }))
  entries.unshift(...originals)
  const list = document.querySelector('#catalog-list')
  const search = document.querySelector('#catalog-search')
  const filter = document.querySelector('#catalog-category')
  const count = document.querySelector('#catalog-count')
  const running = new Map()
  const motionReduced = matchMedia('(prefers-reduced-motion: reduce)')
  const isPaused = () => motionReduced.matches || document.documentElement.hasAttribute('data-paused')

  for (const category of ['전체', ...families.map(([name]) => name), '디자인']) {
    filter.add(new Option(category, category))
  }

  function motionPreview(entry, article) {
    const target = article.querySelector('.catalog-object')
    const button = article.querySelector('.sample-control')
    const note = article.querySelector('.sample-note')
    const scrollScene = article.querySelector('.catalog-scroll')
    if (scrollScene) {
      scrollScene.addEventListener('scroll', () => {
        if (isPaused()) return
        let animation = running.get(entry.code)
        if (!animation) {
          animation = target.animate(entry.frames, { duration: 1000, fill: 'both' })
          animation.pause()
          running.set(entry.code, animation)
        }
        animation.currentTime = 1000 * scrollScene.scrollTop / (scrollScene.scrollHeight - scrollScene.clientHeight)
      }, { passive: true })
      return
    }
    button.addEventListener('click', () => {
      const previous = running.get(entry.code)
      previous?.cancel()
      running.delete(entry.code)
      if (previous && entry.category === '잔잔한 반복') {
        button.textContent = '재생'
        return
      }
      if (isPaused()) {
        note.textContent = '움직임 설정이 꺼져 있습니다.'
        return
      }
      note.textContent = ''
      const loops = entry.category === '잔잔한 반복'
      const animation = target.animate(entry.frames, {
        duration: loops ? 3600 : 850,
        iterations: loops ? Infinity : 1,
        easing: loops ? 'ease-in-out' : 'cubic-bezier(.2,.75,.3,1)',
        fill: 'both',
      })
      running.set(entry.code, animation)
      button.textContent = loops ? '정지' : '다시 재생'
    })
  }

  for (const entry of entries) {
    const article = document.createElement('article')
    article.dataset.category = entry.category
    const heading = document.createElement('h3')
    const badge = document.createElement('code')
    badge.textContent = entry.code
    heading.append(badge, ' ' + entry.name)
    article.append(heading)
    if (entry.original) {
      const link = document.createElement('a')
      const original = document.querySelector('input[value="' + entry.code + '"]')?.closest('article')
      if (original) original.id = 'sample-' + entry.code
      link.href = original ? '#' + original.id : '#design'
      link.textContent = '미리보기로 이동'
      if (!original) link.addEventListener('click', () => looks[Number(entry.code.slice(1)) - 1]?.click())
      article.append(link)
      entry.element = article
      list.append(article)
      continue
    }
    if (entry.layout) {
      const scene = document.createElement('div')
      scene.className = 'scene catalog-design ' + entry.layout
      scene.style.setProperty('--sample-bg', entry.bg)
      scene.style.setProperty('--sample-fg', entry.fg)
      scene.style.setProperty('--sample-accent', entry.accent)
      scene.innerHTML = '<strong>정명찬</strong><span>게임 클라이언트</span><small>Unity · C#</small>'
      article.append(scene)
    } else {
      const scroll = entry.category === '스크롤 연동'
      const scene = document.createElement('div')
      scene.className = scroll ? 'scene catalog-scroll' : 'scene centered catalog-motion'
      const object = '<span class="catalog-object">게임 클라이언트</span>'
      scene.innerHTML = scroll ? '<div class="catalog-track"><div class="catalog-pin">' + object + '</div></div>' : object
      if (scroll) {
        scene.tabIndex = 0
        scene.setAttribute('aria-label', entry.name + ' 예시 안에서 스크롤')
      }
      article.append(scene)
      const controls = document.createElement('div')
      controls.className = 'sample-actions'
      controls.innerHTML = scroll ? '<span>상자 안 스크롤</span>' : '<button type="button" class="sample-control">재생</button><span class="sample-note" role="status"></span>'
      article.append(controls)
      motionPreview(entry, article)
    }
    const label = document.createElement('label')
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.value = entry.code
    checkbox.dataset.sample = ''
    label.append(checkbox, entry.code + ' 선택')
    article.append(label)
    entry.element = article
    list.append(article)
  }

  function filterEntries() {
    const term = search.value.trim().toLowerCase()
    let visible = 0
    for (const entry of entries) {
      const matches = (filter.value === '전체' || filter.value === entry.category)
        && (entry.code + ' ' + entry.name + ' ' + entry.category).toLowerCase().includes(term)
      entry.element.hidden = !matches
      if (matches) visible++
      else if (running.has(entry.code)) {
        running.get(entry.code).cancel()
        running.delete(entry.code)
        const button = entry.element.querySelector('.sample-control')
        if (button) button.textContent = '재생'
      }
    }
    count.textContent = visible + '개 표시'
  }

  function stopAll() {
    if (!isPaused()) return
    for (const animation of running.values()) animation.cancel()
    running.clear()
    list.querySelectorAll('.sample-control').forEach(button => { button.textContent = '재생' })
  }

  search.addEventListener('input', filterEntries)
  filter.addEventListener('change', filterEntries)
  document.querySelector('#pause').addEventListener('click', stopAll)
  motionReduced.addEventListener('change', stopAll)
  filterEntries()
}
