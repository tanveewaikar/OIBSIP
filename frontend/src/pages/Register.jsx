import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Register() {
const [name,setName] = useState("")
const [email,setEmail]= useState("")
const [password,setPassword] = useState("")
const [message,setMessage] = useState("")
const [error , setError] = useState("")

const navigate = useNavigate()

const handleRegister = async (e)=>{
  e.preventDefault();
  try{
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      {name,email,password}
    )
    setMessage(res.data.message);
    setTimeout (()=>{
      navigate('/login');
    },2000)
  }
  catch(error){
    setError(error.response?.data?.message || "Registration failed"
    )
  }
}

  return (
<div className="container vh-100 d-flex justify-content-center align-items-center">
<div className="col-md-4">

<h2 className="text-center mb-4">Register</h2>

{message && <p className="text-success text-center">{message}</p>}
{error && <p className="text-danger text-center">{error}</p>}

<form onSubmit={handleRegister}>

<div className="mb-3">
<label>Name</label>
<input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} required/>
</div>

<div className="mb-3">
<label>Email</label>
<input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} required />
</div>

<div className="mb-3">
<label>Password</label>
<input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
</div>

<button className="btn btn-success w-100">Register</button>

</form>

</div>
</div>
)
}