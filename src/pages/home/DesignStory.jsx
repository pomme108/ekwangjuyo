
import { useEffect, useRef, useState } from 'react'
import { StoryTitle } from './StoryTitle'
import './scss/design-story.scss'

const designData = {
  classic: [
    {
      id: 1,
      name: '헤리티지 시리즈',
      title: '접어 만든 선, 부드러운 곡선',
      description:
        '1970~80년대 광주요의 초기 작품을 현대적 감각으로 재해석한 프리미엄 도자기 시리즈입니다. 조선 왕실의 목단문과 전통 박지 기법을 통해 고전적인 아름다움과 품격을 전합니다.',
      image: 'heritage.png',
      photos: ['heritage.png', 'heritage-hwang.png', 'heritage-ivory.png'],
    },
    {
      id: 2,
      name: '목부용문 시리즈',
      title: '섬세한 꽃문양에 담긴 아름다움',
      description:
        '간절한 꿈과 소망의 실현을 상징하는 목부용 꽃문양을 담은 광주요의 대표 시리즈입니다. 전통 박지 기법으로 꽃잎과 잎을 섬세하게 표현하여 분청사기 특유의 질감과 우아함을 전합니다.',
      image: 'mokbuyong.jpg',
      photos: ['mokbuyong.jpg', 'mokbuyong-teacup.png', 'mokbuyong-round-plate.png'],
    },
    {
      id: 3,
      name: '목단문 시리즈',
      title: '전통의 아름다움을 일상으로',
      description:
        '부귀영화와 가정의 화목, 행복을 상징하는 전통 왕실의 모란꽃 문양을 담은 시리즈입니다. 광주요만의 분청토와 장인의 정교한 수작업을 통해 깊이 있는 색감과 고전적인 아름다움을 전합니다.',
      image: 'mokdan.jpg',
      photos: ['mokdan.jpg', 'mokdan-bab.png', 'mokdan-jan.png'],
    },
    {
      id: 4,
      name: '십이지진 시리즈',
      title: '청자에 새긴 열두 수호신',
      description:
        '매년 새해를 기념해 십이지신을 모티프로 제작하는 한정판 청자 시리즈입니다. 고려청자의 은은한 비색과 정교한 목단문을 통해 전통의 아름다움과 소장 가치를 전합니다.',
      image: 'zodiac-sheep.png',
     },
    {
      id: 5,
      name: '원호',
      title: '달의 곡선에 담은 균형의 미학',
      description:
        '달항아리의 둥글고 부드러운 곡선을 대칭적이고 균형 잡힌 형태로 재해석한 도자기입니다. 28일간의 정교한 수작업과 광주요만의 흙과 유약을 통해 한국 전통 백자의 아름다움을 전합니다.',
      image: 'wonho-white.png',
       photos: ['wonho-white.png', 'mokdan-bab.png', 'wonho-tree.png'],
     },
     {
      id: 6,
      name: '진사',
      title: '흙과 불이 빚어낸 붉은빛의 미학',
      description:
        '가마 속 산화와 환원 반응을 통해 깊고 다채로운 붉은빛을 구현한 도자기 시리즈입니다. 불의 작용으로 자연스럽게 변화하는 색감이 기물마다 고유한 아름다움을 선사합니다.',
      image: 'jinsa-plate.png',
       photos: ['jinsa-plate.png', 'jinsa-cup.png'],
     },
    { id: 7,
      name: '십장생문 3단 합',
      title: '장수와 복을 담은 세 겹의 아름다움',
      description:
        '건강과 장수를 상징하는 한국 전통 십장생 문양을 담은 도자기입니다. 세 단으로 쌓아 올린 합의 형태로 전통의 아름다움과 실용성을 함께 전합니다.',
      image: 'sipjangsaeng.png',
     },
  ],

  modern: [],
}

const heritageProducts = [
  {
    name: '헤리티지 목단(현) 소리잔',
    image: 'sori-cup.jpg',
    price: '200,000원',
  },
  {
    name: '헤리티지 목단 현玄 커피잔 2조 세트 (4p)+\n오동나무 케이스',
    image: 'coffee-set.jpg',
    price: '640,000원',
    soldOut: true,
  },
  {
    name: '헤리티지 목단 현玄 디저트접시 17+오동나무 케이스',
    image: 'dessert-plate-17.jpg',
    price: '250,000원',
  },
  {
    name: '헤리티지 목단 현玄 디저트접시 22+오동나무 케이스',
    image: 'dessert-plate-22.jpg',
    price: '300,000원',
  },
]

