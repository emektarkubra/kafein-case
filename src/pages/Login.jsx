import { useContext } from "react"
import { SiteContext } from "../context/SiteContext"
import logo from "../assests/logo.svg"
import { useState } from "react"

export default function Login() {
    const { setOnlineUser, defaultUser, onlineUser, navigate, setIsValid, noteList } = useContext(SiteContext)

    function handleChangeUserLoginInput(e) {
        setOnlineUser(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    function handleUserLogin(e) {
        e.preventDefault()
        if (defaultUser.username === onlineUser.username && defaultUser.password === onlineUser.password) {
            setIsValid(true)
            defaultUser.notes = noteList ?? []
            localStorage.setItem("onlineUser", JSON.stringify(defaultUser));

            navigate("/mylist")
        }

    }

    return (
        <>
            <div className="col-5" >
                <div className="mb-3 text-center">
                    <img src={logo} className="img-fluid" alt="..." />
                    <p className="h4 fw-bold">Welcome to Note-Book</p>
                </div>

                <form onSubmit={handleUserLogin}>
                    <div className="mb-3">
                        <label htmlFor="disabledTextInput" className="form-label">Username</label>
                        <input onChange={handleChangeUserLoginInput} name="username" type="text" id="disabledTextInput" className="form-control" placeholder="Enter your username" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input onChange={handleChangeUserLoginInput} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Enter your password" required />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>

        </>
    )
}