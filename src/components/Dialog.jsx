import React, { useState, useEffect, forwardRef, useRef } from "react"
import styled from "styled-components"

// Components
import Send from "../components/Send"
import Textarea from "./../components/Textarea"
import Loader from "./../components/Loader"
import ChatStripe from "./../components/ChatStripe"
import Welcome from "./Welcome"

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
    height: 100%;
    margin-bottom: 10px;
    overflow-y: scroll;
    scroll-behavior: smooth;
    scrollbar-width: none;
    width: 100%;

    /* @media (min-width: 992px) {
      height: 78vh;
    } */
  }
`

const PromptsHistory = styled(
  forwardRef((props, ref) => <div {...props} ref={props.chatRef} />)
)``

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

const Dialog = forwardRef(
  (
    {
      stripes,
      inputValue,
      isLoading,
      isFirstQuestion,
      handleMobilePrompts,
      handleInputChange,
      handleKeyDown,
      handleSubmit,
      loaderRef,
      chatRef,
      formRef,
      textareaRef,
    },
    ref
  ) => {
    const [isWelcomeVisible, setIsWelcomeVisible] = useState(true)

    const welcomeRef = useRef(null)

    if (welcomeRef && welcomeRef.current) {
      console.log("welcomeRef", welcomeRef.current.clientHeight)
    }

    // const welcomeHeight = welcomeRef.current.clientHeight

    // console.log("welcomeRef", welcomeRef.current.clientHeight)

    useEffect(() => {
      if (isFirstQuestion === false) {
        setIsWelcomeVisible(false)
      }
    }, [isFirstQuestion])

    useEffect(() => {}, [isWelcomeVisible])

    return (
      <DialogStyle>
        <Title>HealthBot</Title>
        <PromptsBody>
          {isWelcomeVisible ? <Welcome ref={welcomeRef} /> : null}
          {isLoading ? <Loader ref={loaderRef} /> : null}
          <PromptsHistory
            ref={chatRef}
            className="prompts-history"
            style={{ maxHeight: "calc(100vh  )" }}
          >
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
          </PromptsHistory>
          <div>
            <Separator />
            <MobileButton onClick={() => handleMobilePrompts()}>
              Open Prompt Library
            </MobileButton>
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
  }
)

export default Dialog
