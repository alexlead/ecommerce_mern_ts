import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navbar-title">
            <h1>E-commerce Test App</h1>
        </div>
        <div className="navbar-links">
            <Link to="/">Shop</Link>
            <Link to="/purchased-items">Purchases</Link>
            <Link to="/checkout"><FontAwesomeIcon icon={faShoppingCart} /></Link>
        </div>
    </div>
  )
}

export default Navbar