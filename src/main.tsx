import { StrictMode, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { animate } from 'motion/mini'
import './styles.css'

const github = 'https://github.com/mychan0926'
const blog = 'https://gameplace.tistory.com/'
const projects = [
  {
    id: 'roguelike',
    title: '2D 정통 로그라이크',
    category: '2026 · Roguelike',
    description: '무작위 맵 생성과 시드 시스템, 저장 기능을 다루며 게임 데이터를 설계하고 관리하는 방법을 익힌 프로젝트입니다.',
    stack: ['맵 생성', '시드 시스템', '저장'],
  },
  {
    id: 'fps',
    title: '1인칭 FPS',
    category: '2026 · First-person shooter',
    description: '1인칭 슈터 프로토타입을 만들며 3D 기능과 애니메이션 적용을 연습했습니다.',
    stack: ['3D', '애니메이션', '1인칭'],
  },
  {
    id: 'survivor',
    title: '뱀서 라이크',
    category: '2026 · Survival action',
    description: '서바이벌 액션 게임의 기본 구조를 구현하며 Unity 기능을 익힌 프로토타입입니다.',
    stack: ['Unity', '프로토타입'],
  },
  {
    id: 'melon',
    title: '멜론 게임',
    category: '2025 · Puzzle',
    description: 'GDG on Campus HUFS Unity 스터디에서 진행한 토이 프로젝트입니다. 작은 게임을 만들며 Unity 사용법을 익혔습니다.',
    stack: ['Unity', '스터디'],
  },
] as const

const milestones = [
  { year: '2026–2027', title: 'GDG on Campus HUFS 8기 Core Member' },
  { year: '2026–', title: '대학생 연합 게임제작 동아리 BRIDGE 14기' },
  { year: '2025', title: '제7회 HUFS Code Festival 문제 출제' },
  { year: '2023', title: '제5회 HUFS Code Festival 3등상' },
  { year: '2022', title: '서울 ICT 창의성 경진대회 C언어 알고리즘 마스터 부문 금상' },
]

function App() {
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
      <main id="main" className="shell">
        <section className="hero" aria-labelledby="intro">
          <div className="hero-copy" ref={intro}>
            <p className="eyebrow">정명찬 <span>·</span> Jung Myeong Chan</p>
            <h1 id="intro">Game Client<br /><em>Development</em></h1>
            <p className="hero-description">게임 클라이언트 프로그래머이자 인디 게임 개발자를 꿈꿉니다. 아이디어를 직접 플레이할 수 있는 게임으로 만들기 위해 공부합니다.</p>
            <div className="flex flex-wrap items-center gap-3">
              <a className="button primary" href="#work">프로젝트 보기</a>
              <a className="button secondary" href={blog}>개발 블로그</a>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-plane" />
            <div className="orbit orbit-outer" />
            <div className="orbit orbit-inner" />
            <span className="cross cross-top">+</span><span className="cross cross-bottom">+</span>
            <div className="hero-monogram">JMC<span>.</span></div>
          </div>
        </section>

        <section id="work" className="section" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title">프로젝트</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <article className="project" key={project.id}>
                <div className={'project-visual ' + project.id} aria-hidden="true">
                  <div className="project-glyph"><i /><i /><i /><i /></div>
                </div>
                <div className="project-copy">
                  <p className="eyebrow">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <ul className="tags" aria-label="주요 학습 내용">
                    {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section about" aria-labelledby="about-title">
          <div>
            <p className="eyebrow">About</p>
            <h2 id="about-title">소개와 활동</h2>
            <p className="about-copy">한국외국어대학교에서 컴퓨터공학을 공부합니다. Unity로 게임을 만들고, 알고리즘 문제 풀이와 문제 출제를 통해 구현력을 기르고 있습니다.</p>
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
