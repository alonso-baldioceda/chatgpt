import React, {
  useContext,
  useCallback,
  useMemo,
  useEffect,
  useState,
} from "react"
import styled from "styled-components"
import { AppContext } from "./AppContext"

// Components
import Collapse from "./Collapse"

// Styles
const PromptsDesktopStyled = styled.div`
  background-color: #fff;
  display: none;
  padding: 2rem 1rem;
  max-height: 100vh;
  overflow-y: scroll;
  width: 25%;

  @media (min-width: 992px) {
    display: block;
    flex-basis: 35%;
  }

  @media (min-width: 1200px) {
    flex-basis: 30%;
  }
`

const PromptsDesktop = ({ prompts }) => {
  const { setInputValue } = useContext(AppContext)

  const initialOpenState = useMemo(
    () =>
      prompts.map((prompt, index) => {
        const subArr = prompt.sub ? Array(prompt.sub.length).fill(false) : []
        return [index === 0, subArr]
      }),

    [prompts]
  )

  const [isCollapseOpen, setIsCollapseOpen] = useState(initialOpenState)

  const handleToggle = (promptIndex, subPromptIndex = null) => {
    console.log("handleToggle")
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

  // handle prompt select
  const handleSelect = question => {
    console.log("handleSelect", question)
    // const textarea = textareaRef.current
    // // handleFormReset()
    // textarea.value = question
    // textarea.focus()
    setInputValue(question)

    // // Move cursor to the end of the textarea content
    // const length = textarea.value.length
    // textarea.selectionStart = length
    // textarea.selectionEnd = length
  }

  return (
    <PromptsDesktopStyled>
      {prompts.map((prompt, index) => {
        console.log("prompt", prompt)
        const isOpenPrompt = isCollapseOpen[index][0]
        const isOpenSubPrompts = isCollapseOpen[index][1]
        return (
          <Collapse
            key={`prompts-wrapper-${index}`}
            prompt={{ ...prompt, index }}
            handleSelect={handleSelect}
            handleToggle={handleToggle}
            isOpenPrompt={isOpenPrompt}
            isOpenSubPrompts={isOpenSubPrompts}
          />
        )
      })}
    </PromptsDesktopStyled>
  )
}

export default PromptsDesktop
