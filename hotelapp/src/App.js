import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ReceiptPg from "./pages/ReceiptPg";
import "./styles/app.css"
function App() {
  return (

     <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/receipt/:id" element={<ReceiptPg/>}/>
      </Routes>
     </Router>
  );
}

export default App;
