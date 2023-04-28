import React, { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { graphql } from "gatsby"
import "./../style.css"

// Components
import PromptsDesktop from "../components/PromptsDesktop"
// import PromptsMobile from "../components/PromptsMobile"
import Dialog from "../components/Dialog"

// Utils
import generateBotMessageId from "../utils/generateBotMessageId"

const IndexPage = ({ data }) => {
  // getting the prompts from the json file
  const { allDataJson } = data
  const { nodes } = allDataJson
  const { prompts } = nodes[0]

  const initialOpenState = useMemo(
    () =>
      prompts.map((prompt, index) => {
        const subArr = prompt.sub ? Array(prompt.sub.length).fill(false) : []
        return [index === 0, subArr]
      }),

    [prompts]
  )

  const [stripes, setStripes] = useState([])
  const [isCollapseOpen, setIsCollapseOpen] = useState(initialOpenState)
  const [inputValue, setInputValue] = useState("")
  const [isFirstQuestion, setIsFirstQuestion] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const loaderRef = useRef(null)
  const chatRef = useRef(null)
  const formRef = useRef(null)
  const textareaRef = useRef(null)

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

  // reset the form
  const handleFormReset = () => formRef.current.reset()

  // handle prompt select
  const handlePromptSelect = useCallback(question => {
    const textarea = textareaRef.current
    handleFormReset()
    textarea.value = question
    textarea.focus()
    setInputValue(question)

    // Move cursor to the end of the textarea content
    const length = textarea.value.length
    textarea.selectionStart = length
    textarea.selectionEnd = length
  }, [])

  const handleInputChange = useCallback(() => {
    setInputValue(textareaRef.current.value)
  }, [])

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

  // Look for element in stripes with specific botMessageId
  // and update the value field using findIndex
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

    // update stripes
    // setStripes(newState)

    // show loader
    // setIsLoading(true)

    // get the bot response & update stripes
    // const parsedData = await handleUserInput()
    // updateStripes(newState, botMessageId, "parsedData")

    // hide loader
    // setIsLoading(false)

    // not first question anymore
    // setIsFirstQuestion(false)

    setTimeout(() => {
      setIsLoading(true)
      setStripes(newState)
      updateStripes(newState, botMessageId, "parsedData")
      setIsLoading(false)
      setIsFirstQuestion(false)
    }, 250)

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

  const handleMobilePrompts = () => {
    console.log("handleMobilePrompts")
  }

  // scroll to the bottom when stripes change
  const loaderPosition = () => {
    const { current: currentChat } = chatRef
    const { current: currentLoader } = loaderRef

    // get the last element in the chat
    const lastStripe = currentChat.lastElementChild
    // if there is no last element, return
    if (!lastStripe) return

    // get the height of the chat and the loader
    const chatHeight = currentChat.clientHeight
    const loaderHeight = currentLoader.clientHeight

    // get the position of the last element to move the cursor here
    const loaderPosition = lastStripe.offsetTop + 20

    if (chatHeight - loaderHeight < loaderPosition) {
      currentLoader.style.top = `${chatHeight - (loaderHeight + 8)}px`
    } else {
      currentLoader.style.top = `${loaderPosition - 4}px`
    }
  }

  // scroll to the bottom when stripes change
  useEffect(() => {
    const elementChatRef = chatRef.current

    if (elementChatRef) {
      // to focus scroll to the bottom
      elementChatRef.scrollTop = elementChatRef.scrollHeight
    }
  }, [stripes])

  // set the position of the loader
  useEffect(() => {
    if (isLoading === true && loaderRef.current) {
      loaderPosition()
    }
  }, [isLoading])

  return (
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
        handleSelect={handlePromptSelect}
        handleToggle={handleToggle}
        isCollapseOpen={isCollapseOpen}
      />
      <Dialog
        stripes={stripes}
        inputValue={inputValue}
        isLoading={isLoading}
        isFirstQuestion={isFirstQuestion}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleMobilePrompts={handleMobilePrompts}
        handleKeyDown={handleKeyDown}
        loaderRef={loaderRef}
        chatRef={chatRef}
        formRef={formRef}
        textareaRef={textareaRef}
      />
    </div>
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
