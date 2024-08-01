/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";


export default function CheckoutSteps({step1,step2,step3,step4}){
    return(
        <ul className="flex">
            <li className="flex mr-6">
                {step1 ? <Link  to="/cart" className="px-2 rounded-l-sm bg-green-300 text-blue-500 hover:text-blue-800" href="#">Cart</Link> :
                    <p className="px-2 rounded-l-sm bg-gray-300 text-gray-500 hover:text-blue-800 ">Cart</p>
                }
                <div className={`w-0 h-0
                        border-t-[13px] border-t-transparent
                        border-l-[15px] ${step1 ? 'border-l-green-300': 'border-l-gray-300'}
                        border-b-[13px] border-b-transparent`}
                        >
                    </div>
            </li>
            <li className="flex mr-6">
                {step2 ? <Link  to="/shipping" className="px-2 bg-green-300 text-blue-500 hover:text-blue-800" href="#">Shipping</Link> :
                        <p className="px-2 rounded-l-sm bg-gray-300 text-gray-500 hover:text-blue-800 ">Shipping</p>
                    }
                    <div className={`w-0 h-0
                        border-t-[13px] border-t-transparent
                        border-l-[15px] ${step2 ? 'border-l-green-300': 'border-l-gray-300'}
                        border-b-[13px] border-b-transparent`}
                        >
                    </div>
            </li>
            <li className="flex mr-6">
                {step3 ? <Link  to="/payment" className="px-2 bg-green-300 text-blue-500 hover:text-blue-800" href="#">Payment</Link> :
                        <p className="px-2 rounded-l-sm bg-gray-300 text-gray-500 hover:text-blue-800 ">Payment</p>
                    }
                    <div className={`w-0 h-0
                        border-t-[13px] border-t-transparent
                        border-l-[15px] ${step3 ? 'border-l-green-300': 'border-l-gray-300'}
                        border-b-[13px] border-b-transparent`}
                        >
                    </div>
            </li>
            <li className="flex mr-6">
                {step4 ? <Link  to="/order" className="px-2 bg-green-300 text-blue-500 hover:text-blue-800" href="#">Place order</Link> :
                        <p className="px-2 rounded-l-sm bg-gray-300 text-gray-500 hover:text-blue-800 ">Place order</p>
                    }
                    <div className={`w-0 h-0
                        border-t-[13px] border-t-transparent
                        border-l-[15px] ${step4 ? 'border-l-green-300': 'border-l-gray-300'}
                        border-b-[13px] border-b-transparent`}
                        >
                    </div>
            </li>
        </ul>
    )
}