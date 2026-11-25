import { useState } from 'react'
import { Link } from 'react-router-dom'

import './scss/header-footer.scss'

const companyInfo = [
  '상호명 : (주) 광주요 서울지점',
  '대표 : 조태권,성복화,조윤민',
  '주소 : 서울 서초구 남부순환로325길 1 화요빌딩 6층 광주요',
  '이메일 : gk.online@hwayogroup.com',
]

const policyLinks = [
  { id: 1, name: '개인정보처리방침', path: '/privacy' },
  { id: 2, name: '이용약관', path: '/terms' },
]

// TODO: 실제 사이트 주소로 교체
const familySites = [
  { id: 1, name: '광주요 그룹', url: 'http://kwangjuyo.com/groupinfo/story/' },
  { id: 2, name: '화요', url: 'https://hwayo.com/home/' },
  { id: 3, name: '비채나', url: 'https://www.bicena.com/' },
]

export const Footer = () => {
  const [isFamilyOpen, setIsFamilyOpen] = useState(false)

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link to="/" className="site-footer__logo" aria-label="광주요 홈">
          <img src="/images/header-footer/footer-logo.png" alt="광주요" />
        </Link>
        <address className="site-footer__info">
          {companyInfo.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <p>
            사업자 등록번호 : 214-85-44453
            <span className="site-footer__gap">
              통신판매신고번호 : 2020-서울송파-1033{' '}
              {/* TODO: 사업자정보확인 링크 주소 */}
              <a href="#" target="_blank" rel="noreferrer">[사업자정보확인]</a>
            </span>
          </p>
        </address>

        <div className="site-footer__cs">
          <dl>
            <dt>고객센터</dt>
            <dd>02-400-9939</dd>
          </dl>
          <dl>
            <dt>근무시간</dt>
            <dd>10:00 - 16:30 (점심 11:30 - 13:00)</dd>
          </dl>
        </div>

        {/* Family Site: 바깥 div + 버튼 + 펼침 목록 */}
        <div
          className="site-footer__family"
          data-open={isFamilyOpen ? 'true' : undefined}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setIsFamilyOpen(false)
          }}
          onKeyDown={(e) => e.key === 'Escape' && setIsFamilyOpen(false)}
        >
          <button
            type="button"
            className="site-footer__family-toggle"
            aria-expanded={isFamilyOpen}
            aria-controls="family-site-list"
            onClick={() => setIsFamilyOpen((prev) => !prev)}
          >
            <span>Family Site</span>
            <i className="site-footer__family-arrow" aria-hidden="true" />
          </button>

          {isFamilyOpen && (
            <ul id="family-site-list" className="site-footer__family-list">
              {familySites.map(({ id, name, url }) => (
                <li key={id}>
                  <a href={url} target="_blank" rel="noreferrer">
                    <span>{name}</span>
                    <i className="site-footer__family-icon" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copy">Copyright © (주)광주요.All rights reserved.</p>
          <ul className="site-footer__policy">
            {policyLinks.map(({ id, name, path }) => (
              <li key={id}>
                <Link to={path}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}