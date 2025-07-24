
import OrderForm from "../components/OrderForm";
import OrderList from "../components/OrderList";
import "../styles/dashboard.css"
function Dashboard() {
  return (
    <div className="dash">
  <h1>Hotel  Oder Making</h1>
  <div className="dash-partition">
    <OrderForm/>
    <OrderList/>

  </div>
    </div>
  )
}

export default Dashboard
