import Loader from "@/components/Loader";
import Paginate from "@/components/Paginate";
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from "@/slices/productSlice"
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";




export default function AdminProducts(){

    const {pageNumber} = useParams();
    const {data,refetch,isLoading,error} = useGetProductsQuery({pageNumber});
    const [deleteProduct,{isLoading:deleteLoading}] = useDeleteProductMutation();
    const [createProduct] = useCreateProductMutation();




    if(isLoading) return <Loader />

    async function  handelCreateProduct() {
        // if(window.confirm('Are you sure to create a new product?')){
            try{
                await createProduct();
                refetch();
            }catch(err){
                console.log(err);
            }
        // }
    }

    async function handleDelete(id){
        if(window.confirm('Are you sure?')){
            try{
                await deleteProduct(id);
                refetch();
                toast.success('product deleted successfully');
            }catch(err){
                toast.error(err?.data?.message || err.error)
            }
        }

    }

    return(
        <div>
            <div className="flex flex-col space-y-6"> 
                <div className="flex justify-between">
                    <h1 className="underline">Product list for admin</h1>
                    <div>
                        <button onClick={handelCreateProduct} disabled={isLoading} className="rounded-md bg-black text-white px-5 py-2">Create product</button>
                        {error &&  <p>some thing went wrong</p>}

                    </div>
                    


                </div>
                <div className="space-y-6">
                {data.products.map((product,index) => 
                        <div className="flex space-x-12 border-b-4" key={index}>
                            <p>{product.name}</p>
                            <p>{product.brand}</p>
                            <p>{product.price}</p>
                            <p>{product.category}</p>
                            <Link className="underline" to={`/admin/product/${product._id}/edit`}>view detail</Link>
                            <button disabled={deleteLoading} className="bg-black text-white rounded-md px-2 py-1" onClick={()=> handleDelete(product._id)}>Delete</button>
                        </div>
                    )}
                
                </div>
                <Paginate pages={data.pages} page={data.page} isAdmin={true} />
            </div>
        </div>
    )
}