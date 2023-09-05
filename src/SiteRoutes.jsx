import { Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import AddNotes from "./pages/AddNotes";
import EditNotes from "./pages/EditNotes";
import Login from "./pages/Login";
import NoteList from "./pages/NoteList";
import PrivateRoute from "./PrivateRoute";

export default function SiteRoutes() {
    return (
        <>
            <Routes>
                <Route path="/mylist" element={ <PrivateRoute><NoteList /></PrivateRoute> } />
                <Route path="/addnotes" element={ <PrivateRoute><AddNotes /></PrivateRoute>} />
                <Route path="/editnotes" element={<PrivateRoute><EditNotes /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    )
}