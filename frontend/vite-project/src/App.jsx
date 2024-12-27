import { Route, Router, Routes } from "react-router-dom"
import Login from "./pages/Login.jsx"
import SignUp from "./pages/SignUp.jsx"
import Home from "./pages/Home.jsx"
import UserProfile from "./components/UserProfile.jsx"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={ <Login/> } />
      <Route path="/signup" element={ <SignUp/> } />
      <Route path="/home" element={ <Home/> } />
      <Route path="/profile" element={ <UserProfile/> } />
    </Routes>
     
    </>
  )
}

export default App
