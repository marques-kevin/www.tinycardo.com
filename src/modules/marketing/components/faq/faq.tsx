import { As } from "@/components/general/As/As"
import { getFaq } from "@/components/general/Seo/Seo"
import { FaqEntity } from "@/entities/PageEntity"
import React from "react"
import Helmet from "react-helmet"
import ReactMarkdown from "react-markdown"

export const Faq: React.FC<FaqEntity> = (props) => {
  return (
    <div className="px-4 md:px-8">
      <div className="bg-pink-50 ring-2 ring-pink-100 mt-24 bg-opacity-70 md:rounded-[92px] rounded-2xl">
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(getFaq(props.items))}
          </script>
        </Helmet>

        <div className="container">
          <div className="mx-auto w-full max-w-3xl py-24">
            <div className="mx-auto">
              <As
                className="relative text-center text-3xl md:text-4xl font-semibold leading-tight tracking-tight "
                component={props.title.component}
              >
                {props.title.value}
              </As>

              <dl className="mt-8  divide-y divide-pink-100">
                {props.items?.map((faq, index) => (
                  <div key={index} className="flex py-10">
                    <div className="mr-10 hidden md:block text-2xl font-semibold text-pink-400">
                      0{index + 1}
                    </div>
                    <div>
                      <dt className="">
                        <div className="flex w-full items-start justify-between text-left ">
                          <h3 className=" text-2xl font-semibold">
                            {faq.question}
                          </h3>
                        </div>
                      </dt>
                      <dd className="mt-2 prose !text-slate-950">
                        <ReactMarkdown
                          components={{
                            p: (props) => (
                              <p className="text-slate-950" {...props} />
                            ),
                          }}
                        >
                          {faq.answer}
                        </ReactMarkdown>
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
