import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { SiteContext } from "./context/SiteContext"

export default function PrivateRoute({ children }) {
    const { isValid } = useContext(SiteContext)
    if (!isValid) {
        return <Navigate to="/login" />
    }
    return children

}