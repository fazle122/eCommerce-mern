/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToCart, deleteFromCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";




export default function CartRow({item}){
    const dispatch = useDispatch();
    const [currentQuantity,setCurrentQuantity] = useState(item.qty);



    // function increaseItemQty(){
    //     if(currentQuantity === item?.countInStock) return
    //     setCurrentQuantity((qty) => qty+1);
    //     const qty = currentQuantity;
    //     dispatch(addToCart({...item,qty}));
    // }

    // function decreaseItemQty(){
    //     if(currentQuantity <= 1) return;
    //     setCurrentQuantity((qty) => qty-1);
    //     const qty = currentQuantity;
    //     console.log('up-qty',currentQuantity);
    //     dispatch(addToCart({...item,qty}));
    // }
    useEffect(() => {
        dispatch(addToCart({...item,qty:currentQuantity}));
      }, [currentQuantity]);


    function increaseItemQty(){
        console.log('old-qty',currentQuantity);
        if(currentQuantity >= item?.countInStock) return
        setCurrentQuantity(qty => qty+1);
        console.log('up-qty',currentQuantity);
        // dispatch(addToCart({...item,qty:currentQuantity}));
    }

    function decreaseItemQty(){
        console.log('old-qty',currentQuantity);
        if(currentQuantity <= 1) return;
        setCurrentQuantity(qty => qty-1);
        console.log('up-qty',currentQuantity);
        // dispatch(addToCart({...item,qty:currentQuantity}));
    }

    function handleDelete(){
        dispatch(deleteFromCart(item._id));
    }




    return(
        <div className="grid grid-cols-6 space-x-4 space-y-4">
            <img className="my-2 w-16 px-2 py-2 rounded-sm border-2 " src={item.images[0].url} alt={item.name} />
            <h2>{`Name: ${item.name}`}</h2>
            <h2>{`Quantity: ${currentQuantity}`}</h2>
            <div className="space-x-2">
                <button className="border-2 rounded-lg bg-gray-400 text-white px-2 text-2xl" onClick={() => increaseItemQty(item,currentQuantity)} >+</button>
                <span>{currentQuantity}</span>
                <button className="border-2 rounded-lg bg-gray-400 text-white px-2 text-2xl" onClick={decreaseItemQty}>-</button>
            </div>
            <Link to={`/product/${item._id}`} className="underline">view detail</Link>
            <button className="text-white bg-black px-1 py-1 w-16 h-8 rounded-md" onClick={handleDelete}>Delete</button>
        </div>
    )
}