import Loader from "@/components/Loader";
import { useGetUserDetailsQuery, useUpdateUserMutation } from "@/slices/userSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom"



export default function UpdateUser(){
    const params = useParams()
    const navigate = useNavigate();
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm();
    const {data:user,isLoading,refetch,error} = useGetUserDetailsQuery(params.id);
    const [upUser,{isLoading:updateLoading}] = useUpdateUserMutation();


    async function handleUpdateUser(data){
        console.log(data);
        try{
            const user = {
                userId: params.id,
                name:data['name'],
                email:data['email']
            };
            console.log(user);
            const res = await upUser(user);
            console.log(res);
            refetch();
            navigate('/admin/users')
            toast.success('user updated successfully');

        }catch(err){
            toast.error(err?.data?.message || err.error);
        }

    }

    if(isLoading) return <Loader />
    if(error) return <p>some thing went wrong</p>

    return(
        <div>
            <h1>{params.id}</h1>
            <form onSubmit={handleSubmit(handleUpdateUser)} className="flex flex-col space-y-2">
                    <input type="name" name="email" defaultValue={user.name} className="border-4 border-red-100 rounded-md w-300"
                    {...register("name",{
                        required:'please enter name'
                    })} />

                    {errors?.name?.message && <p>{errors.name.message}</p>}

                    <input type="email" name="email" defaultValue={user.email} className="border-4 border-red-100 rounded-md w-300"
                    {...register("email",{
                        required:'please enter email address'
                    })} />
                    {errors?.email?.message && <p>{errors.email.message}</p>}
                    
        
                    <div>
                        <button disabled={isSubmitting && updateLoading} className="rounded-md bg-black text-white px-5 py-2">Update</button>
                    </div>
                    
                </form>
        </div>
    )
}











// import Loader from "@/components/Loader";
// import { useGetUserByIdQuery } from "@/slices/userSlice";
// import { useParams } from "react-router-dom"



// export default function UpdateUser(){
//     const params = useParams()

//     const {data:user,isLoading,error} = useGetUserByIdQuery(params.id);
//     console.log(user);



//     if(isLoading) return <Loader />
//     if(error) return <p>some thing went wrong</p>

//     return(
    
//             <h1>{params.id}</h1>

//     )
// }