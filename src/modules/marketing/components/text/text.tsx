import React from "react"
import ReactMarkdown from "react-markdown"

export const Text: React.FC<{
  value: any
}> = (props) => {
  return (
    <div className="prose max-w-3xl px-4 mx-auto w-full">
      <ReactMarkdown
        components={{
          p: (value) => (
            <p className="  text-lg leading-7 text-slate-900" {...value} />
          ),
        }}
      >
        {props.value}
      </ReactMarkdown>
    </div>
  )
}
