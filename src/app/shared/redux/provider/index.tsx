"use client"
import React, { useEffect, useState } from "react"
import { Provider } from "react-redux"
import { AppReduxStore, persistor } from "../store"
import { PersistGate } from "redux-persist/integration/react"

interface ReduxProviderProps {
  children: React.ReactNode
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Provider store={AppReduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider
