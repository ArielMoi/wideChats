import Login from "../Login/Login.Component";
import Logout from "../Logout/Logout.Component";
import logo from '../../img/wideChatIcon.png';
import { useHistory } from "react-router-dom";
import './Navbar.css'

const Navbar = ({isAuthenticated}) => {
    const history = useHistory();
    return (
      <div className="navbar">
        <ul>
          <li>
            <img src={logo} onClick={() => history.push("/")} />
          </li>
          <li>
            <button className='btn-nav' onClick={() => history.push("/favorites-chats")}>
              Favorites Chats
            </button>
          </li>
          <li>
            <button className='btn-nav' onClick={() => history.push("/created-chats")}>
              Created Chats
            </button>
          </li>
          <li>
          </li>
          <li>
          </li>
          <li>
          </li>
          <li>
          </li>
          <li className="log">{isAuthenticated ? <Logout /> : <Login />}</li>
        </ul>
      </div>
    );
}

export default Navbar;