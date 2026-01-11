import React, { Suspense } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { FirebaseAppContextProvider } from '../contexts/firebase/FirebaseAppContextProvider'

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      )

const ReactQueryDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() =>
        import('@tanstack/react-query-devtools').then((res) => ({
          default: res.ReactQueryDevtools,
        })),
      )

export const Route = createRootRoute({
  component: () => (
    <>
      <FirebaseAppContextProvider>
        <Outlet />
      </FirebaseAppContextProvider>
    </>
  ),
})