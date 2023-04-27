import React from "react"
import styled from "styled-components"
import Arrow from "./../images/arrow.svg"

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

const Heading = styled.h3`
  cursor: pointer;
  font-size: 1.1rem;
`

const CollapseTitle = ({ handleToggle, text, index, subIndex, isActive }) => (
  <Title onClick={() => handleToggle(index, subIndex)}>
    <Heading>{text}</Heading>
    <Caret className={isActive ? "expanded" : ""} />
  </Title>
)

export default CollapseTitle
