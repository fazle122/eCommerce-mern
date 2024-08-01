import Loader from "@/components/Loader";
import { useGetAllOrdersQuery } from "@/slices/orderslice"
import { Link } from "react-router-dom";


export default function Orders(){

    const {data:orders,isLoading,error} = useGetAllOrdersQuery();
    console.log(orders);


    if(isLoading) return <Loader />
    if(error) return <p>some thing went wrong</p>
    return (
        <div>
            <h1 className="underline text-xl">Order list</h1>
            <div >
                {
                    orders.map((order,index) => <div key={index} className="flex space-x-4 border-b-2">
                        <p>{`Order no: ${order._id}`}</p>
                        <p>{`Total amount: ${order.totalPrice}`}</p>
                        <p>{`User name: ${order.user.name}`}</p>
                        <p>{`Address: ${order.shippingAddress.address}`}</p>
                        <p>{!order.isDelivered ? "Not delivered" : `Delivered at ${order.deliveredAt} `}</p>
                        <Link className="underline" to={`/orders/${order._id}`}>Detail</Link>

                    </div>)
                }
            </div>
        </div>
    )
}