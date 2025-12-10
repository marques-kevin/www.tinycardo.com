import { languagesAvailable } from "../constants/langs"

type Collection = {
  name: string
  summary?: string
  label: string
  sortable_fields?: string[]
  view_groups?: { label: string; field: string }[]
  view_filter?: { label: string; field: string; pattern: string | boolean }[]
  folder?: string
  create?: boolean
  slug?: string
  format?: string
  editor?: any
  fields?: Array<any>
  files?: Array<any>
}

const SelectElement = (props: {
  label: string
  name: string
  options: string[]
  defaultValue: string
}) => ({
  widget: "select",
  ...props,
  default: props.defaultValue,
})

const StringElement = (props: {
  label: string
  name: string
  defaultValue?: string
  hint?: string
  required?: boolean
}) => ({
  ...props,
  widget: "string",
  ...(props.hint ? { hint: props.hint } : {}),
  ...(props.required ? { required: props.required } : {}),
  ...(props.defaultValue ? { default: props.defaultValue } : {}),
})

const NumberElement = ({
  label,
  name,
  defaultValue,
  valueType = "int",
  min = 0,
  max,
}) => ({
  label,
  name,
  widget: "number",
  default: defaultValue,
  value_type: valueType,
  max,
  min,
})

const UrlElement = (props: { optional?: boolean }) => ({
  label: "url",
  name: "url",
  widget: "string",
  hint: "The url must not begin with a slash /",
  required: props.optional ? false : true,
})

const UrlExternalElement = () => ({
  label: "url",
  name: "url",
  widget: "string",
  pattern: [
    "(^/)|(^https?.+)",
    "The url has to begin with a slash / for internal links, and http(s) for external links",
  ],
  hint: "The url has to begin with a slash / for internal links, and http(s) for external links",
})

const MarkdownElement = ({
  label,
  name,
  minimal = true,
  defaultValue = `Welcome to the edition mode!`,
  buttons = [
    "bold",
    "italic",
    "code",
    "link",
    "bulleted-list",
    "numbered-list",
  ],
}) => ({
  label,
  name,
  widget: "markdown",
  editor_components: [],
  modes: ["rich_text"],
  buttons,
  minimal,
  default: defaultValue,
})

const TagElement = ({
  label,
  name,
  fields = [],
  options = ["h1", "h2", "h3", "h4", "h5", "h6", "p"],
  defaultValue = "p",
}: {
  label: string
  name: string
  fields?: Array<any>
  options?: Array<string>
  defaultValue?: string
}) => ({
  label: label,
  name: name,
  widget: "object",

  summary: "{{fields.value}}",
  fields: [
    {
      label: "value",
      name: "value",
      widget: "string",
      default: "default text",
    },
    {
      label: "component",
      name: "component",
      widget: "select",
      hint: "HTML tag that will be used",
      options,
      default: defaultValue,
    },
    ...fields,
  ],
})

const ImageElement = (props: {
  label: string
  name: string
  hint?: string
  fields?: any[]
  required?: boolean
}) => ({
  ...props,
  widget: "object",
  summary: "{{fields.src}}",
  fields: [
    {
      label: "src",
      name: "src",
      widget: "image",
      choose_url: false,
      ...(props.hint ? { hint: props.hint } : {}),
      ...(props.required ? { required: props.required } : {}),
      media_library: {
        config: {
          max_file_size: 512000,
        },
      },
    },
    {
      label: "alt",
      name: "alt",
      widget: "string",
      default: "default alt",
    },
    ...(props.fields || []),
  ],
})

const RelElement = () => ({
  label: "Rel",
  name: "rel",
  widget: "select",
  options: ["follow", "no-follow", "obfuscated"],
  default: "follow",
})

const TargetElement = () => ({
  label: "Target",
  name: "target",
  widget: "select",
  options: ["self", "blank"],
  default: "self",
})

const FaqElement = ({ label, name }) => ({
  label,
  name,
  widget: "list",
  fields: [
    {
      label: "question",
      name: "question",
      widget: "string",
      default: "The question",
    },
    {
      label: "answer",
      name: "answer",
      widget: "markdown",
      default: "The answer",
    },
    {
      label: "component",
      name: "component",
      widget: "select",
      hint: "html tag that will be used for the question element",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p"],
      default: "p",
    },
  ],
})

const MetaElement = ({ fields = [] }) => ({
  label: "meta",
  name: "meta",
  widget: "object",
  fields: [
    {
      label: "title",
      name: "title",
      widget: "string",
    },
    {
      label: "description",
      name: "description",
      widget: "string",
    },
    {
      label: "indexable",
      name: "indexable",
      widget: "boolean",
      default: true,
    },
    ...(fields || []),
  ],
})

const LinkElement = ({
  label,
  name,
  fields = [],
}: {
  label?: string
  name?: string
  fields: any[]
}) => ({
  label,
  name,
  widget: "object",
  summary: "{{fields.label}}",

  fields: [
    {
      label: "Label",
      name: "label",
      widget: "string",
      default: "default text",
    },
    UrlExternalElement(),
    RelElement(),
    TargetElement(),
    ...fields,
  ],
})

