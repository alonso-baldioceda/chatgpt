import React, { useState, useRef, useEffect, useCallback } from "react"
import { graphql } from "gatsby"
import "./../style.css"

// Components
import PromptsList from "./../components/PromptsList"
import Send from "../components/Send"
import Textarea from "./../components/Textarea"
import Loader from "./../components/Loader"
import ChatStripe from "./../components/ChatStripe"

// Utils
import generateBotMessageId from "../utils/generateBotMessageId"

const IndexPage = ({ data }) => {
  const { allDataJson } = data
  const { nodes } = allDataJson
  const { prompts } = nodes[0]

  console.log("prompts ===> ", prompts)

  const [stripes, setStripes] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [isFirstQuestion, setIsFirstQuestion] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const loaderRef = useRef(null)
  const chatRef = useRef(null)
  const formRef = useRef(null)
  const textareaRef = useRef(null)

  const handleFormReset = () => formRef.current.reset()

  const handlePromptSelect = useCallback(question => {
    const input = textareaRef.current
    handleFormReset()
    input.value = question
    input.focus()
    setInputValue(question)

    // Move cursor to the end of the textarea
    const length = input.value.length
    input.selectionStart = length
    input.selectionEnd = length

    console.log("handlePromptSelect ===> ")
  }, [])

  const handleInputChange = useCallback(() => {
    setInputValue(textareaRef.current.value)
    console.log("handleInputChange ===> ")
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

    setStripes(newState)
    setIsLoading(true)

    const parsedData = await handleUserInput()

    updateStripes(newState, botMessageId, parsedData)
    setIsLoading(false)

    setIsFirstQuestion(false)
    setInputValue("")
  }

  // handle enter key press
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const showMobilePrompts = () => {
    console.log("showMobilePrompts")
  }

  // scroll to the bottom when stripes change
  const loaderPosition = () => {
    const { current: currentChat } = chatRef
    const { current: currentLoader } = loaderRef

    // get the last element in the chat
    const lastStripe = currentChat.lastElementChild
    // if there is no last element, return
    if (!lastStripe) return

    const chatHeight = currentChat.clientHeight
    const loaderHeight = currentLoader.clientHeight
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
      <PromptsList prompts={prompts} handleSelect={handlePromptSelect} />
      <div className="dialog">
        <div className="welcome">
          <h1 className="heading">HealthBot</h1>
        </div>
        <div className="conversation">
          {isLoading ? <Loader ref={loaderRef} /> : null}
          <div className="chat-container" ref={chatRef}>
            {stripes.map((stripe, index) => {
              const { isAi, value, botMessageId } = stripe
              return (
                <ChatStripe
                  key={`index-${index}`}
                  isAi={isAi}
                  value={value}
                  botMessageId={botMessageId}
                />
              )
            })}
          </div>
          <div className="separator"></div>
          <button className="btn-mobile" onClick={() => showMobilePrompts()}>
            Open Prompt Library
          </button>
          <form ref={formRef}>
            <Textarea
              placeholder="Tab on prompt library of type here."
              value={inputValue}
              handleInputChange={handleInputChange}
              handleKeyDown={handleKeyDown}
              ref={textareaRef}
            />
            <Send
              handleSubmit={e => handleSubmit(e)}
              isFirstQuestion={isFirstQuestion}
              inputValue={inputValue}
            />
          </form>
          <p className="disclaimer">
            Info for general purpose only. Consult professional for specifics.
          </p>
        </div>
      </div>
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
