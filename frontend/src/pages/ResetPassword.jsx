import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
function ResetPassword() {
  const {token}= useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
        const res = await axios.post(
            `http://localhost:5000/api/auth/reset-password/${token}`,
            {password}
        )
        alert(res.data.message);
        navigate("/login");
    }
    catch(error){
        alert(error.response?.data?.message || "Something went wrong");
    }
  }
  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="Enter new password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  )
}

export default ResetPassword
