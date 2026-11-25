
import './scss/play-toggle.scss'

export const PlayToggle = ({ isPlaying, onToggle }) => {
  return (
    <button
      type="button"
      className="play-toggle"
      onClick={onToggle}
      aria-label={isPlaying ? '일시정지' : '재생'}
    >
      <img
        src={
          isPlaying
            ? '/images/icon/pause.svg'
            : '/images/icon/play.svg'
        }
        alt=""
      />
    </button>
  )
}
