import ErrorPage from '../error-page'

export const metadata = {
  title: 'Error 401',
}

export default function Error401() {
  return (
    <ErrorPage
      code="401"
      title={`Unauthorized Error`}
      content={`Oopsie! You are not authorized to access this resource.`}
    />
  )
}
