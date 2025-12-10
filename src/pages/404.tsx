import { Seo } from "@/components/general/Seo/Seo"
import { useEffect, useState } from "react"

const NotFoundPage = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

  return (
    <>
      <Seo
        title="Not found"
        description={"This page is a not found page"}
        lang={"en"}
        index={false}
        langUrls={[]}
      />

      {loading && <div className="loading loading-spinner loading-lg"></div>}
      {!loading && (
        <section className="relative bg-white py-24 md:py-44 lg:flex lg:h-screen lg:py-0">
          <div className="container relative z-10 mx-auto px-4 lg:m-auto">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 mt-2  text-4xl font-bold leading-tight tracking-tighter md:text-5xl">
                Page not found
              </h2>
              <p className="mb-12 text-lg text-slate-500 md:text-xl">
                I wonder why you came here ? We are sorry if the website is
                broken.
              </p>
              <div className="flex flex-wrap justify-center">
                <a href="/">
                  <button className="btn btn-primary">
                    Go to the home page
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

// eslint-disable-next-line no-restricted-exports
export default NotFoundPage
