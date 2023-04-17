import React from "react"
import styled from "styled-components"

const List = styled.ul`
  list-style: none;
  margin: 10px;
  padding: 0;
`

const ListItem = styled.li`
  padding-bottom: 10px;
  width: 100%;

  &:last-child {
    padding-bottom: 0;
  }
`

const Button = styled.button`
  background: #434343 ;
  color: #fff;
  padding: 10px;
  text-align: left;
  transition: background 0.15s ease;
  width: 100%;

  &:hover {
    background: #262626;
`

const PromptsList = ({ handleSelect, prompts }) => {
  const promptListItems = prompts.map(prompt => (
    <ListItem key={prompt}>
      <Button onClick={() => handleSelect(prompt)}>{prompt}</Button>
    </ListItem>
  ))

  return <List>{promptListItems}</List>
}

export default PromptsList
