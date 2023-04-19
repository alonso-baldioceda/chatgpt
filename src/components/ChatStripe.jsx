const chatStripe = (isAi, value, uniqueId) => {
  return `
		<div class="wrapper ${isAi && "ai"}">
			<div class="chat">
				<div class="profile">
					<img 
						src=${isAi ? bot : ""} 
						alt="${isAi ? "bot" : "user"}" 
					/>
				</div>
				<div class="message" id=${uniqueId}>${value}</div>
			</div>
		</div>
	`
}

export default chatStripe
