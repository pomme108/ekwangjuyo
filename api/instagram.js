const API_URL =
  'https://instagram-scraper-stable-api.p.rapidapi.com/get_ig_user_posts.php';

// 서버 캐시
let cachedPosts = null;
let cachedAt = 0;
let pendingRequest = null;

// 3일 동안 캐시 유지
const CACHE_DURATION = 3 * 24 * 60 * 60 * 1000;

// 인스타그램 게시물 가져오기
async function fetchInstagramPosts() {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;
  const username = process.env.INSTAGRAM_USERNAME;

  if (!apiKey || !apiHost || !username) {
    throw new Error('Instagram 환경변수가 설정되지 않았습니다.');
  }

  // Form Data 설정
  const formData = new FormData();

  formData.append('amount', '8');
  formData.append('pagination_token', '');
  formData.append(
    'username_or_url',
    `https://www.instagram.com/${username}/`
  );

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'x-rapidapi-host': apiHost,
      'x-rapidapi-key': apiKey,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Instagram API 오류: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data.posts)) {
    throw new Error('게시물 목록을 가져오지 못했습니다.');
  }

  // 게시물 데이터 가공
  const posts = data.posts
    .map((item) => {
      const node = item.node;
      const media = node?.media_dict || node;

      const code = media?.code || media?.shortcode;

      const image =
        media?.image_versions2?.candidates?.[0]?.url ||
        media?.display_url ||
        media?.thumbnail_url;

      if (!code || !image) {
        return null;
      }

      return {
        id: code,
        image,
        link: `https://www.instagram.com/p/${code}/`,
      };
    })
    .filter(Boolean)
    .slice(0, 8);

  if (posts.length === 0) {
    throw new Error('게시물 이미지가 없습니다.');
  }

  const result = {
    username,
    posts,
  };

  // 캐시 저장
  cachedPosts = result;
  cachedAt = Date.now();

  return result;
}

// API 요청 처리
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  // 캐시 데이터가 있으면 재사용
  if (
    cachedPosts &&
    Date.now() - cachedAt < CACHE_DURATION
  ) {
    return res.status(200).json(cachedPosts);
  }

  try {
    // 중복 API 호출 방지
    if (!pendingRequest) {
      pendingRequest = fetchInstagramPosts().finally(() => {
        pendingRequest = null;
      });
    }

    const result = await pendingRequest;

    return res.status(200).json(result);
  } catch (error) {
    console.error('Instagram API Error:', error.message);

    // 오류 발생 시 기존 캐시 사용
    if (cachedPosts) {
      return res.status(200).json(cachedPosts);
    }

    return res.status(500).json({
      error: '인스타그램 게시물을 불러오지 못했습니다.',
    });
  }
}