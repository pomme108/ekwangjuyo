import './scss/sound-toggle.scss'

// props - isMuted: 음소거 여부 / onToggle: 클릭 시 호출
export const SoundToggle = ({ isMuted, onToggle }) => {
  return (
    <button
      type="button"
      className="sound-toggle"
      aria-label={isMuted ? '소리 켜기' : '소리 끄기'}
      aria-pressed={!isMuted}
      data-muted={isMuted ? 'true' : undefined}
      onClick={onToggle}
    />
  )
}
