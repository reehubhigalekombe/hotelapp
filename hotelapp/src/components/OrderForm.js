import {useState, useEffect} from 'react'
import "../styles/orderform.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function OrderForm() {
  const [waiterName, setWaiterName] = useState("");
  const[tableNumber, setTableNumber] = useState("");
  const [category, setCategory] = useState("breakfast")
  const [menu, setMenu] = useState({breakfast: [], lunch:  [], dinner: []})
  const[items, setItems] = useState([{name: "", quantity: 1, price: 0}]);
  const [orderItems, setOrderItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`http://localhost:8001/api/mlo?category=${category}`);
        setMenu(prev => ({
          ...prev, 
          [category]: res.data

        }));

      }catch(err) {
        console.error("Failed to laod the menu:", err)
        alert("Failed to load Menu")
      }
    };
    fetchMenu();

  }, [category])
  
  const addItem = (item) => {
    const existing = orderItems.find(i => i.name === item.name);
    if(existing) {
      setOrderItems(orderItems.map(i => 
        i.name === item.name ? {...i, quantity: i.quantity + 1} : i
      ))
    } else {
      setOrderItems([...orderItems, {name: item.name, quantity: 1, price: item.price}])
    }
  }

  const updateQuantity = (index, value) => {
    const newItems = [...orderItems];
    newItems[index].quantity = parseInt(value);
    setOrderItems(newItems)
  };

const totalAmount = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
       const res = await axios.post("http://localhost:8001/api/orders", {
        waiterName,
        tableNumber,
        items: orderItems,
        totalAmount
      });
      const receiptId = res.data._id
      alert("The Order has been placed succesfully");
      setWaiterName("");
      setTableNumber("");
      setOrderItems([]);
                navigate(`/receipt/${receiptId}`)

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
<div className='table'>
  {["breakfast", "lunch", "dinner"].map(cat => (
    <button key={cat} type='button'
    className={
      category === cat ?  "active" : ""
    }
    onClick={() => setCategory(cat)}
    >
{cat}
    </button>
  ))}

</div>

<div style={{
  display: 'grid', gridTemplateColumns: "repeat(7, 1fr)",
  gap: "15px", marginTop: "10px"
}}>
{
  menu[category].map(item => (
    <div key={item._id}
    className='foocrd' 
    onClick={() => addItem(item)}
    > 
    <h3> {item.name}  </h3>
    <p>KES {item.price}</p>
      </div>
  ))
}
</div>
      {
        orderItems.length > 0 && (
          <div className='select'>
            <h2>Selected Items</h2>
            <ul>
              {
                orderItems.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - KES {item.price} x
                    <input 
                    type='number'
                    value={item.quantity}
                    min={1}
                    onChange={e => updateQuantity(idx, e.target.value)}
                    />

                  </li>
                ))
              }
            </ul>
            <h5>Total: KES {totalAmount}</h5>

          </div>
        )
      }

<div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "1rem"}}>
<button type='submit'>Submit Order</button>
</div>

    </form>
  )
}

export default OrderForm
