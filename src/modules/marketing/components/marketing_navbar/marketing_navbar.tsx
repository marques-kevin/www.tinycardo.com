import { GlobalLogo } from "@/modules/global/components/global_logo/global_logo"

export const MarketingNavbar = (props: {
  tabs: Array<{
    label: string
    link: string
  }>
  right_tabs: Array<{
    label: string
    link: string
  }>
}) => {
  return (
    <div className="p-4 absolute inset-x-0 top-0 z-50">
      <nav className="">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2">
            <GlobalLogo className="w-12" />
            <span
              className="hidden text-lg font-semibold tracking-wider lg:inline"
              style={{
                textDecoration: "underline",
                textDecorationThickness: "2px",
                textUnderlineOffset: "2px",
              }}
            >
              Tinycardo
            </span>
          </a>

          <div>
            {props.tabs.map((tab) => (
              <a className="btn btn-ghost" key={tab.label} href={tab.link}>
                {tab.label}
              </a>
            ))}
          </div>

          <div>
            {props.right_tabs.map((tab) => (
              <a
                className="btn btn-lg btn-primary"
                key={tab.label}
                href={tab.link}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}
