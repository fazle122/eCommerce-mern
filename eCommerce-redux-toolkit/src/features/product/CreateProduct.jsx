import { Link, useNavigate } from "react-router-dom"
import Loader from "@/components/Loader";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateProductMutation } from "@/slices/productSlice";
import { useSelector } from "react-redux";

// // import { Input } from "@/components/ui/input"




export default function CreateProduct(){

    const {userInfo} = useSelector((state) => state.auth);

    console.log(userInfo);
    const navigate = useNavigate();
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm();
    const [createProduct,{isLoading:isCreating}] = useCreateProductMutation();
    // const [uploadImage] = useUploadProductImageMutation();
    // const [image,setImage] = useState();

    // // console.log(product)


    async function handelUpdateProduct(data){

        // console.log(data);
        try{
            const newProduct = {
                user:userInfo._id,
                name:data['name'],
                price:data['price'],
                brand:data['brand'],
                category:data['category'],
                description:data['description'],
                countInStock:data['stock'],
                // image:data['image']
                // image:image
            }
            console.log(newProduct);
            const res = await createProduct(newProduct);
            console.log(res);
            // refetch();
            toast.success('product updated')
            navigate('/admin/products')
        }catch(err){
            console.log(err);
            toast.error(err?.data?.message || err.message)
        }
    }

    // async function uploadFileHandler(e){
        // console.log('uploading....')
        // const formData = new FormData();
        // formData.append('image',e.target.files[0]);
        // try{
        //     const res = await uploadImage(formData).unwrap();
        //     toast.success(res.message);
        //     setImage(res.image);
        // }catch(err){
        //     toast.error(err?.data?.message || err.error);
        // }
    // }


    if(isSubmitting) return <Loader />
    // if(error) return <p>Some thing went wrong</p>


    return(
        <div>
            <form onSubmit={handleSubmit(handelUpdateProduct)} className="flex flex-col space-y-2">
                    <input type="text" name="name"  placeholder="product name" className="border-4 border-red-100 rounded-md w-300"
                    {...register("name",{
                        required:'please enter name'
                    })} />
                    {errors?.name?.message && <p>{errors.name.message}</p>}

                    <input type="text" name="price" placeholder="price"  className="border-4 border-red-100 rounded-md w-300"
                    {...register("price",{
                        required:'please enter price'
                    })} />
                    {errors?.price?.message && <p>{errors.price.message}</p>}

                    <input type="text" name="brand" placeholder="brand"  className="border-4 border-red-100 rounded-md w-300"
                    {...register("brand",{
                        required:'please enter brand'
                    })} />
                    {errors?.brand?.message && <p>{errors.brand.message}</p>}
                    
                    <input type="text" name="category" placeholder="category"  className="border-4 border-red-100 rounded-md w-300"
                    {...register("category",{
                        required:'pleas enter category'
                    })} />
                    {errors?.category?.message && <p>{errors.category.message}</p>}
                    
                    <input type="type" name="description" placeholder="description"  className="border-4 border-red-100 rounded-md w-300"
                    {...register("description",{
                        required:'pleas enter description'
                    })} />
                    {errors?.description?.message && <p>{errors.description.message}</p>}

                    <input type="text" name="stock" placeholder="stock"  className="border-4 border-red-100 rounded-md w-300"
                    {...register("stock",{
                        required:'please enter stock'
                    })} />
                    {errors?.stock?.message && <p>{errors.stock.message}</p>}

                   
                    {/* <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Picture</Label>
                        <input id="image" type="file" name="image" onChange={uploadFileHandler} 
                        // {...register("image",{required:'please upload image'})}
                    />
                    {errors?.image?.message && <p>{errors.image.message}</p>}

                    </div>*/}

                    
                    <div className="space-x-4">
                        <button disabled={isSubmitting && isCreating} className="rounded-md bg-black text-white px-5 py-2">Add product</button>
                        <Link className="underline" to='/admin/products'>Go back</Link>

                    </div> 
                    
            </form>
        </div>
    )
}