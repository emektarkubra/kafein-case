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

    const [notesNumber, setNotesNumber] = useState(0)


    useEffect(() => {

        const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"))
        const storedNoteList = JSON.parse(localStorage.getItem("noteList"))
        if (storedOnlineUser?.id) {
            navigate("/mylist")
            setIsValid(true)
        } else {
            navigate("/login")
        }
        setNoteList(storedOnlineUser?.notes ?? storedNoteList)
        setImgSize(false)
        setShowAlert(false)
        setNotesNumber(storedOnlineUser?.notes.length)
    }, [])


    return (
        <SiteContext.Provider value={{ setOnlineUser, onlineUser, navigate, defaultUser, isValid, setIsValid, noteList, setNoteList, setOpenModal, openModal, isDelete, setIsDelete, setUserId, userId, editedNote, setEditedNote, imageUrl, setImageUrl, showAlert, setShowAlert, note, setNote, defaultNote, imgSize, setImgSize }}>
            {children}
        </SiteContext.Provider>
    )
}