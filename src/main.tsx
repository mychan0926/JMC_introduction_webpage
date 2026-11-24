import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { LiquidNavbar, NimbusIcons, type LiquidNavItem } from './components/ui/liquid-glass-navbar'
import './styles.css'

const github = 'https://github.com/mychan0926'
const blog = 'https://gameplace.tistory.com/'
const profileLinks = [
  { label: 'GitHub', href: github, path: 'M8 6 3 12l5 6m8-12 5 6-5 6M14 4l-4 16' },
  { label: '개발 블로그', href: blog, path: 'M5 4h13v16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm1 4h9m-9 4h9m-9 4h5' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/myeongchan/', path: 'M5 10v9m0-14v.01M10 19v-9m0 3a4 4 0 0 1 8 0v6' },
  { label: 'Solved.ac', href: 'https://solved.ac/profile/mychan0926', path: 'm12 3 8 4v10l-8 4-8-4V7Zm-4 9 3 3 5-6' },
]
const projects = [
  {
    id: 'roguelike',
    title: '2D 정통 로그라이크',
    category: '2026 · Roguelike',
    description: '시드 기반 맵 생성과 저장 기능을 실험한 2D 게임.',
    stack: ['맵 생성', '시드 시스템', '저장'],
    videos: [{ label: '맵 생성 데모', id: 'XqVjtWEf6fI' }, { label: '데모 2', id: 'AI7QxedrC34' }, { label: '데모 3', id: '_LQ8qrrYA_8' }, { label: '데모 4', id: '32U4kwS4WLM' }],
  },
  {
    id: 'fps',
    title: '1인칭 FPS',
    category: '2026 · First-person shooter',
    description: '3D와 애니메이션을 적용한 슈터 프로토타입.',
    stack: ['3D', '애니메이션', '1인칭'],
    videos: [{ label: '최종 결과물', id: 'pXuUgRJ-Kd0' }, { label: '중간 결과물', id: '73SCwmoy2EQ' }],
  },
  {
    id: 'survivor',
    title: '뱀서 라이크',
    category: '2026 · Survival action',
    description: 'Unity로 구현한 서바이벌 액션 프로토타입.',
    stack: ['Unity', '프로토타입'],
    videos: [{ label: '플레이 영상', id: 'v-_alUuY4QU' }],
  },
  {
    id: 'melon',
    title: '멜론 게임',
    category: '2025 · Puzzle',
    description: 'GDG on Campus HUFS Unity 스터디 프로젝트.',
    stack: ['Unity', '스터디'],
    videos: [{ label: '플레이 영상', id: 'Z1epywKMp6c' }],
  },
] as const

const milestones = [
  { year: '2026–2027', title: 'GDG on Campus HUFS 8기 Core Member' },
  { year: '2026–', title: '대학생 연합 게임제작 동아리 BRIDGE 14기' },
  { year: '2025', title: '제7회 HUFS Code Festival 문제 출제' },
  { year: '2023', title: '제5회 HUFS Code Festival 3등상' },
  { year: '2023.03', title: '한국외국어대학교 컴퓨터공학 입학' },
  { year: '2022', title: '서울 ICT 창의성 경진대회 C언어 알고리즘 마스터 부문 금상' },
]

const mapRooms = new Set([7, 8, 15, 16, 17, 22, 23, 24, 30, 31, 37])

const sections = [
  ['intro', '프로필'],
  ['about', '이력'],
  ['work', '프로젝트'],
  ['contact', '연락'],
] as const

const navItems: LiquidNavItem[] = sections.map(([id, label], index) => ({
  href: '#' + id,
  label,
  icon: [NimbusIcons.home, NimbusIcons.user, NimbusIcons.globe, NimbusIcons.plane][index],
  fx: ['glow', 'wave', 'spin', 'pop'][index] as LiquidNavItem['fx'],
}))

function App() {
  const [active, setActive] = useState<string>('intro')

  useEffect(() => {
    const update = () => {
      const marker = window.innerHeight * 0.4
      const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
      const current = [...sections].reverse().find(([id]) => {
        const section = document.getElementById(id)
        return section && section.getBoundingClientRect().top <= marker
      })
      setActive(atEnd ? 'contact' : current?.[0] ?? 'intro')
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const main = mainRef.current
    if (!main || !('IntersectionObserver' in window)) return

    const targets = main.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) entry.target.classList.remove('motion-entered')
        else if (entry.intersectionRatio >= 0.16) entry.target.classList.add('motion-entered')
      }
    }, { threshold: [0, 0.16] })

    targets.forEach(target => observer.observe(target))
    return () => {
      observer.disconnect()
      targets.forEach(target => target.classList.remove('motion-entered'))
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">본문으로 건너뛰기</a>
      <div className="liquid-rail">
        <LiquidNavbar tone="light" compact items={navItems} active={sections.findIndex(([id]) => id === active)} />
      </div>
      <main id="main" className="shell" ref={mainRef}>
        <section id="intro" className="hero" aria-labelledby="intro-title" data-reveal="profile">
          <div className="hero-copy">
            <h1 id="intro-title">정명찬</h1>
            <p className="hero-description">안녕하세요, 정명찬입니다. 한국외국어대학교에서 컴퓨터공학을 공부하며, 머릿속 아이디어를 직접 플레이할 수 있는 게임으로 만드는 일을 좋아합니다.</p>
          </div>
          <dl className="stack profile-summary" aria-label="프로필 한눈에 보기">
            <div><dt>이름</dt><dd>Jung Myeong Chan</dd></div>
            <div><dt>전공</dt><dd>한국외국어대학교 컴퓨터공학</dd></div>
            <div><dt>관심 분야</dt><dd>게임 클라이언트, 인디 게임</dd></div>
            <div><dt>개발 도구</dt><dd>Unity, C#, C++, Python</dd></div>
          </dl>
        </section>

        <section id="about" className="section about" aria-labelledby="about-title">
          <div>
            <h2 id="about-title">활동과 수상</h2>
            <ul className="milestones" aria-label="주요 활동 및 수상">
              {milestones.map(({ year, title }) => (
                <li key={title} data-reveal="timeline"><span>{year}</span><strong>{title}</strong></li>
              ))}
            </ul>
          </div>
        </section>

        <section id="work" className="section" aria-labelledby="work-title">
          <div className="section-heading">
            <h2 id="work-title">프로젝트</h2>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project" id={project.id} key={project.id}>
                <div className="project-copy">
                  <p className="eyebrow">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <ul className="tags" aria-label="주요 학습 내용">
                    {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
                  </ul>
                  {project.id === 'roguelike' && (
                    <figure className="map-study">
                      <div className="map-grid" aria-hidden="true">
                        {Array.from({ length: 42 }, (_, cell) => (
                          <span key={cell} data-room={mapRooms.has(cell) ? '' : undefined} />
                        ))}
                      </div>
                      <figcaption>
                        <strong>시드 기반 맵 생성</strong>
                        <small>방 배치를 단순화한 개념도</small>
                      </figcaption>
                    </figure>
                  )}
                </div>
                  <div className="video-block" id={project.id + '-demo'}>
                    <div className="video-frame">
                      <iframe src={'https://www.youtube-nocookie.com/embed/' + project.videos[0].id} title={project.title + ' 데모 영상'} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                    </div>
                    <div className="video-links">
                      {project.videos.map((video, index) => (
                        <a className="link-icon" key={video.id} href={'https://www.youtube.com/watch?v=' + video.id} target="_blank" rel="noreferrer" aria-label={project.title + ' ' + video.label + ' (YouTube)'} title={video.label + ' (YouTube)'}>
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                          {project.videos.length > 1 && <span aria-hidden="true">{index + 1}</span>}
                        </a>
                      ))}
                    </div>
                  </div>
              </article>
            ))}
          </div>
        </section>
        <section id="contact" className="section contact" aria-labelledby="contact-title">
          <h2 id="contact-title">연락 및 링크</h2>
          <div className="contact-links" data-reveal="links">
            {profileLinks.map(({ label, href, path }) => (
              <a key={href} className="link-icon" href={href} aria-label={label} title={label}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>
              </a>
            ))}
          </div>
        </section>

      </main>
    </>
  )
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
