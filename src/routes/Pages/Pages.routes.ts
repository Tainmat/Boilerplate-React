import { lazy } from 'react'

import { IRouteProps } from '../routes.interface'

import { ROUTE_HOME } from './Pages.paths'

const Home = lazy(() =>
  import('@/pages/Home').then(module => ({
    default: module.Home
  }))
)

const mainRoutes: IRouteProps[] = [
  {
    path: ROUTE_HOME,
    component: Home,
    isPrivate: true
  },
  {
    path: '/',
    component: Home,
    isPrivate: true
  }
]

export const routes: IRouteProps[] = mainRoutes.concat()
