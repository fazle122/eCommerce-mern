/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";




export default function SideMenu({ menuItems }){
  const location = useLocation();

  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenuItem(menuItemUrl);
  };

  return (
    <div className="flex flex-col">
      {menuItems?.map((menuItem, index) => (
        <Link
          key={index}
          to={menuItem.url}
          className={`${
            activeMenuItem.includes(menuItem.url) ? "text-blue-600" : "text-black"
          }`}
          onClick={() => handleMenuItemClick(menuItem.url)}
          aria-current={
            activeMenuItem.includes(menuItem.url) ? "true" : "false"
          }
        >
          <div className="flex space-x-2">
            <div>{menuItem.icon}</div>
            <div>{menuItem.name}</div>
          </div> 
        </Link>
      ))}
    </div>
  );
}
