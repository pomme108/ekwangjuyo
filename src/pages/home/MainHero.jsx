
import { useState } from 'react'

import { StoryTimeline } from './StoryTimeline'
import { SoundToggle } from './SoundToggle'
import { PlayToggle } from './PlayToggle'

import './scss/main-hero.scss'

export const MainHero = () => {
  const [videoEl, setVideoEl] = useState(null)
  const [time, setTime] = useState(0)
  const [isMuted, setIsMuted] = useState(true)

  // 재생 상태 관리 (추가)
  const [isPlaying, setIsPlaying] = useState(false)

  // 타임라인 라벨 클릭 → 해당 시간으로 이동
  const handleSeek = (start) => {
    if (!videoEl) return
    videoEl.currentTime = start
    setTime(start)
  }

  // 영상 재생 및 일시정지 (추가)
  const handlePlayToggle = async () => {
    if (!videoEl) return

    if (videoEl.paused) {
      try {
        await videoEl.play()
      } catch (error) {
        console.error('영상 재생 실패:', error)
      }
    } else {
      videoEl.pause()
    }
  }

  return (
    <section className="main-hero">
      <video
        ref={setVideoEl}
        className="main-hero__video"
        src="/videos/main-hero.mp4"
        poster="/images/main/hero-poster.jpg"
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
      />

      <h1 className="main-hero__logo">
        <img src="/images/header-footer/logo.png" alt="광주요" />
      </h1>

      {/* 영상 위 컨트롤 */}
      <div className="main-hero__controls">

        <StoryTimeline 
          time={time} 
          onSeek={handleSeek} 
        />

        {/* 재생 및 일시정지 버튼 추가 */}
        <PlayToggle
          isPlaying={isPlaying}
          onToggle={handlePlayToggle}
        />

        <SoundToggle
          isMuted={isMuted}
          onToggle={() => setIsMuted((prev) => !prev)}
        />

      </div>
    </section>
  )
}
