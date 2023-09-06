import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { SiteContext } from "../context/SiteContext"

export default function NoteCard({ item }) {
    const { setOpenModal, setIsDelete, setUserId } = useContext(SiteContext)

    function handleRemoveNote(id) {
        setOpenModal(true)
        setUserId(id)
        setIsDelete(true)
    }

    return (
        <div className="card mb-5">
            <div className="card-header">
                Featured
            </div>
            <div className="card-body " style={{ width: "50em" }}>
                <div className="img">
                    <img style={{ width: "30px", height: "30px" }} src={item.image} alt="" />
                </div>
                <div>
                    <h5 className="card-title">{item.content}</h5>
                    <p className="card-text">{item.priority}</p>
                    <button type="button" className="btn btn-primary btn-sm">Edit</button>
                    <button onClick={() => handleRemoveNote(item.id)} type="button" className="btn btn-danger btn-sm">Remove</button>

                </div>
            </div>

        </div>
    )
}