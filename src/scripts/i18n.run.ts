import { languagesAvailable } from "@/constants/langs"
import restore from "@/i18n/.keep/restore.en.json"
import en from "@/i18n/messages/en.json"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import dotenv from "dotenv"
import { promises as fs } from "fs"
import path from "path"

dotenv.config()

const translate = async (params: {
  text: string
  to: string
  from: string
}) => {
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    system: `You are a translator for Tinycardo, a language-learning flashcard app (web and mobile). I'll give you interface copy that you must translate into the target language I provide.

        For example, if I give you from: fr, to: en, you translate from French to English.

        Use a clear, friendly and motivating tone suitable for learners, while still sounding clean and professional. Keep terminology consistent across translations (e.g. how you refer to flashcards, decks, lessons, practice, etc.).

        If you translate into Korean, please only write in Korean and do not include any English words.

        Do not translate product names and brands like: Tinycardo.

        Give me only the translation, optimized for a modern consumer-facing language-learning app interface.`,

    prompt: `from:${params.from}, to:${params.to}
        
        ${params.text}`,
  })

  return text
}

async function storeFile(json: Record<string, string>, lang: string) {
  const dir = path.resolve("src/i18n/messages/", `${lang}.json`)
  await fs.writeFile(dir, JSON.stringify(json), "utf-8")
}

async function compareNewKeys() {
  const keysThatHaveBeenCreated = Object.keys(en).filter(
    (key) => !(key in restore)
  )

  const keysThatHaveBeenDeleted = Object.keys(restore).filter(
    (key) => !(key in en)
  )

  const keysThatHaveBeenModified = Object.keys(en).filter((key) => {
    const valueInEnglish = en[key as keyof typeof en]
    const valueInRestored = restore[key as keyof typeof restore]

    if (valueInEnglish && valueInRestored) {
      return valueInEnglish !== valueInRestored
    }

    return false
  })

  return {
    created: keysThatHaveBeenCreated.map((key) => ({
      key,
      value: en[key as keyof typeof en],
      lang: "en",
    })),
    modified: keysThatHaveBeenModified.map((key) => ({
      key,
      value: en[key as keyof typeof en],
      lang: "en",
    })),
    deleted: keysThatHaveBeenDeleted,
  }
}

async function loadFile(lang: string) {
  return JSON.parse(
    await fs.readFile(`src/i18n/messages/${lang}.json`, "utf-8")
  ) as Record<string, string>
}

async function removeRemovedKeys(removedKeys: string[], lang: string) {
  console.info(`Removing keys: ${removedKeys.join(", ")} from ${lang}`)

  const file = await loadFile(lang)

  const keysFromFile = Object.keys(file)
  const newFile: Record<string, string> = {}

  keysFromFile.forEach((key) => {
    if (!removedKeys.includes(key)) {
      newFile[key] = file[key]
    }
  })

  await storeFile(newFile, lang)
}

async function addCreatedKeys(
  createdKeys: Array<{ key: string; value: string; lang: string }>,
  lang: string
) {
  console.info(
    `Adding keys: ${createdKeys.map((k) => k.key).join(", ")} to ${lang}`
  )
  const imported = await loadFile(lang)

  const file = { ...imported }

  for (const key of createdKeys) {
    file[`${key.key}`] = await translate({
      text: key.value,
      to: lang,
      from: key.lang,
    })
  }

  await storeFile(file, lang)
}

async function updateModifiedKeys(
  modifiedKeys: Array<{ key: string; value: string; lang: string }>,
  lang: string
) {
  console.info(
    `Updating keys: ${modifiedKeys.map((k) => k.key).join(", ")} in ${lang}`
  )

  const imported = await loadFile(lang)

  const file = { ...imported }

  for (const key of modifiedKeys) {
    file[`${key.key}`] = await translate({
      text: key.value,
      to: lang,
      from: key.lang,
    })
  }

  await storeFile(file, lang)
}

async function storeRestoreFile() {
  const file = await loadFile("en")

  const dir = path.resolve("src/i18n/.keep/restore.en.json")
  await fs.writeFile(dir, JSON.stringify(file), "utf-8")
}

async function main() {
  const { created, deleted, modified } = await compareNewKeys()

  for (const lang of languagesAvailable.filter((lang) => lang !== "en")) {
    if (deleted.length > 0) {
      await removeRemovedKeys(deleted, lang)
    } else {
      console.info(`No keys to remove`)
    }

    if (created.length > 0) {
      await addCreatedKeys(created, lang)
    } else {
      console.info(`No keys to add`)
    }

    if (modified.length > 0) {
      await updateModifiedKeys(modified, lang)
    } else {
      console.info(`No keys to update`)
    }
  }

  await storeRestoreFile()
}

async function getAllKeys() {
  const en = await loadFile("en")

  return Object.keys(en).map((key) => ({
    key,
    value: en[key as keyof typeof en],
    lang: "en",
  }))
}

async function addNewLanguage(lang: string) {
  const allKeys = await getAllKeys()

  await addCreatedKeys(allKeys, lang)
}

main()
