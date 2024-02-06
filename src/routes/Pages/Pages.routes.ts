import { lazy } from 'react'

import { IRouteProps } from '../routes.interface'

import { ROUTE_HOME, ROUTE_WELCOME } from './Pages.paths'

const Welcome = lazy(() =>
  import('@/pages/Welcome').then(module => ({
    default: module.Welcome
  }))
)

const Home = lazy(() =>
  import('@/pages/Home').then(module => ({
    default: module.Home
  }))
)

const mainRoutes: IRouteProps[] = [
  {
    path: ROUTE_WELCOME,
    component: Welcome,
    isPrivate: false
  },
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
