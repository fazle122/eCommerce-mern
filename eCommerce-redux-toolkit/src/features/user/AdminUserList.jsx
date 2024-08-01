import Loader from "@/components/Loader";
import { useDeleteUserMutation, useGetUsersQuery } from "@/slices/userSlice"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";



export default function AdminUserList(){


    const {data:users,refetch,isLoading,error} = useGetUsersQuery();
    const [deleteUser,{isLoading:deleteLoading}] = useDeleteUserMutation();

    async function handleDeleteUser(id){
        try{
            const res = await deleteUser(id);
            console.log(res);
            refetch();
            toast.success('User deleted successfully')

        }catch(err){
            toast.error(err?.data?.message || err.error);
        }

    }


    if(isLoading) return <Loader />
    if(error) return <p>some thing went wrong</p>

    return(
        <div className="space-y-6">
            <h1 className="underline text-xl">User list</h1>
            <div className="space-y-4">
                {
                    users.map((user,index) =>
                        <div className="grid grid-cols-4 space-x-8 border-b-4" key={index}>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <Link to={`/admin/user/${user._id}/edit`} className="underline">view detail</Link>
                            <button disabled={deleteLoading} onClick={() => handleDeleteUser(user._id)}className="bg-black rounded-md text-white py-1 w-16">delete</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}