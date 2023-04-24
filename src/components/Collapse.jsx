import React from "react"
import styled from "styled-components"

// Components
import CollapseTitle from "./CollapseTitle"
import CollapseList from "./CollapseList"

// Styles
const List = styled.ul`
  list-style: none;
  margin: 10px 0 20px;
  padding: 0;
`

const Collapse = ({
  prompt: { heading, index, questions, sub },
  handleSelect,
  handleToggle,
  isOpenPrompt,
  isOpenSubPrompts,
}) => (
  <div>
    <CollapseTitle
      handleToggle={handleToggle}
      text={heading}
      index={index}
      isActive={isOpenPrompt}
    />
    {isOpenPrompt === true && (
      <>
        {sub?.map((sub, indexList) => (
          <List key={`prompt-list-${indexList}`}>
            <CollapseTitle
              handleToggle={handleToggle}
              text={sub.heading}
              index={index}
              subIndex={indexList}
              isActive={isOpenSubPrompts[indexList]}
            />
            {isOpenSubPrompts[indexList] === true && (
              <>
                {sub.questions?.map((question, indexQuestion) => (
                  <CollapseList
                    key={`question-list-${indexQuestion}`}
                    {...question}
                    handleSelect={handleSelect}
                  />
                ))}
              </>
            )}
          </List>
        ))}
        <List>
          {questions?.map((question, indexQuestion) => (
            <CollapseList
              key={`question-list-${indexQuestion}`}
              {...question}
              handleSelect={handleSelect}
            />
          ))}
        </List>
      </>
    )}
  </div>
)

export default Collapse
