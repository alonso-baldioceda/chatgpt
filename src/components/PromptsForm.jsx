import React, { useContext } from "react"
import styled from "styled-components"
import { AppContext } from "./AppContext"

// Components
import Send from "./Send"
import Textarea from "./Textarea"

// Styles
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

const PromptsForm = ({ handleInputChange, handleKeyDown, handleSubmit }) => {
  const { inputValue, isFirstQuestion, formRef, textareaRef } =
    useContext(AppContext)

  return (
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
  )
}

export default PromptsForm
