import React from "react"
import styled from "styled-components"
import Arrow from "./../images/arrow.svg"

// Styles
const ListItem = styled.li`
  padding-bottom: 10px;
  width: 100%;

  &:last-child {
    padding-bottom: 0;
  }
`

const Button = styled.button`
  border: 1px solid #eee;
  border-radius: 6px;
  color: #1276d3;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  text-align: left;
  transition: background 0.15s ease;
  width: 100%;

  &:hover {
    background: #f5f5f5;
    text-decoration: underline;
  }

  svg {
    height: 20px;
    width: 20px;
    opacity: 0.5;
  }
`

const CollapseList = ({ handleSelect, question, heading }) => {
  return (
    <ListItem>
      <Button onClick={() => handleSelect(question)}>
        {heading}
        <Arrow />
      </Button>
    </ListItem>
  )
}

export default CollapseList