import { Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import AddNotes from "./pages/AddNotes";
import EditNotes from "./pages/EditNotes";
import Login from "./pages/Login";
import NoteList from "./pages/NoteList";

export default function SiteRoutes() {
    return (
        <>
            <Routes>
                <Route path="/mylist" element={<NoteList />} />
                <Route path="/addnotes" element={<AddNotes />} />
                <Route path="/editnotes" element={<EditNotes />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    )
}