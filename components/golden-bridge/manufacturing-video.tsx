"use client"

import { useRef, useState } from "react"
import { Play, Pause, Maximize, Volume2, VolumeX } from "lucide-react"
import { useScrollReveal } from "@/components/golden-bridge/use-scroll-reveal"

const VIDEO_URL = "/golden-bridge/video.mp4"

export function ManufacturingVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref: sectionRef, isVisible } = useScrollReveal(0.1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen()
      }
    }
  }

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="px-6 py-24 md:px-12 lg:px-20 md:py-32 bg-foreground text-background"
    >
      {/* Heading */}
      <div
        className={`pb-6 mb-14 md:mb-20 border-b border-background/15 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-[11px] tracking-[0.3em] uppercase text-background/40 mb-3">
          Production &amp; Facility
        </p>
        <h2 className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-background text-balance max-w-3xl">
          Inside our manufacturing facility.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-[1.75] text-background/55 font-light">
          From raw material processing to precision production, a look inside our
          Luckau facility and the manufacturing lines that produce industrial-grade
          packaging solutions.
        </p>
      </div>

      {/* Video player */}
      <div
        className={`mx-auto max-w-5xl transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div
          className="relative group overflow-hidden bg-black/50 cursor-pointer"
          onClick={handleVideoClick}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            preload="metadata"
            poster="/golden-bridge/image8.png"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={handleVideoEnded}
            className={`w-full aspect-video object-contain transition-all duration-700 ${
              isPlaying ? "opacity-100" : "opacity-80"
            }`}
          >
            <source src={VIDEO_URL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 transition-opacity duration-500 pointer-events-none ${
              isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
          />

          {/* Play button - shown when paused */}
          {!isPlaying && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-background text-center px-6">
              <button
                type="button"
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-background/50 bg-background/10 backdrop-blur-sm flex items-center justify-center hover:bg-background hover:border-background transition-all duration-500 group/btn"
                aria-label="Play manufacturing video"
              >
                <Play className="h-6 w-6 md:h-7 md:w-7 text-background group-hover/btn:text-foreground fill-current translate-x-0.5 transition-colors duration-500" />
              </button>
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-background/60">
                  Watch the Manufacturing Process
                </p>
              </div>
            </div>
          )}

          {/* Controls when playing */}
          <div
            className={`absolute bottom-4 right-4 flex items-center gap-2 transition-opacity duration-300 ${
              isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleVideoClick()
              }}
              className="w-10 h-10 rounded-full border border-background/50 bg-background/10 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all duration-300"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 text-background hover:text-foreground transition-colors duration-300" />
              ) : (
                <Play className="h-4 w-4 text-background hover:text-foreground fill-current translate-x-0.5 transition-colors duration-300" />
              )}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              className="w-10 h-10 rounded-full border border-background/50 bg-background/10 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all duration-300"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-background hover:text-foreground transition-colors duration-300" />
              ) : (
                <Volume2 className="h-4 w-4 text-background hover:text-foreground transition-colors duration-300" />
              )}
            </button>
            <button
              type="button"
              onClick={handleFullscreen}
              className="w-10 h-10 rounded-full border border-background/50 bg-background/10 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all duration-300"
              aria-label="Toggle fullscreen"
            >
              <Maximize className="h-4 w-4 text-background hover:text-foreground transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
