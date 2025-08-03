import {useState, useEffect} from 'react';
import axios from 'axios';
import {QRCodeCanvas} from "qrcode.react"

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
       <img src="http://localhost:8001/uploads/logi.jpg" alt='lohs'  style={{
        width: "50px", height: '50px', borderRadius: "50%"
       }} />
        
         <h1>THE ROYAL MAX HOTEL</h1>
          <img src="http://localhost:8001/uploads/logi.jpg" alt='lohs'  style={{
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
            <span>AMT (Ksh.)</span>
        </div>
        <hr/>
        <ul className='lists'>
            {order.items.map((item, index) =>{
              const sub = item.price * item.quantity;
              const vat = sub * 0.16;
              const totalPlusVAT = sub +vat;
              return (
                  <li key={index} className='listrow'>
                    <span className='name'>{item.name} </span>
                    <span className='quantity'>x {item.quantity} </span>
                    <span className='amount'>{(item.quantity * item.price).toLocaleString()} </span>
               </li>
       )
 })}
        </ul>
        <hr/>
        <div style={{paddingTop: "2px", marginTop: "2px", fontSize: "14px"}}>

          {(() => {
            const sub = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const vat  = sub * 0.16
            const totalAmount = sub + vat;
            return (
              <div style={{padding: "4px 0", margin: "4px 0"}}>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "2px 0"}}>
                    <strong>Sub-total:</strong>
                    <span>Ksh. { sub.toFixed(2)} </span>
                     </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: '4px 0'}}>
                         <strong>VAT (16%):</strong>
                    <span>Ksh. {vat.toFixed(2)} </span>
                     </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: '2px 0'}}> 
                           <strong>Total</strong>
                    <span style={{fontSize: "18px", fontWeight: "bold"}}>Ksh. {totalAmount.toFixed(2)}</span>

                    </div>
                 </div>
                 
            )
          })()}
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
<img src="http://localhost:8001/uploads/logi.jpg" alt='lohs'  style={{
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
