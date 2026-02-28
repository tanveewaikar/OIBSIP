import { useState } from "react";
import axios from "axios";
function ForgotPassword() {
    const [email, setEmail] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted");
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/forgot-password",
//         { email }
//       );

//       alert(res.data.message);
//     } catch (error) {
//       alert(error.response?.data?.message || "Something went wrong");
//     }
//   };
     const handleSubmit = async (e) => {
       e.preventDefault();
       console.log("Submitting to backend...");

       try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/forgot-password",
          { email }
        );
        console.log("Response:", res);
        alert(res.data.message);
        } catch (error) {
          console.log("Full error:", error);
          alert("Error happened");
        }
    };

  return (
    
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  )
}

export default ForgotPassword
