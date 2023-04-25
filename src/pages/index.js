import React, { useState, useRef } from "react"
import "./../style.css"

// Components
import PromptsList from "./../components/PromptsList"
import Send from "../components/Send"
import Textarea from "./../components/Textarea"
import Loader from "./../components/Loader"

// Utils
import chatStripe from "../utils/chatStripe"
import generateBotMessageId from "../utils/generateBotMessageId"

const IndexPage = () => {
  const data = {
    prompts: [
      {
        heading: "Health",
        sub: [
          {
            heading: "General health",
            questions: [
              {
                heading: "Better Sleep Tips",
                question: "What are some tips for getting better sleep?",
              },
              {
                heading: "Core Strengthening Exercises",
                question:
                  "What are the best exercises for strengthening your core?",
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
            heading: "Mental health",
            questions: [
              {
                heading: "Managing mental illness effectively",
                question:
                  "What are some effective ways to manage anxiety or depression?",
              },
              {
                heading: "Reducing mental health stigma",
                question:
                  "How can we reduce the stigma surrounding mental health issues and encourage more people to seek treatment?",
              },
              {
                heading: "Preventing mental health crises",
                question:
                  "What are the most common warning signs of a mental health crisis, and how can loved ones help someone who may be struggling?",
              },
              {
                heading: "Dispelling mental health misconceptions",
                question:
                  "What are some of the most common myths and misconceptions about mental health, and how can we educate people to dispel these beliefs?",
              },
            ],
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
            question:
              "Are there any herbal or natural remedies for a common cold?",
          },
        ],
      },
    ],
  }

  const formRef = useRef(null)
  const [inputValue, setInputValue] = useState("")

  const handleReset = () => formRef.current.reset()

  const handlePromptSelect = question => {
    const input = document.querySelector("#prompt")
    handleReset()
    input.innerHTML = question
    input.focus()
    setInputValue(question)

    // Move cursor to the end of the textarea
    const length = input.value.length
    input.selectionStart = length
    input.selectionEnd = length
  }

  const chatContainer = document.querySelector("#chat-container")

  let loadInterval

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

  const handleSubmit = async e => {
    e.preventDefault()

    // user's chatstripe
    chatContainer.innerHTML += chatStripe(false, inputValue)

    // to clear the textarea input
    handleReset()
    document.querySelector("#prompt").innerHTML = ""

    // bot's chatstripe
    const botMessageId = generateBotMessageId()
    chatContainer.innerHTML += chatStripe(true, " ", botMessageId)

    // to focus scroll to the bottom
    chatContainer.scrollTop = chatContainer.scrollHeight

    // specific message div
    const messageDiv = document.getElementById(botMessageId)

    // loading spinner position
    const rect = messageDiv.getBoundingClientRect()
    const spinner = document.querySelector("#spinner")
    spinner.style = `top: ${rect.top}px; display: block;`

    try {
      const response = await fetch("http://localhost:5001/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: inputValue,
        }),
      })

      if (response.ok) {
        clearInterval(loadInterval)
        messageDiv.innerHTML = ""

        const data = await response.json()
        const parsedData = data.bot.trim()

        typeText(messageDiv, parsedData)
      } else {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error(error)
      messageDiv.innerHTML = "Sorry, something went wrong. Please try again."
    } finally {
      clearInterval(loadInterval)
      spinner.style.display = "none"
      console.log("finally")
    }
  }

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div id="app">
      {/* logo && chat GPT internal demo */}
      <div className="prompts">
        <PromptsList prompts={data.prompts} handleSelect={handlePromptSelect} />
      </div>
      <div className="dialog">
        <div id="chat-container"></div>
        <Loader />
        <form ref={formRef}>
          <Textarea
            placeholder="Tab on prompt library of type here."
            value={inputValue}
            handleInputChange={setInputValue}
            handleKeyDown={handleKeyDown}
          />
          <Send handleSubmit={e => handleSubmit(e)} />
        </form>
      </div>
    </div>
  )
}

export default IndexPage
