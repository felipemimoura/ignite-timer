import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CycleContextProvider } from './contexts/CyclesContext'

import { Router } from './Router'

import { GlobaStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </BrowserRouter>
      <GlobaStyle />
    </ThemeProvider>
  )
}
