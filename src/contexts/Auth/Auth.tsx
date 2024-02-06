import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { useNavigate } from 'react-router-dom'

import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem
} from '@/utils/storage/local'

import { ROUTE_WELCOME } from '@/routes/Pages/Pages.paths'

import { decryptToPayload } from '@/utils/crypt'

import { post } from '@/services/api/bilgitech-api/bilgitech-api'
import { useLoaderContext } from '../Loader'

interface Auth {
  expiresIn: number
  token: string
}

interface UserAuth {
  auth: Auth
  user_uuid: string
  first_name: string
  last_name: string
  email: string
  cpf: string
  roles: string[]
}

interface UserCredentials {
  username: string
  password: string
}

interface AuthContextData {
  loaded: boolean
  user: UserAuth | null
  signIn: (credentials: UserCredentials) => Promise<boolean | undefined>
  signOut: () => void
}

const Context = createContext<AuthContextData>({} as AuthContextData)

interface Props {
  children: ReactNode
}

function AuthContext({ children }: Props) {
  const navigate = useNavigate()

  const { showLoader, hideLoader } = useLoaderContext()

  const [loaded, setLoaded] = useState(false)
  const [user, setUser] = useState<UserAuth | null>(null)

  useEffect(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    const storagedUser = getLocalStorageItem('Bilgi@tech:user')

    storagedUser && setUser(storagedUser)
  }, [])

  const signIn = useCallback(
    async (credentials: UserCredentials): Promise<boolean | undefined> => {
      try {
        showLoader()

        setUser(null)

        removeLocalStorageItem('Bilgi@tech:user')

        const {
          data: { data }
        } = await post('/auth/login', credentials)

        if (data) {
          const roles: string[] =
            data.user.roles.length > 0
              ? data.user.roles.map((r: string) => {
                  return decryptToPayload(r)
                })
              : []

          const user: UserAuth = {
            auth: {
              expiresIn: data.accessToken.expiresIn,
              token: data.accessToken.token
            },
            user_uuid: decryptToPayload(data.user.user_uuid),
            first_name: decryptToPayload(data.user.first_name),
            last_name: decryptToPayload(data.user.last_name),
            email: decryptToPayload(data.user.email),
            cpf: decryptToPayload(data.user.cpf),
            roles
          }

          setUser(user)
          setLocalStorageItem('Bilgi@tech:user', user)

          return true
        }

        return false
      } catch {
        return undefined
      } finally {
        hideLoader()
      }
    },
    [showLoader, hideLoader]
  )
  const signOut = useCallback(() => {
    setUser(null)
    removeLocalStorageItem('Bilgi@tech:user')

    navigate(ROUTE_WELCOME)
  }, [navigate])

  const providerValue = useMemo(
    () => ({
      loaded,
      user,
      signIn,
      signOut
    }),
    [loaded, user, signIn, signOut]
  )

  return <Context.Provider value={providerValue}>{children}</Context.Provider>
}

function useAuthContext(): AuthContextData {
  return useContext(Context)
}

export { AuthContext, useAuthContext }
