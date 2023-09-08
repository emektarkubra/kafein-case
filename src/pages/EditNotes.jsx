import { useEffect } from "react"
import { useContext } from "react"
import Alert from "../components/Alert"
import { SiteContext } from "../context/SiteContext"

export default function EditNotes() {
    const { showAlert, setShowAlert, editedNote, setEditedNote, setImageUrl, imageUrl, noteList, imgSize, setImgSize } = useContext(SiteContext)

    useEffect(() => {
        setEditedNote(prev => {
            return {
                ...prev,
                image: imageUrl
            }
        })
    }, [imageUrl])


    function handleonChangeEditInput(e) {
        setEditedNote(prev => {
            return {
                ...prev,
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
        if (e.target.files[0].size >= 8000) {
            setImageUrl()

        } else {
            const base64File = await toBase64(e.target.files[0])
            setImageUrl(base64File);
            setEditedNote(prev => {
                return {
                    ...prev,
                    image: imageUrl
                }
            })
        }
    }

    function handleSubmitEditedNote(e) {
        e.preventDefault()

        if (imageUrl === undefined) {
            // for alert
            setImgSize(true)

            setTimeout(() => {
                setImgSize(false)
            }, 1000);

        } else {

            const index = noteList.findIndex(item => item.id === editedNote.id)
            noteList.splice(index, 1, editedNote)
            const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"))
            storedOnlineUser.notes = noteList
            localStorage.setItem("onlineUser", JSON.stringify(storedOnlineUser))

            // for success alert
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 1000);
        }
    }


    return (
        <>
            <div className="col-5" >
                {
                    imgSize ? <Alert alert="danger" content="Couldn't added.. image size too big" /> : ""
                }
                {
                    showAlert ? <Alert alert="success" content="Updated note" /> : ""
                }
                <form onSubmit={handleSubmitEditedNote}>
                    <div className="form-group mb-3">
                        <label htmlFor="disabledTextInput" className="form-label">Change your note</label>
                        <input onChange={handleonChangeEditInput} value={editedNote.content} name="content" type="text" id="disabledTextInput" className="form-control" placeholder="Add your note" />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="disabledTextInput" className="form-label">Change your priority (1-5)</label>
                        <input onChange={handleonChangeEditInput} value={editedNote.priority} name="priority" type="number" id="disabledTextInput" className="form-control" placeholder="Select priority" min="1" max="5" />
                    </div>
                    <div className="form-group mb-3">
                        <label className="d-block" htmlFor="exampleFormControlFile">Select Image</label>
                        <input onChange={handleImageRead} type="file" className="form-control-file" id="exampleFormControlFile" accept="image/png, image/jpeg" />
                    </div>
                    <div className="form-group mb-3">
                        <button type="submit" className="btn btn-primary">Edit note</button>
                    </div>

                </form>
            </div>
        </>
    )
}