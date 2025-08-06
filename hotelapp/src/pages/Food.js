import React, { useState } from 'react';
import "../styles/food.css"

function Food() {
  const[count, setCount] = useState(0)
  return (
    <div className='food'>
 <video
 autoPlay loop muted playsInline className='video'
 >
    <source src='http://localhost:8001/uploads/hotel1.mp4' type='video/mp4' />
    Your Browser does not support Javascript
 </video>
      <div className='overlay'>
       <h1>Kindly start counting from {count}</h1>
       <button onClick={ () =>setCount(count+1)}   >Click</button>
      </div>
    </div>
  )
}

export default Food
