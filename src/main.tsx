import { StrictMode, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { animate } from 'motion/mini'
import './styles.css'

const github = 'https://github.com/mychan0926'
const blog = 'https://gameplace.tistory.com/'
const projects = [
  {
    id: 'automation',
    title: '백준 허브 자동화',
    category: 'Developer tool',
    description: '백준 허브 연동 전에 풀었던 문제를 GitHub에 옮기기 위해 만든 도구입니다. PyQt5로 데스크톱 UI를 구성하고 Selenium으로 브라우저 작업을 자동화했습니다.',
    stack: ['Python', 'PyQt5', 'Selenium'],
    repo: 'Baekjoon-Hub-Automation',
  },
  {
    id: 'vision',
    title: 'Object Detection',
    category: 'Computer vision',
    description: '이미지 속 객체를 구분하는 방법을 탐구한 프로젝트입니다. JSON에서 객체 좌표를 읽어 OpenCV로 바운딩 박스를 그린 뒤, 영역별 이미지를 추출했습니다.',
    stack: ['Python', 'OpenCV', 'TensorFlow'],
    repo: 'ObjectDetection',
  },
] as const

function ProjectVisual({ id }: { id: typeof projects[number]['id'] }) {
  if (id === 'vision') {
    return (
      <div className="project-visual vision" aria-hidden="true">
        <div className="viewfinder">
          <span className="box box-one">OBJECT A</span>
          <span className="box box-two">OBJECT B</span>
        </div>
      </div>
    )
  }

  return (
    <div className="project-visual automation" aria-hidden="true">
      <div className="terminal">
        <div className="terminal-head"><i /><i /><i /></div>
        <p><b>›</b> solved problems</p>
        <p><b>›</b> collect submissions</p>
        <p><b>›</b> sync to GitHub<span className="cursor" /></p>
      </div>
    </div>
  )
}

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
            <p className="hero-description">한국외국어대학교에 재학 중이며, C++과 Unity를 공부하고 게임 클라이언트 개발에 관심을 두고 있습니다.</p>
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
                <ProjectVisual id={project.id} />
                <div className="project-copy">
                  <p className="eyebrow">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <ul className="tags" aria-label="사용 기술">
                    {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
                  </ul>
                  <a className="text-link" href={github + '/' + project.repo} aria-label={project.title + ' GitHub 저장소'}>GitHub 저장소</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section about" aria-labelledby="about-title">
          <div>
            <p className="eyebrow">About</p>
            <h2 id="about-title">개발 관심사</h2>
            <p className="about-copy">게임 클라이언트 프로그래밍을 중심으로 공부하고 있습니다. 백준에서 알고리즘 문제를 풀고, 개발 기록은 블로그에 정리합니다.</p>
          </div>
          <dl className="stack">
            <div><dt>언어</dt><dd>C++, C#, Python</dd></div>
            <div><dt>게임 엔진</dt><dd>Unity</dd></div>
            <div><dt>알고리즘</dt><dd><a href="https://solved.ac/profile/mychan0926">Solved.ac</a></dd></div>
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
