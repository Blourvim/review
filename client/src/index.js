import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { Auth0Provider } from "@auth0/auth0-react";
// STYLE
import './index.css'

ReactDom.render(
  <React.StrictMode>
      <Auth0Provider
    domain="dev-w-xp6bpi.us.auth0.com"
    clientId="UZQ63NRbdq35npn85CpYnMQitlLtUTkZ"
    redirectUri={window.location.origin}
    audience="https://dev-w-xp6bpi.us.auth0.com/api/v2/"
    scope="read:achivements write:achivements"
  >
    <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
