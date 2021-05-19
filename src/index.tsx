import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Router from './Router'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import * as Sentry from '@sentry/react'
import mixpanel from 'mixpanel-browser'
import { Integrations } from '@sentry/tracing'

Sentry.init({
  dsn: 'https://c88f2f4ac8a1437ca9d39d6c082dbc6d@o686068.ingest.sentry.io/5772723',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
})

mixpanel.init('5f3dee850e508c576154823ea51afadd', { api_host: 'https://api-eu.mixpanel.com' }, '')

// @ts-ignore
function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 8000
  return library
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
