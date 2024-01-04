import ErrorPage from "../error-page"

export const metadata = {
  title: "Error 404",
}

export default function Error404() {
  return (
    <ErrorPage
      code="404"
      title={`Something's missing.`}
      content={`This page could not be found.`}
    />
  )
}
