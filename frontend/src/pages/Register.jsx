import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register() {
const [name,setName] = useState("")
const [email,setEmail]= useState("")
const [password,setPassword] = useState("")
const [message,setMessage] = useState("")

const navigate = useNavigate()

const handleRegister = (e)=>{
  e.preventDefault();
  
  const newUser = {
    name,
    email,
    password
  };
  localStorage.setItem("user",JSON.stringify(newUser));
  setMessage("Registartion successfull Redirecting to login..")
  
  setTimeout(()=>{
    navigate("/");
  },1500)
}

  return (
   <div className="container-fluid vh-100  d-flex align-items-center justify-content-center ">
     <div className="col-md-4">
       <h1 className="text-center mb-4">Register</h1>
       {message && (
        <p className="text-success text-center">{message}</p>
       )}
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Name : </label>
          <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label>Email : </label>
          <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Password : </label>
          <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button className="btn btn-success w-100">Register</button>
      </form>
     </div>
   </div>
  )
}
