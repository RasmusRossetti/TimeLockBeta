import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import NavBar from "./components/NavBar"
import ProtectedRoute from "./components/ProtectedRoute"
import Signin from "./components/Signin"
import Signup from "./components/Signup"
import TimeTable from "./components/TimeTable"
import { AuthContextProvider } from "./context/AuthContext"

function App() {
  console.log()

  return (
    <div className="bg-[#1A1A1A]">
      {/* // <div className='h-full bg-cover  bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r'> */}
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Signin />} />

          <Route path="/signup" element={<Signup />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <NavBar />
                <Header />
                <Suspense fallback={<p>loading...</p>}>
                  <TimeTable />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
      {/* // </div> */}
    </div>
  )
}

export default App
