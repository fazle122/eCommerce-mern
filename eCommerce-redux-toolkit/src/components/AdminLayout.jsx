/* eslint-disable react/prop-types */
import { MdDashboard } from "react-icons/md";
import {IoMdPerson} from 'react-icons/io';
import { BsBorderStyle } from "react-icons/bs";
import SideMenu from "@/components/SideMenu";


export default function AdminLayout({children}){


    const sideMenu = [
        {
            name:"+ New product",
            url:'/admin/createNew',
            icon:<MdDashboard size={20} className=''/> 
        },
        {
            name:"Product list",
            url:'/admin/products',
            icon:<MdDashboard size={20} className=''/> 
        },
        {
            name:"User list",
            url:'/admin/users',
            icon:<IoMdPerson size={20} className=''/>
        },
        {
            name:"Order list",
            url:'/admin/orders',
            icon:<BsBorderStyle size={20} className=''/> 
        },
    ]

    console.log(sideMenu);

    return (
        <>
            <h1 className="flex items-center justify-center text-2xl underline">Admin content</h1>
            <div className="my-6 grid grid-cols-4">
                <div className='col-span-1'>  
                    <div>
                        <SideMenu menuItems={sideMenu}/>
                    </div>
                </div>

                <div className='col-span-3'>  
                    <div>{children}</div>
                </div>


            </div>
        </>
    )
}