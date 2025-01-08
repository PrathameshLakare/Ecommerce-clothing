import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, postCartData, fetchCartData } from "../cart/cartSlice";
import {
  fetchWishlistData,
  deleteWishlistItem,
  postWishlistData,
} from "./wishlistSlice";

const WishlistView = () => {
  const dispatch = useDispatch();
  const { wishlist, status, error } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    dispatch(fetchCartData());
    dispatch(fetchWishlistData());
  }, []);

  const isInCart = (id) => cart.map((item) => item.productId).includes(id);
  const isInWishlist = (id) =>
    wishlist.map((item) => item.productId).includes(id);

  const clickHandlerForCartBtn = (id) => {
    if (isInCart(id)) {
      dispatch(deleteCartItem(id));
      setToastMessage("Item removed from cart!");
      setShowToast(true);
    } else {
      const item = wishlist.find((product) => product.productId === id);
      if (item) {
        const cartItem = {
          productId: item.productId,
          productName: item.productName,
          productCategories: item.productCategories,
          productImg: item.productImg,
          productPrice: item.productPrice,
          productRating: item.productRating,
          productQuantity: 1,
        };
        dispatch(postCartData(cartItem));
        setToastMessage("Item added to cart!");
        setShowToast(true);
      }
    }
  };

  const clickHandlerForWishlistBtn = (id) => {
    if (isInWishlist(id)) {
      dispatch(deleteWishlistItem(id));
      setToastMessage("Item removed from wishlist!");
      setShowToast(true);
    } else {
      const item = cart.find((product) => product.productId === id);
      if (item) {
        const cartItem = {
          productId: item.productId,
          productName: item.productName,
          productCategories: item.productCategories,
          productImg: item.productImg,
          productPrice: item.productPrice,
          productRating: item.productRating,
        };
        dispatch(postWishlistData(cartItem));
        setToastMessage("Item added to wishlist!");
        setShowToast(true);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">My Wishlist</h1>
      <div className="row">
        {status === "loading" && <p className="text-center">Loading...</p>}
        {status === "error" && <p className="text-center">{error}</p>}
        {wishlist.length === 0 && (
          <p className="text-center">Your wishlist is empty.</p>
        )}
        {wishlist &&
          wishlist.map((product) => (
            <div key={product._id} className="col-md-4">
              <div className="card m-2">
                <img
                  src={product.productImg}
                  alt={`${product.productName} Img`}
                  className="img img-fluid w-100 rounded-top h-100"
                />
                <div className="card-body">
                  <p className="fw-semibold">{product.productName}</p>
                  <p>
                    <strong>Price: &#8377;{product.productPrice}</strong>
                  </p>
                  <button
                    className="btn btn-primary w-100 my-2"
                    onClick={() => clickHandlerForCartBtn(product.productId)}
                  >
                    {cart
                      .map((item) => item.productId)
                      .includes(product.productId)
                      ? "Remove from cart"
                      : "Add to Cart"}
                  </button>
                  <button
                    onClick={() =>
                      clickHandlerForWishlistBtn(product.productId)
                    }
                    className="btn btn-secondary w-100 my-2"
                  >
                    {isInWishlist(product.productId)
                      ? "Remove from wishlist"
                      : "Save to Wishlist"}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      {showToast && (
        <div
          className="toast-container position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 5 }}
        >
          <div
            className="toast show text-bg-primary text-white"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-body fs-6">
              {toastMessage}
              <button
                type="button"
                className="btn-close float-end btn-close-white"
                onClick={() => setShowToast(false)}
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistView;
