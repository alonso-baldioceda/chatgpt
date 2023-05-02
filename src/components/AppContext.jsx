import React, { createContext, useState, useRef, useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"

// Utils
import generateBotMessageId from "./../utils/generateBotMessageId"

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

  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [stripes, setStripes] = useState([])
  const [isFirstQuestion, setIsFirstQuestion] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [isCollapseOpen, setIsCollapseOpen] = useState(initialOpenState)

  // refs
  const chatRef = useRef(null)
  const formRef = useRef(null)
  const loaderRef = useRef(null)
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

  // handle input change
  const handleInputChange = () => {
    setInputValue(textareaRef.current.value)
  }

  const handleUserInput = async () => {
    try {
      const response = await fetch("http://localhost:5001/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: inputValue,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        return data.bot.trim()
      } else {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error(error)
      return "Sorry, something went wrong. Please try again."
    }
  }

  // Look for element in stripes with id and update its value
  const updateStripes = (stripes, botMessageId, value) => {
    const index = stripes.findIndex(
      stripe => stripe.botMessageId === botMessageId
    )
    const updatedStripes = [...stripes]
    updatedStripes[index].value = value
    setStripes(updatedStripes)
  }

  // handle form submit
  const handleSubmit = async e => {
    e.preventDefault()

    const botMessageId = generateBotMessageId()

    const newState = [
      ...stripes,
      { isAi: false, value: inputValue },
      { isAi: true, value: null, botMessageId: botMessageId },
    ]

    // to clear the textarea input
    handleFormReset()

    // not first question anymore
    setIsFirstQuestion(false)

    // update stripes
    setStripes(newState)

    // show loader
    setIsLoading(true)

    // get the bot response & update stripes
    const parsedData = await handleUserInput()
    updateStripes(newState, botMessageId, parsedData)

    // hide loader
    setIsLoading(false)

    // clear the input value
    setInputValue("")
  }

  // handle enter key press
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleMoveLoaderToBottom = (chatRef, loaderRef) => {
    if (!chatRef) {
      return
    }

    const ChatRef = chatRef.current

    if (ChatRef) {
      const LoaderRef = loaderRef.current

      // to focus scroll to the bottom
      ChatRef.scrollTop = ChatRef.scrollHeight

      // move the loader to the bottom of prompts-history when stripes change
      if (LoaderRef) {
        LoaderRef.style.top = `${ChatRef.scrollHeight - 38}px`
        console.log("moved")
      }
    }
  }

  const handleOpenMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const contextValue = {
    // json data
    prompts,
    // states and states setters
    isMobileOpen,
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
    chatRef,
    formRef,
    loaderRef,
    textareaRef,
    // functions
    handleFormReset,
    handleInputChange,
    handleKeyDown,
    handleSelect,
    handleSubmit,
    handleToggle,
    handleMoveLoaderToBottom,
    handleOpenMobileMenu,
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export default AppContextProvider
