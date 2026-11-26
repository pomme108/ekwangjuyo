import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './scss/review.scss';

const reviewItems = [
  {
    id: 1,
    image: '/images/main/review/review-01.jpg',
    title: '담 시리즈 원형 턱 접시',
    description:
      '은은하게 비치는 푸른빛이 세련되고 청량한 분위기를 더해주고, 표면도 요철없이 아주 매끈해서 완성도가 높아보여요. 마감도 깔끔하고 전체적인 퀄리티가',
    rating: 4.9,
  },
  {
    id: 2,
    image: '/images/main/review/review-02.jpg',
    title: '포토리뷰',
    description: '리뷰 문구 준비 중',
  },
  {
    id: 3,
    image: '/images/main/review/review-03.jpg',
    title: '포토리뷰',
    description: '리뷰 문구 준비 중',
  },
];

export default function Review() {
  const scrollRef = useRef(null);
  const progressRef = useRef(null);

  // 이미지 드래그 상태
  const dragRef = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  // 하단 스크롤바 드래그 상태
  const progressDragRef = useRef({
    isDown: false,
    offsetX: 0,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  // 스크롤 위치 연동
  const handleScroll = useCallback(() => {
    const slider = scrollRef.current;

    if (!slider) return;

    const maxScroll =
      slider.scrollWidth - slider.clientWidth;

    setCanScroll(maxScroll > 0);

    setScrollProgress(
      maxScroll > 0
        ? Math.max(
            0,
            Math.min(1, slider.scrollLeft / maxScroll)
          )
        : 0
    );
  }, []);

  // 화면 크기 변경 감지
  useEffect(() => {
    const slider = scrollRef.current;

    if (!slider) return;

    const observer = new ResizeObserver(handleScroll);

    observer.observe(slider);

    handleScroll();

    return () => observer.disconnect();
  }, [handleScroll]);

  // =============================
  // 이미지 드래그
  // =============================

  const handlePointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) {
      return;
    }

    const slider = scrollRef.current;

    if (!slider || !canScroll) return;

    e.preventDefault();

    dragRef.current = {
      isDown: true,
      startX: e.clientX,
      scrollLeft: slider.scrollLeft,
    };

    slider.setPointerCapture(e.pointerId);

    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.isDown) return;

    const slider = scrollRef.current;

    if (!slider) return;

    const distance =
      e.clientX - dragRef.current.startX;

    slider.scrollLeft =
      dragRef.current.scrollLeft - distance;
  };

  const handlePointerUp = (e) => {
    dragRef.current.isDown = false;

    setIsDragging(false);

    const slider = scrollRef.current;

    if (
      slider &&
      slider.hasPointerCapture(e.pointerId)
    ) {
      slider.releasePointerCapture(e.pointerId);
    }
  };

  // =============================
  // 하단 스크롤바 드래그
  // =============================

  const moveProgress = (clientX) => {
    const slider = scrollRef.current;
    const progress = progressRef.current;

    if (!slider || !progress) return;

    const rect = progress.getBoundingClientRect();

    // 기존 피그마 스크롤바 너비 25%
    const thumbWidth = rect.width * 0.25;

    const maxTravel = rect.width - thumbWidth;

    if (maxTravel <= 0) return;

    const position =
      clientX -
      rect.left -
      progressDragRef.current.offsetX;

    const ratio = Math.max(
      0,
      Math.min(1, position / maxTravel)
    );

    const maxScroll =
      slider.scrollWidth - slider.clientWidth;

    slider.scrollLeft = ratio * maxScroll;

    setScrollProgress(ratio);
  };

  // 스크롤바 드래그 시작
  const handleProgressDown = (e) => {
    if (!canScroll || e.button !== 0) return;

    const progress = progressRef.current;

    if (!progress) return;

    e.preventDefault();

    const rect = progress.getBoundingClientRect();

    const thumbWidth = rect.width * 0.25;

    const thumbLeft =
      scrollProgress * (rect.width - thumbWidth);

    const clickPosition = e.clientX - rect.left;

    const isThumb =
      clickPosition >= thumbLeft &&
      clickPosition <= thumbLeft + thumbWidth;

    progressDragRef.current = {
      isDown: true,
      offsetX: isThumb
        ? clickPosition - thumbLeft
        : thumbWidth / 2,
    };

    progress.setPointerCapture(e.pointerId);

    moveProgress(e.clientX);
  };

  // 스크롤바 드래그 이동
  const handleProgressMove = (e) => {
    if (!progressDragRef.current.isDown) return;

    moveProgress(e.clientX);
  };

  // 스크롤바 드래그 종료
  const handleProgressUp = (e) => {
    progressDragRef.current.isDown = false;

    const progress = progressRef.current;

    if (
      progress &&
      progress.hasPointerCapture(e.pointerId)
    ) {
      progress.releasePointerCapture(e.pointerId);
    }
  };

  // 키보드 스크롤 조작
  const handleProgressKeyDown = (e) => {
    const slider = scrollRef.current;

    if (!slider || !canScroll) return;

    switch (e.key) {
      case 'ArrowLeft':
        slider.scrollLeft -= 50;
        break;

      case 'ArrowRight':
        slider.scrollLeft += 50;
        break;

      case 'Home':
        slider.scrollLeft = 0;
        break;

      case 'End':
        slider.scrollLeft =
          slider.scrollWidth - slider.clientWidth;
        break;

      default:
        return;
    }

    e.preventDefault();
  };

  return (
    <section className="review">

      {/* 왼쪽 제목 영역 */}
      <div className="review__heading">
        <h2 className="review__title">
          함께 만든 순간의 기록
        </h2>

        <p className="review__description">
          고객님들의 솔직한 후기를 포토리뷰로 담았어요.
        </p>
      </div>

      {/* 더보기 버튼 */}
      <Link
        to="/review"
        className="review__more"
      >
        <span>더보기</span>

        <img
          src="/images/icon/review-plus.svg"
          alt=""
        />
      </Link>

      {/* 오른쪽 리뷰 영역 */}
      <div className="review__gallery">

        {/* 가로 스크롤 이미지 목록 */}
        <div
          ref={scrollRef}
          className={`review__slider ${
            isDragging ? 'is-dragging' : ''
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onLostPointerCapture={handlePointerUp}
          onScroll={handleScroll}
          tabIndex={0}
          aria-label="포토리뷰 목록"
        >
          {reviewItems.map((item) => (
            <article
              key={item.id}
              className={`review__card review__card--${item.id}`}
              tabIndex={0}
            >

              {/* 리뷰 이미지 */}
              <img
                className="review__image"
                src={item.image}
                alt={item.title}
                draggable={false}
              />

              {/* 검정색 오버레이 */}
              <div className="review__overlay" />

              {/* 리뷰 내용 */}
              <div className="review__info">
                <h3 className="review__product">
                  {item.title}
                </h3>

                <p className="review__comment">
                  {item.description}
                </p>
              </div>

              {/* 평점 */}
              {item.rating && (
                <div className="review__rating">
                  <img
                    src="/images/main/review/review-rating.png"
                    alt="평점"
                    draggable={false}
                  />

                  <span>{item.rating}</span>
                </div>
              )}

            </article>
          ))}
        </div>

        {/* 기존 디자인의 하단 스크롤바 */}
        <div
          ref={progressRef}
          className="review__progress"
          onPointerDown={handleProgressDown}
          onPointerMove={handleProgressMove}
          onPointerUp={handleProgressUp}
          onPointerCancel={handleProgressUp}
          onLostPointerCapture={handleProgressUp}
          onKeyDown={handleProgressKeyDown}
          role="slider"
          tabIndex={canScroll ? 0 : -1}
          aria-label="리뷰 가로 스크롤"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(scrollProgress * 100)}
          aria-disabled={!canScroll}
        >
          <div className="review__progress-track">

            <div
              className="review__progress-bar"
              style={{
                left: `${scrollProgress * 75}%`,
              }}
            />

          </div>
        </div>

      </div>
    </section>
  );
}