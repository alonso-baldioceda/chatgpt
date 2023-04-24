import React, { useState, useMemo } from "react"
import styled from "styled-components"

// Components
import Collapse from "./Collapse"

const PromptsWrapper = styled.div`
  list-style: none;
  margin: 10px 10px 20px;
  padding: 0;
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
    <PromptsWrapper>
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
    </PromptsWrapper>
  )
}

export default PromptsList
