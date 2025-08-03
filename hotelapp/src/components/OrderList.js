import {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import "../styles/orderlist.css"
import axios from 'axios';

function OrderList() {
  const[orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8001/api/orders")
    .then(res => {
      console.log("Order has been received:", res.data);
      setOrders(res.data)
    })
    .catch(err => {
      console.error("ApI error:", err)
    })

  }, [])


  return (
    <div className='orderlist'>
      <h1>Recent Orders</h1>
{orders.length === 0 ? (
  <p>No Oder has been placed.</p>
) : (
  <ul>
  {orders.map(order => (
    <li key={order._id}>
      <div style={{fontSize: "16px"}}>
        <strong>Table:</strong> {order.tableNumber} <br/>
         <strong>Waiter:</strong> {order.waiterName}<br/>
          <strong>Time:</strong> {new Date(order.orderTime).toLocaleString()}<br/>
           <strong>Total:</strong> Ksh.{order.totalAmount ? order.totalAmount.toLocaleString() : "0"} 
           <hr  style={{width: "100%"}}/>
      </div>
      Table {order.tableNumber} - {order.waiterName} - {new Date(order.orderTime).toLocaleString()}
      <Link to={`/receipt/${order._id}`} className='orderlink'>
      View Reciept
      </Link >
  

    </li>
  ))}
</ul>

)
}
    </div>
  )
}

export default OrderList
