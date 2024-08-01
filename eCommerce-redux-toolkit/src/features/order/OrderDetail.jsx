import Loader from "@/components/Loader";
import { useDeliverOrderMutation, useGetOrderDetailQuery,useGetPaypalClientIdQuery,usePayOrderMutation } from "@/slices/orderslice";
import { Link, useParams } from "react-router-dom"
import {PayPalButtons,usePayPalScriptReducer} from '@paypal/react-paypal-js'
// import { useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function OrderDetail(){

    const {userInfo} = useSelector((state) => state.auth);
    const params = useParams();
    const {id:orderId} = params;
    const {data:order,refetch,isLoading,error} = useGetOrderDetailQuery(orderId);
    console.log(order)

    const [payOrder,{isLoading: payLoading}] = usePayOrderMutation();
    const [deliverOrder,{isLoading:deliverLoading}] = useDeliverOrderMutation();
    const [{isPending},paypalDispatch] = usePayPalScriptReducer();
    const {data:paypalData,isLoading:paypalLoading,error:paypalError} = useGetPaypalClientIdQuery();


    useEffect(() => {
        if (!paypalError && !paypalLoading && paypalData.clientId) {
          const loadPaypalScript = async () => {
            paypalDispatch({
              type: 'resetOptions',
              value: {
                'client-id': paypalData.clientId,
                currency: 'USD', 
              },
            });
            paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
          };
          if (order && !order.isPaid) {
            if (!window.paypal) {
              loadPaypalScript();
            }
          }
        }
      }, [paypalError, paypalLoading, order, paypalData, paypalDispatch]);


    async function onApproveTest(){
        await payOrder({orderId,details:{payer:{}}});
        refetch();
        toast.success('Payment successful');
    }

    function onApprove(data,actions){
        return actions.order.capture().then(async function(details){ 
            try{
                await payOrder({orderId,details});
                refetch();
                toast.success('Payment successful');
            }catch(err){
                console.log(err);
                toast.error(err?.data?.message || err.message);
            }
            
        });
    }

    function onError(err){
        toast.error(err.message);
    }

    function createOrder(data,actions){
        return actions.order.create({
            purchase_units:[
                {amount:{
                    value:order.totalPrice,
                }}
            ]
        }).then((orderId) => {
            return orderId;
        })

    }

    async function handleDeliver(){
        try{
            await deliverOrder(orderId);
            refetch();
            toast.success('Order delivered');

        }catch(err){
            console.log(err);
            toast.error(err?.data?.message || err.error);
        }
    }


   
    if(isLoading) return <p>some thing went wrong</p>
    if(error) return <Loader />
    

    return (
        <div className="space-y-4">
            <h1 className="text-xl">Order Detail</h1>
            <h2>Order #{orderId}</h2>
            <div className="grid grid-cols-2">
                <div className="space-y-2">
                    <h2 className="underline">Shipping</h2>
                    <div>
                        <p>Name: {order.user.name}</p>
                        <p>Email: {order.user.email}</p>
                        <p>Address: {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postCode}, {order.shippingAddress.country}</p>

                    </div>
                    <div>
                        <span className="underline">Status:</span> {order.isDelivered ? <p>Delivered at {order.deliveredAt}</p> : <p>Not delivered yet</p>}
                    </div>

                    <div>
                        <p className="underline">Payment</p>
                        <p>Method: {order.paymentMethod}</p>
                        <p>Payment status: {order.isPaid ? "Paid":"Not paid"} </p>
                        
                    </div>
                    <div className="space-y-2">
                        <p className="underline">Order Items</p>
                        {order.orderItems.map((item,index) =>
                            <div className="flex py-2 px-2" key={index}>
                                <img className="w-16" src={item.image} alt={item.name} />
                                <Link to={`/product/${item._id}`} className="underline">{item.name}</Link>
                                <p>{`Qty: ${item.qty}`}</p>
                                <p>{`Total: ${item.price}`}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="border px-2 py-2 rounded-md justify-center items-center">
                    <div className="">
                        <h1 className="underline">Order summary</h1>
                        <p>{`Items: $${order.itemsPrice}`}</p>
                        <p>{`Shipping: $${order.shippingAddress.address}`}</p>
                        <p>{`Total Price: $${order.totalPrice}`}</p>
                    </div>
                    {
                        userInfo && userInfo.isAdmin && order.isPaid &&  !order.isDelivered && <button onClick={handleDeliver} disabled={deliverLoading}  className="bg-black px-2 py-2 rounded-md text-white">Mark as Delivered</button>
                    }
                    {!order.isPaid  && (
                        <div>
                        {payLoading && <Loader /> }
                        {paypalLoading && <Loader /> }
                        {isPending ?  <Loader /> : 
                            <div>
                                <button className="bg-black text-white px-2 py-1 rounded-md my-5"onClick={onApproveTest} >Test pay Order</button>
                                <div>
                                <PayPalButtons 
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                    onError={onError}></PayPalButtons>
                                </div>
                            </div>
                        
                        }
                        </div>
                    )}
                </div>
                
            </div>

        </div>
    )
}