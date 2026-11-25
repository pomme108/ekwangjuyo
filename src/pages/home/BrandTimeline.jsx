
import { useEffect, useRef } from 'react'
import './scss/brand-timeline.scss'

const timelineItems = [
  {
    id: 1,
    name: '하나자기',
    year: '2003',
    description: '생활자기 브랜드',
    image: 'hana.png',
  },
  {
    id: 2,
    name: '월백',
    year: '2010',
    description: '달 항아리의 곡선미',
    image: 'wolbaek.png',
  },
  {
    id: 3,
    name: '뉴 클래식',
    year: '2013',
    description: '전통 문양의 재해석',
    image: 'new-classic.png',
  },
  {
    id: 4,
    name: '한결',
    year: '2016',
    description: '삼베의 질감을 담다',
    image: 'hangyeol-2016.png',
  },
  {
    id: 5,
    name: '미각',
    year: '2017',
    description: '한지의 질감과 백자 각호의 재해석',
    image: 'migak.png',
  },
  {
    id: 6,
    name: '미각 색',
    year: '2019',
    description: '일상의 식탁에 색을',
    image: 'migak-color.png',
  },
  {
    id: 7,
    name: '백합',
    year: '2020',
    description: '조개껍데기의 유려한 곡선',
    image: 'baekhap.png',
  },
  {
    id: 8,
    name: '접이',
    year: '2020',
    description: '단아한 선과 한국의 예를 담다',
    image: 'jeobi.png',
  },
  {
    id: 9,
    name: '화담',
    year: '2020',
    description: '전통적인 곡선과 감각적인 색감',
    image: 'hwadam.png',
  },
  {
    id: 10,
    name: '원',
    year: '2021',
    description: '담백한 색과 흙의 질감',
    image: 'won.png',
  },
  {
    id: 11,
    name: '한결',
    year: '2024',
    description: '쓰임과 모양을 다듬은',
    image: 'hangyeol-2024.png',
  },
  {
    id: 12,
    name: '목부용 담화',
    year: '2026',
    description: '선 시리즈 에디션',
    image: 'damhwa.png',
  },
]

export const BrandTimeline = () => {
  const viewportRef = useRef(null)
  const groupRef = useRef(null)

  const positionRef = useRef(0)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const startScrollRef = useRef(0)
  const resumeTimeRef = useRef(0)

  // 자동 무한 슬라이드
  useEffect(() => {
    const viewport = viewportRef.current
    const group = groupRef.current

    if (!viewport || !group) return

    let animationId
    let lastTime = 0

    const speed = 48

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    // 가운데 제품 목록부터 시작
    positionRef.current = group.offsetWidth + 126
    viewport.scrollLeft = positionRef.current

    const animate = (time) => {
      const delta = lastTime
        ? Math.min(time - lastTime, 50) / 1000
        : 0

      lastTime = time

      if (
        !isDraggingRef.current &&
        time >= resumeTimeRef.current &&
        !reducedMotion.matches
      ) {
        positionRef.current += speed * delta
        viewport.scrollLeft = positionRef.current
      }

      // 무한 반복 위치 보정
      const groupWidth = group.offsetWidth

      if (
        groupWidth > 0 &&
        !isDraggingRef.current &&
        time >= resumeTimeRef.current
      ) {
        if (viewport.scrollLeft >= groupWidth * 2) {
          positionRef.current =
            viewport.scrollLeft - groupWidth

          viewport.scrollLeft = positionRef.current
        }

        if (viewport.scrollLeft < groupWidth) {
          positionRef.current =
            viewport.scrollLeft + groupWidth

          viewport.scrollLeft = positionRef.current
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [])

  // 마우스 드래그 시작
  const handlePointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return

    const viewport = viewportRef.current

    isDraggingRef.current = true
    startXRef.current = e.clientX
    startScrollRef.current = viewport.scrollLeft

    viewport.setPointerCapture(e.pointerId)
    viewport.classList.add('is-dragging')
  }

  // 마우스 좌우 이동
  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return

    const viewport = viewportRef.current
    const distance = e.clientX - startXRef.current

    viewport.scrollLeft =
      startScrollRef.current - distance

    positionRef.current = viewport.scrollLeft
  }

  // 마우스 드래그 종료
  const handlePointerUp = () => {
    if (!isDraggingRef.current) return

    const viewport = viewportRef.current

    isDraggingRef.current = false
    positionRef.current = viewport.scrollLeft
    resumeTimeRef.current = performance.now() + 500

    viewport.classList.remove('is-dragging')
  }

  // 트랙패드 및 모바일 스크롤 위치 반영
  const handleScroll = () => {
    const viewport = viewportRef.current

    if (
      Math.abs(
        viewport.scrollLeft - positionRef.current
      ) > 1
    ) {
      positionRef.current = viewport.scrollLeft
      resumeTimeRef.current = performance.now() + 500
    }
  }

  // 터치 조작 중 자동 슬라이드 방지
  const handleTouchStart = () => {
    resumeTimeRef.current = Infinity
  }

  const handleTouchEnd = () => {
    positionRef.current = viewportRef.current.scrollLeft
    resumeTimeRef.current = performance.now() + 800
  }

  return (
    <section className="brand-timeline">

      <h2 className="brand-timeline__title">
        1963-현재
      </h2>

      <div
        ref={viewportRef}
        className="brand-timeline__viewport"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={handlePointerUp}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        tabIndex={0}
        aria-label="광주요 도자기 타임라인"
      >

        <div className="brand-timeline__track">

          {[0, 1, 2].map((group) => (
            <div
              key={group}
              ref={group === 0 ? groupRef : null}
              className="brand-timeline__group"
              aria-hidden={group !== 1 ? true : undefined}
            >
              {timelineItems.map((item) => (
                <article
                  key={item.id}
                  className="brand-timeline__item"
                >

                  <div
                    className={`brand-timeline__image brand-timeline__image--${item.id}`}
                  >
                    <img
                      src={`/images/main/${item.image}`}
                      alt={item.name}
                      draggable={false}
                    />
                  </div>

                  <div className="brand-timeline__info">

                    <h3 className="brand-timeline__name">
                      {item.name}
                    </h3>

                    <p className="brand-timeline__year">
                      {item.year}
                    </p>

                    <p className="brand-timeline__description">
                      {item.description}
                    </p>

                  </div>

                </article>
              ))}
            </div>
          ))}

        </div>

      </div>

    </section>
  )
}
