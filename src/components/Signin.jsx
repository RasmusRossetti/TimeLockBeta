import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext"
import NavbarSignIn from "./NavbarSignIn"

const Signin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [type, setType] = useState("password")
  const navigate = useNavigate()
  const { signIn } = UserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await signIn(email, password)
      navigate("/account")
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  }

  return (
    <div className="text-white max-w-[700px] mx-auto h-screen  p-4 ">
      <NavbarSignIn />
      <div className="relative top-1/4">
        <div>
          <h1 className="text-2xl font-bold py-2">Sign in to your account</h1>
          <p className="py-2">
            Don't have an account yet?
            <Link to="/signup" className="underline">
              Sign up.
            </Link>
          </p>
          <div>{error ? <h1 className="text-red-600">{error}</h1> : null}</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col py-2">
            <label className="py-2 font-medium">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 text-black rounded-md"
              type="email"
            />
          </div>
          <div className="flex flex-col py-2">
            <label className="py-2 font-medium">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3 text-black rounded-md"
              type={type}
            />
            <button
              type="button"
              className=" w-32 mt-4 m-auto hover:text-gray-600 "
              onClick={() => {
                if (type === "password") {
                  setType("text")
                } else {
                  setType("password")
                }
              }}
            >
              Show password
            </button>
          </div>

          <button className="rounded-md border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signin
