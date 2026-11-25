
import { useState } from 'react'
import './scss/design-story.scss'

const designData = {
  classic: [
    {
      id: 1,
      name: '헤리티지 시리즈',
      title: '접어 만든 선, 부드러운 곡선',
      description:
        '전통 목단문을 현대적인 감각으로 풀어낸 헤리티지 시리즈입니다.\n백자 위에 펼쳐진 섬세한 꽃문양과 선명한 흑백 대비가 깊이 있는 아름다움을 전하고 단정한 형태에 풍성한 문양을 더해, 식탁 위에 고전적인 우아함을 담아냅니다.',
      image: 'heritage.png',
    },
    {
      id: 2,
      name: '목부용문 시리즈',
      title: '섬세한 꽃문양에 담긴 아름다움',
      description:
        '전통적인 꽃문양을 담아 일상의 식탁에 아름다움을 더합니다.',
      image: 'mokbuyong.jpg',
    },
    {
      id: 3,
      name: '목단문 시리즈',
      title: '전통의 아름다움을 일상으로',
      description:
        '한국적인 아름다움과 단정한 형태를 담은 도자기 시리즈입니다.',
      image: 'mokdan.jpg',
    },
  ],

  modern: [],
}

export const DesignStory = () => {
  const [activeTab, setActiveTab] = useState('classic')
  const [activeIndex, setActiveIndex] = useState(0)

  const items = designData[activeTab]
  const activeItem = items[activeIndex]

  // 카테고리 변경
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setActiveIndex(0)
  }

  // 다음 시리즈
  const handleNext = () => {
    if (!items.length) return

    setActiveIndex(
      (prev) => (prev + 1) % items.length
    )
  }

  // 현재 상품을 제외한 나머지 상품
  const otherItems = items
    .map((item, index) => ({
      ...item,
      index,
    }))
    .filter((item) => item.index !== activeIndex)
    .slice(0, 2)

  return (
    <section className="design-story">

      {/* 상단 타이틀 */}
      <div className="design-story__header">

        <h2 className="design-story__title">
          Design Story
        </h2>

        <h3 className="design-story__heading">
          식탁 위로 이어지는 미감
        </h3>

        <p className="design-story__description">
          광주요는 한국의 미학을 계승하며
          아름다움과 쓰임을 담은 그릇을 만듭니다.<br />
          감각적인 디자인으로 일상의 품격을 높이고,
          우리 식탁의 맛과 멋을 전합니다.
        </p>

      </div>

      <div className="design-story__inner">

        {/* 클래식 / 모던 탭 */}
        <div className="design-story__tabs">

          <button
            type="button"
            className={`design-story__tab ${
              activeTab === 'classic' ? 'is-active' : ''
            }`}
            aria-pressed={activeTab === 'classic'}
            onClick={() => handleTabChange('classic')}
          >
            클래식
          </button>

          <button
            type="button"
            className={`design-story__tab ${
              activeTab === 'modern' ? 'is-active' : ''
            }`}
            aria-pressed={activeTab === 'modern'}
            onClick={() => handleTabChange('modern')}
          >
            모던
          </button>

        </div>

        {activeItem ? (
          <div
            className="design-story__content"
            key={`${activeTab}-${activeIndex}`}
          >

            {/* 왼쪽 메인 이미지 */}
            <div
              className={`design-story__main-image design-story__main-image--${activeItem.id}`}
            >
              <img
                src={`/images/main/${activeItem.image}`}
                alt={activeItem.name}
              />
            </div>

            {/* 오른쪽 콘텐츠 */}
            <div className="design-story__detail">

              <div className="design-story__text">

                <p className="design-story__series">
                  {String(activeIndex + 1).padStart(2, '0')}.
                  {' '}{activeItem.name}
                </p>

                <h4 className="design-story__subtitle">
                  {activeItem.title}
                </h4>

                <p className="design-story__summary">
                  {activeItem.description}
                </p>

              </div>

              {/* 다른 시리즈 보기 */}
              <div className="design-story__products">

                {otherItems.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className="design-story__product"
                    onClick={() => setActiveIndex(item.index)}
                  >
                    <img
                      src={`/images/main/${item.image}`}
                      alt={item.name}
                    />

                    <span>
                      {String(item.index + 1).padStart(2, '0')}.
                      {item.name} 보기
                    </span>

                  </button>
                ))}

                {items.length > 1 && (
                  <button
                    type="button"
                    className="design-story__next"
                    onClick={handleNext}
                    aria-label="다음 시리즈"
                  >
                    <img
                      src="/images/icon/design-next.svg"
                      alt=""
                    />
                  </button>
                )}

              </div>

            </div>

          </div>
        ) : (
          <div className="design-story__empty">
            등록된 시리즈가 없습니다.
          </div>
        )}

      </div>

    </section>
  )
}
