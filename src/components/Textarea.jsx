import React, { useState, forwardRef, useContext } from "react"
import styled from "styled-components"
import { AppContext } from "./AppContext"

const Input = styled.textarea`
  background: transparent;
  border-radius: 5px;
  border: 1px solid #999;
  max-height: 200px;
  outline: none;
  padding: 14px 70px 14px 14px;
  width: 100%;
`

const Textarea = forwardRef(({ placeholder }, ref) => {
  const { inputValue, handleInputChange, handleKeyDown } =
    useContext(AppContext)

  const [height, setHeight] = useState("auto")

  return (
    <Input
      name="prompt"
      id="prompt"
      placeholder={placeholder}
      value={inputValue}
      style={{ minHeight: height }}
      onChange={e => {
        handleInputChange(e)
        setHeight(e.target.scrollHeight + "px")
      }}
      onKeyDown={e => handleKeyDown(e)}
      ref={ref}
    />
  )
})

export default Textarea
