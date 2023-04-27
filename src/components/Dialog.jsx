import React, { forwardRef } from "react"
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
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10px 10px 0;
  position: relative;
  width: 100%;

  @media (min-width: 992px) {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
`

const Title = styled.h1`
  padding: 1.6rem 1rem 1rem;
`

const PromptsHistory = styled.div`
  background-color: #fff;
  height: 72vh;
  margin-bottom: 10px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  scrollbar-width: none;
  width: 100%;

  @media (min-width: 992px) {
    height: 78vh;
  }
`

const MobileButton = styled.button`
  background-color: #eee;
  border-radius: 5px;
  border: 1px solid #eee;
  color: #000;
  cursor: pointer;
  display: block;
  font-size: 16px;
  font-weight: 500;
  height: 42px;
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

const Dialog = forwardRef(
  ({
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
  }) => {
    return (
      <DialogStyle>
        <Title>HealthBot</Title>
        <PromptsBody>
          <Welcome />
          {isLoading ? <Loader ref={loaderRef} /> : null}
          <PromptsHistory ref={chatRef}>
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
            <div className="separator"></div>
            <MobileButton onClick={() => handleMobilePrompts()}>
              Open Prompt Library
            </MobileButton>
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
        </PromptsBody>
      </DialogStyle>
    )
  }
)

export default Dialog
