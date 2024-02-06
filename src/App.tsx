import { BrowserRouter } from 'react-router-dom'
import { Providers } from './providers'

export function App() {
  return (
    <BrowserRouter>
      <Providers>
        <div>Hello</div>
      </Providers>
    </BrowserRouter>
  )
}
