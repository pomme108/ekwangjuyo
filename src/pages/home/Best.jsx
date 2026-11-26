
import {
  useState,
  useEffect,
  useRef,
  Suspense,
} from 'react'

import { Canvas } from '@react-three/fiber'

import {
  OrbitControls,
  useGLTF,
  Center,
  Bounds,
  Environment,
} from '@react-three/drei'

import './scss/best.scss'

// ==============================
// 베스트 상품 데이터
// ==============================

const bestItems = [
  {
    id: 1,
    name: '청자 네 쪽 접이 접시 17cm',
    image: 'jeobi.jpg',
    model: '청자_네_쪽_접이_접시_17cm.glb',
  },
  {
    id: 2,
    name: '연화 오목 접시 20cm',
    image: 'lotus.jpg',
    model: '연화_오목_접시_20cm.glb',
  },
  {
    id: 3,
    name: '한결 찬기 17cm',
    image: 'hangyeol.jpg',
    model: '한결_찬기_17cm.glb',
  },
  {
    id: 4,
    name: '미 시리즈 구슬잔',
    image: 'guseul.jpg',
    model: '미_시리즈_구슬잔.glb',
  },
  {
    id: 5,
    name: '미 시리즈 소리잔',
    image: 'sori.jpg',
    model: '미_시리즈_소리잔.glb',
  },
  {
    id: 6,
    name: '청자 네 쪽 접이 접시 17cm',
    image: 'jeobi.jpg',
    model: '청자_네_쪽_접이_접시_17cm.glb',
  },
]

// ==============================
// 3D 모델 불러오기
// ==============================

const ProductModel = ({ model }) => {
  const { scene } = useGLTF(`/models/${model}`)

  return (
    <Center>
      <primitive object={scene} />
    </Center>
  )
}

// ==============================
// 3D 뷰어
// ==============================

const ProductViewer = ({ model }) => {
  return (
    <Canvas
      camera={{
        position: [4, 3, 5],
        fov: 40,
      }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
      />

      <Suspense fallback={null}>

        <Bounds
          key={model}
          fit
          clip
          observe
          margin={1.5}
        >
          <ProductModel model={model} />
        </Bounds>

        <Environment preset="studio" />

      </Suspense>

      <OrbitControls
        makeDefault
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={1}
      />

    </Canvas>
  )
}

// ==============================
// Best Seller
// ==============================

export const Best = () => {

  // 선택한 상품
  const [activeItem, setActiveItem] = useState(null)

  // 상품 이미지 펼침 상태
  const [isExpanded, setIsExpanded] = useState(false)

  // 스크롤 감지 영역
  const stageRef = useRef(null)

  // ==============================
  // 스크롤 진입 애니메이션
  // ==============================

  useEffect(() => {
    const stage = stageRef.current

    if (!stage) return

    // 모바일 및 모션 감소 설정
    if (
      window.matchMedia('(max-width: 767px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsExpanded(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {

          // 상품 이미지 펼치기
          setIsExpanded(true)

          // 최초 한 번만 실행
          observer.disconnect()
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -35% 0px',
      }
    )

    observer.observe(stage)

    return () => {
      observer.disconnect()
    }
  }, [])

  // ==============================
  // 화면 출력
  // ==============================

  return (
    <section
      className={`best ${isExpanded ? 'is-expanded' : ''}`}
    >

      {/* 상단 타이틀 */}
      <div className="best__header">

        <h2 className="best__title">
          Best Seller
        </h2>

        <h3 className="best__heading">
          오래 사랑받은 그릇들
        </h3>

        <p className="best__description">
          시간이 흘러도 변함없이 사랑받는
          광주요의 그릇을 만나보세요.
        </p>

      </div>

      {/* 상품 이미지 및 3D 뷰어 영역 */}
      <div
        ref={stageRef}
        className="best__stage"
      >

        {/* 가운데 3D 뷰어 */}
        <div className="best__viewer">

          {activeItem ? (
            <>

              {/* 선택한 상품 3D 모델 */}
              <div className="best__canvas">
                <ProductViewer
                  model={activeItem.model}
                />
              </div>

              {/* 선택한 상품 정보 */}
              <div className="best__viewer-info">

                <p className="best__viewer-name">
                  {activeItem.name}
                </p>

                <p className="best__viewer-guide">
                  드래그하여 360°로 살펴보세요.
                </p>

              </div>

              {/* 3D 뷰어 닫기 버튼 */}
              <button
                type="button"
                className="best__close"
                aria-label="3D 뷰어 닫기"
                onClick={() => setActiveItem(null)}
              >
                ×
              </button>

            </>
          ) : (

            /* 초기 3D View 화면 */
            <div className="best__placeholder">

              <img
                src="/images/icon/3d-view.svg"
                alt=""
              />

              <span>3D View</span>

            </div>

          )}

        </div>

        {/* 주변 상품 이미지 6개 */}
        {bestItems.map((item) => (
          <button
            type="button"
            key={item.id}
            className={`
              best__item
              best__item--${item.id}
              ${
                activeItem?.id === item.id
                  ? 'is-active'
                  : ''
              }
            `}
            onClick={() => setActiveItem(item)}
            aria-pressed={activeItem?.id === item.id}
            aria-label={`${item.name} 3D 보기`}
            disabled={!isExpanded}
          >

            <img
              src={`/images/main/best/${item.image}`}
              alt={item.name}
              draggable={false}
            />

            {/* 상품 호버 시 이름 표시 */}
            <div className="best__overlay">

              <span>
                {item.name}
              </span>

            </div>

          </button>
        ))}

      </div>

    </section>
  )
}