const THUMBNAILS_PER_PAGE = 2

export const DesignStory = () => {
  const [activeTab, setActiveTab] = useState('classic')
  const [activeIndex, setActiveIndex] = useState(0)
  const [thumbnailPage, setThumbnailPage] = useState(0)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isAutomatic, setIsAutomatic] = useState(false)
  const imageRef = useRef(null)

  const items = designData[activeTab]
  const activeItem = items[activeIndex]
  const photoCount = activeItem?.photos?.length ?? 0
  const activePhoto = activeItem?.photos?.[photoIndex] ?? activeItem?.image

  useEffect(() => {
    const image = imageRef.current
    if (!image || photoCount < 2) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let isVisible = false
    let timer

    const scheduleNext = () => {
      window.clearTimeout(timer)
      if (!isVisible || motion.matches || document.hidden) return

      timer = window.setTimeout(() => {
        setIsAutomatic(true)
        setPhotoIndex((index) => (index + 1) % photoCount)
      }, 3000)
    }

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      scheduleNext()
    }, { threshold: 0.25 })

    observer.observe(image)
    motion.addEventListener('change', scheduleNext)
    document.addEventListener('visibilitychange', scheduleNext)

    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
      motion.removeEventListener('change', scheduleNext)
      document.removeEventListener('visibilitychange', scheduleNext)
    }
  }, [photoIndex, activeTab, activeIndex, photoCount])

  // 카테고리 변경
  const handleTabChange = (tab) => {
    setIsAutomatic(false)
    setActiveTab(tab)
    setActiveIndex(0)
    setThumbnailPage(0)
    setPhotoIndex(0)
  }

  const selectSeries = (index) => {
    setIsAutomatic(false)
    setActiveIndex(index)
    setThumbnailPage(0)
    setPhotoIndex(0)
  }

  // 선택한 시리즈 다음 번호부터 순환하는 썸네일 목록
  const indexedItems = items.map((item, index) => ({ ...item, index }))
  const otherItems = [
    ...indexedItems.slice(activeIndex + 1),
    ...indexedItems.slice(0, activeIndex),
  ]

  const thumbnailPageCount = Math.ceil(otherItems.length / THUMBNAILS_PER_PAGE)
  const firstThumbnail = thumbnailPage * THUMBNAILS_PER_PAGE
  const visibleThumbnails = otherItems.slice(firstThumbnail, firstThumbnail + THUMBNAILS_PER_PAGE)

  const handleNextThumbnails = () => {
    setThumbnailPage((page) => (page + 1) % thumbnailPageCount)
  }

  return (
    <section className="design-story">

      {/* 상단 타이틀 */}
      <div className="design-story__header">

        <StoryTitle>Design Story</StoryTitle>

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
          <div className="design-story__content">

            {/* 왼쪽 메인 이미지 */}
            <div
              ref={imageRef}
              className="design-story__main-image"
              data-transition={isAutomatic ? 'auto' : 'manual'}
            >
              {items.flatMap((item) =>
                (item.photos ?? [item.image]).map((photo) => {
                  const isActive = item.id === activeItem.id && photo === activePhoto

                  return (
                    <div
                      key={`${item.id}-${photo}`}
                      className={`design-story__image-layer ${photo === 'heritage.png' ? 'design-story__image-layer--heritage' : ''} ${isActive ? 'is-active' : ''}`}
                      aria-hidden={!isActive}
                    >
                      <img src={`/images/main/${photo}`} alt={item.name} />
                    </div>
                  )
                })
              )}
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

                {visibleThumbnails.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className="design-story__product"
                    onClick={() => selectSeries(item.index)}
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

                {thumbnailPageCount > 1 && (
                  <button
                    type="button"
                    className="design-story__next"
                    onClick={handleNextThumbnails}
                    aria-label="다음 썸네일 목록"
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

      {activeItem?.id === 1 && (
        <ul className="design-story__heritage-catalog" aria-label="헤리티지 상품">
          {heritageProducts.map(({ name, image, price, soldOut }) => (
            <li key={image} className="design-story__catalog-item">
              <img
                src={`/images/main/heritage-products/${image}`}
                alt=""
                width={500}
                height={500}
                loading="lazy"
              />
              <p className="design-story__catalog-name">{name}</p>
              <p className="design-story__catalog-price">{price}</p>
              {soldOut && <span className="design-story__catalog-status">일시품절</span>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
