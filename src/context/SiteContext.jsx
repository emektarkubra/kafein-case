import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const SiteContext = createContext()

export default function SiteContextProvider({ children }) {

    let defaultUser = {
        id: 1,
        username: "admin",
        password: "12345",
        notes: []
    }


    const [onlineUser, setOnlineUser] = useState({})
    const [isValid, setIsValid] = useState(false)
    const [noteList, setNoteList] = useState([])
    const navigate = useNavigate()

    const [openModal, setOpenModal] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [userId, setUserId] = useState()


    useEffect(() => {

        const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"))
        if (storedOnlineUser?.id) {
            navigate("/mylist")
            setIsValid(true) // storedOnlineUser varsa isUserValid true olsun. Çünkü login ve sign out kontrolünü yapıyor
        } else {
            navigate("/login")
        }
        setNoteList(storedOnlineUser?.notes ?? [])
    }, [])


    return (
        <SiteContext.Provider value={{ setOnlineUser, onlineUser, navigate, defaultUser, isValid, setIsValid, noteList, setNoteList, setOpenModal, openModal, isDelete, setIsDelete, setUserId, userId }}>
            {children}
        </SiteContext.Provider>
    )
}