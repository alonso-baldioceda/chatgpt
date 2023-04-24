import React from "react"
import styled from "styled-components"
import Arrow from "./../images/arrow.svg"

const Caret = styled(Arrow)`
  height: 20px;
  margin-left: 10px;
  transform: rotate(90deg);
  width: 20px;

  &.expanded {
    transform: rotate(270deg);
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
