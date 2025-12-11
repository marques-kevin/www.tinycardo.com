import { AnnouncementBadgeEntity } from "@/entities/PageEntity"
import { Link } from "gatsby"
import { ArrowRightIcon, SparklesIcon } from "lucide-react"
import React from "react"

export const AnnouncementBadge: React.FC<AnnouncementBadgeEntity> = (props) => {
  return (
    <Link to="/lovarank/" className="flex mb-4 justify-center">
      <div className="flex relative animate-bounce items-center text-red-500 gap-x-2 rounded-full bg-red-50 px-4 py-2">
        <div className="w-4 h-1 bg-red-50 rounded-full absolute -left-8 top-0 rotate-[30deg]"></div>
        <div className="w-4 h-1 bg-red-50 rounded-full absolute -left-10 top-0 bottom-0 my-auto"></div>
        <div className="w-4 h-1 bg-red-50 rounded-full absolute -left-8 bottom-0 -rotate-[30deg]"></div>
        <div className="w-4 h-1 bg-red-50 rounded-full absolute -right-8 top-0 -rotate-[30deg]"></div>
        <div className="w-4 h-1 bg-red-50 rounded-full absolute -right-10 top-0 bottom-0 my-auto"></div>
        <div className="w-4 h-1 bg-red-50 rounded-full absolute -right-8 bottom-0 rotate-[30deg]"></div>
        <SparklesIcon className="h-4 w-4" />
        {props.announcement_badge_label}
        <ArrowRightIcon className="h-4 w-4" />
      </div>
    </Link>
  )
}
