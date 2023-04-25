import React from "react"
import styled from "styled-components"

const Input = styled.textarea`
  background: transparent;
  border-radius: 5px;
  border: 1px solid #999;
  font-size: 18px;
  outline: none;
  padding: 20px 70px 20px 20px;
  width: 100%;
`

const Textarea = ({
  placeholder,
  inputValue,
  handleInputChange,
  handleKeyDown,
}) => {
  return (
    <Input
      name="prompt"
      id="prompt"
      rows="1"
      cols="1"
      placeholder={placeholder}
      value={inputValue}
      onChange={e => handleInputChange(e)}
      onKeyDown={e => handleKeyDown(e)}
    />
  )
}

export default Textarea
