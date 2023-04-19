import React, { useState } from "react"
import styled from "styled-components"

import Collapse from "./Collapse"

const PromptsWrapper = styled.div`
  list-style: none;
  margin: 10px 10px 20px;
  padding: 0;
`

const PromptsList = ({ handleSelect, prompts }) => {
  // Track the open state of each collapse element
  const [isOpen, setIsOpen] = useState(
    prompts.map((_, index) => (index === 0 ? true : false))
  )

  return prompts.map((prompt, index) => {
    return (
      <PromptsWrapper key={index}>
        <Collapse
          prompt={{ ...prompt, index }}
          handleSelect={handleSelect}
          isOpen={isOpen[index]}
          setIsOpen={setIsOpen}
        />
      </PromptsWrapper>
    )
  })
}

export default PromptsList
