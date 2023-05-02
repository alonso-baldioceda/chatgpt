import React, { useContext } from "react"
import styled from "styled-components"
import Arrow from "./../images/arrow.svg"
import { AppContext } from "./AppContext"

const Caret = styled(Arrow)`
  height: 16px;
  margin-left: 6px;
  transform: rotate(90deg);
  width: 16px;
  transition: all 0.1s ease-in;

  &.expanded {
    transform: scaleX(-1) rotate(270deg);
  }
`
const Title = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  margin-bottom: 20px;
`

const Heading = styled.p`
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
`

const CollapseTitle = ({ text, index, subIndex, isActive }) => {
  const { handleToggle } = useContext(AppContext)

  return (
    <Title onClick={() => handleToggle(index, subIndex)}>
      <Heading>{text}</Heading>
      <Caret className={isActive ? "expanded" : ""} />
    </Title>
  )
}

export default CollapseTitle
