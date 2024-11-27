import { useEffect } from "react";
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

  useEffect(() => {
    dispatch(fetchCartData());
    dispatch(fetchWishlistData());
  }, []);

  const isInCart = (id) => cart.map((item) => item.productId).includes(id);
  const isInWishlist = (id) =>
    wishlist.map((item) => item.productId).includes(id);

  const handlerForCartBtn = (id) => {
    if (isInCart) {
      dispatch(deleteCartItem(id));
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
      }
    }
  };

  const clickHandlerForWishlistBtn = (id) => {
    if (isInWishlist(id)) {
      dispatch(deleteWishlistItem(id));
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
      }
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">My Wishlist</h1>
      <div className="row">
        {status === "loading" && <p className="text-center">Loading...</p>}
        {status === "error" && <p className="text-center">{error}</p>}
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
                    onClick={() => handlerForCartBtn(product.productId)}
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
    </div>
  );
};

export default WishlistView;
