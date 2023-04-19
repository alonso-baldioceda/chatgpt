import React from "react"
import styled from "styled-components"

const LoaderWrapper = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;

  .spinner {
    animation: spin 0.8s ease-in-out infinite;
    border-radius: 50%;
    border-top: 4px solid #ccc;
    border: 4px solid #fff;
    height: 30px;
    width: 30px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Loader = () => {
  return (
    <LoaderWrapper>
      <div className="spinner"></div>
    </LoaderWrapper>
  )
}

export default Loader
