import {useState, useEffect} from 'react'
import "../styles/menu.css";
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

function Menu() {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        image: ""
    })
    const [items, setItems] = useState([])
    const [search, setSearch] = useState("")
    const [selectedItem, setSelectedItem] = useState("");

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    };

    const handleSelectItem = (item) => {
        console.log("Selected item", item)
        setSelectedItem(item);
        setFormData({
            name: item.name,
            price: item.price,
            category: item.category,
            image: ""
        })
    };

    useEffect(() => {
        axios.get("http://localhost:8001/api/mlo")
        .then(res => setItems(res.data))
        .catch(err => console.error(err))

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formSend = new FormData();
        formSend.append("name", formData.name);
        formSend.append("price", formData.price);
        formSend.append("category", formData.category);

        if(formData.image) formSend.append("image", formData.image);

        try{ 
            await axios.put(`http://localhost:8001/api/mlo/items/:id${selectedItem._id}`, formSend, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            alert("FoodItem has been updated successfully")

        }catch(error) {
            console.error("Food item Upadated has failed", error)
        }
    }
    const filteredItem = items.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
    )
  return (
    <div className='menu'>
            <h1>MANAGE FOOD ITEMS</h1>
   <div style={{display: "flex", justifyContent: "center"}}>

     <input
    type='search'
    value={search}
    onChange={handleSearchChange}
    placeholder='Search the food item'
    style={{outline: "none", cursor: 'pointer', width: "50%", height: "32px", border: '1px solid black', borderRadius: '98px', paddingLeft: "20px" }}
    />
    <FaSearch
    style={{top: "38%", right: "328px", position: "absolute", transform: "translateY(-50%)"}}
    />
   </div>
      <div style={{
        display: "flex",
        justifyContent: "center"
      }}>
         
        {
        selectedItem && (
            <form onSubmit={handleSubmit} 
            style={{marginTop: "20px", width: "30%", display: "flex", flexDirection: "column", gap: "10px"}}>
<h2>Edit: {selectedItem.name}</h2>

<input 
type='text'
placeholder='name'
value={formData.name}
onChange={e => setFormData({...formData, name: e.target.value})}
required
style={{width: "100%"}}
/>
<br/>

<input
type='text'
value={formData.price}
onChange={e => setFormData({...formData, price: e.target.value})}
required
placeholder='Price'
style={{width: "100%", }}
  /> <br/>

  <select  
  value={formData.category}
  required
  onChange={e => setFormData({...formData, category: e.target.value})} style={{width: "105%", height: "32px"}}>

<option value="breakfast">Breakfast</option>
<option value="lunch">Lunch</option>
<option value="dinner">Dinner</option>
<option value="drinks">Drinks</option>
  </select>
  <br/>

<input  
type='file'
accept='image'
onChange={e => setFormData({...formData, image: e.target.files[0]})} style={{width: "100%", height: "20px"}}
/>
<br/>
<button type='submit' style={{width: "40%"}}>Update Food Item</button>
            </form>
        )
    }

      </div>
    <div className='menuContainer'>
       {
        filteredItem.map((item) => (
            <div key={item._id} onClick={()  => handleSelectItem(item)}
      className='imageCard'>
                <img src={`http://localhost:8001${item.image}`} alt={item.name}/>         
                  <div style={{display: 'flex', justifyContent: "space-between", margin: "0 2rem", fontSize: "16px"}}> 
                    <span style={{fontWeight: "bold"}}>      <p>{item.name}</p></span>
                            <span>     <p> {item.price} </p></span>
                    
                    </div>
            </div>
            
        ))
       } 
    </div>
  
   
    </div>
  )
}

export default Menu
