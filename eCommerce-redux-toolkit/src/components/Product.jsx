/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import Rating from "./Rating";


export default function Product({product}){
    return(
        <div className="flex flex-col justify-center items-center border-2 rounded-md  space-y-2">
            <span className="text-ellipsis">{product.name}</span>
            <Link to={`/product/${product._id}`}>
                <img className="w-32 md:w-64 " src={product.images ? product?.images[0]?.url :'/images/default_product.png'} alt={product.name} />
            </Link>                                                 
            <Rating value={product.rating} text={product.numReviews}/>
            <span>{`$${product.price}`}</span>
        </div>
    )
}