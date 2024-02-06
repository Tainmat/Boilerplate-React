import { ReactNode } from 'react'
import { LoaderContext } from './Loader'
import { AuthContext } from './Auth'
import { ToastContext } from './Toast'

interface Props {
  children: ReactNode
}

export function Contexts({ children }: Props) {
  return (
    <LoaderContext>
      <ToastContext>
        <AuthContext>{children}</AuthContext>
      </ToastContext>
    </LoaderContext>
  )
}
