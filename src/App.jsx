import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "./features/cart/cartSlice";
import { fetchWishlistData } from "./features/wishllist/wishlistSlice";

import { BsCart, BsHeart, BsList, BsX } from "react-icons/bs";

import CategoriesView from "./features/categories/CategoriesView";
import ClothingView from "./features/clothing/ClothingView";
import ProductDetails from "./pages/ProductDetails";
import WishlistView from "./features/wishllist/WishlistView";
import CartView from "./features/cart/CartView";
import AddressView from "./features/address/AddressView";
import PostAddress from "./features/address/PostAddress";
import OrderSummary from "./pages/OrderSummary";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  const dispatch = useDispatch();
  const { cartValue } = useSelector((state) => state.cart);
  const { wishlistValue } = useSelector((state) => state.wishlist);
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCartData());
    dispatch(fetchWishlistData());
  }, [dispatch]);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearchValue = debounce(
    (e) => setSearchValue(e.target.value),
    300
  );

  return (
    <Router>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-bold hover:text-indigo-700 transition"
              >
                MyShoppingSite
              </Link>
              <div className="hidden md:flex space-x-4">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="font-medium text-gray-700 hover:text-indigo-600 transition"
                >
                  Home
                </Link>
                <Link
                  to="/productListing/clothing"
                  onClick={() => setMenuOpen(false)}
                  className="font-medium text-gray-700 hover:text-indigo-600 transition"
                >
                  Clothing
                </Link>
              </div>
            </div>

            <div className="hidden md:flex flex-1 justify-center px-4">
              <input
                type="search"
                placeholder="Search products..."
                onChange={handleSearchValue}
                className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
              />
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/wishlist"
                className="relative text-gray-600 hover:text-indigo-600"
              >
                <BsHeart className="h-6 w-6" />
                {wishlistValue > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                    {wishlistValue}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="relative text-gray-600 hover:text-indigo-600"
              >
                <BsCart className="h-6 w-6" />
                {cartValue > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                    {cartValue}
                  </span>
                )}
              </Link>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                {menuOpen ? (
                  <BsX className="h-6 w-6" />
                ) : (
                  <BsList className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-200 shadow-sm">
            <div className="px-4 py-4 space-y-4">
              <input
                type="search"
                placeholder="Search products..."
                onChange={handleSearchValue}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="block font-medium text-gray-700 hover:text-indigo-600 transition"
              >
                Home
              </Link>
              <Link
                to="/productListing/clothing"
                onClick={() => setMenuOpen(false)}
                className="block font-medium text-gray-700 hover:text-indigo-600 transition"
              >
                Clothing
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="block font-medium text-gray-700 hover:text-indigo-600 transition"
              >
                Wishlist
              </Link>
              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="block font-medium text-gray-700 hover:text-indigo-600 transition"
              >
                Cart
              </Link>
            </div>
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<CategoriesView />} />
        <Route
          path="/productListing/:category"
          element={<ClothingView searchValue={searchValue} />}
        />
        <Route
          path="/productListing/ProductDetails/:productId"
          element={<ProductDetails />}
        />
        <Route path="/wishlist" element={<WishlistView />} />
        <Route path="/cart" element={<CartView />} />
        <Route path="/address" element={<AddressView />} />
        <Route path="/postAddress" element={<PostAddress />} />
        <Route path="/orderSummary" element={<OrderSummary />} />
      </Routes>
      <Toaster />
    </Router>
  );
}
