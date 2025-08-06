import  { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/sign.css"
import { useNavigate } from 'react-router-dom'
function Signin() {
    const navigate = useNavigate()
    const[formData, setFormData] = useState({
        username: "", email: "", badgeNumber: "", position: "",password: "" })
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = axios.post("http://localhost:8001/api/auth/sign", formData) 
            console.log(res.data)
            alert("Signed Successfully")
            navigate("/login")

        }catch(err) {
            console.error(err);
            alert("Signin Failed")
        } }
  return (
    <div className='admin'>
   <div className='left'>
   </div>
   <div className='right'>
<form onSubmit={handleSubmit}>
    <div className='hotelsign'>
      < h1>Create Account </h1>
<p> Admin (Hotel Manager)/Waiter Kindly enter your Hotel Credentials</p>
    </div>
<div className='hotelsign'>
    <input type='text'  name='username' onChange={handleChange} required placeholder='Username'/>

<input type='email' name='email' required placeholder='email' onChange={handleChange}/>
</div>

<div className='hotelsign'>
<input type='text' name='badgeNumber' onChange={handleChange} required placeholder='Badge No.'/>
 
 <input type='text' name='position' onChange={handleChange}  required placeholder='Hotel Manager/Waiter'/>

<input  type='password' name='password' id='password' onChange={handleChange} required placeholder='Password' />
</div>
<button type='button'> Sign Up</button>
</form>  </div>
    </div>
  )
}

export default Signin
