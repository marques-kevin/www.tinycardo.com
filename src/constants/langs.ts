import languages from "./languages.json"

export const languagesAvailable = languages.map(({ id }) => id)
export const languages_with_label = languages.map(({ id, label }) => ({
  id,
  label,
}))
