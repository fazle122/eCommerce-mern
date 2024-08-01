import CheckoutSteps from "@/components/CheckoutSteps";
import { savePaymentMethod } from "@/slices/cartSlice";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Payment(){

    const {register,handleSubmit,formState:{errors}} = useForm();
    const cart = useSelector((state) => state.cart) 
    console.log(cart);
    const {shippingAddress} = cart;
    // const[paymentMethod,setPaymentMethod] = useState('COD');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const options = [
        { value: 'Paypal', label: 'Paypal' },
        { value: 'Stripe', label: 'Stripe' },
        { value: 'COD', label: 'COD' },
      ]


    useEffect(() =>{
        if(!shippingAddress){
            navigate('/shipping')
        }
    },[shippingAddress,navigate])

    function submitHandler(data){

        console.log(data['paymentMethod']);
        // setPaymentMethod();
        console.log(data);
        dispatch(savePaymentMethod(data["paymentMethod"]))
        navigate('/placeorder')

    }

    return(
        <div className="flex flex-col items-center justify-center py-8 space-y-8">
            <CheckoutSteps step1 step2 step3 />
            <p>Payment options</p>
            <form className="space-y-5" onSubmit={handleSubmit(submitHandler)}>
                <div>
                    {/* <select defaultValue={options[2]}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 

                    {...register('paymentMethod',{required:"Payment method is required"})}>
                        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select> */}
                    
                    
                        {options.map((option) => 
                        <div key={option.value} className="space-y-8 space-x-2">
                            <input
                                // defaultValue={options[2]}
                                className="form-check-input"
                                type="radio"
                                name="paymentMethod"
                                id="paymentMethod"
                                value={option.value}
                                onChange={(e) => e.preventDefault}
                                {...register('paymentMethod',{required:"Payment method is required"})}
                            />
                            <label className="">{option.label}</label>
                        </div>
                        
                        )}
                    
                    {errors?.paymentMethod?.message && <p>{errors.paymentMethod.message}</p> }
                </div>
                <div>
                    <button className="rounded-md bg-black text-white px-5 py-2">Continue</button>
                </div>
            </form>
        </div>
    )
}