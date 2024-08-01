import CheckoutSteps from "@/components/CheckoutSteps";
import { saveShippingAddress } from "@/slices/cartSlice";
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



export default function Shipping(){
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm();
    const dispatch = useDispatch()
    const { shippingAddress } = useSelector((state) => state.cart); 
    console.log(shippingAddress);
    const navigate = useNavigate();


    function createAddress(data){
        dispatch(saveShippingAddress({address:data['address'],city:data['city'],postCode:data['postCode'],country:data['country']}));
        navigate('/payment');
    }


    return (
        <div className="flex flex-col items-center justify-center py-8 space-y-8">
            <CheckoutSteps  step1 step2 />
            <h1>Shipping</h1>
            <form onSubmit={handleSubmit(createAddress)} className="flex flex-col space-y-2">
            
                <input type="text" name="address" placeholder="address" defaultValue={shippingAddress?.address || "" } className="border-4 border-red-100 rounded-md w-300"
                {...register("address",{
                    required:'please enter address'
                })} />
                {errors?.address?.message && <p>{errors.address.message}</p>}

                <input type="text" name="city" placeholder="city" defaultValue={shippingAddress?.city || ""} className="border-4 border-red-100 rounded-md w-300"
                {...register("city",{
                    required:'please enter city'
                })} />
                {errors?.city?.message && <p>{errors.city.message}</p>}

                <input type="text" name="postCode" placeholder="postCode" defaultValue={shippingAddress?.postCode || ""} className="border-4 border-red-100 rounded-md w-300"
                {...register("postCode",{
                    required:'pleas enter postCode'
                })} />
                {errors?.postCode?.message && <p>{errors.postCode.message}</p>}

                <input type="text" name="country" placeholder="country" defaultValue={shippingAddress?.country || ""} className="border-4 border-red-100 rounded-md w-300"
                {...register("country",{
                    required:'pleas enter country'
                })} />
                {errors?.country?.message && <p>{errors.country.message}</p>}
                <div>
                    <button disabled={isSubmitting} className="rounded-md bg-black text-white px-5 py-2">Create Address</button>
                </div>
                
               
            </form>
        </div>
    )
}