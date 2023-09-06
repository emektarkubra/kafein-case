import { useContext } from "react"
import Modal from "../components/Modal"
import NoteCard from "../components/NoteCard"
import { SiteContext } from "../context/SiteContext"

export default function NoteList() {
    const { noteList, openModal, setNoteList } = useContext(SiteContext)

    function handleFilterNotes(e) {
        const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"))
        const filteredNoteList = storedOnlineUser.notes.filter(note => note.content.includes(e.target.value))
        setNoteList(filteredNoteList)
    }

    function handleSortNotes(e) {
        const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"))
        if (e.target.value === "1") {
            storedOnlineUser.notes.sort((a, b) => a.priority - b.priority)
            setNoteList(storedOnlineUser.notes)
        } else if (e.target.value === "2") {
            storedOnlineUser.notes.sort((a, b) => b.priority - a.priority)
            setNoteList(storedOnlineUser.notes)
        }
    }

    return (
        <>
            {
                openModal && <Modal />
            }
            <div className="col-6" >
                <div className="form-group mb-3">
                    <input onChange={handleFilterNotes} type="text" id="disabledTextInput" className="form-control" placeholder="Filter your note" />
                </div>
                <div className="form-group mb-3">
                    <select onChange={handleSortNotes} className="form-select" aria-label="Default select example">
                        <option value="default" >Sort by priority</option>
                        <option value="1">Low to High</option>
                        <option value="2">High to Low</option>
                    </select>
                </div>

                {
                    noteList?.map(item => <NoteCard key={item.id} item={item} />)
                }
            </div>
        </>
    )
}