import { lazy } from 'react'

import { IRouteProps } from '../routes.interface'

import { ROUTE_WELCOME } from './Pages.paths'

const Welcome = lazy(() =>
  import('@/pages/Welcome').then(module => ({
    default: module.Welcome
  }))
)

const mainRoutes: IRouteProps[] = [
  {
    path: ROUTE_WELCOME,
    component: Welcome,
    isPrivate: false
  }
]

export const routes: IRouteProps[] = mainRoutes.concat()
