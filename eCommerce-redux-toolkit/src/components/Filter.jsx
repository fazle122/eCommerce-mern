/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../utils/priceUtils";
import { PRODUCT_CATEGORIES } from "@/constant";
import StarRatings from "react-star-ratings";



export default function Filter(){

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
  
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
  

    //set previous value if page reloaded
    useEffect(() => {
      searchParams.has("min") && setMin(searchParams.get("min"));
      searchParams.has("max") && setMax(searchParams.get("max"));
    }, []);
  
    // Handle Category & Ratings filter
    const handleClick = (checkbox) => {
      const checkboxes = document.getElementsByName(checkbox.name);
  
      checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
      });
  
      if (checkbox.checked === false) {
        // Delete filter from query
        if (searchParams.has(checkbox.name)) {
          searchParams.delete(checkbox.name);
          const path = window.location.pathname + "?" + searchParams.toString();
          navigate(path);
        }
      } else {
        // Set new filter value if already there
        if (searchParams.has(checkbox.name)) {
          searchParams.set(checkbox.name, checkbox.value);
        } else {
          // Append new filter
          searchParams.append(checkbox.name, checkbox.value);
        }
  
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      }
    };

    //set previous value if page reloaded
    const defaultCheckHandler = (checkboxType, checkboxValue) => {
      const value = searchParams.get(checkboxType);
      if (checkboxValue === value) return true;
      return false;
    };

      
  
    // Handle price filter
    const handleButtonClick = (e) => {
      e.preventDefault();
  
      searchParams = getPriceQueryParams(searchParams, "min", min);
      searchParams = getPriceQueryParams(searchParams, "max", max);
  
      const path = window.location.pathname + "?" + searchParams.toString();
      navigate(path);
    };
  
 




    return (
        <div className="border mx-4">
        <h3>Filters</h3>
        <hr />
        <h5 className="flex items-center justify-center">Price</h5>
        <form  onSubmit={handleButtonClick}>
            <div className="flex mx-2 my-4 space-x-4">
            <div className="col">
                <input
                type="text"
                className="w-24 border rounded-md px-4"
                placeholder="Min ($)"
                name="min"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                />
            </div>
            <div className="col">
                <input
                type="text"
                className="w-24 border rounded-md px-4"
                placeholder="Max ($)"
                name="max"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                />
            </div>
                <button type="submit" className="bg-black text-white rounded-md px-2">
                GO
                </button>
            </div>
        </form>
        <hr />
      <h5 className="flex items-center justify-center">Category</h5>

      {PRODUCT_CATEGORIES?.map((category) => (
        <div key={category} className="my-2 px-4">
          <input
            className=""
            type="checkbox"
            name="category"
            id="check4"
            value={category}
            defaultChecked={defaultCheckHandler("category", category)}
            onClick={(e) => handleClick(e.target)}
          />
          <label className="" >
            {" "}
            {category}
          </label>
        </div>
      ))}

      <hr />
      <h5 className="flex items-center justify-center">Ratings</h5>

      {[5, 4, 3, 2, 1].map((rating) => (
        <div key={rating} className="my-1 px-4 space-x-2">
          <input
            className=""
            type="checkbox"
            name="ratings"
            id="check5"
            value={rating}
            defaultChecked={defaultCheckHandler("ratings", rating?.toString())}
            onClick={(e) => handleClick(e.target)}
          />
          <label className="">
            <StarRatings
              rating={rating}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
              starDimension="15px"
              starSpacing="1px"
            />
          </label>
        </div>
      ))}
    </div>
    )
}