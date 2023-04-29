import React from "react"
import { AppContextProvider } from "./AppContext"
import { AppContext } from "./AppContext"

const Layout = ({ children }) => {
  return (
    <AppContextProvider>
      <div className="layout">{children}</div>
    </AppContextProvider>
  )
}

export default Layout
