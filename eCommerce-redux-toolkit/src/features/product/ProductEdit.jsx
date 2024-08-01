import { Link, useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form";
import { useGetProductDetailQuery, useUpdateProductMutation } from "@/slices/productSlice";
import toast from "react-hot-toast";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import Loader from "@/components/Loader";
// import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";




export default function ProductEdit(){
    const params = useParams()
    const navigate = useNavigate();
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm();
    const [updateProduct,{isLoading:updateLoading}] = useUpdateProductMutation();
    const {data:product,isLoading,refetch,error} = useGetProductDetailQuery(params.id);
    // const [uploadImage] = useUploadProductImageMutation();
    // const [image,setImage] = useState();

    // console.log(product)


    async function handelUpdateProduct(data){

        console.log(data);
        try{
            const updatedProduct = {
                _id:params.id,
                name:data['name'],
                price:data['price'],
                brand:data['brand'],
                category:data['category'],
                description:data['description'],
                countInStock:data['stock'],
                // image:data['image']
                // image:image
            }
            console.log(updatedProduct);
            const res = await updateProduct(updatedProduct);
            console.log(res);
            refetch();
            toast.success('product updated')
            navigate('/admin/products')
        }catch(err){
            console.log(err);
            toast.error(err?.data?.message || err.message)
        }
    }

    // async function uploadFileHandler(e){
    //     console.log('uploading....')
    //     const formData = new FormData();
    //     formData.append('image',e.target.files[0]);
    //     try{
    //         const res = await uploadImage(formData).unwrap();
    //         toast.success(res.message);
    //         setImage(res.image);
    //     }catch(err){
    //         toast.error(err?.data?.message || err.error);
    //     }
    // }


    if(isLoading) return <Loader />
    if(error) return <p>Some thing went wrong</p>


    return(
        <div>
            <h1>{params.id}</h1>
            <form onSubmit={handleSubmit(handelUpdateProduct)} className="flex flex-col space-y-2">
                    <input type="text" name="name"  defaultValue={product.name} className="border-4 border-red-100 rounded-md w-300"
                    {...register("name",{
                        required:'please enter name'
                    })} />
                    {errors?.name?.message && <p>{errors.name.message}</p>}

                    <input type="text" name="price" placeholder="price" defaultValue={product.price} className="border-4 border-red-100 rounded-md w-300"
                    {...register("price",{
                        required:'please enter price'
                    })} />
                    {errors?.price?.message && <p>{errors.price.message}</p>}

                    <input type="text" name="brand" placeholder="brand" defaultValue={product.brand} className="border-4 border-red-100 rounded-md w-300"
                    {...register("brand",{
                        required:'please enter brand'
                    })} />
                    {errors?.brand?.message && <p>{errors.brand.message}</p>}
                    
                    <input type="text" name="category" placeholder="category" defaultValue={product.category} className="border-4 border-red-100 rounded-md w-300"
                    {...register("category",{
                        required:'pleas enter category'
                    })} />
                    {errors?.category?.message && <p>{errors.category.message}</p>}
                    
                    <input type="type" name="description" placeholder="description" defaultValue={product.description} className="border-4 border-red-100 rounded-md w-300"
                    {...register("description",{
                        required:'pleas enter description'
                    })} />
                    {errors?.description?.message && <p>{errors.description.message}</p>}

                    <input type="text" name="stock" placeholder="stock" defaultValue={product.countInStock} className="border-4 border-red-100 rounded-md w-300"
                    {...register("stock",{
                        required:'please enter stock'
                    })} />
                    {errors?.stock?.message && <p>{errors.stock.message}</p>}

                    {/* <input type="file" name="image" placeholder="Enter image url" className="border-4 border-red-100 rounded-md w-300"
                    {...register("image",{
                        required:'please enter stock'
                    })} /> */}
                   
                    {/* <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Picture</Label>
                        <input id="image" type="file" name="image" onChange={uploadFileHandler} 
                        // {...register("image",{required:'please upload image'})}
                    />
                        {errors?.image?.message && <p>{errors.image.message}</p>}

                    </div> */}

                    <div>
                        <ImageUploader />
                    </div>
                    
                    <div className="space-x-4">
                        <button disabled={updateLoading && isSubmitting} className="rounded-md bg-black text-white px-5 py-2">Update product</button>
                        <Link className="underline" to='/admin/products'>Go back</Link>

                    </div>
                    
            </form>
        </div>
    )
}