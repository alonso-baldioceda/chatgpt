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
import Send from "./Send"
import Textarea from "./Textarea"
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
  justify-content: space-between;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
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

const Separator = styled.div`
  background-color: #eee;
  height: 1px;
  margin-bottom: 10px;
  width: 100%;

  @media (min-width: 992px) {
    display: none;
  }
`

const MobileButton = styled.button`
  background-color: #eee;
  border: 1px solid #eee;
  border-radius: 5px;
  color: #000;
  cursor: pointer;
  display: block;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 20px;
  transition: all 0.1s ease-out;
  width: 100%;

  @media (min-width: 992px) {
    display: none;
  }

  &:hover {
    background-color: #d5d5d5;
    border-color: #d5d5d5;
  }
`

const Form = styled.form`
  margin: 10px auto 10px;
  position: relative;
  width: 100%;
`

const Disclaimer = styled.p`
  color: #999;
  font-size: 0.85rem;
  margin-bottom: 8px;
  margin-left: 18px;
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
  } = useContext(AppContext)

  const loaderRef = useRef(null)
  const chatRef = useRef(null)
  const formRef = useRef(null)
  const textareaRef = useRef(null)

  console.log("isLoading", isLoading)

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
        <div>
          <Separator />
          {/* <MobileButton onClick={() => handleMobilePrompts()}> */}
          <MobileButton>Open Prompt Library</MobileButton>
          <Form ref={formRef}>
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
          </Form>
          <Disclaimer>
            Info for general purpose only. Consult professional for specifics.
          </Disclaimer>
        </div>
      </PromptsBody>
    </DialogStyle>
  )
})

export default Dialog
