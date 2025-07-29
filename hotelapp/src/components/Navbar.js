
import { Link } from "react-router-dom";
import "../styles/dashboard.css";
 import logo from "../assets/logi.jpg"
function Navbar() {
  return (
    <div className="dash">

  <img src={logo}  alt="logo"/>
  <button>Admin</button>
<Link to="/dash" className="links">DASHBORD</Link>
<Link to="/order"  className="links">MAKE ORDER</Link>

<Link to="/view"  className="links">VIEW ORDER</Link>
<button>Login</button>
  <img src={logo}  alt="logo"/>
</div>


  )
}

export default Navbar;
