import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import Alert from "../components/Alert";
import { SiteContext } from "../context/SiteContext";


export default function AddNotes() {
    const { noteList, setNoteList, showAlert, setShowAlert, note, setNote, defaultNote, imgSize, setImgSize } = useContext(SiteContext)
    const [imageUrl, setImageUrl] = useState("")

    useEffect(() => {
        setShowAlert(false)
    }, [])

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

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    async function handleImageRead(e) {
        if (e.target.files[0].size >= 3000) {
            setImageUrl()
        } else {
            const base64File = await toBase64(e.target.files[0])
            setImageUrl(base64File);
            setNote(prev => {
                return {
                    ...prev,
                    image: imageUrl
                }
            })
        }
    }


    function handleSubmit(e) {
        if (note.image === undefined) {

            // for alert
            setImgSize(true)
            setTimeout(() => {
                setImgSize(false)
            }, 1000);

        } else {
            setNoteList(prev => {
                const updatedNoteList = [note, ...prev]
                return updatedNoteList ?? []
            })

            // for success alert
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 1000);

        }
        e.target.reset()
        e.preventDefault()
    }

    return (
        <>
            <div className="col-5" >

                {
                    showAlert ? <Alert alert="success" content="Added note" /> : ""
                }
                {
                    imgSize ? <Alert alert="danger" content="Couldn't added.. image size too big" /> : ""
                }

                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label htmlFor="disabledTextInput" className="form-label">Note</label>
                        <input onChange={handleChangeNoteInput} name="content" type="text" id="disabledTextInput" className="form-control" placeholder="Add your note" required />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="disabledTextInput" className="form-label">Select priority (1-5)</label>
                        <input onChange={handleChangeNoteInput} name="priority" type="number" id="disabledTextInput" className="form-control" placeholder="Select priority" min="1" max="5" required />
                    </div>
                    <div className="form-group mb-4">
                        <label className="d-block" htmlFor="exampleFormControlFile">Select Image</label>
                        <input onChange={handleImageRead} name="image" type="file" className="form-control-file" id="exampleFormControlFile" accept="image/png, image/jpeg" />
                    </div>
                    <div className="form-group mb-4">
                        <button type="submit" className="btn btn-primary">Add note</button>
                    </div>
                </form>

            </div>
        </>
    )
}