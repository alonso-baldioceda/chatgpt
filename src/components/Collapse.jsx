import React, { useContext } from "react"
import styled from "styled-components"
import { AppContext } from "./AppContext"

// Components
import CollapseTitle from "./CollapseTitle"
import CollapseItem from "./CollapseItem"

// Styles
const List = styled.ul`
  list-style: none;
  margin: 10px 0 20px;
  padding: 0;
`

const Collapse = ({ prompt: { heading, index, questions, sub } }) => {
  const { isCollapseOpen } = useContext(AppContext)

  const isOpenPrompt = isCollapseOpen[index][0]
  const isOpenSubPrompts = isCollapseOpen[index][1]

  return (
    <div className="collapsable-main">
      <CollapseTitle text={heading} index={index} isActive={isOpenPrompt} />
      {isOpenPrompt === true && (
        <>
          {sub?.map((sub, indexList) => {
            const { heading, questions } = sub

            return (
              <div className="collapsable-secondary" key={`title-${indexList}`}>
                <CollapseTitle
                  text={heading}
                  index={index}
                  subIndex={indexList}
                  isActive={isOpenSubPrompts[indexList]}
                />
                {isOpenSubPrompts[indexList] === true && (
                  <List key={`prompt-list-${indexList}`}>
                    {questions?.map((question, indexQuestion) => (
                      <CollapseItem
                        key={`prompt-list-${indexQuestion}`}
                        {...question}
                      />
                    ))}
                  </List>
                )}
              </div>
            )
          })}
          <List>
            {questions?.map((question, indexQuestion) => (
              <CollapseItem
                key={`question-list-${indexQuestion}`}
                {...question}
              />
            ))}
          </List>
        </>
      )}
    </div>
  )
}

export default Collapse
