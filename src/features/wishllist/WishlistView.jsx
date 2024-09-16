import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCartItem, postCartData, fetchCartData } from "../cart/cartSlice";
import { fetchWishlistData } from "./wishlistSlice";

const WishlistView = () => {
  const dispatch = useDispatch();
  const { wishlist, status, error } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
    dispatch(fetchWishlistData());
  }, []);

  const handlerForCartBtn = (id) => {
    const isInCart = cart.map((item) => item.productId).includes(id);

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

  return (
    <div className="container">
      <h1 className="text-center">My Wishlist</h1>
      <div className="row">
        {status === "loading" && <p className="text-center">Loading...</p>}
        {status === "error" && <p className="text-center">{error}</p>}
        {wishlist &&
          wishlist.map((product) => (
            <div key={product._id} className="col-md-4">
              <div className="card">
                <img
                  src={product.productImg}
                  alt={`${product.productName} Img`}
                />
                <div className="card-body">
                  <p className="fw-semibold">{product.productName}</p>
                  <p>
                    <strong>Price: &#8377;{product.productPrice}</strong>
                  </p>
                  <Link
                    className="btn btn-secondary"
                    onClick={() => handlerForCartBtn(product.productId)}
                  >
                    {cart
                      .map((item) => item.productId)
                      .includes(product.productId)
                      ? "Remove from cart"
                      : "Add to Cart"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WishlistView;
