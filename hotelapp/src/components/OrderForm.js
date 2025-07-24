import {useState} from 'react'
import "../styles/orderform.css";
import axios from "axios";

function OrderForm() {
  const [waiterName, setWaiterName] = useState("");
  const[tableNumber, setTableNumber] = useState("");
  const[items, setItems] = useState("");

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  }

  const addItem = () => {
    setItems([...items, {name: "", quantity: 1, price: 0}] );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalAmount = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    try{
      await axios.post("http://localhost:8000/api/orders", {
        waiterName,
        tableNumber,
        items,
        totalAmount
      });
      alert("The Order has been placed succesfully");
      setWaiterName("");
      setTableNumber("");
      setItems({name: "", quantity: 1, price: 0})

    }catch(err){
      alert("Error occured while placing an Order")
    }
  }
  return (
    <form className='orderform' onSubmit={handleSubmit}>
      <h2>Place Order</h2>
      <input
      type='text'
      placeholder='Waiter Name'
      value={waiterName}
      onChange={(e) => setWaiterName(e.target.value)}
      required
      />
      <input 
      type='text'
      placeholder='Table Number'
      value={tableNumber}
      onChange={(e) => setTableNumber(e.target.value)}
      required
      />
{items.localeCompare((item, index) => (
  <div key={index} className='row'>
    <input 
    type='text'
    value={item.name}
    placeholder='Item Name'
    onChange={e => handleItemChange(index, "name", e.target.value)}
    required
    />
    <input
    type='number'
    placeholder='Qty'
    value={item.quantity}
    onChange={e => handleItemChange(index, "quantity", parseInt(e.target.value))}
    required
     />
     <input 
     type='number'
     value={item.price}
     placeholder='Price'
     onChange={e => handleItemChange(index, "price", parseFloat(e.target.value))}
     required
     />

  </div>
))}

<button type='button' onClick={addItem}>Add Item</button>
<button type='submit'>Submit Order</button>

    </form>
  )
}

export default OrderForm
