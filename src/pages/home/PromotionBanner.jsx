import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './scss/promotion-banner.scss';

const promotionItems = [
  {
    id: 1,
    title: ['광주요와 함께하는', '따뜻한 연말의 식탁'],
    discount: '20% OFF',
    image: '/images/main/promotion/promotion-01.jpg',
    link: '/promotion/1',
  },
  {
    id: 2,
    title: ['일상에 깊이를 더하는', '가을 한정 혜택'],
    discount: '15% OFF',
    image: '/images/main/promotion/promotion-02.jpg',
    link: '/promotion/2',
  },
  {
    id: 3,
    title: ['소중한 마음을 전하는', '광주요 선물 제안'],
    discount: '10% OFF',
    image: '/images/main/promotion/promotion-03.png',
    link: '/promotion/3',
  },
];

export default function PromotionBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentItem = promotionItems[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) =>
      (prev - 1 + promotionItems.length) % promotionItems.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      (prev + 1) % promotionItems.length
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prev) =>
        (prev + 1) % promotionItems.length
      );
    }, 6000);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section className="promotion-banner">
      <div className="promotion-banner__container">

        {/* 이전 버튼 */}
        <button
          type="button"
          className="promotion-banner__arrow promotion-banner__arrow--prev"
          onClick={handlePrev}
          aria-label="이전 프로모션"
        >
          <img
            src="/images/icon/promotion-arrow.svg"
            alt=""
          />
        </button>

        {/* 프로모션 콘텐츠 */}
        <div className="promotion-banner__inner">

          <div className="promotion-banner__image">
            <img
              src={currentItem.image}
              alt={currentItem.title.join(' ')}
            />
          </div>

          <div className="promotion-banner__content">
            <div className="promotion-banner__text">
              <h2 className="promotion-banner__title">
                {currentItem.title.map((line, index) => (
                  <span key={index}>{line}</span>
                ))}
              </h2>

              <p className="promotion-banner__discount">
                <span>일부상품</span>
                <strong>{currentItem.discount}</strong>
              </p>
            </div>

            <Link
              to={currentItem.link}
              className="promotion-banner__more"
            >
              <span>더 보기</span>
              <img
                src="/images/icon/promotion-plus.svg"
                alt=""
              />
            </Link>
          </div>
        </div>

        {/* 다음 버튼 */}
        <button
          type="button"
          className="promotion-banner__arrow promotion-banner__arrow--next"
          onClick={handleNext}
          aria-label="다음 프로모션"
        >
          <img
            src="/images/icon/promotion-arrow.svg"
            alt=""
          />
        </button>

      </div>

      {/* 페이지네이션 */}
      <div className="promotion-banner__pagination">
        {promotionItems.map((item, index) => (
          <button
            type="button"
            key={item.id}
            className={`promotion-banner__dot ${
              activeIndex === index ? 'is-active' : ''
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`${index + 1}번째 프로모션`}
            aria-current={activeIndex === index}
          />
        ))}
      </div>
    </section>
  );
}