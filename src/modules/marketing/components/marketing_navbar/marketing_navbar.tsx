import { ITranslations } from "@/interfaces/ITranslations"
import { GlobalLogo } from "@/modules/global/components/global_logo/global_logo"
import { useIntl } from "react-intl"

const tabs: Array<{
  name: ITranslations["keys"]
  href: string
}> = []

export const MarketingNavbar = () => {
  const { formatMessage } = useIntl()

  return (
    <div className="md:mt-2 md:px-4 absolute inset-x-0 top-0 z-50">
      <nav className="bg-accent text-accent-content md:border-accent-content/20 md:rounded-box border-b-accent-content/20 w-full border-2 border-transparent py-2 pl-4 md:px-2">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2">
            <GlobalLogo className="w-10" />
            <span
              className="hidden text-lg font-semibold tracking-wider lg:inline"
              style={{
                textDecoration: "underline",
                textDecorationThickness: "2px",
                textUnderlineOffset: "2px",
              }}
            >
              tinycardo
            </span>
          </a>

          {tabs.map((tab) => (
            <a className="btn btn-ghost" key={tab.name} href={tab.href}>
              {formatMessage({
                id: tab.name,
              })}
            </a>
          ))}

          <a href="https://app.tinycardo.com" className="btn btn-primary">
            {formatMessage({ id: "navbar/login" })}
          </a>
        </div>
      </nav>
    </div>
  )
}
