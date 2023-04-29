import React, { createContext, useState, useRef, useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const data = useStaticQuery(graphql`
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
  `)

  // getting the prompts from the json file
  const { allDataJson } = data
  const { nodes } = allDataJson
  const { prompts } = nodes[0]

  // states
  const initialOpenState = useMemo(
    () =>
      prompts.map((prompt, index) => {
        const subArr = prompt.sub ? Array(prompt.sub.length).fill(false) : []
        return [index === 0, subArr]
      }),

    [prompts]
  )

  const [isLoading, setIsLoading] = useState(false)
  const [stripes, setStripes] = useState([])
  const [isFirstQuestion, setIsFirstQuestion] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [isCollapseOpen, setIsCollapseOpen] = useState(initialOpenState)

  // refs
  const formRef = useRef(null)
  const textareaRef = useRef(null)

  // reset the form
  const handleFormReset = () => formRef.current.reset()

  // handle prompt select
  const handleSelect = question => {
    const textarea = textareaRef.current
    handleFormReset()
    textarea.value = question
    textarea.focus()
    setInputValue(question)

    // move cursor to the end of the textarea content
    const length = textarea.value.length
    textarea.selectionStart = length
    textarea.selectionEnd = length
  }

  // handle collapse toggle
  const handleToggle = (promptIndex, subPromptIndex = null) => {
    const updatedStates = [...isCollapseOpen]
    const [isPromptOpen, subPromptStates] = updatedStates[promptIndex]
    if (subPromptIndex === null) {
      updatedStates[promptIndex] = [!isPromptOpen, subPromptStates]
    } else {
      subPromptStates[subPromptIndex] = !subPromptStates[subPromptIndex]
      updatedStates[promptIndex] = [isPromptOpen, subPromptStates]
    }
    setIsCollapseOpen(updatedStates)
  }

  const handleInputChange = () => {
    setInputValue(textareaRef.current.value)
  }

  const contextValue = {
    // json data
    prompts,
    // states and states setters
    isLoading,
    setIsLoading,
    stripes,
    setStripes,
    isFirstQuestion,
    setIsFirstQuestion,
    inputValue,
    setInputValue,
    isCollapseOpen,
    setIsCollapseOpen,
    // refs
    formRef,
    textareaRef,
    // functions
    handleFormReset,
    handleSelect,
    handleToggle,
    handleInputChange,
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export default AppContextProvider
