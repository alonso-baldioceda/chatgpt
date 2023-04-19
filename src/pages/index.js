import React, { useState, useRef } from "react"
import axios from "axios"
import "./../style.css"

// Components
import PromptsList from "./../components/PromptsList"
import Send from "../components/Send"
import Textarea from "./../components/Textarea"

// Utils
import chatStripe from "../utils/chatStripe"
import generateUniqueId from "../utils/generateUniqueId"

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
  // const [isLoading, setIsLoading] = useState(true)
  const [inputValue, setInputValue] = useState("")

  const handleReset = () => formRef.current.reset()

  const handlePromptSelect = question => {
    handleReset()
    document.querySelector("#prompt").innerHTML = question
    setInputValue(question)
  }

  const form = document.querySelector("form")
  const chatContainer = document.querySelector("#chat-container")

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

  // console.log("key", process.env.OPENAI_API_KEY)

  const handleSubmit = async e => {
    e.preventDefault()

    // user's chatstripe
    chatContainer.innerHTML += chatStripe(false, inputValue)

    // to clear the textarea input
    handleReset()
    document.querySelector("#prompt").innerHTML = ""

    // bot's chatstripe
    const uniqueId = generateUniqueId()
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

    // to focus scroll to the bottom
    chatContainer.scrollTop = chatContainer.scrollHeight

    // specific message div
    const messageDiv = document.getElementById(uniqueId)

    messageDiv.innerHTML = "..."
    loader(messageDiv)

    const response = await fetch("http://localhost:5001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "how are you?",
      }),
    })

    clearInterval(loadInterval)
    messageDiv.innerHTML = ""

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

  return (
    <div id="app">
      <div className="prompts">
        <PromptsList prompts={prompts} handleSelect={handlePromptSelect} />
      </div>
      <div className="dialog">
        <div id="chat-container"></div>
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
