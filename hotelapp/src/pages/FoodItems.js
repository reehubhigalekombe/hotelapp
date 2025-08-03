import { useState } from 'react';
import axios from 'axios';
import "../styles/foodItems.css";
function FoodItems() {
    
    const [formData, setFormData] = useState([
        {
        name: "",
        price: "",
        category: "breakfast",
        available: true,
        image: null,
    }
    ]);

    const handleChange = (index, e) => {
       const {name, value, type, checked, files} = e.target;
       const newFormData = [...formData];
       newFormData[index][name] = type === "file" ? files[0] : (type === "checkbox" ? checked : value);
       setFormData(newFormData)   
    }

    const addFoodItem = () => {
        setFormData([...formData, {name: "", price: "", category: "breakfast", available: true, image: null}])
    };
    const removeFoodItem = (index) => {
        const newFormData = [...formData];
        newFormData.splice(index, 1)
        setFormData(newFormData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = formData.map((item) =>({
            name: item.name,
            price: item.price,
            category: item.category,
            available: item.available,
        }))

        const data = new FormData();
        data.append("formData", JSON.stringify(payload));
        formData.forEach((item) => {
            if(item.image) {
                data.append("image", item.image)
            }
        })
        try {
            const res = await axios.post("http://localhost:8001/api/mlo", data)
            if(res.status === 201) {
                alert("Food items have been added succesfuly");
                setFormData([
                    {
                        name: "",
                        price: "",
                        category: "breakfast",
                        available: true,
                        image: null
                    }
                ])
            }else {
                alert("Something must have gone wrong")
            }
        }catch(err) {
            console.error(err)
            alert("Failed to load food item")
        }
    }
  return (
    <div className='foodItems'>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
      <h2>ADD FOOD ITEMS</h2>
      {
        formData.map((item, index) => (
            <div key={index} className='foods'>
                 <h3>ITEM {index + 1}  </h3>

                 <div className='foodputs'>
<label htmlFor='food'>Food Name
<input 
type='text'
name='name'
value={item.name}
onChange={(e) => handleChange(index, e)}
required
placeholder='food name'
/>
</label>
<label htmlFor='price'>Price
<input  type='number' name='price' value={item.price} onChange={(e) => handleChange(index, e)}
placeholder='price'
required
style={{
    width: "100%"
}} />
</label>
</div>

<div className='foodputs'>
<label htmlFor='category'>Category &nbsp;
<select name='category' value={item.category} onChange={(e) => handleChange(index, e)}  >
    <option value="breakfast">Breakfast</option>
    <option value="lunch">Lunch</option>
    <option value="dinner">Dinner</option>
    <option value="drinks">Drinks</option>
</select>
</label>

<label htmlFor='avialable'>Available
<input  type='checkbox'  name='available' checked={item.available} onChange={(e) => handleChange(index, e)}  />
</label>
</div>


<div className='foodputs'>
<label htmlFor='image'>Image
<input type='file'  name='image' accept='image/*' onChange={(e) => handleChange(index, e)}  />
</label>
</div>
{
    formData.length > 1 && (
        <button type='button' onClick={() => removeFoodItem(index)}  className='removeB'>
         Remove   
        </button>
    )
}

            </div>
        ))
      }
   <div style={{display: "flex", flexDirection: "row", gap: "20px", justifyContent: "center", alignItems: "center"}}>
       
<button type='button' onClick={addFoodItem}  > 
    Add More</button>

<button type='submit' >Submit AllFood Item</button>
   </div>
      </form>
    </div>
  )
}

export default FoodItems
