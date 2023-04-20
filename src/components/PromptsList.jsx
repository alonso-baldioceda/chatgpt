import React, { useState } from "react"
import styled from "styled-components"

// Components
import Collapse from "./Collapse"

// Utils
import generateUniqueId from "../utils/generateUniqueId"

const PromptsWrapper = styled.div`
  list-style: none;
  margin: 10px 10px 20px;
  padding: 0;
`

const PromptsList = ({ handleSelect, prompts }) => {
  // Track the open state of each collapse element
  const generateBooleans = data => {
    const arr = []

    data.forEach(prompt => {
      if (prompt.sub) {
        const subArr = prompt.sub.map(() => false)
        arr.push([false, [subArr]])
      } else {
        arr.push([false])
      }
    })

    return arr
  }

  const [isOpen, setIsOpen] = useState(generateBooleans(prompts))

  // console.log("generateBooleans(prompts) ===>", generateBooleans(prompts))

  return prompts.map((prompt, index) => {
    const indexId = generateUniqueId()

    return (
      <PromptsWrapper key={indexId}>
        <Collapse
          prompt={{ ...prompt, index }}
          handleSelect={handleSelect}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </PromptsWrapper>
    )
  })
}

export default PromptsList
