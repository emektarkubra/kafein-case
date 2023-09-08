import { useContext } from "react"
import { Link } from "react-router-dom"
import { SiteContext } from "../context/SiteContext"
import LazyLoadImage from "./LazyLoadImage"
import "./style/noteCard.scss"
import { BsFillStarFill, BsPencilSquare, BsFillTrashFill } from "react-icons/bs";


export default function NoteCard({ item }) {
    const { setOpenModal, setIsDelete, setUserId, setEditedNote } = useContext(SiteContext)


    function handleRemoveNote(id) {
        setOpenModal(true)
        setUserId(id)
        setIsDelete(true)
    }

    function handleEditTask(id) {
        const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"))
        const editedNote = storedOnlineUser.notes.find(item => item.id === id)
        setEditedNote(editedNote)
    }

    return (
        <div className="card">
            <div className="card-header" >
                {[...Array(Number(item.priority))].map((item, index) => (
                    <BsFillStarFill className="star" key={index} />
                ))}
            </div>
            <div className="card-body">
                <div className="img-box">
                    <LazyLoadImage src={item.image} alt="image not found" />
                </div>
                <div className="card-content">
                    {item.content}
                </div>
                <div className="button-group">
                    <Link to="/editnotes"><button onClick={() => handleEditTask(item.id)} type="button" className="edit-btn"><BsPencilSquare /></button></Link>
                    <button onClick={() => handleRemoveNote(item.id)} type="button" className="remove-btn"><BsFillTrashFill /></button>
                </div>
            </div>
        </div>
    )
}