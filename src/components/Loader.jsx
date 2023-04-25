import React from "react"
import styled from "styled-components"

const Spinner = styled.div`
  display: none;
  left: 74px;
  position: absolute;
  transform: translateZ(1px);

  div {
    animation: spinner 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    background: #76d376;
    border-radius: 50%;
    display: inline-block;
    height: 36px;
    width: 36px;
  }

  @keyframes spinner {
    0%,
    100% {
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    0% {
      transform: rotateY(0deg);
    }
    50% {
      animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
      transform: rotateY(1800deg);
    }
    100% {
      transform: rotateY(3600deg);
    }
  }
`

const Loader = () => {
  return (
    <Spinner className="spinner" id="spinner">
      <div></div>
    </Spinner>
  )
}

export default Loader
