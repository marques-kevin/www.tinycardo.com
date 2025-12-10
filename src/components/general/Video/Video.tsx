import { PauseIcon, PlayIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"
import React, { useEffect, useRef, useState } from "react"
import { Image } from "@/components/general/Image/Image"

export const VideoPlayer: React.FC<{
  classNames?: { video?: string; image?: string }
  autoplay?: boolean
  src?: string
  illustration?: any
  alt?: string
}> = (props) => {
  const [play, setPlay] = useState(false)
  const [loadVideo, setLoadVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setLoadVideo(true)

    if (props.autoplay) {
      setPlay(true)

      setTimeout(() => {
        videoRef.current?.play()
      }, 1000)
    }
  }, [])

  const togglePlay = () => {
    if (play) {
      videoRef.current?.pause()
      setPlay(false)
    } else {
      videoRef.current?.play()
      setPlay(true)
    }
  }

  return (
    <div className="relative w-full rounded-lg ring-4 ring-pink-100">
      {props.illustration && (
        <Image
          className={clsx(props.classNames?.image, "ring-4 ring-pink-100")}
          src={props.illustration}
          alt={props.alt || ""}
        />
      )}

      {props.src && (
        <video
          ref={videoRef}
          className={clsx(props.classNames?.video, "absolute inset-0")}
          playsInline={props.autoplay}
          loop={props.autoplay}
          muted={props.autoplay}
          controls={false}
        >
          <source src={props.src} type="video/mp4" />
        </video>
      )}

      {props.src && (
        <div
          className={clsx(
            "absolute inset-0 flex w-full cursor-pointer items-center justify-center rounded-lg  transition-all duration-300 ease-in-out opacity-0 hover:opacity-100",
            play && "bg-slate-900/50 opacity-0",
            !play && "bg-slate-900/50 opacity-100"
          )}
          onClick={togglePlay}
        >
          <div>
            {!play && <PlayIcon className="h-10 w-10 text-white" />}
            {play && <PauseIcon className="h-10 w-10 text-white" />}
          </div>
        </div>
      )}
    </div>
  )
}

export const Video: React.FC<{
  src?: any
  autoplay?: boolean
  illustration?: any
  alt: string
}> = (props) => {
  return (
    <div className="mx-auto mb-4 mt-2 px-4 md:max-w-6xl md:px-0">
      <VideoPlayer
        {...props}
        classNames={{
          video: "w-full rounded-lg safari-rounded-lg",
          image: "w-full rounded-lg safari-rounded-lg",
        }}
      />
    </div>
  )
}
