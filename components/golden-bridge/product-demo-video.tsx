"use client"

import { useRef, useState } from "react"
import { Play, Maximize } from "lucide-react"

interface ProductDemoVideoProps {
  src?: string
  eyebrow?: string
  caption?: string
  label?: string
}

export function ProductDemoVideo({
  src = "/golden-bridge/video2.mp4",
  eyebrow = "Product Demo",
  caption = "See how our stone paper performs. Write with pen and experience the difference.",
  label = "Play product demo video",
}: ProductDemoVideoProps = {}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen()
      } else if ((videoRef.current as any).mozRequestFullScreen) {
        (videoRef.current as any).mozRequestFullScreen()
      }
    }
  }

  const handleMouseMove = () => {
    // Reset hide timeout when mouse moves
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current)
    }
  }

  return (
    <div 
      ref={containerRef} 
      className="relative group overflow-hidden bg-foreground"
      onMouseMove={handleMouseMove}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        onClick={handleVideoClick}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleVideoEnded}
        className="w-full aspect-video object-cover opacity-70 transition-all duration-700 group-hover:scale-[1.02] group-hover:opacity-80 cursor-pointer"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/40 to-foreground/70" />

      {/* Play control - only show when not playing */}
      {!isPlaying && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-background text-center px-6 transition-opacity duration-300">
          <button
            type="button"
            onClick={handleVideoClick}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-background/50 bg-background/5 backdrop-blur-sm flex items-center justify-center group-hover:bg-background group-hover:border-background transition-all duration-500"
            aria-label={label}
          >
            <Play className="h-6 w-6 md:h-7 md:w-7 text-background group-hover:text-foreground fill-current translate-x-0.5 transition-colors duration-500" />
          </button>
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-background/60 mb-3">
              {eyebrow}
            </p>
            <p className="mt-3 text-sm text-background/55 max-w-md mx-auto">
              {caption}
            </p>
          </div>
        </div>
      )}

      {/* Controls when playing */}
      {isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Top-right fullscreen button only */}
          <button
            type="button"
            onClick={handleFullscreen}
            className="absolute top-4 right-4 w-12 h-12 rounded-full border border-background/50 bg-background/5 backdrop-blur-sm flex items-center justify-center hover:bg-background hover:border-background transition-all duration-500"
            aria-label="Toggle fullscreen"
          >
            <Maximize className="h-5 w-5 text-background hover:text-foreground transition-colors duration-500" />
          </button>
        </div>
      )}
    </div>
  )
}
