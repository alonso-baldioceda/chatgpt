import React from "react"

const ChatStripe = ({ isAi, value, botMessageId }) => (
  <div className={`wrapper ${isAi === true ? "ai" : "user"}`}>
    <div className="chat">
      <div className="profile">
        <img
          src={`${isAi === true ? "bot.svg" : "user.svg"}`}
          alt={`${isAi === true ? "bot" : "user"}`}
        />
      </div>
      <div className="message" id={botMessageId}>
        {value}
      </div>
    </div>
  </div>
)

export default ChatStripe
