import React from "react"
import styled from "styled-components"

// Styles
const Wrapper = styled.div`
  padding: 1rem;
  width: 100%;

  &.ai {
    background: #ebebeb;

    .profile {
      background: #fff;
    }
  }
`
const Profile = styled.div`
  align-items: center;
  background: #222;
  border-radius: 5px;
  display: flex;
  height: 32px;
  justify-content: center;
  width: 32px;
`

const Image = styled.img`
  height: 22px;
  width: 22px;
`

const Chat = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 0 auto;
  position: relative;
  width: 100%;
`

const Message = styled.div`
  color: #222;
  flex: 1;
  max-width: 100%;
  min-height: 32px;
  overflow-x: scroll;
  padding: 6px;
  scrollbar-width: none;
  white-space: pre-wrap;
`

const ChatStripe = ({ isAi, value, botMessageId }) => (
  <Wrapper className={`${isAi === true ? "ai" : "user"}`}>
    <Chat className="chat">
      <Profile className="profile">
        <Image
          src={`${isAi === true ? "bot.svg" : "user.svg"}`}
          alt={`${isAi === true ? "bot" : "user"}`}
        />
      </Profile>
      <Message id={botMessageId}>{value}</Message>
    </Chat>
  </Wrapper>
)

export default ChatStripe
