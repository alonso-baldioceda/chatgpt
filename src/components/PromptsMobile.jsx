import React from "react"
import styled from "styled-components"

// Components
import Collapse from "./Collapse"

// Styles
const PromptsMobileStyled = styled.div`
  background-color: #fff;
  border-radius: 0px;
  box-shadow: 1px 1px 6px #d0d0d0, -2px -2px 12px #ebebeb;
  display: flex;
  flex-direction: column;
  height: 86vh;
  overflow-y: scroll;
  padding: 10px;
  position: absolute;
  width: 100vw;
  z-index: 2;

  @media (min-width: 992px) {
    display: none;
  }
`

const PromptsMobile = ({
  prompts,
  handleSelect,
  handleToggle,
  isCollapseOpen,
}) => {
  return (
    <PromptsMobileStyled>
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
    </PromptsMobileStyled>
  )
}

export default PromptsMobile
