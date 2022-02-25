import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';

function TopBar() {

    const [user, setuser] = useState("");

    async function login(user = null){
      setuser(user);
    }
  
    async function logout() {
      setuser(null)
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                        Telaga Seafood <i className="fab fa-typo3"></i>  
                

                    <ul className= "nav-menu">
                        <li className="nav-item">
                            <Link to="/menu" className="nav-links">
                               Menu
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/login" className="nav-links">
                                Login
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link to="/register" className="nav-links">
                                Register
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/login2" className="nav-links">
                                Login 2
                            </Link>
                        </li>

                        <li className="nav-item">
                            {
                                user ? (
                                    <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}> 
                                    Logout {user.name}</a>
                                ) : (
                                    <Link to="/login" className="nav-links">
                                    Login
                                    </Link>
                                )
                            }
                        </li>

                    </ul>                    
                </div>

            </nav>    
        </>
    )
}

export default TopBar
