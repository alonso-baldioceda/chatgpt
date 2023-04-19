import React from "react"
import styled from "styled-components"
import Submit from "./../images/submit.svg"

const Button = styled.button`
  background: transparent;
  border: 0;
  border-radius: 6px;
  bottom: 26px;
  color: #1276d3;
  height: 40px;
  padding: 10px;
  position: absolute;
  right: 26px;
  text-align: left;
  transition: background 0.15s ease;
  width: 40px;

  &:hover {
    background: #f5f5f5;
    text-decoration: underline;
  }

  svg {
    height: 20px;
    width: 20px;
    opacity: 0.2;
  }
`

const Send = ({ handleSubmit }) => {
  return (
    <Button type="submit" onClick={handleSubmit}>
      <Submit />
    </Button>
  )
}

export default Send
