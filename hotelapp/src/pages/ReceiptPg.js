import {useState, useEffect} from 'react';
import axios from 'axios';
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
        <h1>Hotel Order Receipt</h1>
        <p><strong>Waiter:</strong>{order.waiterName}</p>
        <p><strong>Table:</strong>{order.tableNumber}</p>
        <p><strong>Date</strong>{new Date(order.orderTime).toLocaleDateString()}</p>
        <hr/>
        <ul>
            {order.items.map((item, index) =>(
                <li key={index}>
                    {item.name} x {item.quantity} = {item.quantity * item.price} KSH

                </li>
            ))}
        </ul>
        <hr/>
        <h4>Toatal: {order.totalAmount} KSH</h4>
        <button onClick={printReceipt}>
            Print Receipt
        </button>
      
    </div>
  )
}

export default ReceiptPg
