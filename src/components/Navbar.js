import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

const Navbar = () => {
  const { resetCartItem,} = useCartContext();
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Login");
    navigate("/login");
  };

  const handleReset = async () => {
    try {
      await resetCartItem();
    } catch (error) {
      console.log( error);
    }
  };

  return (
    <div className="">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://images.tokopedia.net/assets-tokopedia-lite/v2/zeus/production/e5b8438b.svg"
              className="h-8"
              alt="Logo"
            />
          </div>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              onClick={handleLogin}
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Login
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  onClick={handleReset}
                  className="block py-2 px-3 md:p-0 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:dark:text-green-500 cursor-pointer"
                  aria-current="page"
                >
                  RESET
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
