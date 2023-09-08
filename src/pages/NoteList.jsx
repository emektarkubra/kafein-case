import { useContext, useEffect, useState } from "react"
import Alert from "../components/Alert"
import Modal from "../components/Modal"
import NoteCard from "../components/NoteCard"
import { SiteContext } from "../context/SiteContext"

export default function NoteList() {
    const { noteList, openModal, setNoteList, showDangerAlert } = useContext(SiteContext)

    const [count, setCount] = useState(10)
    const [displayedNotes, setDisplayedNotes] = useState([])

    useEffect(() => {
        const slicedNoteList = noteList?.slice(0, count)
        setDisplayedNotes(slicedNoteList)
    }, [noteList, count])

    function handleFilterNotes(e) {
        const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"))

        const filteredNoteList = storedOnlineUser.notes.filter(note => (note.content).toUpperCase().includes(e.target.value.toUpperCase()))
        setNoteList(filteredNoteList)
        setCount(10)
    }

    function handleSortNotes(e) {
        const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"))
        if (e.target.value === "1") {
            storedOnlineUser.notes.sort((a, b) => a.priority - b.priority)
            setNoteList(storedOnlineUser.notes)
        } else if (e.target.value === "2") {
            storedOnlineUser.notes.sort((a, b) => b.priority - a.priority)
            setNoteList(storedOnlineUser.notes)
        } else {
            setNoteList(storedOnlineUser.notes)
        }
        setCount(10)
    }

    function handleShowMore() {
        setCount(prev => prev + 10)
    }

    return (
        <>
            {
                openModal && <Modal />
            }

            <div className="col-7" >
                {
                    showDangerAlert ? <Alert alert="danger" content="Deleted note" className="position-fixed w-25 top-0 end-0" /> : ""
                }
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
                    noteList?.length === 0 ? <div className="form-group p-4 text-center"><h3> Couldn't found any notes </h3></div> : (<>
                        <div className="form-group mb-3">
                            {
                                displayedNotes?.map(item => <NoteCard key={item.id} item={item} />)
                            }
                            {
                                displayedNotes?.length !== noteList?.length  ? (<>
                                 <div className="form-group mb-3">
                                <button onClick={handleShowMore} className="btn btn-primary">Show more</button>
                            </div>
                                </>) : <div className="form-group p-4 text-center"><h4>No more notes to display.</h4></div>
                            }
                           
                        </div>
                    </>)
                }
            </div>
        </>
    )
}