import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const SiteContext = createContext()

export default function SiteContextProvider({ children }) {

    let defaultUsers = [
        {
            id: 1,
            username: "admin",
            password: "12345",
            notes: []
        },
        {
            id: 2,
            username: "kubra",
            password: "12290219",
            notes: []
        }
    ]

    const [users, setUsers] = useState(defaultUsers)
    const [onlineUser, setOnlineUser] = useState({})
    const [isUserValid, setIsUserValid] = useState(false) // login ile kullanıcı eşleştiğinde
    const navigate = useNavigate()


    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(defaultUsers))
        const localStorageUsers = JSON.parse(localStorage.getItem("users"))
        setUsers(localStorageUsers ?? [])
        const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"))
        setOnlineUser(storedOnlineUser) // sayfa yüklendiğinde localStorage dan onlineUser'ı al ve onlineUser'ı tekrar setle
        if (storedOnlineUser?.id) {
            navigate("/mylist")
            setIsUserValid(true) // storedOnlineUser varsa isUserValid true olsun. Çünkü login ve sign out kontrolünü yapıyor
        } else {
            navigate("/login")
        }
    }, [])

    function handleUserLogin(e) {
        e.preventDefault()
        const isUserValid = users.some(user => (user.username === onlineUser.username) && (user.password === onlineUser.password));
        setIsUserValid(isUserValid)
        users.some(user => (user.username === onlineUser.username) && (user.password === onlineUser.password) && localStorage.setItem("onlineUser", JSON.stringify(user)));
        navigate("/mylist")
    }

    return (
        <SiteContext.Provider value={{ handleUserLogin, setIsUserValid, isUserValid, setOnlineUser }}>
            {children}
        </SiteContext.Provider>
    )
}