const PublicationDateElements = () => [
  {
    label: "Published At",
    name: "published_at",
    widget: "datetime",
    date_format: "YYYY-MM-DD",
    time_format: "HH:mm",
    picker_utc: false,
  },
  {
    label: "Updated At",
    name: "updated_at",
    widget: "datetime",
    date_format: "YYYY-MM-DD",
    time_format: "HH:mm",
    picker_utc: false,
  },
]

const IdElement = () => ({
  label: "id",
  name: "id",
  widget: "uuid",
  hint: "This unique id was generated automacally, you cannot modify it",
})

const VersionElement = () => ({
  label: "version",
  name: "version",
  widget: "select",
  options: ["v1", "v2"],
})

const BooleanElement = ({ label, name }) => ({
  label,
  name,
  widget: "boolean",
  default: false,
})

const TypeElement = ({ value }) => ({
  label: "type",
  name: "type",
  widget: "hidden",
  default: value,
})

const LangElement = () => ({
  label: "lang",
  name: "lang",
  widget: "select",
  options: languagesAvailable,
})

const MarketingProductOfTheDay = {
  label: "💅 Product of the day",
  name: "marketing/product-of-the-day",
  widget: "object",
  summary: "{{fields.title.value}}",
  fields: [IdElement()],
}

const MarketingSitemaps = {
  label: "💅 Sitemaps",
  name: "marketing/sitemaps",
  widget: "object",
  fields: [IdElement()],
}

const MarketingHero = {
  label: "💅 Hero",
  name: "marketing/hero",
  widget: "object",
  summary: "{{fields.title.value}}",
  fields: [
    TagElement({ label: "Label", name: "label" }),
    TagElement({ label: "Title", name: "title" }),
    MarkdownElement({
      label: "Description",
      name: "description",
      buttons: ["bold", "italic", "link"],
      defaultValue:
        "We’re different. Flex is the only saas business platform that lets you run your business on one platform, seamlessly across all digital channels.",
    }),
  ],
}

const MarketingTitle = {
  label: "💅 Title",
  name: "marketing/title",
  widget: "object",
  summary: "{{fields.title.value}}",
  fields: [TagElement({ label: "Title", name: "title" })],
}

const MarketingText = {
  label: "💅 Text",
  name: "marketing/text",
  widget: "object",
  summary: "{{fields.title.value}}",
  fields: [MarkdownElement({ label: "value", name: "value" })],
}

const MarketingAuthor = {
  label: "💅 Author",
  name: "marketing/author",
  widget: "object",
  summary: "{{fields.title.value}}",
  fields: [
    ImageElement({ label: "illustration", name: "illustration" }),
    StringElement({ name: "name", label: "name" }),
  ],
}

const VideoElements = () => [
  BooleanElement({ label: "autoplay", name: "autoplay" }),
  {
    label: "src",
    name: "src",
    widget: "file",
    choose_url: false,
    required: false,
  },
  {
    label: "illustration",
    name: "illustration",
    widget: "image",
    choose_url: false,
    media_library: {
      config: {
        max_file_size: 512000,
      },
    },
    required: false,
  },
  {
    label: "alt",
    name: "alt",
    widget: "string",
    default: "default alt",
    required: false,
  },
]

const MarketingSimpleFeatures = {
  label: "💅 Simple Features",
  name: "marketing/simple-features",
  widget: "object",
  fields: [
    TagElement({ label: "label", name: "label" }),
    TagElement({ label: "title", name: "title" }),
    MarkdownElement({ label: "description", name: "description" }),
    {
      label: "features",
      name: "features",
      widget: "list",
      create: true,
      fields: [
        StringElement({ label: "name", name: "name" }),
        MarkdownElement({ label: "description", name: "description" }),
      ],
    },
  ],
}

const MarketingUsersAndStars = {
  label: "💅 Users and Stars",
  name: "marketing/users-and-stars",
  widget: "object",
  fields: [IdElement()],
}

const MarketingButtons = {
  label: "💅 Buttons",
  name: "marketing/buttons",
  fields: [
    {
      label: "buttons",
      name: "buttons",
      widget: "list",
      create: true,
      fields: [
        {
          label: "type",
          name: "type",
          widget: "select",
          options: ["authentication", "other"],
          default: "other",
        },
        StringElement({ label: "label", name: "label" }),
        UrlElement({ optional: true }),
        {
          label: "size",
          name: "size",
          widget: "select",
          options: ["sm", "md", "lg"],
          default: "md",
        },
        {
          label: "variant",
          name: "variant",
          widget: "select",
          options: ["primary", "secondary", "tertiary"],
          default: "primary",
        },
      ],
    },
  ],
}

const MarketingVideo = {
  label: "💅 Video",
  name: "marketing/video",
  fields: [...VideoElements()],
}

