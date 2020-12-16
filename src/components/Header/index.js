import React from "react";
import {Link} from "react-router-dom";
import Logo from "../../assets/images/logo.png"
import "./index.css"

function Header() {
    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark col-12">

                    <Link to="/" className="navbar-brand col-6 col-sm-5 col-md-4 col-lg-2">
                        <img src={Logo} className="img-fluid" alt="Javaflix"></img>
                    </Link>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Alterna navegação">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse col-sm-6 col-md-10" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/categorias" className="nav-link text-white">Categorias</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/videos" className="nav-link text-white">Videos</Link>
                            </li>
                        </ul>
                    </div>

                </nav>
            </div>
        </div>
    );
}

export default Header;