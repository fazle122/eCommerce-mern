import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"


export default function SearchBox(){
    const {register,reset,handleSubmit,formState:{isSubmitting}} = useForm();

    const params = useParams();
    const navigate = useNavigate();

    async function search(data){
        console.log(params); 
        if(data['keyword'].trim()){
            navigate(`/search/${data['keyword']}`)
        }else{
            navigate('/')
        }

        reset()
        navigate('');
    }


    return (
        <div >
             <form onSubmit={handleSubmit(search)} className="flex flex-row space-x-1">
                <input type="text" name="keyword" placeholder="search by keyword" className="border-4 border-red-100 rounded-md w-300"
                {...register("keyword")} />

             
                <div>
                    <button disabled={isSubmitting} className="rounded-md bg-black text-white px-5 py-1">Search</button>
                </div>
                

            </form>
        </div>
    )
}