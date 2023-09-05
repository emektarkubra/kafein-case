import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { SiteContext } from "./context/SiteContext"

export default function PrivateRoute({ children }) {
    const { isUserValid } = useContext(SiteContext)
    if (!isUserValid) {
        return <Navigate to="/login"/>
    }
    return children

}