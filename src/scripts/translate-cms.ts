import "dotenv/config"

import { languagesAvailable } from "@/constants/langs"
import { PageEntity } from "@/entities/PageEntity"
import delay from "delay"
import fs from "fs"
import path from "path"
import { v4 } from "uuid"

const openaiTranslate = async (params: {
  text: string
  to: string
  from: string
}) => {
  const data = JSON.stringify({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a translator. I'll give you sentences for my marketing landing page website and you have to translate it with.

        For example, if I give you from: fr, to: en, you have to translate from french to english.

        Do not translate those words: Foudroyer.

        Keep markdown format if it's present.
        
        Give me only the translation.`,
      },
      {
        role: "user",
        content: `from:${params.from}, to:${params.to}
        
        ${params.text}`,
      },
    ],
    temperature: 0,
  })

  const config: RequestInit = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
      "OpenAI-Organization": process.env.OPEN_AI_ORGANIZATION!,
      "OpenAI-Project": process.env.OPEN_AI_PROJECT!,
    },
    body: data,
  }

  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    config
  )

  const json = (await response.json()) as {
    choices: [{ message: { content: string } }]
  }

  return json.choices.map(({ message }) => message.content).join("")
}

const translate = async (params: {
  to: string
  from: string
  text: string
}) => {
  return openaiTranslate(params)
}

const translateArticle = async (params: { article: any; lang: string }) => {
  const article = params.article as PageEntity
  const date = new Date()

  const translated = {
    ...article,
    id: v4(),
    published_at: date,
    updated_at: date,
    meta: {
      ...article.meta,
      title: await translate({
        text: article.meta.title,
        to: params.lang,
        from: article.lang,
      }),
      description: await translate({
        text: article.meta.description,
        to: params.lang,
        from: article.lang,
      }),
    },
    lang: params.lang.toLowerCase(),
    content: await Promise.all(
      article.content.map(async (content) => {
        if (content.type === "marketing/hero") {
          return {
            ...content,
            title: {
              ...content.title,
              value: await translate({
                text: content.title.value,
                to: params.lang,
                from: article.lang,
              }),
            },
            label: {
              ...content.label,
              value: await translate({
                text: content.label?.value || "",
                to: params.lang,
                from: article.lang,
              }),
            },
            description: await translate({
              text: content.description,
              to: params.lang,
              from: article.lang,
            }),
          }
        }

        if (content.type === "marketing/buttons") {
          return {
            ...content,
            buttons: await Promise.all(
              (content.buttons || []).map(async (button) => ({
                ...button,
                label: await translate({
                  text: button.label,
                  to: params.lang,
                  from: article.lang,
                }),
              }))
            ),
          }
        }

        if (content.type === "marketing/simple-features") {
          return {
            ...content,
            title: {
              ...content.title,
              value: await translate({
                text: content.title.value,
                to: params.lang,
                from: article.lang,
              }),
            },
            label: {
              ...content.label,
              value: await translate({
                text: content.label.value,
                to: params.lang,
                from: article.lang,
              }),
            },
            description: await translate({
              text: content.description,
              to: params.lang,
              from: article.lang,
            }),
            features: await Promise.all(
              (content.features || []).map(async (feature) => ({
                ...feature,
                name: await translate({
                  text: feature.name,
                  to: params.lang,
                  from: article.lang,
                }),
                description: await translate({
                  text: feature.description,
                  to: params.lang,
                  from: article.lang,
                }),
              }))
            ),
          }
        }

        if (content.type === "marketing/announcement-badge") {
          return {
            ...content,
            announcement_badge_label: await translate({
              text: content.announcement_badge_label,
              to: params.lang,
              from: article.lang,
            }),
          }
        }

        if (content.type === "marketing/video") {
          return {
            ...content,
            alt: await translate({
              text: content.alt,
              to: params.lang,
              from: article.lang,
            }),
          }
        }

        if (content.type === "marketing/title") {
          return {
            ...content,
            title: {
              ...content.title,
              value: await translate({
                text: content.title.value,
                to: params.lang,
                from: article.lang,
              }),
            },
          }
        }

        if (content.type === "marketing/text") {
          return {
            ...content,
            value: await translate({
              text: content.value,
              to: params.lang,
              from: article.lang,
            }),
          }
        }

        if (content.type === "marketing/features") {
          return {
            ...content,
            label: {
              ...content.label,
              value: await translate({
                text: content.label.value,
                to: params.lang,
                from: article.lang,
              }),
            },
            title: {
              ...content.title,
              value: await translate({
                text: content.title.value,
                to: params.lang,
                from: article.lang,
              }),
            },
            description: await translate({
              text: content.description,
              to: params.lang,
              from: article.lang,
            }),
            features: await Promise.all(
              (content.features || []).map(async (feature) => ({
                ...feature,
                title: {
                  ...feature.title,
                  value: await translate({
                    text: feature.title.value,
                    to: params.lang,
                    from: article.lang,
                  }),
                },
                description: await translate({
                  text: feature.description,
                  to: params.lang,
                  from: article.lang,
                }),
                video: {
                  ...feature.video,
                  alt: await translate({
                    text: feature.video.alt || "",
                    to: params.lang,
                    from: article.lang,
                  }),
                },
              }))
            ),
          }
        }

        if (content.type === "article/toc") {
          return {
            ...content,
            title: {
              ...content.title,
              value: await translate({
                text: content.title.value,
                to: params.lang,
                from: article.lang,
              }),
            },
          }
        }

        if (content.type === "marketing/faq") {
          return {
            ...content,
            title: {
              ...content.title,
              value: await translate({
                text: content.title.value,
                to: params.lang,
                from: article.lang,
              }),
            },
            items: await Promise.all(
              (content.items || []).map(async (item) => ({
                ...item,
                question: await translate({
                  text: item.question,
                  to: params.lang,
                  from: article.lang,
                }),
                answer: await translate({
                  text: item.answer,
                  to: params.lang,
                  from: article.lang,
                }),
              }))
            ),
          }
        }

        if (content.type === "article/title") {
          return {
            ...content,
            value: await translate({
              text: content.value,
              to: params.lang,
              from: article.lang,
            }),
            faq: content.faq,
          }
        }

        if (content.type === "article/rich_text") {
          return {
            ...content,
            content: await translate({
              text: content.content,
              to: params.lang,
              from: article.lang,
            }),
          }
        }

        return content
      })
    ),
  }

  await delay(1000)

  return translated
}

const translateNews = async (params: { article: any; lang: string }) => {
  const article = params.article
  const date = new Date()

  const translated = {
    ...article,
    id: v4(),
    published_at: date,
    updated_at: date,
    lang: params.lang.toLowerCase(),
    title: await translate({
      text: params.article.title,
      to: params.lang,
      from: article.lang,
    }),
    description: await translate({
      text: params.article.description,
      to: params.lang,
      from: article.lang,
    }),
    content: await Promise.all(
      article.content.map(async (content) => {
        if (content.type === "article/rich_text") {
          return {
            ...content,
            content: await translate({
              text: content.content,
              to: params.lang,
              from: article.lang,
            }),
          }
        }

        if (content.type === "article/title") {
          return {
            ...content,
            value: await translate({
              text: content.value,
              to: params.lang,
              from: article.lang,
            }),
          }
        }

        return content
      })
    ),
  }

  await delay(1000)

  return translated
}

const page = async (params: { target: string; file: string }) => {
  const article: any = JSON.parse(
    fs.readFileSync(path.resolve("cms/pages", params.file), "utf-8")
  )

  const translated = await translateArticle({
    article,
    lang: params.target,
  })

  const articleTranslated: any = {
    ...translated,
  }

  const filename = `${params.target.toLowerCase()}-${articleTranslated.url
    .split("/")
    .join("-")}`

  fs.writeFileSync(
    path.resolve("cms/pages", filename + ".json"),
    JSON.stringify(articleTranslated)
  )
}

const news = async (params: { target: string; file: string }) => {
  const article: any = JSON.parse(
    fs.readFileSync(path.resolve("cms/news", params.file), "utf-8")
  )

  const translated = await translateNews({
    article,
    lang: params.target,
  })

  const articleTranslated: any = {
    ...translated,
  }

  const filename = `${params.target.toLowerCase()}-${articleTranslated.campaign
    .split("/")
    .join("-")}`

  fs.writeFileSync(
    path.resolve("cms/news", filename + ".json"),
    JSON.stringify(articleTranslated)
  )
}

async function run() {
  for (const language of languagesAvailable.filter((lang) => lang !== "en")) {
    console.info(language)

    await page({
      target: language,
      file: "en-keywords.json",
    })
  }
}

run()
