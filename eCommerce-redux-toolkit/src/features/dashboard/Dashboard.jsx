import Product from '../../components/Product';
import {useGetProductsQuery} from '../../slices/productSlice.js'
import Loader from '../../components/Loader'
import { Link, useParams, useSearchParams } from 'react-router-dom';
// import Paginate from '@/components/Paginate';
import SearchBox from '@/components/Searchbox';
import ProductCarousal from '@/components/ProductCarousal';
// import CustomPagination from '@/components/CustomPagination';
import Paginate from '@/components/Paginate';
import Filter from '@/components/Filter';





export default function Dashboard(){
// const {data:products,isLoading,isError} = ;
const {keyword,pageNumber} = useParams();
let [searchParams] = useSearchParams();
const min = searchParams.get("min") || "";
const max = searchParams.get("max") || "";
const category = searchParams.get("category") || "";
const rating = searchParams.get("ratings") || ""
;console.log(min);
console.log(max);


const params = { keyword, pageNumber };

(min !== null && min !== '') && (params.min = min);
(max !== null && max !== '') && (params.max = max);
(category !== null && category !== '') && (params.category = category);
(rating !== null && rating !== '') && (params.rating = rating);




// const {data,isLoading,isError} = useGetProductsQuery({keyword,pageNumber});
// console.log(params);
const {data,isLoading,isError} = useGetProductsQuery(params);
console.log(data);

    if(isLoading) return <Loader message={'loading'} />
    if(isError) return <p>{isError?.data?.message || isError.error}</p>

    return(
        <div className='space-y-8'>
            {!keyword && <ProductCarousal />}

            <div className='grid grid-cols-3'>

                <div className='col-span-1'>  
                    <Filter />
                </div>

                <div className='col-span-2 space-y-6'>
                    <div className='space-y-4'>
                            <SearchBox />
                            {keyword && <div><Link to='/' className="rounded-md bg-black text-white px-2 py-2">Go back</Link></div>}
                    </div>
                        <div className='flex space-x-10'>
                            {data.products.map((product) => <Product key={product._id} product={product} />
                            )}
                        </div>
                        <Paginate 
                            pages={data.pages}
                            page={data.page}
                            keyword={keyword ? keyword : ''} />
                        {/* <CustomPagination  resPerPage={data.page} filteredProductsCount={data.pages}/> */}
                        
                </div>

            </div>
        </div>

    )
}













// import Product from '../../components/Product';
// import products from '@/data/products';


// export default function Dashboard(){
//     const data = products
//     console.log(data);


//     return(
//         <div className='space-y-6'>
           
//             <div className='flex space-x-10'>
//                 {products.map((product) => <Product key={product.name} product={product} />
//                 )}
//             </div>
//         </div>

//     )
// }