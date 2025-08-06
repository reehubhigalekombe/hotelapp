import { useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";
function Navbar() {
  const navbarRef = useRef(null)
  return (
    <div className="dash" ref={navbarRef}>

  <img src="http://localhost:8001/uploads/logi.jpg"  alt="logo"/>
  <button><Link to="/admin" style={{textDecoration: "none", color: "black"}}>Admin</Link></button>
<Link to="/sign" className="links">DASHBORD</Link>
<Link to="/order"  className="links">MAKE ORDER</Link>
<Link to="/list"  className="links">VIEW ORDER</Link>
<Link to="/food" className="links">ADD FOOD</Link>
<Link to="/menu" className="links">MENU UPDATE</Link>
<Link to="/video" className="links">FOOD</Link>
<button>Logout</button>
  <img src="http://localhost:8001/uploads/logi.jpg"  alt="logo"/>
</div>


  )
}

export default Navbar;
