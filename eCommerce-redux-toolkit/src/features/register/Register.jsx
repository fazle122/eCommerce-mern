

import { useForm } from "react-hook-form"
import { Link, useLocation,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import Loader from '../../components/Loader';
import { useRegisterMutation } from "../../slices/userSlice";
import { setCredentials } from "../../slices/authSlice";
// import toast from "react-hot-toast";
import { useEffect } from "react";
import toast from "react-hot-toast";



export default function Register(){

    const {register,reset,handleSubmit,formState:{errors,isSubmitting}} = useForm();
    const dispatch = useDispatch();
    const [registerUser,{isLoading}] = useRegisterMutation();
    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/'; 

    const navigate = useNavigate();
    const {userInfo} = useSelector((state) => state.auth);


    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    },[userInfo,navigate,redirect])


    async function loginUser(data){
        if(data['password'] !== data['confirmPassword']){
                toast.error('confirm password did not match');
                return;
        }else{
            try{
            
                const response = await registerUser({name:data['name'],email:data['email'],password:data['password']}).unwrap();
                console.log(response);
                dispatch(setCredentials({...response}));
                navigate(redirect);
                toast.success('logged in successfully')
                reset();
    
            }catch(err){
                console.log(err);
                toast.error(err?.data.message);
            }
        }

        
    }
    
    if(isLoading) return <Loader />

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit(loginUser)} className="flex flex-col space-y-2">
                <input type="name" name="email" placeholder="user name" className="border-4 border-red-100 rounded-md w-300"
                {...register("name",{
                    required:'please enter name'
                })} />

                {errors?.name?.message && <p>{errors.name.message}</p>}
                <input type="email" name="email" placeholder="email" className="border-4 border-red-100 rounded-md w-300"
                {...register("email",{
                    required:'please enter email address'
                })} />

                {errors?.email?.message && <p>{errors.email.message}</p>}
                <input type="password" name="password" placeholder="password" className="border-4 border-red-100 rounded-md w-300"
                {...register("password",{
                    required:'pleas enter password'
                })} />
                {errors?.password?.message && <p>{errors.password.message}</p>}
                <input type="password" name="confirmPassword" placeholder="confirm password" className="border-4 border-red-100 rounded-md w-300"
                {...register("confirmPassword",{
                    required:'pleas enter confirm password'
                })} />
                {errors?.confirmPassword?.message && <p>{errors.confirmPassword.message}</p>}
                <div>
                    <button disabled={isSubmitting} className="rounded-md bg-black text-white px-5 py-2">Register</button>
                </div>
                
                <div>
                    Already have an account ? <Link className="underline" to={redirect ? `/login?redirect=${redirect}` : `/login`}>Register</Link>
                </div>
            </form>
        </div>
    )
}



