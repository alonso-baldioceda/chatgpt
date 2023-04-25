const chatStripe = (isAi, value, botMessageId) => {
  return `
    <div class="wrapper ${isAi && "ai"}">
      <div class="chat">
        <div class="profile">
          <img 
            src=${isAi ? "bot.svg" : "user.svg"} 
            alt="${isAi ? "bot" : "user"}" 
          />
        </div>
        <div class="message" id=${botMessageId}>${value}</div>
      </div>
    </div>
  `
}

export default chatStripe
