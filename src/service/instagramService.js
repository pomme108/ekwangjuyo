export async function getInstagramPosts() {
  const response = await fetch('/api/instagram');

  if (!response.ok) {
    throw new Error(
      '인스타그램 게시물을 불러오지 못했습니다.'
    );
  }

  const data = await response.json();

  return data.posts || [];
}