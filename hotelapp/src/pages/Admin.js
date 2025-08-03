import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/admin.css"
import { Link, useNavigate } from 'react-router-dom'
function Admin() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("")
    const navigate = useNavigate();
    const[rememberMe, setRememberMe] = useState(false)
   
    const handleChange = (e) => {
        

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = axios.post("http://localhost:8001/api/sign", {
                email: "",
                password: "",

            }) 
            console.log(res.data)
            alert("Login Success")
            navigate("/login")
        }catch(err) {
            console.error(err);
            alert("Signin Failed")
        }
    }
  return (
    <div className='admin'>
   <div className='left'>
   </div>
   <div className='right'>
<form onSubmit={handleSubmit}>
    <div className='hotelsign'>
      < h1>Login </h1>
<p> Admin (Hotel Manager)/Waiter Kindly enter your Hotel Credentials</p>
    </div>
<div className='hotelsign'>
    <input type='text' 
name='username'
value={email}
onChange={(e) => setEmail(e.target.value)}
required
placeholder='Email'/>
   
<input 
type='password'
name='password'
value={password}
onChange={(e) => setPassword(e.target.value)}
required
placeholder='Password'/>
</div>
<div className='remember'>
    <input  
    type='checkbox'
    id='rememberMe'
    checked={rememberMe}
    onChange={(e) => setRememberMe(e.target.value)}
    />
    <label htmlFor='rememberMe'>Remember Me</label>
 
    
</div>
<div>
     <Link to="/forgot" style={{textDecoration: "none", color: "blue", fontSize: "20px"}}>Forgot Password?</Link>
  
    <h2>Don't have Account? <Link to="/sign" style={{textDecoration: "none", color: "blue"}}>Register</Link></h2>
</div>
<button type='button'> Login</button>
</form>
   </div>
    </div>
  )
}

export default Admin
