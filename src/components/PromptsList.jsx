import React, { useState, useMemo } from "react"
import styled from "styled-components"

// Components
import Collapse from "./Collapse"

// Styles
const PromptsListStyled = styled.div`
  background-color: #fff;
  display: none;
  padding: 10px 10px 20px;
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

const PromptsList = ({ handleSelect, prompts }) => {
  const initialOpenState = useMemo(
    () =>
      Array.from(prompts, (prompt, index) => {
        const subArr = prompt.sub ? Array(prompt.sub.length).fill(false) : []
        return [index === 0, subArr]
      }),
    [prompts]
  )

  const [isOpen, setIsOpen] = useState(initialOpenState)

  const handleToggle = (promptIndex, subPromptIndex = null) => {
    const updatedStates = [...isOpen]
    const [isPromptOpen, subPromptStates] = updatedStates[promptIndex]
    if (subPromptIndex === null) {
      updatedStates[promptIndex] = [!isPromptOpen, subPromptStates]
    } else {
      subPromptStates[subPromptIndex] = !subPromptStates[subPromptIndex]
      updatedStates[promptIndex] = [isPromptOpen, subPromptStates]
    }
    setIsOpen(updatedStates)
  }

  return (
    <PromptsListStyled>
      {prompts.map((prompt, index) => {
        const isOpenPrompt = isOpen[index][0]
        const isOpenSubPrompts = isOpen[index][1]

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
    </PromptsListStyled>
  )
}

export default PromptsList
