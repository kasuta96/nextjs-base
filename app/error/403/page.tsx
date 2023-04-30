import ErrorPage from '../errorPage'

export const metadata = {
  title: 'Error 403',
}

export default function Error403() {
  return (
    <ErrorPage
      code="403"
      title={`Oh no! Your account might have been locked or hasn't been given the green light.`}
      content={`Don't worry, just reach out to the Admin and they'll get you sorted out in no time! Keep on smiling :)`}
    />
  )
}
