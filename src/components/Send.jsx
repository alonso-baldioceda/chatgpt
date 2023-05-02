import React, { useContext } from "react"
import styled from "styled-components"
import Submit from "./../images/submit.svg"
import { AppContext } from "./AppContext"

const Button = styled.button`
  background-color: #f5f5f5;
  border-radius: 6px;
  border: 0;
  bottom: 14px;
  color: #bbb;
  height: 38px;
  padding: 10px;
  position: absolute;
  right: 16px;
  text-align: left;
  transition: all 0.15s ease;

  svg {
    fill: #fff;
    height: 20px;
    width: 20px;
  }

  &.first,
  &.not-first {
    background-color: #1276d3 !important;
    color: #fff !important;

    &:not([disabled]):hover {
      background-color: #0f6ac0;
    }
  }

  &:disabled {
    background-color: #f5f5f5 !important;
    color: #bbb !important;
    cursor: not-allowed !important;
  }

  &:not(.first):hover {
    background-color: #1276d3;
    color: #fff !important;
  }
`

const Send = () => {
  const { inputValue, isFirstQuestion, handleSubmit } = useContext(AppContext)
  const isInputValueEmpty = inputValue === ""

  return (
    <Button
      type="submit"
      onClick={handleSubmit}
      className={isFirstQuestion ? "first" : "not-first"}
      disabled={isInputValueEmpty}
    >
      {isFirstQuestion ? <span>Give It a Try</span> : <Submit />}
    </Button>
  )
}

export default Send
