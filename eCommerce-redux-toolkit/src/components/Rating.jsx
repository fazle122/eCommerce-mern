/* eslint-disable react/prop-types */
import {FaStar,FaStarHalfAlt,FaRegStar} from 'react-icons/fa'

export default function Rating({value,text}){
    // console.log(text);

    return(
        <div className='flex space-x-2'>
            <div className='flex'>
                <span>
                    {value>=1 ? <FaStar /> : value>=0.5 ? <FaStarHalfAlt/> : <FaRegStar />}
                </span>
                <span>
                    {value>=2 ? <FaStar /> : value>=1.5 ? <FaStarHalfAlt/> : <FaRegStar />}
                </span>
                <span>
                    {value>=3 ? <FaStar /> : value>=2.5 ? <FaStarHalfAlt/> : <FaRegStar />}
                </span>
                <span>
                    {value>=4 ? <FaStar /> : value>=3.5 ? <FaStarHalfAlt/> : <FaRegStar />}
                </span>
                <span>
                    {value>=5 ? <FaStar /> : value>=4.5 ? <FaStarHalfAlt/> : <FaRegStar />}
                </span>
            </div>
            <span className='text-xs'>{`${text} reviews`}</span>
        </div>
    )
}