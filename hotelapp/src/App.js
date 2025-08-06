import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import ReceiptPg from "./pages/ReceiptPg";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import "./styles/app.css";
import Menu from "./pages/Menu";
import FoodItems from "./pages/FoodItems";
import Signin from "./pages/Signin";
import Food from "./pages/Food"


import Admin from "./pages/Admin";

function App() {
  return (

     <Router>
      <Navbar/>
      <Routes>
     
        <Route path="/receipt/:id" element={<ReceiptPg/>}/>
        <Route path="/order"  element={<OrderForm/>}/>
        <Route path="/list" element={<OrderList/>} />
        <Route path="/food"  element={<FoodItems/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route  path="/sign"  element={<Signin/>} />
        <Route path="/menu"  element={<Menu/>}/>
          <Route path="/video"  element={<Food/>}/>
      </Routes>
     </Router>
  );
}

export default App;
