
import { Link } from 'react-router-dom'
import './scss/gift.scss'

const giftItems = [
  {
    id: 1,
    name: '결혼 선물',
    image: 'wedding.png',
    path: '/products?gift=wedding',
    type: 'wedding',
  },
  {
    id: 2,
    name: '집들이 선물',
    image: 'housewarming.png',
    path: '/products?gift=housewarming',
    type: 'housewarming',
  },
]

const giftServices = [
  {
    id: 1,
    name: '선물 서비스 안내',
    icon: 'gift-service.svg',
    path: '/service',
  },
  {
    id: 2,
    name: '포장 안내',
    icon: 'gift-package.svg',
    path: '/package',
  },
  {
    id: 3,
    name: '배송 안내',
    icon: 'gift-delivery.svg',
    path: '/delivery',
  },
]

export const Gift = () => {
  return (
    <section className="gift">

      <div className="gift__inner">

        <div className="gift__content">

          {/* 왼쪽 메인 선물 이미지 */}
          <Link
            to="/products?category=gift"
            className="gift__banner"
          >
            <img
              className="gift__banner-image"
              src="/images/main/gift/gift-banner.jpg"
              alt="광주요 보자기 선물 포장"
            />

            <img
              className="gift__logo"
              src="/images/main/gift/gift-logo.png"
              alt="광주요"
            />

            <div className="gift__banner-text">

              <p className="gift__banner-label">
                Gwangjuyo Gift
              </p>

              <h3 className="gift__banner-heading">
                마음을 담아 전하는 선물
              </h3>

            </div>
          </Link>

          {/* 오른쪽 선물 추천 영역 */}
          <div className="gift__detail">

            <div className="gift__header">

              <div className="gift__text">

                <h2 className="gift__heading">
                  어떤 날, 어떤 선물
                </h2>

                <p className="gift__description">
                  소중한 사람과 순간에 어울리는
                  선물을 찾아보세요.
                </p>

              </div>

              <Link
                to="/products?category=gift"
                className="gift__more"
              >
                선물 고르기 <span>→</span>
              </Link>

            </div>

            {/* 결혼 선물 / 집들이 선물 */}
            <div className="gift__products">

              {giftItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="gift__product"
                >

                  <div
                    className={`
                      gift__product-image
                      gift__product-image--${item.type}
                    `}
                  >
                    <img
                      src={`/images/main/gift/${item.image}`}
                      alt={item.name}
                    />
                  </div>

                  <p className="gift__product-name">
                    {item.name} <span>→</span>
                  </p>

                </Link>
              ))}

            </div>

          </div>

        </div>

        {/* 하단 선물 서비스 안내 */}
        <div className="gift__services">

          {giftServices.map((service) => (
            <Link
              key={service.id}
              to={service.path}
              className="gift__service"
            >
              <img
                src={`/images/icon/${service.icon}`}
                alt=""
              />

              <span>{service.name}</span>

            </Link>
          ))}

        </div>

      </div>

    </section>
  )
}
