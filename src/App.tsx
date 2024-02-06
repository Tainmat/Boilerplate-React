import { BrowserRouter } from 'react-router-dom'
import { Providers } from './providers'
import { Styles } from './styles'
import { Contexts } from './contexts'

export function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Contexts>
          <Styles />
        </Contexts>
      </Providers>
    </BrowserRouter>
  )
}
