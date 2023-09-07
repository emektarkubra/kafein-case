import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assests/logo.svg";
import { SiteContext } from "../context/SiteContext";
import "./style/header.scss"



export default function Header() {
    const { isValid, setIsValid, noteList } = useContext(SiteContext)
    const [storedOnlineUser, setStoredOnlineUser] = useState(null)

    useEffect(() => {
        const localStorageOnlineUser = JSON.parse(localStorage.getItem("onlineUser"))
        setStoredOnlineUser(localStorageOnlineUser)
    }, [isValid])

    function handleSignOut(e) {
        setIsValid(false)
        localStorage.removeItem("onlineUser")
        localStorage.setItem("noteList", JSON.stringify(noteList))

    }

    return (
        <>
            <header className="p-3 bg-dark">
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <div className="logo-box">


                            {
                                storedOnlineUser?.id ? (<>
                                    <NavLink to="/mylist" className="d-flex flex-wrap align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                                        <img className="logo-img" src={logo} alt="image not found" />
                                    </NavLink>
                                </>) : <img className="logo-img" src={logo} alt="image not found" />
                            }
                        </div>
                        <div className="text-end">
                            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                {
                                    storedOnlineUser?.id && (<>
                                        <li><NavLink className="nav-link px-2 text-white" to="/mylist"><button type="button" className="btn btn-outline-light me-2">MyList</button></NavLink></li>
                                    </>)
                                }
                                {
                                    storedOnlineUser?.id && <li><NavLink className="nav-link px-2 text-white" to="/addnotes"><button type="button" className="btn btn-outline-light me-2">Add Notes</button></NavLink></li>
                                }
                                <li>
                                    <NavLink className="nav-link px-2 text-white" to="/login">
                                        {
                                            storedOnlineUser?.id ? <button onClick={handleSignOut} type="button" className="btn btn-danger">Sign out {`(${storedOnlineUser.username})`}</button> : <button type="button" className="btn btn-warning">Login</button>
                                        }
                                    </NavLink>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}