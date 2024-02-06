import { BrowserRouter } from 'react-router-dom'
import { Providers } from './providers'
import { Styles } from './styles'
import { Contexts } from './contexts'
import { Routing } from './routes/Routing'

export function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Contexts>
          <Routing />

          <Styles />
        </Contexts>
      </Providers>
    </BrowserRouter>
  )
}
