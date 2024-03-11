import React, { useEffect } from "react"
import { useLocation } from "react-router"
import "./App.css"
import Homepage from "./pages/homepage/homepage"
import "preline/preline"
import { IStaticMethods } from "preline/preline"
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods
  }
}

function App() {
  const location = useLocation()

  useEffect(() => {
    window.HSStaticMethods.autoInit()
  }, [location.pathname])

  return (
    <div className="App">
      <Homepage />
    </div>
  )
}

export default App
