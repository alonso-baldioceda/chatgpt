import React from "react"
import styled from "styled-components"

// Components
import Collapse from "./Collapse"

// Styles
const PromptsDesktopStyled = styled.div`
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

const PromptsDesktop = ({
  prompts,
  handleSelect,
  handleToggle,
  isCollapseOpen,
}) => {
  return (
    <PromptsDesktopStyled>
      {prompts.map((prompt, index) => {
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
