import './scss/story-timeline.scss'

// 타임라인 구간 - start: 영상 시작 후 몇 초부터 해당 구간인지
// 영상 장면 기준 (총 54.5초)
//  0초~  : 도안 스케치 → 흙 성형 → 다듬기 → 문양 새기기 → 장작가마 → 마무리 · 닦기
//  34초~ : 선물 보자기 포장
//  38초~ : 그릇을 꺼내 식탁 위에 차림
const chapters = [
  { id: 1, label: '제작과정', start: 0 },
  { id: 2, label: '사랑을 담아', start: 34 },
  { id: 3, label: '식탁으로', start: 38 },
]

// 현재 재생 시간 → 지금 구간 번호 + 진행선 길이(%)
// 점이 0% / 50% / 100% 위치에 있으므로 구간별로 나눠서 계산
const getProgress = (time) => {
  const last = chapters.length - 1

  let index = 0
  chapters.forEach((chapter, i) => {
    if (time >= chapter.start) index = i
  })

  if (index === last) return { index, percent: 100 }

  const { start } = chapters[index]
  const end = chapters[index + 1].start
  const percent = ((index + (time - start) / (end - start)) / last) * 100

  return { index, percent }
}

// props - time: 현재 재생 시간(초) / onSeek: 라벨 클릭 시 호출(start 전달)
export const StoryTimeline = ({ time, onSeek }) => {
  const { index, percent } = getProgress(time)

  return (
    <div className="story-timeline">
      <ol className="story-timeline__chapters">
        {chapters.map(({ id, label, start }, i) => (
          <li
            key={id}
            className="story-timeline__chapter"
            style={{ left: `${(i / (chapters.length - 1)) * 100}%` }}
            data-active={i <= index ? 'true' : undefined}
          >
            <button type="button" onClick={() => onSeek(start)}>
              {label}
            </button>
            <span className="story-timeline__dot" aria-hidden="true" />
          </li>
        ))}
      </ol>

      <div className="story-timeline__track" aria-hidden="true">
        <span className="story-timeline__bar" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
