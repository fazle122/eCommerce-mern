/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";



export default function Paginate({pages,page, isAdmin= false, keyword=''}){

    return(
        pages > 1 &&
        <div className="flex">
            {[...Array(pages).keys()].map((x) => (
                <Link key={x+1} className="w-8 mx-1" 
                    to={!isAdmin ? keyword ? `/search/${keyword}/${x+1}` : `/${x+1}` 
                                            :`/admin/products/${x+1}`}
                >
                    <div 
                        className={`${x+1 === page ? 'bg-blue-600 text-white underline' : ''} space-x- bg-black rounded-md px-1 py-1 text-white flex justify-center items-center`}>
                            {x+1}
                    </div>
                </Link>
            ))
            
            }
        </div>
    )

}