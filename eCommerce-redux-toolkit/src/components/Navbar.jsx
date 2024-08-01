
import {FaCartPlus} from 'react-icons/fa';
import {IoMdPerson} from 'react-icons/io';
import { RiLogoutCircleRFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { Link, NavLink,useNavigate } from 'react-router-dom';
import logo from '../assets/eommerce.png'
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from "@material-tailwind/react";
import { useLogoutMutation } from '../slices/userSlice';
import { logoutUser } from '../slices/authSlice';
import toast from 'react-hot-toast';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


export default function Navbar(){

    const {cartItems} = useSelector((state) => state.cart);
    const {userInfo} = useSelector((state) => state.auth);
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const location = useLocation();
    // const path = location.pathname;

    function BadgeDefault(count) {
        return (
          <Badge size="1px" content={`${count}`}>
            <FaCartPlus size={20} className=''/>
          </Badge>
        );
      }

    async function logoutHandler(e){
        e.preventDefault();
        try{
            await logout().unwrap();
            dispatch(logoutUser());
            navigate('/login');
            toast.success('logged out successfully')
        }catch(err){
            console.log(err);
            toast.error(err?.data?.message)
        }
    }

    function navigateProfile(e){
        e.preventDefault();
        navigate('/profile');
    }
    function navigateAdmin(e){
        e.preventDefault();
        navigate('/admin');
    }

    return (
        <div className={`flex justify-between px-10 bg-blue-100 text-black h-16`}>
            <img src={logo} alt='e-commerce logo' width={50} />
            <ul className="flex space-x-4 px-5 py-5">
                
                <NavLink to='/' className={`flex space-x-1`} >
                    <MdDashboard size={20} className=''/>
                    <span>Home</span>
                </NavLink>
                {userInfo && <NavLink to='/cart' className={`flex space-x-1`} >
                    
                    {cartItems.length > 0 ? BadgeDefault(cartItems.length) : <FaCartPlus size={20} className=''/> }
                    <span>Cart</span>
                </NavLink>}
                {
                    !userInfo ?
                    <NavLink to="/login" className='flex space-x-1'>
                        <IoMdPerson size={20} className=''/>
                        Sign in
                    </NavLink> : 
                    // <button className="underline" onClick={logoutHandler}>Logout</button>
                    <div className='flex space-x-2'>
                        {userInfo.googleImage &&
                            <Link to="#">
                                <img className='rounded-full w-8' src={userInfo.googleImage} alt={userInfo.name} />
                            </Link>
                        }
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                {/* <div to="/login" className='flex space-x-1'>
                                    <span className='underline'>{userInfo.name}</span>
                                </div> */}
                                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                    {userInfo.name}
                                     <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="" 
                                            // stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"
                                        />
                                    </svg>
                                </button>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="space-x-4">
                                        <MdDashboard size={20} className=''/>   
                                        <button onClick={navigateAdmin}>Admin dashboard</button>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="space-x-4">
                                        <IoMdPerson size={20} className=''/>
                                        <button onClick={navigateProfile}>profile</button>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="space-x-4">
                                        <RiLogoutCircleRFill size={20} className=''/>
                                        <button onClick={logoutHandler}>Logout</button>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                }
                {/* {
                    userInfo && userInfo.isAdmin &&
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div to="/login" className='flex space-x-1'>
                                <span className='underline'>Admin menu</span>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="space-x-4">
                                    <IoMdPerson size={20} className=''/>
                                    <button onClick={() => navigate('/admin/products')}>Product List</button>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="space-x-4">
                                    <IoMdPerson size={20} className=''/>
                                    <button onClick={() => navigate('/admin/orders')}>Order List</button>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="space-x-4">
                                    <IoMdPerson size={20} className=''/>
                                    <button onClick={() => navigate('/admin/users')}>User List</button>
                                </DropdownMenuItem> 
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                } */}
            </ul>
        </div>
    )
}

