import React from 'react';
import { useContext } from 'react';
import { SiteContext } from '../context/SiteContext';
import './style/modal.scss';

export default function Modal() {

    const { isDelete, setIsDelete, setOpenModal, noteList, userId, setNoteList, setShowDangerAlert } = useContext(SiteContext)

    function handleDelete() {
        setOpenModal(false)
        if (isDelete) {
            const filteredNoteList = noteList?.filter(note => note.id !== userId)
            setNoteList(filteredNoteList)
            const storedUser = JSON.parse(localStorage.getItem("onlineUser"))
            storedUser.notes = filteredNoteList ?? []
            localStorage.setItem("onlineUser", JSON.stringify(storedUser))
        }
        setIsDelete(false)
        setShowDangerAlert(true)
        setTimeout(() => {
            setShowDangerAlert(false)
        }, 1000);
    }

    function handleClose() {
        setIsDelete(false)
        setOpenModal(false)
        setShowDangerAlert(false)
    }

    return (
        <>

            <div className="modal-box">
                <div className="header">
                    <button onClick={handleClose} className="close-modal">x</button>
                </div>
                <div className="body">
                    <p>Silmek istediğinize emin misiniz?</p>
                </div>
                <div className="footer">
                    <button onClick={handleClose} className="close-btn">Close</button>
                    <button onClick={handleDelete} className="delete-btn">Delete</button>
                </div>
            </div>

        </>
    );
}
