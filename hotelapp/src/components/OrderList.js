import {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import "../styles/orderlist.css"
import axios from 'axios';
function OrderList() {
  const[orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8001/api/orders")
    .then(res => setOrders(res.data))
    .catch(err => console.error(err))

  }, [])


  return (
    <div className='orderlist'>
      <h2>Recent Orders</h2>
<ul>
  {orders.map(order => (
    <li key={orders._id}>
      Table {order.tableNumber} - {order.waiterName} - {new Date(order.orderTime).toLocaleString()}
      <Link to={`/receipt/${order._id}`} className='orderlink'>
      View Reciept
      </Link >

    </li>
  ))}
</ul>
    </div>
  )
}

export default OrderList
