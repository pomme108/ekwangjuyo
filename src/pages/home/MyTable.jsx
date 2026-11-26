import { Link } from 'react-router-dom';
import './scss/my-table.scss';

export default function MyTable() {
  return (
    <section className="my-table">

      {/* 배경 이미지 */}
      <div className="my-table__background">
        <img
          src="/images/main/my-table.png"
          alt="광주요 도자기로 꾸민 식탁"
        />
      </div>

      {/* 검정색 오버레이 */}
      <div className="my-table__overlay" />

      {/* 텍스트 영역 */}
      <div className="my-table__content">
        <div className="my-table__text">
          <h2 className="my-table__title">
            오늘의 식탁, 나의 취향으로
          </h2>

          <p className="my-table__description">
            식탁보의 색부터 그릇의 배치까지,
            <br />
            취향을 담아 나만의 식탁을 완성해보세요.
          </p>
        </div>

        <Link
          to="/my-table"
          className="my-table__button"
        >
          <span>내 식탁 꾸미기</span>

          <img
            src="/images/icon/my-table-plus.svg"
            alt=""
          />
        </Link>
      </div>

    </section>
  );
}