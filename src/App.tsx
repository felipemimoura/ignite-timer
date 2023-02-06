import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { Router } from './Router'

import { GlobaStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobaStyle />
    </ThemeProvider>
  )
}
