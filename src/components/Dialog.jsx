import React, { forwardRef, useEffect, useContext } from "react"
import styled from "styled-components"
import { AppContext } from "./AppContext"

// Components
import PromptsForm from "./PromptsForm"
import Loader from "./Loader"
import ChatStripe from "./ChatStripe"
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
    stripes,
    isFirstQuestion,
    chatRef,
    loaderRef,
    handleMoveLoaderToBottom,
  } = useContext(AppContext)

  // scroll to the bottom when stripes change
  useEffect(() => {
    console.log("stripes changed")
    handleMoveLoaderToBottom(chatRef, loaderRef)
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
        <PromptsForm />
      </PromptsBody>
    </DialogStyle>
  )
})

export default Dialog
