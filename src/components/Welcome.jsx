import React, { forwardRef, useRef } from "react"
import styled from "styled-components"

// Styles
const WelcomeStyle = styled.div`
  padding: 1rem;
  text-align: center;
`

const Heading = styled.h2`
  margin-bottom: 0.5rem;
`

const SubHeading = styled.p`
  font-size: 1.2rem;
`

const Image = styled.img`
  width: 96px;
`

const Welcome = forwardRef((_, ref) => {
  return (
    <WelcomeStyle ref={ref}>
      <Heading>Come on Ask...</Heading>
      <SubHeading>ChatGPT collaborative</SubHeading>
      <Image src="hearth.png" alt="heath" />
    </WelcomeStyle>
  )
})

export default Welcome
