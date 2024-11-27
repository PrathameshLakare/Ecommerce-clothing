import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchClothings } from "../features/clothing/clothingSlice";
import {
  postCartData,
  fetchCartData,
  deleteCartItem,
} from "../features/cart/cartSlice";
import {
  postWishlistData,
  fetchWishlistData,
  deleteWishlistItem,
} from "../features/wishllist/wishlistSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const productId = useParams().productId;
  const { clothing } = useSelector((state) => {
    return state.clothing;
  });

  useEffect(() => {
    dispatch(fetchClothings());
    dispatch(fetchCartData());
    dispatch(fetchWishlistData());
  });

  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const product = clothing?.find((product) => product._id === productId);

  const clickHandlerForCart = (id) => {
    const isInCart = cart.map((item) => item.productId).includes(id);

    if (isInCart) {
      dispatch(deleteCartItem(id));
    } else {
      const item = clothing.find((product) => product._id === id);

      if (item) {
        const cartItem = {
          productId: item._id,
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

  const clickHandlerForWishlist = (id) => {
    const isInWishlist = wishlist.map((item) => item.productId).includes(id);

    if (isInWishlist) {
      dispatch(deleteWishlistItem(id));
    } else {
      const item = clothing.find((product) => product._id === id);

      if (item) {
        const wishlistItem = {
          productId: item._id,
          productName: item.productName,
          productCategories: item.productCategories,
          productImg: item.productImg,
          productPrice: item.productPrice,
          productRating: item.productRating,
        };
        dispatch(postWishlistData(wishlistItem));
      }
    }
  };

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "700px" }}
    >
      {product && (
        <div className="d-flex justify-content-center p-3">
          <div className="card rounded vh-50 m-4">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <img
                  src={product.productImg}
                  className="img-fluid w-100 h-100 object-fit-fill rounded-start"
                />
              </div>

              <div className="col-md-6">
                <div className="card-body mx-3">
                  <h3 className="fw-semibold mt-2 mb-4">
                    {product.productName}
                  </h3>
                  <p className="my-2">
                    <strong>Price: &#8377;{product.productPrice}</strong>
                  </p>

                  <p className="my-2">
                    <strong>Rating: {product.productRating}</strong>
                  </p>
                  <p className="my-2">
                    <strong>Details: </strong>
                    {product.productDetails}
                  </p>

                  <button
                    onClick={() => clickHandlerForCart(product._id)}
                    className="btn btn-primary w-100 my-2 "
                  >
                    {cart.map((item) => item.productId).includes(product._id)
                      ? "Remove from cart"
                      : "Add to cart"}
                  </button>
                  <button
                    onClick={() => clickHandlerForWishlist(product._id)}
                    className="btn btn-secondary w-100 my-2"
                  >
                    {wishlist
                      .map((item) => item.productId)
                      .includes(product._id)
                      ? "Remove from wishlist"
                      : "Save to Wishlist"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
