import React from "react"
import styled from "styled-components"
import Arrow from "./../images/arrow.svg"

const List = styled.ul`
  list-style: none;
  margin: 10px 0 20px;
  padding: 0;
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

const Caret = styled(Arrow)`
  height: 20px;
  margin-left: 10px;
  transform: rotate(90deg);
  width: 20px;

  &.expanded {
    transform: rotate(270deg);
  }
`

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

const Collapse = ({ prompt, handleSelect, isOpen, setIsOpen }) => {
  const toggleOpen = () => {
    setIsOpen(prevOpen => [
      ...prevOpen.slice(0, prompt.index),
      !prevOpen[prompt.index],
      ...prevOpen.slice(prompt.index + 1),
    ])

    console.log(isOpen)
  }

  const { heading, questions } = prompt

  return (
    <div>
      <Title onClick={toggleOpen}>
        <Heading>{heading}</Heading>
        <Caret className={isOpen ? "expanded" : ""} />
      </Title>
      {isOpen ? (
        <List>
          {questions.map((question, index) => {
            return (
              <ListItem key={index}>
                <Button onClick={() => handleSelect(question.question)}>
                  {question.heading}
                  <Arrow />
                </Button>
              </ListItem>
            )
          })}
        </List>
      ) : null}
    </div>
  )
}

export default Collapse
