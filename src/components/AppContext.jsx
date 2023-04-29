import React, { createContext, useState } from "react"

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [stripes, setStripes] = useState([])
  const [isFirstQuestion, setIsFirstQuestion] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [isCollapseOpen, setIsCollapseOpen] = useState([])

  //   const [name, setName] = useState("")

  //   const incrementCount = () => {
  //     setCount(count + 1)
  //   }

  //   const handleNameChange = event => {
  //     setName(event.target.value)
  //   }

  const contextValue = {
    isLoading,
    setIsLoading,
    stripes,
    setStripes,
    isFirstQuestion,
    setIsFirstQuestion,
    inputValue,
    setInputValue,
    isCollapseOpen,
    setIsCollapseOpen,
    // incrementCount,
    // handleNameChange,
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export default AppContextProvider
