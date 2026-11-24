import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { animate } from 'motion/mini'
import { LiquidNavbar, NimbusIcons, type LiquidNavItem } from './components/ui/liquid-glass-navbar'
import './styles.css'

const github = 'https://github.com/mychan0926'
const blog = 'https://gameplace.tistory.com/'
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
  { year: '2022', title: '서울 ICT 창의성 경진대회 C언어 알고리즘 마스터 부문 금상' },
]

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

  const intro = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!intro.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const animation = animate(intro.current, { opacity: [0.35, 1] }, { duration: 0.3 })
    return () => animation.stop()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">본문으로 건너뛰기</a>
      <header className="site-header">
        <div className="shell flex items-center justify-between">
          <a className="wordmark" href="#main" aria-label="정명찬 포트폴리오 홈">JMC<span>.</span></a>
          <nav aria-label="주 메뉴" className="flex items-center gap-5 sm:gap-8">
            <a href="#work">프로젝트</a>
            <a href="#about">소개</a>
            <a href={github}>GitHub</a>
          </nav>
        </div>
      </header>
      <div className="liquid-rail">
        <LiquidNavbar tone="dark" compact items={navItems} active={sections.findIndex(([id]) => id === active)} />
      </div>
      <main id="main" className="shell">
        <section id="intro" className="hero" aria-labelledby="intro-title">
          <div className="hero-copy" ref={intro}>
            <h1 id="intro-title">정명찬</h1>
            <p className="hero-description">게임 클라이언트와 인디 게임을 만드는 공부를 합니다.</p>
            <div className="flex flex-wrap items-center gap-3">
              <a className="button primary" href="#work">프로젝트 보기</a>
              <a className="button secondary" href={blog}>개발 블로그</a>
            </div>
          </div>
          <a className="featured-demo" href="#roguelike-demo">
            <img src="https://i.ytimg.com/vi/XqVjtWEf6fI/hqdefault.jpg" alt="" width="480" height="360" fetchPriority="high" />
            <span>2D 정통 로그라이크 데모</span>
          </a>
        </section>

        <section id="about" className="section about" aria-labelledby="about-title">
          <div>
            <h2 id="about-title">소개와 활동</h2>
            <p className="about-copy">한국외국어대학교 컴퓨터공학부</p>
            <ul className="milestones" aria-label="주요 활동 및 수상">
              {milestones.map(({ year, title }) => (
                <li key={title}><span>{year}</span><strong>{title}</strong></li>
              ))}
            </ul>
          </div>
          <dl className="stack">
            <div><dt>언어</dt><dd>C++, C#, Python</dd></div>
            <div><dt>게임 엔진</dt><dd>Unity</dd></div>
            <div><dt>알고리즘</dt><dd><a href="https://solved.ac/profile/mychan0926">Solved.ac</a></dd></div>
            <div><dt>프로필</dt><dd><a href="https://www.linkedin.com/in/myeongchan/">LinkedIn</a></dd></div>
          </dl>
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
                </div>
                  <div className="video-block" id={project.id + '-demo'}>
                    <div className="video-frame">
                      <iframe src={'https://www.youtube-nocookie.com/embed/' + project.videos[0].id} title={project.title + ' 데모 영상'} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                    </div>
                    <div className="video-links">
                      {project.videos.map(video => <a key={video.id} href={'https://www.youtube.com/watch?v=' + video.id} target="_blank" rel="noreferrer">{video.label} · YouTube</a>)}
                    </div>
                  </div>
              </article>
            ))}
          </div>
        </section>
        <section id="contact" className="section contact" aria-labelledby="contact-title">
          <h2 id="contact-title">연락 및 링크</h2>
          <p className="about-copy">프로젝트와 개발 기록은 GitHub와 블로그에서도 확인할 수 있습니다.</p>
          <div className="contact-links">
            <a className="button secondary" href={github}>GitHub</a>
            <a className="button secondary" href={blog}>개발 블로그</a>
            <a className="button secondary" href="https://www.linkedin.com/in/myeongchan/">LinkedIn</a>
          </div>
        </section>

      </main>
      <footer className="site-footer">
        <div className="shell flex flex-wrap items-center justify-between gap-4">
          <span>정명찬 · Jung Myeong Chan</span>
          <div className="flex gap-6"><a href={github}>GitHub</a><a href={blog}>Blog</a></div>
        </div>
      </footer>
    </>
  )
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
