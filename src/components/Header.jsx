import { NavLink } from "react-router-dom";
import logo from "../assests/logo.svg"

export default function Header() {
    return (
        <>
            <header className="p-3 bg-dark text-white">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <NavLink to="/mylist" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <img src={logo} alt="" />
                        </NavLink>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><NavLink className="nav-link px-2 text-white" to="/mylist">MyList</NavLink></li>
                            <li><NavLink className="nav-link px-2 text-white" to="/editnotes">EditNotes</NavLink></li>
                        </ul>

                        <div className="text-end">
                            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                <li><NavLink className="nav-link px-2 text-white" to="/addnotes"><button type="button" className="btn btn-outline-light me-2">Add Notes</button></NavLink></li>
                                <li><NavLink className="nav-link px-2 text-white" to="/login"><button type="button" className="btn btn-warning">Login</button></NavLink></li>
                            </ul>

                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}