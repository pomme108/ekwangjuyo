import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import './scss/header-footer.scss'

// 메인 메뉴 + 하위 메뉴
// - groups: 제목 + 메뉴 묶음이 있는 경우 (제품)
// - children: 단순 한 줄 목록인 경우
const mainMenu = [
  {
    id: 1, menu: '제품', path: '/products', class: 'products',
    image: '/images/header-footer/bowlset.jpg',
    groups: [
      {
        id: 101, title: '전체상품', path: '/products',
        items: [
          { id: 1011, name: '그릇세트', path: '/products/bowl-set' },
          { id: 1012, name: '잔 시리즈', path: '/products/cup-series' },
          { id: 1013, name: '공기대접 세트', path: '/products/rice-bowl-set' },
          { id: 1014, name: '볼', path: '/products/bowl' },
          { id: 1015, name: '종지', path: '/products/small-dish' },
          { id: 1016, name: '찬기', path: '/products/side-dish' },
          { id: 1017, name: '접시', path: '/products/plate' },
          { id: 1018, name: '잔/머그', path: '/products/cup-mug' },
          { id: 1019, name: '다기/주기', path: '/products/tea-liquor' },
          { id: 1020, name: '수저받침', path: '/products/rest' },
          { id: 1021, name: '원호', path: '/products/wonho' },
          { id: 1022, name: '기타/오브제', path: '/products/object' },
          { id: 1023, name: '커트러리', path: '/products/cutlery' },
        ],
      },
      {
        id: 102, title: '컬렉션별', path: '/products/collection',
        items: [], // Figma 보고 추가
      },
      {
        id: 103, title: '선물 추천', path: '/products/gift',
        items: [], // Figma 보고 추가
      },
    ],
  },
  {
    id: 2, menu: '브랜드', path: '/brand', class: 'brand',
    children: [
      { id: 21, name: '브랜드 소개', path: '/brand/about' },
      { id: 22, name: '저널', path: '/brand/about' },
      { id: 23, name: '뉴스', path: '/brand/news' },
      { id: 24, name: '브랜드 소개', path: '/brand/location' },
    ],
  },
  {
    id: 3, menu: '커뮤니티', path: '/community', class: 'community',
    children: [
      { id: 31, name: '공지사항', path: '/community/notice' },
      { id: 32, name: 'FAQ', path: '/community/faq' },
      { id: 33, name: '문의하기', path: '/community/contact' },
      { id: 34, name: '상품리뷰', path: '/community/review' },
      { id: 35, name: '프로모션', path: '/community/promotion' },
    ],
  },
  {
    id: 4, menu: '파트너십', path: '/partnership', class: 'partnership',
    children: [
      { id: 41, name: '다이닝 솔루션', path: '/partnership/dining' },
      { id: 42, name: '협업 문의', path: '/partnership/contact' },
    ],
  },
]

export const Header = () => {
  // null: 닫힘 / 숫자: 해당 메인 메뉴의 하위 메뉴 / 'account': 계정 박스
  const [active, setActive] = useState(null)

  const activeMenu = mainMenu.find((m) => m.id === active)
  const isAccountOpen = active === 'account'
  const isLangOpen = active === 'lang'  

  return (
    <header className="site-header" onMouseLeave={() => setActive(null)}>
      <div className="site-header__inner">
        <nav className="site-header__nav" aria-label="주 메뉴">
          {mainMenu.map(({ id, menu, path }) => (
            <NavLink
              key={id}
              to={path}
              data-active={active === id ? 'true' : undefined}   // ← 추가
              onMouseEnter={() => setActive(id)}
              onFocus={() => setActive(id)}
            >
              {menu}
            </NavLink>
          ))}
        </nav>

        <h1 className="site-header__logo">
          <Link to="/" aria-label="광주요 홈">
            <img src="/images/header-footer/logo.png" alt="광주요" />
          </Link>
        </h1>

        <div className="site-header__utilities">
           <div
            className="site-header__lang"
            onMouseEnter={() => setActive('lang')}
            onFocus={() => setActive('lang')}
          >
            <button type="button" aria-label="현재 언어: 한국어">KR</button>

            {isLangOpen && (
              <ul className="site-header__lang-menu">
                <li>
                  <button type="button" aria-label="English">EN</button>
                </li>
              </ul>
            )}
          </div>
          <nav className="site-header__shortcuts" aria-label="사용자 메뉴">
            <div
              className="site-header__account"
              onMouseEnter={() => setActive('account')}
              onFocus={() => setActive('account')}
            >
              <Link to="/login" aria-label="로그인">
                <img src="/images/header-footer/account.svg" alt="" className="site-header__account-icon" />
              </Link>

              {isAccountOpen && (
                <ul className="site-header__account-menu">
                  <li><Link to="/login">로그인/회원가입</Link></li>
                  <li><Link to="/mypage">마이페이지</Link></li>
                </ul>
              )}
            </div>

            <Link to="/search" aria-label="검색">
              <img src="/images/header-footer/search.svg" alt="" />
            </Link>
            <Link to="/wishlist" aria-label="찜하기">
              <img src="/images/header-footer/wishlist.svg" alt="" />
            </Link>
            <Link to="/cart" aria-label="장바구니">
              <img src="/images/header-footer/cart.svg" alt="" />
            </Link>
          </nav>
        </div>
      </div>

      {/* 메인 메뉴 하위 메뉴 */}
      {activeMenu && (
         <div className={`site-header__sub site-header__sub--${activeMenu.class}`}>
          {activeMenu.groups ? (
            <div className="site-header__groups">
              {activeMenu.groups.map(({ id, title, path, items }) => (
                <section key={id} className="site-header__group">
                  <p className="site-header__group-title">
                    <Link to={path}>{title}</Link>
                  </p>
                  <ul className="site-header__group-list">
                    {items.map(({ id, name, path }) => (
                      <li key={id}>
                        <Link to={path}>{name}</Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            <ul className="site-header__sub-list">
              {activeMenu.children.map(({ id, name, path }) => (
                <li key={id}>
                  <Link to={path}>{name}</Link>
                </li>
              ))}
            </ul>
          )}

          {activeMenu.image && (
            <img className="site-header__sub-image" src={activeMenu.image} alt="" />
          )}
        </div>
      )}
    </header>
  )
}