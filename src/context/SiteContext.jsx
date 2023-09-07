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

    // const priorityInfo = {
    //     "1": { color: "red", text: "crucial" },
    //     "2": { color: "orange", text: "a little important" },
    //     "3": { color: "blue", text: "medium" },
    //     "4": { color: "green", text: "less important" },
    //     "5": { color: "gray", text: "slight" },
    // }

    let defaultNote = {
        id: "",
        content: "",
        priority: "",
        image: ""
    }

    const navigate = useNavigate()
    const [note, setNote] = useState(defaultNote)
    const [onlineUser, setOnlineUser] = useState({})
    const [isValid, setIsValid] = useState(false)
    const [noteList, setNoteList] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [userId, setUserId] = useState()
    const [editedNote, setEditedNote] = useState({})
    const [imageUrl, setImageUrl] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [imgSize, setImgSize] = useState(false)  // image boyutunu kontrol etmek


    useEffect(() => {

        const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"))
        if (storedOnlineUser?.id) {
            navigate("/mylist")
            setIsValid(true)
        } else {
            navigate("/login")
        }
        setNoteList(storedOnlineUser?.notes ?? [])
        setImgSize(false)
    }, [])


    return (
        <SiteContext.Provider value={{ setOnlineUser, onlineUser, navigate, defaultUser, isValid, setIsValid, noteList, setNoteList, setOpenModal, openModal, isDelete, setIsDelete, setUserId, userId, editedNote, setEditedNote, imageUrl, setImageUrl, showAlert, setShowAlert, note, setNote, defaultNote, imgSize, setImgSize }}>
            {children}
        </SiteContext.Provider>
    )
}