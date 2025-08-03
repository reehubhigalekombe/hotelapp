import {useState, useEffect} from 'react'
import "../styles/orderform.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {FaSearch} from "react-icons/fa"

function OrderForm() {
  const [waiterName, setWaiterName] = useState("");
  const[tableNumber, setTableNumber] = useState("");
  const [category, setCategory] = useState("breakfast")
  const [menu, setMenu] = useState({breakfast: [], lunch:  [], dinner: [], drinks: []})
  const [orderItems, setOrderItems] = useState([]);
  const navigate = useNavigate();
  const[searchItem, setSearchItem] = useState("")

  const filterMenu = searchItem
  ? [...menu.breakfast, ...menu.lunch, ...menu.dinner, ...menu.drinks].filter(item => 
    item.name.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase())
  ) : menu[category]
  const handleCancelOrder = () => {
    const confirmCancel = window.confirm("Are you sure you wanna CANCEL the ORDER?");
    if(!confirmCancel) return;
    setWaiterName("");
    setTableNumber("");
    setOrderItems([])
  }

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
    <div className='orderpage'>

<form onSubmit={handleSubmit}>
      <h2>PLACE ORDER</h2>
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

      <div className='searchbar'>
<input
type='text'
value={searchItem}
placeholder='Search Items'
onChange={(e) => setSearchItem(e.target.value)}
style={{width: "80%", borderRadius: "98px"}}
/>
<FaSearch
style={{position: "absolute", right: "73px", top: "40%", transform: "translateY(-50%"}}
/>
      </div>
<div className='table'>
  {["breakfast", "lunch", "dinner", "drinks"].map(cat => (
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
  display: 'grid', gridTemplateColumns: "repeat(3, 1fr)",
  gap: "1.5rem", marginTop: "10px"
}}>
{
  filterMenu .map(item => (
    <div key={item._id} className='foocrd' onClick={() =>addItem(item)}>
<img src={`http://localhost:8001${item.image}`} alt={item.name}
style={{width: "298px", height: "175px", objectFit: "cover", borderRadius: "8px"}}
/>
<div style={{display: "flex", justifyContent: "space-between", margin: "0 3rem", fontSize: "18px"}}>
  <span style={{fontWeight: "bold"}}>{item.name} </span>
  <span>KES. {item.price}</span>  
</div>

</div>

  ))
}
</div>
      {
        orderItems.length > 0 && (
          <div className='select'>
            <h2>SELECTED ITEMS</h2>
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
            <hr/>
            <h5>Total: Ksh. {totalAmount}</h5>
 <hr/>
          </div>
        )
      }

<div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "1rem", width: "18%", marginTop: "2rem"}}>
<button type='submit'>Submit Order</button>
<button onClick={handleCancelOrder}  style={{color: "white", backgroundColor: "red"}}>
  Cancel Order
</button>
</div>

    </form>

    
    </div>
    
  )
}

export default OrderForm
