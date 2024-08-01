import { Outlet,Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import AdminLayout from "./AdminLayout";

export default function AdminRoute(){
    const { userInfo } = useSelector((state) => state.auth);

    return userInfo && userInfo.isAdmin ? 
             <AdminLayout><Outlet /></AdminLayout>: 
                <Navigate to="/login" replace/>
}