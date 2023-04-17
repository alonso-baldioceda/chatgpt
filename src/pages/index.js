import React, { useState } from "react"
import "./../style.css"
import bot from "./../images/bot.svg"
import user from "./../images/user.svg"
import Send from "./../images/send.svg"

// Components
import PromptsList from "./../components/PromptsList"

const IndexPage = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [inputValue, setInputValue] = useState("")

  const handlePromptSelect = prompt => {
    setSelectedPrompt(prompt)

    console.log("selectedPrompt ==>", selectedPrompt)
  }

  const handleInputChange = event => {
    setInputValue({ inputValue: event.target.value })
  }

  const prompts = [
    "¿Cómo estás?",
    "¿Qué planes tienes para hoy?",
    "¿Qué música te gusta?",
    "¿Dónde vives?",
  ]

  const form = document.querySelector("form")
  const chatContainer = document.querySelector("#chat_container")

  let loadInterval

  const loader = element => {
    element.textContent = ""

    loadInterval = setInterval(() => {
      // Update the text content of the loading indicator
      element.textContent += "."

      // If the loading indicator has reached three dots, reset it
      if (element.textContent === "....") {
        element.textContent = ""
      }
    }, 300)
  }

  const typeText = (element, text) => {
    let index = 0

    let interval = setInterval(() => {
      if (index < text.length) {
        element.innerHTML += text.charAt(index)
        index++
      } else {
        clearInterval(interval)
      }
    }, 20)
  }

  const generateUniqueId = () => {
    const timestamp = Date.now()
    const randomNumber = Math.random()
    const hexadecimalString = randomNumber.toString(16)

    return `id-${timestamp}-${hexadecimalString}`
  }

  const chatStripe = (isAi, value, uniqueId) => {
    return `
          <div class="wrapper ${isAi && "ai"}">
              <div class="chat">
                  <div class="profile">
                      <img 
                        src=${isAi ? bot : user} 
                        alt="${isAi ? "bot" : "user"}" 
                      />
                  </div>
                  <div class="message" id=${uniqueId}>${value}</div>
              </div>
          </div>
      `
  }

  // const handleSubmit = async e => {
  const handleSubmit = e => {
    e.preventDefault()

    // const data = new FormData(form)

    // user's chatstripe
    // chatContainer.innerHTML += chatStripe(false, data.get("prompt"))

    // to clear the textarea input
    // form.reset()

    // bot's chatstripe
    const uniqueId = generateUniqueId()

    console.log("uniqueId", uniqueId)
    // chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

    // to focus scroll to the bottom
    // chatContainer.scrollTop = chatContainer.scrollHeight

    // specific message div
    // const messageDiv = document.getElementById(uniqueId)

    // messageDiv.innerHTML = "..."
    // loader(messageDiv)

    // const response = await fetch("http://localhost:5000/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     prompt: data.get("prompt"),
    //   }),
    // })

    // clearInterval(loadInterval)
    // messageDiv.innerHTML = " "

    // if (response.ok) {
    //   const data = await response.json()
    //   const parsedData = data.bot.trim() // trims any trailing spaces/'\n'

    //   typeText(messageDiv, parsedData)
    // } else {
    //   const err = await response.text()

    //   messageDiv.innerHTML = "Something went wrong"
    //   alert(err)
    // }
  }

  console.log("selectedPrompt ==>", selectedPrompt)

  return (
    <div id="app">
      <div className="prompts">
        <PromptsList prompts={prompts} handleSelect={handlePromptSelect} />
      </div>
      <div className="dialog">
        <div id="chat_container"></div>
        <form>
          <textarea
            name="prompt"
            rows="1"
            cols="1"
            placeholder="Ask codex..."
            value={inputValue}
            onChange={handleInputChange}
          ></textarea>
          <button type="submit" onClick={handleSubmit}>
            {/* send */}
            <Send />
          </button>
        </form>
      </div>
    </div>
  )
}

export default IndexPage
