"use client"

import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import PublicDashboard from "./pages/PublicDashboard"

function App() {
 
    return <div>

       <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
        <Route path="/sign-in" element={<Signin/>}/>
        <Route path="/brain/share/:shareLink" element={<PublicDashboard />} />

       </Routes>
        <ToastContainer position="top-center" />
    </div>

    
}

export default App
