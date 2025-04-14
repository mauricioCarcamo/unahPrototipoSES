import { useState } from "react";
import { ChevronDown, ChevronRight, Home, Box, CircleUserRound, ShoppingCart, LaptopMinimal, Plus, Rss, CircleHelp, Facebook, Twitter, Instagram } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const [openMenu, setOpenMenu] = useState(false);

    const [openMenus, setOpenMenus] = useState({});

    const toggleMenu = (menuKey) => {
        setOpenMenus((prev) => ({
            ...prev,
            [menuKey]: !prev[menuKey], // Cambia el estado solo de este menú
        }));
    };

    return (
        <div className="w-64 h-100 bg-gray-900 text-white p-4 overflow-y-scroll scrollbar-dark">


            <div className="flex justify-center mb-3">
                <img
                    src="sespng.png"  // Asegúrate de reemplazar con la ruta de tu logo
                    alt="Logo de la empresa"
                    className="h-14 w-auto"
                />
            </div>


            <ul className="space-y-2">

                {/* 
//#region Home
*/}
                <li>

                    <NavLink
                        to="/home"
                        className={({ isActive }) => `block px-2 py-2 rounded hover:bg-gray-700 transition flex items-center gap-2 ${isActive ? "bg-gray-700 font-semibold" : ""} `}
                    >
                        <Home size={18} />
                        <span>Home</span>
                    </NavLink>
                </li>


                {/* 
//#region Products
*/}

                <li>
                    <NavLink
                        onClick={() => toggleMenu("Products")}
                        className={({ isActive }) => `flex  justify-between w-full rounded hover:bg-gray-700 transition flex items-center gap-}`}
                    >
                        <div className="flex gap-2 items-center px-2 py-2">
                            <Box size={18} />
                            <span>Products</span>
                        </div>
                        {openMenus["Products"] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </NavLink>


                    {openMenus["Products"] && (
                        <ul className="ml-4 mt-1 space-y-1 text-sm">

                            {/* 
                //#region * Categories
                */}

                            <li>
                                <NavLink
                                    onClick={() => toggleMenu("Categories")}
                                    className={({ isActive }) => `flex  justify-between w-full rounded hover:bg-gray-700 transition flex items-center gap-2 `}
                                >
                                    <div className="flex gap-2 items-center px-2 py-2">
                                        <span>Categories</span>
                                    </div>
                                    {openMenus["Categories"] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                </NavLink>

                                {openMenus["Categories"] && (
                                    <ul className="ml-4 mt-1 space-y-1 text-sm">
                                        <li>
                                            <NavLink
                                                to="products/collections"
                                                className={({ isActive }) => `flex  justify-between w-full rounded hover:bg-gray-700 transition flex items-center gap-2 `}
                                            >
                                                <div className="flex gap-2 items-center px-2 py-2">
                                                    <span>Collections</span>
                                                </div>
                                            </NavLink>

                                        </li>
                                        <li>
                                            <NavLink
                                                to="products/featured"
                                                className={({ isActive }) => `flex  justify-between w-full rounded hover:bg-gray-700 transition flex items-center gap-2 `}
                                            >
                                                <div className="flex gap-2 items-center px-2 py-2">
                                                    <span>Featured</span>
                                                </div>
                                            </NavLink>

                                        </li>
                                        <li>
                                            <NavLink
                                                to="products/clereance"
                                                className={({ isActive }) => `flex  justify-between w-full rounded hover:bg-gray-700 transition flex items-center gap-2 `}
                                            >
                                                <div className="flex gap-2 items-center px-2 py-2">
                                                    <span>Clereance</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    </ul>
                                )}
                            </li>

                            {/* 
                //#region * Product Details
                */}
                            {/*                             <li>
                                <a href="#" className="block px-2 py-1 rounded hover:bg-gray-700">Product Details</a>
                            </li> */}

                            {/* 
                //#region * Compare Products
                */}
                            <NavLink
                                to="products/compare"
                                className={({ isActive }) => `flex  justify-between w-full rounded hover:bg-gray-700 transition flex items-center gap-2 `}
                            >
                                <div className="flex gap-2 items-center px-2 py-2">
                                    <span>Compare Products</span>
                                </div>
                            </NavLink>

                        </ul>
                    )}
                </li>

                {/* 
//#region Cart
*/}

                <li>

                    <NavLink
                        onClick={() => toggleMenu("Cart")}
                        className={({ isActive }) => `flex  justify-between w-full rounded hover:bg-gray-700 transition flex items-center gap-2 `}
                    >
                        <div className="flex gap-2 items-center px-2 py-2">
                            <ShoppingCart size={18} />
                            <span>Cart</span>
                        </div>
                        {openMenus["Cart"] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </NavLink>

                    {openMenus["Cart"] && (
                        <ul className="ml-4 mt-1 space-y-1 text-sm">
                            <li>
                                <NavLink
                                    to="cart/summary"
                                    className={({ isActive }) => `flex  justify-between w-full rounded hover:bg-gray-700 transition flex items-center gap-2 `}
                                >
                                    <div className="flex gap-2 items-center px-2 py-2">
                                        <span>Order Summary</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="cart/shipping-methods"
                                    className={({ isActive }) => `flex  justify-between w-full rounded hover:bg-gray-700 transition flex items-center gap-2 `}
                                >
                                    <div className="flex gap-2 items-center px-2 py-2">
                                        <span>Shipping Method</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="cart/payment-methods"
                                    className={({ isActive }) => `flex  justify-between w-full rounded hover:bg-gray-700 transition flex items-center gap-2 `}
                                >
                                    <div className="flex gap-2 items-center px-2 py-2">
                                        <span>Payments Method</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                {/*                                 <NavLink
                                    to="cart/shipping"
                                    className={({ isActive }) => `flex  justify-between w-full rounded hover:bg-gray-700 transition flex items-center gap-2 `}
                                >
                                    <div className="flex gap-2 items-center px-2 py-2">
                                        <span>Shipping</span>
                                    </div>
                                </NavLink> */}
                            </li>
                        </ul>
                    )}
                </li>

                {/* 
//#region Account
*/}
                <li>
                    <NavLink
                        onClick={() => toggleMenu("Account")}
                        className={({ isActive }) => `flex  justify-between w-full rounded hover:bg-gray-700 transition flex items-center gap-2 `}
                    >
                        <div className="flex gap-2 items-center px-2 py-2">
                            <CircleUserRound size={18} />
                            <span>Account</span>
                        </div>
                        {openMenus["Account"] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </NavLink>

                    {openMenus["Account"] && (
                        <ul className="ml-4 mt-1 space-y-1 text-sm">
                            <li>
                                <NavLink
                                    to="profile"
                                    className={({ isActive }) => `flex  justify-between w-full rounded hover:bg-gray-700 transition flex items-center gap-2 `}
                                >
                                    <div className="flex gap-2 items-center px-2 py-2">
                                        <span>Profiles</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="account/payment-methods"
                                    className={({ isActive }) => `flex  justify-between w-full rounded hover:bg-gray-700 transition flex items-center gap-2 `}
                                >
                                    <div className="flex gap-2 items-center px-2 py-2">
                                        <span>Payment Methods</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="account/password-change"
                                    className={({ isActive }) => `flex  justify-between w-full rounded hover:bg-gray-700 transition flex items-center gap-2 `}
                                >
                                    <div className="flex gap-2 items-center px-2 py-2">
                                        <span>Password</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="account/saved-addresses"
                                    className={({ isActive }) => `flex  justify-between w-full rounded hover:bg-gray-700 transition flex items-center gap-2 `}
                                >
                                    <div className="flex gap-2 items-center px-2 py-2">
                                        <span>Saved Addresses</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="account/order-history"
                                    className={({ isActive }) => `flex  justify-between w-full rounded hover:bg-gray-700 transition flex items-center gap-2 `}
                                >
                                    <div className="flex gap-2 items-center px-2 py-2">
                                        <span>Order History</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="account/gift-cards"
                                    className={({ isActive }) => `flex  justify-between w-full rounded hover:bg-gray-700 transition flex items-center gap-2 `}
                                >
                                    <div className="flex gap-2 items-center px-2 py-2">
                                        <span>Gift Cards</span>
                                    </div>
                                </NavLink>
                            </li>
                            {/*                             <li>
                                <a href="#" className="block px-2 py-1 rounded hover:bg-gray-700">Payment Methods</a>
                            </li>
                            <li>
                                <a href="#" className="block px-2 py-1 rounded hover:bg-gray-700">Password</a>
                            </li>
                            <li>
                                <a href="#" className="block px-2 py-1 rounded hover:bg-gray-700">Saved Addresses</a>
                            </li>
                            <li>
                                <a href="#" className="block px-2 py-1 rounded hover:bg-gray-700">Order History</a>
                            </li>
                            <li>
                                <a href="#" className="block px-2 py-1 rounded hover:bg-gray-700">Gift Cards</a>
                            </li> */}
                        </ul>
                    )}
                </li>


                {/* 
//#region More
*/}
                <li>
                    <NavLink
                        onClick={() => toggleMenu("More")}
                        className={({ isActive }) => `flex  justify-between w-full rounded hover:bg-gray-700 transition flex items-center gap-2 `}
                    >
                        <div className="flex gap-2 items-center px-2 py-2">
                            <Plus size={18} />
                            <span>More</span>
                        </div>
                        {openMenus["More"] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </NavLink>

                    {openMenus["More"] && (
                        <ul className="ml-4 mt-1 space-y-1 text-sm">
                            <li>
                                <a href="https://www.blogger.com/about/?bpli=1" className="block px-2 py-1 rounded hover:bg-gray-700 transition flex items-center gap-2">
                                    <Rss size={16} />
                                    <span>Blog</span>
                                </a>
                            </li>

                            <li>
                                <a href="https://www.helpdesk.com/#" className="block px-2 py-1 rounded hover:bg-gray-700 transition flex items-center gap-2">
                                    <CircleHelp size={16} />
                                    <span>Support Desk</span>
                                </a>
                            </li>

                            <li>
                                <a href="https://www.facebook.com/" className="block px-2 py-1 rounded hover:bg-gray-700 transition flex items-center gap-2">
                                    <Facebook size={16} />
                                    <span>Facebook</span>
                                </a>
                            </li>

                            <li>
                                <a href="https://x.com/?lang=es" className="block px-2 py-1 rounded hover:bg-gray-700 transition flex items-center gap-2">
                                    <Twitter size={16} />
                                    <span>Twitter</span>
                                </a>
                            </li>

                            <li>
                                <a href="https://www.instagram.com/" className="block px-2 py-1 rounded hover:bg-gray-700 transition flex items-center gap-2">
                                    <Instagram size={16} />
                                    <span>Instagram</span>
                                </a>
                            </li>

                        </ul>
                    )}
                </li>

            </ul>
        </div>
    );
}
