import * as Sentry from '@sentry/react'

const logError = (err: any) => {
  console.error(err)
  Sentry.captureException(err)
}

export { logError }
