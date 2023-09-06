import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { SiteContext } from "../context/SiteContext";


export default function AddNotes() {
    const { noteList, setNoteList } = useContext(SiteContext)

    let defaultNote = {
        id: "",
        content: "",
        priority: "",
        image: ""
    }

    const [note, setNote] = useState(defaultNote)
    const [imageUrl, setImageUrl] = useState("")

    useEffect(() => {
        setNote(prev => {
            return {
                ...prev,
                image: imageUrl
            }
        })
    }, [imageUrl])

    useEffect(() => {
        const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"))
        storedOnlineUser.notes = noteList ?? []
        localStorage.setItem("onlineUser", JSON.stringify(storedOnlineUser))

    }, [noteList?.length])

    function handleChangeNoteInput(e) {
        setNote(prev => {
            return {
                ...prev,
                id: uuidv4(),
                [e.target.name]: e.target.value
            }
        })
    }

    function read(e) {
        if (e.target.files[0].size >= 3000) {
            console.log("çok büyük")
            setImageUrl("")
        } else {
            setImageUrl(URL.createObjectURL(e.target.files[0]));
            setNote(prev => {
                return {
                    ...prev,
                    image: imageUrl
                }
            })
        }
    }


    function handleSubmit(e) {
        setNoteList(prev => {
            const updatedNoteList = [note, ...prev]
            return updatedNoteList ?? []
        })

        e.target.reset()
        e.preventDefault()
    }

    return (
        <>
            <div className="col-5" >
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="disabledTextInput" className="form-label">Note</label>
                        <input onChange={handleChangeNoteInput} name="content" type="text" id="disabledTextInput" className="form-control" placeholder="Add your note" required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="disabledTextInput" className="form-label">Select priority (1-5)</label>
                        <input onChange={handleChangeNoteInput} name="priority" type="number" id="disabledTextInput" className="form-control" placeholder="Select priority" min="1" max="5" required />
                    </div>
                    <div className="form-group mb-3">
                        <label className="d-block" htmlFor="exampleFormControlFile">Select Image</label>
                        <input onChange={read} name="image" type="file" className="form-control-file" id="exampleFormControlFile" accept="image/png, image/jpeg" />
                    </div>
                    <div className="form-group mb-3">
                        <button type="submit" className="btn btn-primary">Add note</button>
                    </div>
                </form>
                <img src={imageUrl} alt="" />
            </div>
        </>
    )
}