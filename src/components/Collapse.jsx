import React, { useState } from "react"
import styled from "styled-components"

// Components
import CollapseTitle from "./CollapseTitle"
import CollapseList from "./CollapseList"

// Utils
import generateUniqueId from "../utils/generateUniqueId"

// Styles
const List = styled.ul`
  list-style: none;
  margin: 10px 0 20px;
  padding: 0;
`

const Collapse = ({ prompt, handleSelect, isOpen, setIsOpen }) => {
  const { questions, sub } = prompt

  const toggleOpen = (rowIndex, columnIndex) => {
    // Update the array dataSample in the rowIndex columnIndex position
    const newIsOpen = isOpen.map((levelOneCollapse, indexRow) =>
      indexRow === rowIndex
        ? levelOneCollapse.length === 1
          ? [!levelOneCollapse[0]]
          : [
              !levelOneCollapse[0],
              levelOneCollapse[1].map(levelTwoCollapse =>
                levelTwoCollapse.map((item, index) =>
                  index === columnIndex ? !item : item
                )
              ),
            ]
        : levelOneCollapse
    )

    setIsOpen(newIsOpen)
  }

  return (
    <div>
      <CollapseTitle
        onClick={toggleOpen}
        text={prompt.heading}
        row={prompt.index}
      />
      <>
        {sub?.map((sub, indexSub) => {
          const indexId = generateUniqueId()

          return (
            <List key={indexId}>
              <CollapseTitle
                onClick={toggleOpen}
                text={sub.heading}
                row={prompt.index}
                column={indexSub}
              />

              {sub.questions?.map(question => {
                const indexId = generateUniqueId()
                return (
                  <CollapseList
                    key={indexId}
                    {...question}
                    handleSelect={handleSelect}
                  />
                )
              })}
            </List>
          )
        })}

        <List>
          {questions?.map((question, index) => {
            const indexId = generateUniqueId()
            return (
              <CollapseList
                key={indexId}
                {...question}
                handleSelect={handleSelect}
              />
            )
          })}
        </List>
      </>
    </div>
  )
}

export default Collapse
