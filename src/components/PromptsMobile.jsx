import React, { useContext } from "react"
import styled from "styled-components"

// Components
import { AppContext } from "./AppContext"
import Collapse from "./Collapse"

// Styles
const PromptsMobileStyled = styled.div`
  background-color: #fff;
  border-radius: 0px;
  box-shadow: 1px 1px 6px #d0d0d0, -2px -2px 12px #ebebeb;
  display: none;
  flex-direction: column;
  height: 80vh;
  overflow-y: scroll;
  padding: 10px;
  position: absolute;
  width: 100vw;
  z-index: 2;

  @media (min-width: 992px) {
    display: none;
  }

  &.open {
    display: block !important;
  }
`

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  height: 32px;
  margin: 0;
  padding: 0;
  width: 32px;
  z-index: 2;
  position: absolute;
  right: 10px;
`

const PromptsMobile = () => {
  const { prompts, isMobileOpen, handleOpenMobileMenu } = useContext(AppContext)

  return (
    <PromptsMobileStyled
      className={`mobile-prompts ${isMobileOpen ? "open" : ""}`}
    >
      <CloseButton onClick={handleOpenMobileMenu}>
        <img src="close.svg" alt="close" />
      </CloseButton>
      {prompts.map((prompt, index) => (
        <Collapse key={`collapse-${index}`} prompt={{ ...prompt, index }} />
      ))}
    </PromptsMobileStyled>
  )
}

export default PromptsMobile