const MarketingPricing = {
  label: "💅 Pricing",
  name: "marketing/pricing",
  fields: [
    BooleanElement({ label: "show", name: "show" }),
    SelectElement({
      label: "scope",
      name: "scope",
      options: ["indexation", "analytics", "search-gpt"],
      defaultValue: "indexation",
    }),
  ],
}

const MarketingFaq = {
  label: "💅 Faq",
  name: "marketing/faq",
  fields: [
    TagElement({ label: "title", name: "title" }),
    FaqElement({ label: "items", name: "items" }),
  ],
}

const MarketingTestimonials = {
  label: "💅 Testimonials",
  name: "marketing/testimonials",
  fields: [BooleanElement({ label: "show", name: "show" })],
}

const MarketingFeatures = {
  label: "💅 Features",
  name: "marketing/features",
  summary: "{{fields.title.value}}",
  fields: [
    TagElement({
      label: "label",
      name: "label",
    }),

    TagElement({
      label: "title",
      name: "title",
    }),

    StringElement({
      label: "description",
      name: "description",
    }),

    {
      label: "features",
      name: "features",
      widget: "list",
      create: true,
      fields: [
        TagElement({
          label: "title",
          name: "title",
        }),

        StringElement({
          label: "description",
          name: "description",
        }),
        {
          label: "video",
          name: "video",
          widget: "object",
          fields: [...VideoElements()],
        },
      ],
    },
  ],
}

const AnnouncementBadge = {
  label: "💅 Announcement Badge",
  name: "marketing/announcement-badge",
  fields: [StringElement({ label: "label", name: "announcement_badge_label" })],
}

const Pages: Collection = {
  name: "pages",
  label: "🖊 Pages",
  folder: "cms/pages",
  create: true,
  format: "json",
  editor: {
    preview: false,
  },
  slug: "{{lang}}-{{url}}",
  summary: "/{{lang}}/{{url}}",
  view_groups: [{ label: "lang", field: "lang" }],
  fields: [
    IdElement(),
    TypeElement({ value: "page" }),
    LangElement(),
    UrlElement({}),
    MetaElement({}),
    ...PublicationDateElements(),
    {
      label: "Content",
      name: "content",
      widget: "list",
      types: [
        AnnouncementBadge,
        MarketingProductOfTheDay,
        MarketingHero,
        MarketingTitle,
        MarketingText,
        MarketingAuthor,
        MarketingVideo,
        MarketingPricing,
        MarketingFeatures,
        MarketingSimpleFeatures,
        MarketingFaq,
        MarketingTestimonials,
        MarketingButtons,
        MarketingUsersAndStars,
        MarketingSitemaps,
      ],
    },
  ],
}

const ArticleContentRichText = {
  label: "📝 Text",
  name: "article/rich_text",
  widget: "object",
  summary: "{{fields.content}}",
  fields: [
    MarkdownElement({
      label: "content",
      name: "content",
    }),
  ],
}

const ArticleContentTitle = TagElement({
  label: "📝 Title",
  name: "article/title",
  defaultValue: "h1",
  options: ["h1", "h2", "h3", "h4", "h5", "h6"],
})

const ArticleContentImage = ImageElement({
  label: "📝 Image",
  name: "article/image",
  fields: [
    StringElement({
      label: "legend",
      name: "legend",
      required: false,
      defaultValue: "",
      hint: "The image legend",
    }),
  ],
})

const ArticleContentVideo = {
  label: "💅 Video",
  name: "article/video",
  fields: [...VideoElements()],
}

const News: Collection = {
  name: "news",
  label: "🖊 news",
  folder: "cms/news",
  create: true,
  format: "json",
  editor: {
    preview: false,
  },
  slug: "{{lang}}-{{campaign}}",
  summary: "/{{lang}}/{{campaign}}",
  view_groups: [{ label: "lang", field: "lang" }],
  fields: [
    IdElement(),
    TypeElement({ value: "news" }),
    LangElement(),
    StringElement({
      label: "campaign",
      name: "campaign",
    }),
    ...PublicationDateElements(),
    StringElement({
      label: "Title",
      name: "title",
    }),
    StringElement({
      label: "Description",
      name: "description",
    }),
    {
      label: "Content",
      name: "content",
      widget: "list",
      types: [
        ArticleContentTitle,
        ArticleContentImage,
        ArticleContentRichText,
        ArticleContentVideo,
      ],
    },
  ],
}

export const config = {
  backend: {
    name: "git-gateway",
    branch: "main",
    commit_messages: {
      create: "Create {{collection}} “{{slug}}”",
      update: "Update {{collection}} “{{slug}}”",
      delete: "Delete {{collection}} “{{slug}}”",
      uploadMedia: "[skip ci] Upload “{{path}}”",
      deleteMedia: "[skip ci] Delete “{{path}}”",
    },
  },
  show_preview_links: false,
  slug: {
    encoding: "ascii",
    clean_accents: true,
    sanitize_replacement: "_",
  },
  search: false,
  publish_mode: "editorial_workflow",
  local_backend: true,
  media_folder: "cms/assets",
  public_folder: "../assets",
  collections: [Pages, News],
}
