// "use client"

// import { useState } from "react"

// import axios from "axios"
// export function Signup(){

// const [username, setUsername] = useState("")
// const [password, setPassword] = useState("")

//  return <div className=" flex flex-col justify-center h-screen"> 
    
//   <div className="flex justify-center">
//     <div className="p-4 border rounded pb-4">

//     <input onChange={(e) => {
//       setUsername(e.target.value)
//     }} className="p-2 m-2"  type="text" placeholder="username"> </input>
//    <br/>
//   <input onChange={(e) => {
//       setPassword(e.target.value)
//     }} className="p-2 m-2" type="password" placeholder="password"></input>

//     <br/>

//    <div className="mt-4 flex justify-center">
//   <button onClick={() => {
//     axios.post("http://localhost:3000/user/signup" , {
//        username,
//        password
//     })

//   }}>Sign up</button>
  
//    </div> 
//   </div> 
//   </div>
//  </div>
// }


"use client"

import { useState } from "react"
import axios from "axios"

export function Signup() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSignup() {
    try {
      setLoading(true)
      setMessage("")

      const res = await axios.post("http://localhost:3000/user/signup", {
        username,
        password
      })

      setMessage("Signup successful ✅")
      console.log(res.data)

    } catch (err: any) {
      setMessage("Signup failed ❌")
      console.error(err.response?.data || err.message)

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="p-6 border rounded">

          <input
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 m-2 border"
            type="text"
            placeholder="username"
          />

          <br />

          <input
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 m-2 border"
            type="password"
            placeholder="password"
          />

          <br />

          <div className="mt-4 flex justify-center">
            <button
              onClick={handleSignup}
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign up"}
            </button>
          </div>

          {message && (
            <p className="text-center mt-3">{message}</p>
          )}

        </div>
      </div>
    </div>
  )
}