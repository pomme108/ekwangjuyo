
import { useEffect, useRef, useState } from 'react'
import { StoryTitle } from './StoryTitle'
import './scss/brand-story.scss'

export const BrandStory = () => {
  const contentRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  // 스크롤 감지
  useEffect(() => {
    const target = contentRef.current

    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)

          // 애니메이션 한 번만 실행
          observer.unobserve(target)
        }
      },
      {
        threshold: 0.2,
      }
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="brand-story">

      <div className="brand-story__inner">
        <div
          ref={contentRef}
          className={`brand-story__content ${
            isVisible ? 'is-visible' : ''
          }`}
        >

          <div className="brand-story__header">
            <StoryTitle>Brand Story</StoryTitle>
            <h3 className="brand-story__heading">
              전통을 잇고,<br />
              일상을 빚습니다.
            </h3>
          </div>

          <p className="brand-story__description">
            1963년 시작된 광주요는 한국 도자의 아름다움을
            오늘의 쓰임에 맞게 이어갑니다.<br />
            장인의 손길과 현대적인 감각을 담아<br />
            매일의 식탁에서 오래 함께할 그릇을 만듭니다.
          </p>

          <a
            href="/brand/history"
            className="brand-story__link"
          >
            <span>History</span>
            <img
              src="/images/icon/history-plus.svg"
              alt=""
            />
          </a>

        </div>

        <div className="brand-story__image">
          <img
            src="/images/main/brand-story.png"
            alt="광주요의 다양한 색상과 형태의 도자기"
          />
        </div>
      </div>
    </section>
  )
}
