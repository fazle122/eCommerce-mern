/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useCanUserReviewQuery, useCreateReviewsMutation, useGetProductDetailQuery } from "../../slices/productSlice";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
import { addToCart } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Meta from "@/components/Meta";
import NotFound from "@/components/NotFound";

export default function ProductDetail(){
    const {userInfo} = useSelector((state) => state.auth);
    const {register,reset,handleSubmit,formState:{errors,isSubmitting}} = useForm();
    const [createReview,{isLoading:reviewLoading}] = useCreateReviewsMutation();
    const [qty,setQty] = useState(1);
    const {productId} = useParams()
    const {data:product,refetch,isLoading,isError,error} = useGetProductDetailQuery(productId);
    console.log(error)
    const {data,isLoading:canUserReviewLoading} = useCanUserReviewQuery(productId);
    
    console.log(data);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;
    // console.log(product);
    let existItem;

    useEffect(() => {
        if(cartItems.length>0){
            existItem = cartItems.find((ct) => ct._id === productId);
            if(existItem){
                setQty(existItem.qty)
            }
        }
    },[])


   

    function handleClick(){
        dispatch(addToCart({...product,image:product.images[0].url,qty}));
        navigate("/cart");
    }

    async function addNewReview(data){
        console.log(userInfo);
        console.log(data);
        try{
            if(userInfo.isAdmin){
                toast.error('Admin can not review on product');
            }
            const review = {
                productId,
                rating:data['rating'],
                comment:data['comment']
            }
            
            console.log(review);
    
            await createReview(review).unwrap();
    
            reset();
            refetch();
            toast.success('Review add successfully')
        }catch(err){
            console.log(err);
            toast.error(err?.data?.message || err.error);
        }
    } 

    const ratings = [
        { value: '', label: 'Select' },
        { value: '1', label: 'Poor' },
        { value: '2', label: 'Fair'},
        { value: '3', label: 'Good' },
        { value: '4', label: 'Very Good' },
        { value: '5', label: 'Excellent' },
      ]


    function increaseQuantity(){
        if(qty >= product.countInStock) return;
        setQty(qty+1);
    }

    function decreaseQuantity(){
        if(qty <= 1) return;
        setQty(qty-1);
    }

    if(error && error?.status == 404) return <NotFound />

    if(isLoading) return <Loader message={'fetching product...'} />
    if(canUserReviewLoading) return <Loader message={'checking'} />
    if(isError) return <p>{isError?.data?.message || isError.error}</p>
    if(isError) return <p>{isError?.data?.message || isError.error}</p>

    

    return(
        <div>
            <div className="my-10 grid grid-cols-2">
            <Meta title={product.name}/>
                 
                <div>
                    <img className="my-10 w-32 md:w-80 px-2 py-2 rounded-lg border-2 border-red-900" src={product?.images[0]?.url} alt={product.name} />
                </div>
                <div className="space-y-4">
                    <h1 className="text-2xl">{product.user.name}</h1>
                    <p>{product.description}</p>
                    <p>{`Price: $${product.price}`}</p>
                    <p>{`Brand: ${product.brand}`}</p>
                    <p>{`Category ${product.category}`}</p>
                    <div className="flex space-y-2 space-x-8">
                        <div className="space-x-2">
                            <button className="border-2 rounded-lg bg-gray-400 text-white px-2 text-2xl" onClick={increaseQuantity}>+</button>
                            <span>{qty}</span>
                            <button className="border-2 rounded-lg bg-gray-400 text-white px-2 text-2xl" onClick={decreaseQuantity}>-</button>

                        </div>
                        <button className="border-2 rounded-lg bg-black text-white px-2 py-2" onClick={handleClick}>{!existItem ? "Add to cart" : qty >0 ? "Update quantity" : "Add to cart"}</button>
                    </div>
                </div>
            

            </div>
            <div className="grid grid-cols-2">
                <div>
                    <h1 className="text-xl underline">Reviews</h1>
                    {
                        product.reviews.length === 0 ? <p>No review found</p> :

                                <div className="border mr-5 my-1">{ product.reviews.map((review,index) => 
                                        <>
                                            <div key={index}>
                                                
                                                <div className="flex space-x-2">
                                              
                                                    <img className='border rounded-full w-8' alt={review.name} src={
                                                        review?.user?.googleImage
                                                            ? review?.user?.googleImage
                                                            : "/images/default_avatar.jpg"
                                                        } />
                                                    <p>{review.name}</p>
                                                </div>
                                                <p>{review.comment}</p>
                                            </div>
                                            <hr/>
                                        </>
                                    )}
                                </div>

                    }

                </div>
                
                { userInfo &&
                    <form onSubmit={handleSubmit(addNewReview)} className="flex flex-col space-y-2">
                   
                        <select defaultValue={ratings[3]} className="border rounded w-full py-2" {...register('rating',{required:"rating is required"})}>
                                {ratings.map((rating) => <option key={rating.value} value={rating.value}>{rating.label}</option>)}
                        </select>
                        {errors?.rating?.message && <p>{errors.rating.message}</p> }

                        <input type="text" name="comment" placeholder="comment" className="border-4 border-red-100 rounded-md w-300"
                        {...register("comment",{
                            required:'please add comment'
                        })} />
                        {errors?.comment?.message && <p>{errors.comment.message}</p>}
            
                        
                        {
                            // (data.canReview) && (
                            <div>
                                <button disabled={reviewLoading && isSubmitting} className="rounded-md bg-black text-white px-5 py-2">Add review</button>
                            </div>
                            // )
                        }
                        
            
                    </form>
                }
                
            </div>
        </div>
    )
}