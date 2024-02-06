import { useNavigate } from 'react-router-dom'

import { Container, Row, Col } from 'react-bootstrap'

import { ROUTE_HOME } from '@/routes/Pages/Pages.paths'

import { Heading } from '@/components/Core/Typography/Heading'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { Button } from '@/components/Core/Buttons/Button'

import { AnimatedPage } from '@/components/Core/AnimatedPage'

import IconNotFound from '@/assets/images/icon-not-found.png'

import { Background } from './NotFound.styles'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <AnimatedPage>
      <Container>
        <Background>
          <Row className="justify-content-center text-center">
            <Col xs={3}>
              <img
                src={IconNotFound}
                alt="Página não encontrada"
                className="mb-4"
              />

              <Heading size="md" className="mb-2">
                Wooops.
              </Heading>

              <Paragraph size="sm" className="mb-5">
                Normalmente mantemos a casa em ordem, mas não conseguimos
                encontrar o que você está procurando.
              </Paragraph>

              <Row className="justify-content-center">
                <Col xs="auto">
                  <Button styles="primary" onClick={() => navigate(ROUTE_HOME)}>
                    Home
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Background>
      </Container>
    </AnimatedPage>
  )
}
