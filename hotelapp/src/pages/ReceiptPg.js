import {useState, useEffect} from 'react';
import axios from 'axios';
import {QRCodeCanvas} from "qrcode.react"
import logo from "../assets/logi.jpg"

import { useParams } from 'react-router-dom';
import "../styles/receipt.css";

function ReceiptPg() {
    const {id} = useParams();
    const[order, setOrder] = useState(null)
    useEffect(() => {
        axios.get(`http://localhost:8001/api/orders/${id}`)
        .then(res => setOrder(res.data))
        .catch(err => console.error(err))

    }, [id])
      const printReceipt = () => {
    window.print()
  };

  if(!order) return <p>Loading receipt</p>
  return (
    <div className='receipt'>
       <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: "0 2rem", marginBottom: "0px"
       }}>
       <img src={logo} alt='lohs'  style={{
        width: "50px", height: '50px', borderRadius: "50%"
       }} />
        
         <h1>THE ROYAL MAX HOTEL</h1>
          <img src={logo} alt='lohs'  style={{
        width: "50px", height: '50px', borderRadius: "50%"
       }} /></div>
               
      <div className='receipt-title'>
        <div><p><strong>Waiter:</strong> {order.waiterName}</p></div>
                  <div className='divide'></div>
                       <div><p><strong>Table:</strong> {order.tableNumber}</p></div>
                            <div className='divide'></div>
                            <div><p><strong>Date:</strong> {new Date(order.orderTime).toLocaleString()}</p></div>
      </div>
        <hr/>
        <div className='headi'>
            <span>ITEM</span>
            <span>QTY</span>
            <span>AMT (Ksh)</span>
        </div>
        <hr/>
        <ul className='lists'>
            {order.items.map((item, index) =>(
                <li key={index} className='listrow'>
                    <span className='name'>{item.name} </span>
                    <span className='quantity'>x {item.quantity} </span>
                    <span className='amount'>{(item.quantity * item.price).toLocaleString()} </span>
               </li>
            ))}
        </ul>
        <hr/>
        <div className='total'>
<strong>Total:</strong>
<span>{order.totalAmount?.toLocaleString()}</span>
        </div>
      <div className='footer'>
        
  <div className='left'> 
    <p>Royal Max Hotel</p>
       <p>Your Comfort , our priority</p>
          <p>Kakamega Road, Shianda Town, Kenya</p>
             <p>Phone: +254742106109 </p>
             <p>Email: mongodb0111@gmail.com</p>
        </div>

          <div className='middle'> 
<h3> Scan me for feedback</h3>
<QRCodeCanvas value="https://drive.google.com/file/d/1gvRSDD0_4-mJFPtoQo_i6EMM1J9TtKWy/view?usp=sharing" size={80}/>
        </div>

        <div className='right'> 
<h3>Thank you for Dining with us.</h3>
<p><strong>Served by:</strong>{order.waiterName}</p>
<img src={logo} alt='lohs'  style={{
        width: "50px", height: '50px', borderRadius: "50%"
       }} />
        </div>
      </div>
        <button onClick={printReceipt}>
            Print Receipt
        </button>
      
    </div>
  )
}

export default ReceiptPg
