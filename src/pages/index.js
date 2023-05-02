import React from "react"
import "./../style.css"

// Components
import { AppContextProvider } from "../components/AppContext"
import PromptsDesktop from "../components/PromptsDesktop"
import PromptsMobile from "../components/PromptsMobile"
import Dialog from "../components/Dialog"

const IndexPage = () => {
  // const handleMobilePrompts = () => {
  //   console.log("handleMobilePrompts")
  // }

  return (
    <AppContextProvider>
      <div id="app">
        {/* logo && chat GPT internal demo */}
        <PromptsMobile />
        <PromptsDesktop />
        <Dialog />
      </div>
    </AppContextProvider>
  )
}

export default IndexPage
