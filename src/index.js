import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
import 'babel-polyfill'

const rootElement = document.getElementById('app')

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
)