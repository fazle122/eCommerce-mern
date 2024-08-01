import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "@/slices/userSlice";
import toast from "react-hot-toast";
import { setCredentials } from "@/slices/authSlice";
import { useGetUserOrdersQuery } from "@/slices/orderslice";
import Loader from "@/components/Loader";
import { Link } from "react-router-dom";
// import { MDBDataTable } from "mdbreact";



export default function Profile(){
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm();

    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    // const [confirmPassword,setConfirmPassword] = useState();

    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile,{isLoading,error}] = useProfileMutation();
    const {data:orderData,isLoading:orderLoading,error:orderError} = useGetUserOrdersQuery();
    const dispatch = useDispatch();



    useEffect(()=>{
         if(userInfo){
            setName(userInfo.name);
            setEmail(userInfo.email); 
            setPassword(userInfo.password)   
         }
    },[userInfo,userInfo.name,userInfo.email])


    async function updateUser(data) {
        if(data['password'] !== data['confirmPassword']){
            toast.error('password did not match');
        }else{
            try{
                const response = await updateProfile({_id:userInfo._id,name:data['name'],email:data['email'],password:data['password']}).unwrap();
                console.log(response);
                dispatch(setCredentials(response));
                toast.success('profile updated successfully')
            }catch(err){
                console.log(err);
                toast.error(err?.data?.message || err.message)
            }
        }
    }





    // const setOrders = () => {
    //     const orders = {
    //       columns: [
    //         {
    //           label: "ID",
    //           field: "id",
    //           sort: "asc",
    //         },
    //         {
    //           label: "Amount",
    //           field: "totalPrice",
    //           sort: "asc",
    //         },
    //         {
    //           label: "Payment Status",
    //           field: "isPaid",
    //           sort: "asc",
    //         },
    //         {
    //           label: "Order Status",
    //           field: "isDelivered",
    //           sort: "asc",
    //         },
    //         {
    //           label: "Actions",
    //           field: "actions",
    //           sort: "asc",
    //         },
    //       ],
    //       rows: [],
    //     };
    
    //     orderData?.forEach((order) => {
    //       orders.rows.push({
    //         id: order?._id,
    //         totalPrice: `$${order?.totalPrice}`,
    //         isPaid: order?.isPaid,
    //         isDelivered: order?.isDelivered,
    //         actions: (
    //           <>
    //             <Link to={`/me/order/${order?._id}`} className="btn btn-primary">
    //               <i className="fa fa-eye"></i>
    //             </Link>
    //             <Link
    //               to={`/invoice/order/${order?._id}`}
    //               className="btn btn-success ms-2"
    //             >
    //               <i className="fa fa-print"></i>
    //             </Link>
    //           </>
    //         ),
    //       });
    //     });
    
    //     return orders;
    //   };






    if(error) return <p>something went wrong</p>
    

    return (
        <div>
            <h1 className="underline">Profile</h1>
            <div className="grid grid-cols-2">
                <div>
                <form onSubmit={handleSubmit(updateUser)} className="flex flex-col space-y-2">
                    <input type="name" name="email" defaultValue={name} className="border-4 border-red-100 rounded-md w-300"
                    {...register("name",{
                        required:'please enter name'
                    })} />

                    {errors?.name?.message && <p>{errors.name.message}</p>}
                    <input type="email" name="email" defaultValue={email} className="border-4 border-red-100 rounded-md w-300"
                    {...register("email",{
                        required:'please enter email address'
                    })} />

                    {errors?.email?.message && <p>{errors.email.message}</p>}
                    <input type="password" name="password" defaultValue={password} className="border-4 border-red-100 rounded-md w-300"
                    {...register("password",{
                        // required:'pleas enter password'
                    })} />
                    {errors?.password?.message && <p>{errors.password.message}</p>}
                    <input type="password" name="confirmPassword" defaultValue={password} className="border-4 border-red-100 rounded-md w-300"
                    {...register("confirmPassword",{
                        // required:'pleas enter confirm password'
                    })} />
                    {errors?.confirmPassword?.message && <p>{errors.confirmPassword.message}</p>}
                    <div>
                        <button disabled={isSubmitting && isLoading} className="rounded-md bg-black text-white px-5 py-2">Update</button>
                    </div>
                    
                </form>
                </div>
                <div className="space-y-4 mx-5">
                    <h1 className="underline">My orders</h1>
                    {orderLoading ? <Loader /> : orderError ? <p>Something went wrong</p> :
                                <div className="space-x-4">
                                    {orderData.map((order,index) => <div className="flex space-x-4 border-b-2" key={index}>
                                        <p>{`Order no: ${order._id}`}</p>
                                        <p>{`Created at: ${order.createdAt.substring(0,10)}`}</p>
                                        <p>{`Total price: ${order.totalPrice}`}</p>
                                        <Link className="underline" to={`/orders/${order._id}`}>Detail</Link>
                                    </div>)}
                                </div>
                
                    }

                    {/* {orderLoading ? <Loader /> : orderError ? <p>Something went wrong</p> :
                    <MDBDataTable
                        data={setOrders()}
                        className="px-3"
                        bordered
                        striped
                        hover
                    />
                    } */}
                    <div></div>
                </div> 

            </div>
        </div>
    )
} 