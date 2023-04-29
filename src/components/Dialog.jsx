import React, {
  forwardRef,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react"
import styled from "styled-components"
import { AppContext } from "./AppContext"

// Components
import PromptsForm from "./PromptsForm"
import Loader from "./Loader"
import ChatStripe from "./ChatStripe"
import Welcome from "./Welcome"

// Utils
import generateBotMessageId from "./../utils/generateBotMessageId"

// Styles
const DialogStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  padding: 0;
  position: relative;
  width: 100%;

  @media (min-width: 992px) {
    padding: 0 10px 0;
  }
`

const PromptsBody = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 10px 10px 0;
  position: relative;
  width: 100%;

  @media (min-width: 992px) {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .prompts-history {
    background-color: #fff;
    max-height: 72vh;
    margin-bottom: 10px;
    overflow-y: scroll;
    scroll-behavior: smooth;
    scrollbar-width: none;
    width: 100%;

    @media (min-width: 992px) {
      max-height: 78vh;
    }
  }
`

const Title = styled.h1`
  padding: 1.2rem 1rem;
  text-align: center;
`

const Dialog = forwardRef(() => {
  const {
    isLoading,
    setIsLoading,
    stripes,
    setStripes,
    inputValue,
    setInputValue,
    isFirstQuestion,
    setIsFirstQuestion,
    formRef,
    textareaRef,
  } = useContext(AppContext)

  const loaderRef = useRef(null)
  const chatRef = useRef(null)

  const handleInputChange = useCallback(() => {
    setInputValue(textareaRef.current.value)
  }, [])

  // reset the form
  const handleFormReset = () => formRef.current.reset()

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

    // // update stripes
    // setStripes(newState)

    // // show loader
    // setIsLoading(true)

    // // get the bot response & update stripes
    // const parsedData = await handleUserInput()
    // updateStripes(newState, botMessageId, parsedData)

    // // hide loader
    // setIsLoading(false)

    // // not first question anymore
    // setIsFirstQuestion(false)

    // // clear the input value
    // setInputValue("")

    setTimeout(() => {
      setIsLoading(true)
      setStripes(newState)
      updateStripes(newState, botMessageId, "parsedData")
      setIsLoading(false)
      setIsFirstQuestion(false)
      setInputValue("")
    }, 250)
  }

  // handle enter key press
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  // scroll to the bottom when stripes change
  useEffect(() => {
    const elementChatRef = chatRef.current

    if (elementChatRef) {
      // to focus scroll to the bottom
      elementChatRef.scrollTop = elementChatRef.scrollHeight

      // move the loader to the bottom of prompts-history when stripes change
      if (loaderRef.current) {
        const elementLoaderRef = loaderRef.current
        elementLoaderRef.style.top = `${elementChatRef.scrollHeight}px`
      }
    }
  }, [stripes])

  return (
    <DialogStyle>
      <Title>HealthBot</Title>
      <PromptsBody>
        {isFirstQuestion && <Welcome />}
        {isLoading && <Loader ref={loaderRef} />}
        {!isFirstQuestion && (
          <div ref={chatRef} className="prompts-history">
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
        )}
        <PromptsForm
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          handleSubmit={e => handleSubmit(e)}
        />
      </PromptsBody>
    </DialogStyle>
  )
})

export default Dialog
