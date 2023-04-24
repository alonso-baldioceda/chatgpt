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
      prompts.map((prompt, index) => {
        const subArr = prompt.sub ? prompt.sub.map(() => false) : []
        return [index === 0, subArr]
      }),
    [prompts]
  )

  const [isOpen, setIsOpen] = useState(initialOpenState)

  const handleToggle = (promptIndex, subPromptIndex = null) => {
    const newState = [...isOpen]
    if (subPromptIndex === null) {
      newState[promptIndex][0] = !newState[promptIndex][0]
    } else {
      newState[promptIndex][1][subPromptIndex] =
        !newState[promptIndex][1][subPromptIndex]
    }
    setIsOpen(newState)
    console.log("isOpen ===>", isOpen)
  }

  return prompts.map((prompt, index) => {
    const isOpenPrompt = isOpen[index][0]
    const isOpenSubPrompts = isOpen[index][1]

    return (
      <PromptsWrapper key={`propmpts-wrapper-${index}`}>
        <Collapse
          prompt={{ ...prompt, index }}
          handleSelect={handleSelect}
          handleToggle={handleToggle}
          isOpenPrompt={isOpenPrompt}
          isOpenSubPrompts={isOpenSubPrompts}
        />
      </PromptsWrapper>
    )
  })
}

export default PromptsList
