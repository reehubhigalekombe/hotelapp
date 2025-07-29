import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import ReceiptPg from "./pages/ReceiptPg";
import OrderForm from "./components/OrderForm";
import "./styles/app.css"
function App() {
  return (

     <Router>
      <Navbar/>
      <Routes>
     
        <Route path="/receipt/:id" element={<ReceiptPg/>}/>
        <Route path="/order"  element={<OrderForm/>}/>
      </Routes>
     </Router>
  );
}

export default App;
