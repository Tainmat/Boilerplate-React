import DesignSystem from './design-system'
import GlobalStyle from './global'
import Bootstrap from './libs/bootstrap'
import MaterialIcons from './libs/material-icons'
import ReactMultiCarousel from './libs/react-multi-carousel'
import ReactTooltip from './libs/react-tooltip'

export function Styles() {
  return (
    <>
      <GlobalStyle />
      <DesignSystem />
      <Bootstrap />
      <MaterialIcons />
      <ReactMultiCarousel />
      <ReactTooltip />
    </>
  )
}
