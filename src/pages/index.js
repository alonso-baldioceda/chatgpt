import React, { useState, useRef, useEffect } from "react"
import "./../style.css"
import bot from "./../images/bot.svg"
import user from "./../images/user.svg"

// Components
import PromptsList from "./../components/PromptsList"
import Send from "../components/Send"
import Textarea from "./../components/Textarea"

const prompts = [
  {
    heading: "Health",
    questions: [
      {
        heading: "Better Sleep Tips",
        question: "What are some tips for getting better sleep?",
      },
      {
        heading: "Core Strengthening Exercises",
        question: "What are the best exercises for strengthening your core?",
      },
      {
        heading: "Effective Stress Management",
        question: "How can I manage my stress levels effectively?",
      },
      {
        heading: "Healthy Vegan Foods",
        question:
          "What are some healthy food options for people on a vegan diet?",
      },
    ],
  },
  {
    heading: "Medicine",
    questions: [
      {
        heading: "Medication Side Effects",
        question: "What are the side effects of a particular medication?",
      },
      {
        heading: "Proper Medication Usage",
        question:
          "How should I take a particular medication? Should it be taken with food or without?",
      },
      {
        heading: "Over-the-Counter Pain Relief",
        question:
          "What over-the-counter pain relievers are safe to take for a headache?",
      },
      {
        heading: "Natural Cold Remedies",
        question: "Are there any herbal or natural remedies for a common cold?",
      },
    ],
  },
]

const IndexPage = () => {
  const formRef = useRef(null)
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [inputValue, setInputValue] = useState("")

  const handleReset = () => formRef.current.reset()

  const handlePromptSelect = question => {
    handleReset()
    document.querySelector("#prompt").innerHTML = question
    setInputValue(question)
  }

  useEffect(() => {
    console.log(inputValue)
  }, [inputValue])

  const form = document.querySelector("form")
  const chatContainer = document.querySelector("#chat_container")
  const field = document.querySelector("#prompt")

  console.log("field", field)

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

  const handleSubmit = async e => {
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

  // console.log("inputValue ===>", inputValue)

  return (
    <div id="app">
      <div className="prompts">
        <PromptsList prompts={prompts} handleSelect={handlePromptSelect} />
      </div>
      <div className="dialog">
        <div id="chat_container"></div>
        <form ref={formRef}>
          <Textarea
            placeholder="Tab on prompt library of type here."
            value={inputValue}
            handleInputChange={setInputValue}
          />
          <Send handleSubmit={e => handleSubmit(e)} />
        </form>
      </div>
    </div>
  )
}

export default IndexPage
