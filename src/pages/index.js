import React, { useState, useRef, useCallback, useMemo } from "react"
import { graphql } from "gatsby"
import "./../style.css"

// Components
import { AppContextProvider } from "../components/AppContext"
import Layout from "../components/Layout"
import PromptsDesktop from "../components/PromptsDesktop"
// import PromptsMobile from "../components/PromptsMobile"
import Dialog from "../components/Dialog"

// Utils
// import generateBotMessageId from "../utils/generateBotMessageId"

const IndexPage = ({ data }) => {
  // getting the prompts from the json file
  const { allDataJson } = data
  const { nodes } = allDataJson
  const { prompts } = nodes[0]

  // const initialOpenState = useMemo(
  //   () =>
  //     prompts.map((prompt, index) => {
  //       const subArr = prompt.sub ? Array(prompt.sub.length).fill(false) : []
  //       return [index === 0, subArr]
  //     }),

  //   [prompts]
  // )

  // const [isCollapseOpen, setIsCollapseOpen] = useState(initialOpenState)

  // const textareaRef = useRef(null)

  // const handleToggle = (promptIndex, subPromptIndex = null) => {
  //   const updatedStates = [...isCollapseOpen]
  //   const [isPromptOpen, subPromptStates] = updatedStates[promptIndex]
  //   if (subPromptIndex === null) {
  //     updatedStates[promptIndex] = [!isPromptOpen, subPromptStates]
  //   } else {
  //     subPromptStates[subPromptIndex] = !subPromptStates[subPromptIndex]
  //     updatedStates[promptIndex] = [isPromptOpen, subPromptStates]
  //   }
  //   setIsCollapseOpen(updatedStates)
  // }

  // handle prompt select
  // const handlePromptSelect = useCallback(question => {
  //   const textarea = textareaRef.current
  //   // handleFormReset()
  //   textarea.value = question
  //   textarea.focus()
  //   // setInputValue(question)

  //   // Move cursor to the end of the textarea content
  //   const length = textarea.value.length
  //   textarea.selectionStart = length
  //   textarea.selectionEnd = length
  // }, [])

  // const handleMobilePrompts = () => {
  //   console.log("handleMobilePrompts")
  // }

  return (
    <AppContextProvider>
      <Layout>
        <div id="app">
          {/* logo && chat GPT internal demo */}
          {/* <PromptsMobile
        prompts={prompts}
        handleSelect={handlePromptSelect}
        handleToggle={handleToggle}
        isCollapseOpen={isCollapseOpen}
      /> */}
          <PromptsDesktop
            prompts={prompts}
            // handleSelect={handlePromptSelect}
            // handleToggle={handleToggle}
            // isCollapseOpen={isCollapseOpen}
          />
          <Dialog />
        </div>
      </Layout>
    </AppContextProvider>
  )
}

export default IndexPage

export const query = graphql`
  query MyQuery {
    allDataJson {
      nodes {
        prompts {
          heading
          questions {
            heading
            question
          }
          sub {
            heading
            questions {
              heading
              question
            }
          }
        }
      }
    }
  }
`
