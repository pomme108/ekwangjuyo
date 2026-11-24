import { Link, NavLink } from 'react-router-dom'

import './scss/header-footer.scss'

// 메인 메뉴
const mainMenu = [
  { id: 1, menu: '제품', path: '/products', class: 'products' },
  { id: 2, menu: "브랜드", path: "/brand", class: "brand" },
  { id: 3, menu: "커뮤니티", path: "/community", class: "community" },
  { id: 4, menu: "파트너십", path: "/partnership", class: "partnership" },
];

export const Header = () => (
  <header className="site-header">
    <div className="site-header__inner">
      <nav className="site-header__nav" aria-label="주 메뉴">
        {mainMenu.map(({ id, menu, path }) => (
          <NavLink key={id} to={path}>{menu}</NavLink>
        ))}
      </nav>

      <h1 className="site-header__logo">
        <Link to="/" aria-label="광주요 홈">
          <img src="/images/header-footer/logo.png" alt="광주요" />
        </Link>
      </h1>

      <div className="site-header__utilities">
        <span aria-label="현재 언어: 한국어">KR</span>
        <nav className="site-header__shortcuts" aria-label="사용자 메뉴">
          <Link to="/login" aria-label="로그인">
            <img src="/images/header-footer/account.svg" alt="" className="site-header__account-icon" />
          </Link>
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
  </header>
)
