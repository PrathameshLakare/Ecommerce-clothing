import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CategoriesView from "./features/categories/CategoriesView";
import { BsCart, BsHeart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import ClothingView from "./features/clothing/ClothingView";
import ProductDetails from "./pages/ProductDetails";
import WishlistView from "./features/wishllist/WishlistView";
import CartView from "./features/cart/CartView";
import AddressView from "./features/address/AddressView";
import PostAddress from "./features/address/PostAddress";
import { useEffect, useState } from "react";
import OrderSummary from "./pages/OrderSummary";
import { fetchCartData } from "./features/cart/cartSlice";
import { fetchWishlistData } from "./features/wishllist/wishlistSlice";

export default function App() {
  const dispatch = useDispatch();
  const { cartValue } = useSelector((state) => state.cart);
  const { wishlistValue } = useSelector((state) => state.wishlist);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(fetchCartData());
    dispatch(fetchWishlistData());
  }, []);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <p className="navbar-brand my-3">
            <Link
              className="link-secondary link-underline link-underline-opacity-0"
              to={"/"}
            >
              MyShoppingSite
            </Link>
          </p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse nav-item" id="navbarNav">
            <div className="mx-auto">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2 my-3"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </form>
            </div>
            <div className="d-flex">
              <div className="nav-item ">
                <Link
                  to={"/wishlist"}
                  className="btn btn-outline-secondary mx-2 position-relative"
                >
                  <BsHeart />
                  <span className="position-absolute top-0 start-100 translate-middle  translate-middle badge rounded-pill bg-danger text-center">
                    {wishlistValue}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </Link>
              </div>

              <div className="nav-item">
                <Link
                  to={"/cart"}
                  className="btn btn-outline-secondary mx-2 position-relative"
                >
                  <BsCart />
                  <span className="position-absolute top-0 start-100 translate-middle  translate-middle badge rounded-pill bg-danger text-center">
                    {cartValue}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<CategoriesView />} />
        <Route
          path="/productListing/clothing"
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
    </Router>
  );
}
