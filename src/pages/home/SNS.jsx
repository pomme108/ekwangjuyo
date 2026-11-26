import { useEffect, useState } from 'react';
import { getInstagramPosts } from '../../service/instagramService';

import './scss/sns.scss';
function SNS() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      try {
        const data = await getInstagramPosts();

        if (!cancelled) {
          setPosts(data.slice(0, 8));
        }
      } catch (err) {
        if (!cancelled) {
          setError('인스타그램 게시물을 불러오지 못했습니다.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="sns">
      <div className="sns__inner">

        {/* 타이틀 */}
        <div className="sns__heading">
          <h2>당신의 식탁, 당신의 이야기</h2>

          <p>
            손끝으로 고유함을 빚는 창작자와 제작자의 이야기
          </p>
        </div>

        {/* 로딩 */}
        {loading && (
          <div className="sns__grid">
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={index}
                className={`sns__item sns__item--${index + 1} sns__skeleton`}
              />
            ))}
          </div>
        )}

        {/* 에러 */}
        {!loading && error && (
          <p className="sns__message">{error}</p>
        )}

        {/* 인스타그램 게시물 */}
        {!loading && !error && (
          <div className="sns__grid">
            {posts.map((post, index) => (
              <a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`sns__item sns__item--${index + 1}`}
                aria-label={`광주요 인스타그램 게시물 ${index + 1}`}
              >
                <img
                  src={post.image}
                  alt={`광주요 인스타그램 ${index + 1}`}
                  loading="lazy"
                />

                <div className="sns__overlay">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                    />
                    <circle cx="12" cy="12" r="4.5" />
                    <circle
                      cx="18"
                      cy="6"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default SNS;