import React, { forwardRef } from "react"
import styled from "styled-components"

const Input = styled.textarea`
  background: transparent;
  border-radius: 5px;
  border: 1px solid #999;
  outline: none;
  padding: 20px 70px 20px 14px;
  width: 100%;
`

const Textarea = forwardRef(
  ({ placeholder, inputValue, handleInputChange, handleKeyDown }, ref) => (
    <Input
      name="prompt"
      id="prompt"
      rows="1"
      cols="1"
      placeholder={placeholder}
      value={inputValue}
      onChange={e => handleInputChange(e)}
      onKeyDown={e => handleKeyDown(e)}
      ref={ref}
    />
  )
)

export default Textarea
